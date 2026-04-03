/**
 * Self-Voice Echo Filter
 *
 * Prevents the voice agent from responding to its own spoken output captured
 * by the microphone on mobile devices. Works by comparing incoming user
 * transcriptions against the agent's recent spoken text using multiple
 * similarity heuristics with time-aware suppression windows.
 *
 * Integration point: call `shouldIgnoreTranscript()` before forwarding any
 * ASR transcription as user input. Call `recordAgentUtterance()` whenever
 * the agent finishes a spoken segment.
 */

// ── Configuration ────────────────────────────────────────────────

export interface EchoFilterConfig {
  /** Enable debug logging to console (disable in production) */
  debug: boolean;
  /** Max agent utterances to keep in the ring buffer */
  bufferSize: number;
  /** Seconds after agent stops speaking where aggressive filtering applies */
  echoWindowSeconds: number;
  /** Jaccard similarity threshold during the echo window (0–1) */
  jaccardThresholdInWindow: number;
  /** Jaccard similarity threshold outside the echo window (stricter) */
  jaccardThresholdOutsideWindow: number;
  /** Substring overlap ratio threshold — if this much of the transcript
   *  appears inside an agent utterance, treat it as echo */
  substringOverlapRatio: number;
  /** Transcripts shorter than this (in characters) skip echo filtering
   *  to avoid suppressing short user interjections */
  minTranscriptLength: number;
}

export const DEFAULT_CONFIG: EchoFilterConfig = {
  debug: true,
  bufferSize: 5,
  echoWindowSeconds: 2.5,
  jaccardThresholdInWindow: 0.35,
  jaccardThresholdOutsideWindow: 0.65,
  substringOverlapRatio: 0.6,
  minTranscriptLength: 12,
};

// ── Types ────────────────────────────────────────────────────────

export interface AgentUtterance {
  /** Raw text as spoken by the agent */
  raw: string;
  /** Normalized for comparison */
  normalized: string;
  /** Token set for Jaccard similarity */
  tokens: Set<string>;
  /** When this utterance was recorded (ms since epoch) */
  timestamp: number;
}

export interface FilterDecision {
  /** Whether the transcript should be dropped */
  ignore: boolean;
  /** Human-readable reason for the decision */
  reason: string;
  /** Detailed scores for debugging */
  scores: {
    bestJaccard: number;
    bestSubstringRatio: number;
    exactMatch: boolean;
    matchedUtterance: string | null;
    inEchoWindow: boolean;
    agentSpeaking: boolean;
    transcriptLength: number;
  };
}

// ── Short phrases that should almost never be suppressed ─────────
// These are common user interjections / commands. Even if they appear
// inside an agent utterance, the user likely said them intentionally.

const PASSTHROUGH_PHRASES = new Set([
  'yeah', 'yes', 'no', 'nah', 'nope', 'stop', 'wait', 'hold on',
  'go ahead', 'sure', 'okay', 'ok', 'hmm', 'what', 'huh', 'hey',
  'hi', 'hello', 'thanks', 'thank you', 'bye', 'goodbye', 'repeat',
  'again', 'louder', 'slower', 'help', 'nevermind', 'cancel',
  'take me there', 'show me', 'tell me more', 'go back',
]);

// ── Text Normalization ───────────────────────────────────────────

/** Lowercase, strip punctuation, collapse whitespace, trim */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')   // remove punctuation
    .replace(/\s+/g, ' ')      // collapse whitespace
    .trim();
}

/** Split normalized text into a token set for Jaccard comparison */
export function tokenize(normalized: string): Set<string> {
  return new Set(normalized.split(' ').filter(Boolean));
}

// ── Similarity Functions ─────────────────────────────────────────

/**
 * Jaccard similarity: |A ∩ B| / |A ∪ B|
 * Returns 0–1 where 1 = identical token sets.
 */
export function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 0;
  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) intersection++;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/**
 * What fraction of the shorter string's tokens appear in the longer string's tokens.
 * Catches cases where the transcript is a fragment of the agent's speech.
 */
