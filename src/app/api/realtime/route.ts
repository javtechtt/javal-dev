import { NextResponse } from 'next/server';

const REALTIME_MODEL = 'gpt-realtime-1.5';

export async function POST() {
  const res = await fetch('https://api.openai.com/v1/realtime/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: REALTIME_MODEL, voice: 'alloy' }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('[/api/realtime] OpenAI error:', text);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 502 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
