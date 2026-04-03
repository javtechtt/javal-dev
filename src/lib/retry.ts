/**
 * Retry utility for transient API failures.
 *
 * Provides exponential backoff with jitter for HTTP calls that may
 * encounter intermittent 5xx errors from upstream services (OpenAI, etc.).
 *
 * Usage:
 *   const res = await fetchWithRetry('https://api.openai.com/...', { method: 'POST', ... });
 *   // or
 *   const result = await withRetry(() => someAsyncOperation(), { label: 'myOp' });
 */

// ── Configuration ────────────────────────────────────────────────

export interface RetryConfig {
  /** Maximum number of retry attempts (not counting the initial call) */
  maxRetries: number;
  /** Initial delay in milliseconds before the first retry */
  initialDelayMs: number;
  /** Multiplier applied to the delay after each retry (exponential growth) */
  backoffMultiplier: number;
  /** Maximum delay between retries in milliseconds (caps exponential growth) */
  maxDelayMs: number;
  /** Request timeout in milliseconds (0 = no timeout) */
  timeoutMs: number;
  /** Enable verbose logging */
  debug: boolean;
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelayMs: 500,
  backoffMultiplier: 2,
  maxDelayMs: 8000,
  timeoutMs: 15000,
  debug: true,
};

// ── Transient error detection ────────────────────────────────────

/** HTTP status codes that are safe to retry (server-side transient failures) */
const RETRYABLE_STATUS_CODES = new Set([429, 500, 502, 503, 504]);

/** HTTP status codes that should fail immediately (client errors, auth) */
const NON_RETRYABLE_STATUS_CODES = new Set([400, 401, 403, 404, 405, 422]);

export function isTransientHttpError(status: number): boolean {
  return RETRYABLE_STATUS_CODES.has(status);
}

export function isNonRetryableHttpError(status: number): boolean {
  return NON_RETRYABLE_STATUS_CODES.has(status);
}

/** Check if an error is a network/timeout issue worth retrying */
function isNetworkError(err: unknown): boolean {
  if (err instanceof TypeError && err.message.includes('fetch')) return true;
  if (err instanceof DOMException && err.name === 'AbortError') return true;
  return false;
}

// ── Delay with jitter ──────────────────────────────────���─────────