export function tokenOverlapRatio(transcriptTokens: Set<string>, agentTokens: Set<string>): number {
  if (transcriptTokens.size === 0) return 0;
  let overlap = 0;
  for (const token of transcriptTokens) {
    if (agentTokens.has(token)) overlap++;
  }
  return overlap / transcriptTokens.size;
}

/**
 * Checks if the normalized transcript is a substring of any agent utterance
 * or vice versa. Returns the ratio of the match length to the transcript length.
 */
export function substringOverlap(transcriptNorm: string, agentNorm: string): number {
  if (!transcriptNorm || !agentNorm) return 0;
  // Check if transcript is contained within the agent utterance
  if (agentNorm.includes(transcriptNorm)) return 1.0;
  // Check if agent utterance is contained within transcript (echo repeated)
  if (transcriptNorm.includes(agentNorm)) return agentNorm.length / transcriptNorm.length;
  return 0;
}

// ── Ring Buffer for Agent Utterances ──────────────��──────────────

export class AgentUtteranceBuffer {
  private buffer: AgentUtterance[] = [];
  private maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  /** Record a new agent utterance */
  push(text: string): void {
    const normalized = normalize(text);
    if (!normalized) return;
    const entry: AgentUtterance = {
      raw: text,
      normalized,
      tokens: tokenize(normalized),
      timestamp: Date.now(),
    };
    this.buffer.push(entry);
    // Evict oldest entries if over capacity
    while (this.buffer.length > this.maxSize) {
      this.buffer.shift();
    }
  }

  /** Get all stored utterances (newest last) */
  getAll(): readonly AgentUtterance[] {
    return this.buffer;
  }

  /** Clear the buffer */
  clear(): void {
    this.buffer = [];
  }
}

// ── Core Decision Function ───────────────────────────────────────

/**
 * Determines whether an incoming user transcription is likely echo of
 * the agent's own speech and should be ignored.
 *
 * @param transcript     - Raw transcription text from ASR
 * @param buffer         - Recent agent utterances
 * @param agentSpeaking  - Is the agent currently producing audio?
 * @param lastSpeechEndMs - Timestamp (ms) when agent last stopped speaking, or null
 * @param config         - Tunable thresholds
 */
