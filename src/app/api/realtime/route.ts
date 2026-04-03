import { NextResponse } from 'next/server';
import { fetchWithRetry } from '@/lib/retry';

const REALTIME_MODEL = 'gpt-realtime-1.5';

export async function POST() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('[/api/realtime] OPENAI_API_KEY is not configured');
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  try {
    const res = await fetchWithRetry(
      'https://api.openai.com/v1/realtime/sessions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model: REALTIME_MODEL, voice: 'shimmer' }),
      },
      { maxRetries: 3, initialDelayMs: 500, timeoutMs: 10000 },
      'OpenAI realtime/sessions',
    );

    if (!res.ok) {
      const body = await res.text();
      console.error(`[/api/realtime] OpenAI ${res.status}:`, body);
      return NextResponse.json(
        { error: 'Failed to create realtime session' },
        { status: res.status >= 500 ? 502 : res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[/api/realtime] Network failure after retries:', err);
    return NextResponse.json(
      { error: 'Could not reach OpenAI — please try again' },
      { status: 502 },
    );
  }
}