/** Compute delay for attempt N with exponential backoff + random jitter */
function computeDelay(attempt: number, config: RetryConfig): number {
  const exponential = config.initialDelayMs * Math.pow(config.backoffMultiplier, attempt);
  const capped = Math.min(exponential, config.maxDelayMs);
  // Add ±25% jitter to prevent thundering herd
  const jitter = capped * (0.75 + Math.random() * 0.5);
  return Math.round(jitter);
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Logging ──────────────────────────────────────────────────────

interface LogContext {
  label: string;
  attempt: number;
  maxRetries: number;
  status?: number;
  requestId?: string;
  error?: string;
  delayMs?: number;
}

function logRetry(ctx: LogContext, debug: boolean): void {
  if (!debug) return;
  console.warn(
    `[Retry] ${ctx.label} — attempt ${ctx.attempt}/${ctx.maxRetries}` +
    (ctx.status ? ` | status: ${ctx.status}` : '') +
    (ctx.requestId ? ` | request_id: ${ctx.requestId}` : '') +
    (ctx.error ? ` | error: ${ctx.error.slice(0, 200)}` : '') +
    (ctx.delayMs ? ` | retrying in ${ctx.delayMs}ms` : ''),
  );
}

function logFinalFailure(ctx: LogContext, debug: boolean): void {
  if (!debug) return;
  console.error(
    `[Retry] ${ctx.label} — FAILED after ${ctx.attempt} attempts` +
    (ctx.status ? ` | last status: ${ctx.status}` : '') +
    (ctx.requestId ? ` | request_id: ${ctx.requestId}` : '') +
    (ctx.error ? ` | error: ${ctx.error.slice(0, 300)}` : ''),
  );
}

// ── Extract request_id from OpenAI error responses ───────────────

function extractRequestId(body: string): string | undefined {
  try {
    const parsed = JSON.parse(body);
    return parsed?.request_id ?? parsed?.error?.request_id;
  } catch {
    return undefined;
  }
}

// ── Core: fetchWithRetry ─────────────────────────────────────────

/**
 * Drop-in replacement for `fetch()` with retry logic for transient failures.
 * Handles timeouts, exponential backoff, and OpenAI-style error responses.
 *
 * Non-retryable errors (4xx except 429) fail immediately.
 * Network errors and timeouts are retried.
 */
export async function fetchWithRetry(
  url: string,
  init?: RequestInit,
  config: Partial<RetryConfig> = {},
  label = 'fetch',
): Promise<Response> {
  const cfg = { ...DEFAULT_RETRY_CONFIG, ...config };
  let lastError: unknown;
  let lastStatus: number | undefined;
  let lastBody: string | undefined;
  let lastRequestId: string | undefined;

  for (let attempt = 0; attempt <= cfg.maxRetries; attempt++) {
    try {
      // Apply timeout via AbortController
      const controller = cfg.timeoutMs > 0 ? new AbortController() : null;
      const timeoutId = controller
        ? setTimeout(() => controller.abort(), cfg.timeoutMs)
        : null;

      const res = await fetch(url, {
        ...init,
        signal: controller?.signal ?? init?.signal,
      });

      if (timeoutId) clearTimeout(timeoutId);

      // Success — return immediately
      if (res.ok) return res;

      // Read body for error details (clone so caller can still read if needed)
      lastStatus = res.status;
      lastBody = await res.text();
      lastRequestId = extractRequestId(lastBody);

      // Non-retryable client error — fail fast
      if (isNonRetryableHttpError(res.status)) {
        logFinalFailure({
          label, attempt, maxRetries: cfg.maxRetries,
          status: res.status, requestId: lastRequestId,
          error: lastBody,
        }, cfg.debug);

        // Return a synthetic Response so the caller can handle the error body
        return new Response(lastBody, {
          status: res.status,
          statusText: res.statusText,
          headers: res.headers,
        });
      }

      // Transient error — retry
      if (isTransientHttpError(res.status) && attempt < cfg.maxRetries) {
        // Respect Retry-After header for 429
        let delayMs = computeDelay(attempt, cfg);
        const retryAfter = res.headers.get('retry-after');
        if (retryAfter && res.status === 429) {
          const retryAfterMs = parseInt(retryAfter, 10) * 1000;
          if (!isNaN(retryAfterMs)) delayMs = Math.max(delayMs, retryAfterMs);
        }

        logRetry({
          label, attempt: attempt + 1, maxRetries: cfg.maxRetries,
          status: res.status, requestId: lastRequestId,
          error: lastBody, delayMs,
        }, cfg.debug);

        await sleep(delayMs);
        continue;
      }

      // Non-retryable or out of retries — fall through to final failure
      break;

    } catch (err) {
      lastError = err;

      // Network error or timeout — retry if we have attempts left
      if (isNetworkError(err) && attempt < cfg.maxRetries) {
        const delayMs = computeDelay(attempt, cfg);
        logRetry({
          label, attempt: attempt + 1, maxRetries: cfg.maxRetries,
          error: String(err), delayMs,
        }, cfg.debug);
        await sleep(delayMs);
        continue;
      }

      break;
    }
  }

  // All retries exhausted
  logFinalFailure({
    label, attempt: cfg.maxRetries, maxRetries: cfg.maxRetries,
    status: lastStatus, requestId: lastRequestId,
    error: lastBody ?? String(lastError),
  }, cfg.debug);

  // If we have a response body, return it as a failed Response
  if (lastStatus && lastBody !== undefined) {
    return new Response(lastBody, { status: lastStatus });
  }

  // Network-level failure with no HTTP response
  throw lastError ?? new Error(`[Retry] ${label} failed after ${cfg.maxRetries} retries`);
}

// ── Generic: withRetry ───────────────────────────────────────────

/**
 * Wraps any async operation with retry logic.
 * The operation function receives the attempt number (0-based).
 * Return value is passed through on success.
 * Throw an error with a `status` property to control retry behavior.
 */
export async function withRetry<T>(
  operation: (attempt: number) => Promise<T>,
  config: Partial<RetryConfig> & { label?: string } = {},
): Promise<T> {
  const cfg = { ...DEFAULT_RETRY_CONFIG, ...config };
  const label = config.label ?? 'operation';
  let lastError: unknown;

  for (let attempt = 0; attempt <= cfg.maxRetries; attempt++) {
    try {
      return await operation(attempt);
    } catch (err) {
      lastError = err;

      // Check if the error has a status code indicating non-retryable
      const status = (err as { status?: number })?.status;
      if (status && isNonRetryableHttpError(status)) {
        throw err;
      }

      if (attempt < cfg.maxRetries) {
        const delayMs = computeDelay(attempt, cfg);
        logRetry({
          label, attempt: attempt + 1, maxRetries: cfg.maxRetries,
          status, error: String(err), delayMs,
        }, cfg.debug);
        await sleep(delayMs);
      }
    }
  }

  logFinalFailure({
    label, attempt: cfg.maxRetries, maxRetries: cfg.maxRetries,
    error: String(lastError),
  }, cfg.debug);

  throw lastError;
}