export function shouldIgnoreTranscript(
  transcript: string,
  buffer: AgentUtteranceBuffer,
  agentSpeaking: boolean,
  lastSpeechEndMs: number | null,
  config: EchoFilterConfig = DEFAULT_CONFIG,
): FilterDecision {
  const transcriptNorm = normalize(transcript);
  const transcriptTokens = tokenize(transcriptNorm);

  // ── Passthrough: very short genuine user commands ──────────────
  if (PASSTHROUGH_PHRASES.has(transcriptNorm)) {
    return decision(false, 'passthrough phrase', transcriptNorm, config, {
      bestJaccard: 0, bestSubstringRatio: 0, exactMatch: false,
      matchedUtterance: null, inEchoWindow: false, agentSpeaking,
      transcriptLength: transcriptNorm.length,
    });
  }

  // ── Skip filtering for very short transcripts ─────────────────
  // Short utterances are unlikely to be echo fragments worth filtering
  if (transcriptNorm.length < config.minTranscriptLength) {
    return decision(false, 'below min length', transcriptNorm, config, {
      bestJaccard: 0, bestSubstringRatio: 0, exactMatch: false,
      matchedUtterance: null, inEchoWindow: false, agentSpeaking,
      transcriptLength: transcriptNorm.length,
    });
  }

  // ── Determine if we're in the echo suppression window ─────────
  const now = Date.now();
  const inEchoWindow = agentSpeaking || (
    lastSpeechEndMs !== null &&
    (now - lastSpeechEndMs) < config.echoWindowSeconds * 1000
  );

  // ── Compare against each agent utterance in the buffer ────────
  let bestJaccard = 0;
  let bestSubstringRatio = 0;
  let bestOverlapRatio = 0;
  let exactMatch = false;
  let matchedUtterance: string | null = null;

  for (const utterance of buffer.getAll()) {
    // Exact normalized match
    if (utterance.normalized === transcriptNorm) {
      exactMatch = true;
      matchedUtterance = utterance.raw;
      bestJaccard = 1;
      bestSubstringRatio = 1;
      break;
    }

    // Jaccard token similarity
    const jaccard = jaccardSimilarity(transcriptTokens, utterance.tokens);
    if (jaccard > bestJaccard) {
      bestJaccard = jaccard;
      matchedUtterance = utterance.raw;
    }

    // Substring containment
    const subRatio = substringOverlap(transcriptNorm, utterance.normalized);
    if (subRatio > bestSubstringRatio) {
      bestSubstringRatio = subRatio;
      if (subRatio > bestJaccard) matchedUtterance = utterance.raw;
    }

    // Token overlap ratio (what % of transcript tokens appear in agent speech)
    const overlap = tokenOverlapRatio(transcriptTokens, utterance.tokens);
    if (overlap > bestOverlapRatio) {
      bestOverlapRatio = overlap;
    }
  }

  const scores = {
    bestJaccard,
    bestSubstringRatio,
    exactMatch,
    matchedUtterance,
    inEchoWindow,
    agentSpeaking,
    transcriptLength: transcriptNorm.length,
  };

  // ── Decision logic ────────────────────────────────────────────

  // Exact match is always echo
  if (exactMatch) {
    return decision(true, 'exact match with agent utterance', transcriptNorm, config, scores);
  }

  // High substring overlap — the transcript is clearly a fragment of agent speech
  if (bestSubstringRatio >= config.substringOverlapRatio) {
    return decision(true, `substring overlap ${(bestSubstringRatio * 100).toFixed(0)}%`, transcriptNorm, config, scores);
  }

  // Inside the echo window: use the relaxed (lower) threshold
  if (inEchoWindow) {
    if (bestJaccard >= config.jaccardThresholdInWindow) {
      return decision(true, `jaccard ${(bestJaccard * 100).toFixed(0)}% (in echo window)`, transcriptNorm, config, scores);
    }
    // Also check token overlap ratio — if most of the user's words came from the agent
    if (bestOverlapRatio >= 0.7) {
      return decision(true, `token overlap ${(bestOverlapRatio * 100).toFixed(0)}% (in echo window)`, transcriptNorm, config, scores);
    }
  } else {
    // Outside echo window: stricter threshold
    if (bestJaccard >= config.jaccardThresholdOutsideWindow) {
      return decision(true, `jaccard ${(bestJaccard * 100).toFixed(0)}% (outside window, strict)`, transcriptNorm, config, scores);
    }
  }

  // No match — let it through
  return decision(false, 'no echo detected', transcriptNorm, config, scores);
}

// ── Helper to build FilterDecision + optional debug log ──────────

function decision(
  ignore: boolean,
  reason: string,
  normalizedTranscript: string,
  config: EchoFilterConfig,
  scores: FilterDecision['scores'],
): FilterDecision {
  if (config.debug) {
    const prefix = ignore ? '🔇 SUPPRESSED' : '✅ PASSED';
    console.log(
      `[EchoFilter] ${prefix}: "${normalizedTranscript}"\n` +
      `  reason: ${reason}\n` +
      `  jaccard: ${(scores.bestJaccard * 100).toFixed(1)}% | ` +
      `substr: ${(scores.bestSubstringRatio * 100).toFixed(1)}% | ` +
      `exact: ${scores.exactMatch} | ` +
      `window: ${scores.inEchoWindow} | ` +
      `speaking: ${scores.agentSpeaking} | ` +
      `len: ${scores.transcriptLength}\n` +
      (scores.matchedUtterance ? `  matched: "${scores.matchedUtterance.slice(0, 80)}..."` : ''),
    );
  }
  return { ignore, reason, scores };
}
