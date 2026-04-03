'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { PORTFOLIO_CONTEXT } from '@/lib/portfolioContext';

// ── Types ─────────────────────────────────────────────────────────

export type AgentStatus = 'idle' | 'connecting' | 'listening' | 'speaking' | 'stopped';

export interface TranscriptEntry {
  id: string;
  role: 'user' | 'agent';
  text: string;
}

// ── Constants ─────────────────────────────────────────────────────

const REALTIME_MODEL = 'gpt-realtime-1.5';

const SYSTEM_PROMPT = `
IDENTITY:
You are the portfolio assistant on Javal Joseph's website (javal.dev). You are speaking aloud in a live voice conversation — every word you say will be heard through speakers, not read on screen.

VOICE BEHAVIOR:
- Keep every response to 1–3 short sentences. Brevity is critical.
- Speak naturally and conversationally — warm, enthusiastic, like a knowledgeable friend who's genuinely excited about Javal's work.
- Never output URLs, code snippets, markdown, bullet lists, or anything that sounds unnatural when spoken aloud.
- Pronounce Javal's name as "Juh-val."
- If you are interrupted mid-sentence, stop immediately, acknowledge the user, and respond to their new input. Do not continue your previous thought.

LANGUAGE:
English only. Never respond in any other language regardless of what the user says.

RESPONSE RULES:
1. Never fabricate information not in the portfolio context below.
2. End responses with a gentle forward-moving prompt like "Want me to take you there?" or "Would you like to see that project?"
3. Do not mention you are an AI assistant unless directly asked.
4. If you don't know something, say so honestly and offer to direct the user to the contact section.

NAVIGATION:
You have two tools: scroll_to_section and navigate_to_page. ALWAYS ask the user for confirmation before calling either tool. Only call the tool after the user explicitly says yes, sure, go ahead, or similar. If the destination does not exist, say so and offer the contact section.

OFF-TOPIC:
If the user asks about something unrelated to Javal's portfolio, politely redirect: "I'm best at helping with Javal's work and projects — want me to tell you about those instead?"

---

${PORTFOLIO_CONTEXT}

AVAILABLE HOMEPAGE SECTIONS: hero, projects, about, services, contact
AVAILABLE PROJECT SLUGS: baloto-visual-agent, lotto-voice-agent, javal-dev, cazova, homeland-furnishings, utt-outreach, javtech-ltd, amcs-limited, the-harambee-house, ecliff-elie, a-team-band-tt, javal-protoverse
`.trim();

const TOOLS = [
  {
    type: 'function',
    name: 'scroll_to_section',
    description:
      'Scrolls to a section on the homepage. ONLY call this after the user has explicitly confirmed they want to go there.',
    parameters: {
      type: 'object',
      properties: {
        section: {
          type: 'string',
          enum: ['hero', 'projects', 'about', 'services', 'contact'],
          description: 'The section ID to scroll to on the homepage.',
        },
      },
      required: ['section'],
    },
  },
  {
    type: 'function',
    name: 'navigate_to_page',
    description:
      'Navigates to a project case study page. ONLY call this after the user has explicitly confirmed they want to go there.',
    parameters: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          enum: [
            'baloto-visual-agent',
            'lotto-voice-agent',
            'javal-dev',
            'cazova',
            'homeland-furnishings',
            'utt-outreach',
            'javtech-ltd',
            'amcs-limited',
            'the-harambee-house',
            'ecliff-elie',
            'a-team-band-tt',
            'javal-protoverse',
          ],
          description: 'The project slug to navigate to.',
        },
      },
      required: ['slug'],
    },
  },
];

const GREETING_INSTRUCTION =
  'Greet the visitor warmly in one sentence. Introduce yourself as Javal\'s portfolio assistant and invite them to ask about his work, projects, or skills. Keep it natural and concise. Do NOT call any navigation function.';

// ── Hook ──────────────────────────────────────────────────────────

export function useVoiceAgent() {
  const router = useRouter();
  const pathname = usePathname();

  const [status, setStatus] = useState<AgentStatus>('idle');
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);

  // Stable refs — always hold latest values for use inside event handlers
  const routerRef = useRef(router);
  const pathnameRef = useRef(pathname);
  useEffect(() => { routerRef.current = router; }, [router]);
  useEffect(() => { pathnameRef.current = pathname; }, [pathname]);
  useEffect(() => { statusRef.current = status; }, [status]);

  // WebRTC refs
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Pending navigation to execute after response audio completes
  const pendingNavRef = useRef<(() => void) | null>(null);
  // Action to fire after session.updated confirms the session is ready
  const pendingAfterSessionRef = useRef<string | null>(null); // 'greeting' | 'text:<content>'
  // Prevents concurrent connect() calls during async token fetch
  const isConnectingRef = useRef(false);
  // Mirrors status state for use in high-frequency event handlers
  const statusRef = useRef<AgentStatus>('idle');

  // ── Internal helpers ────────────────────────────────────────────

  const sendEvent = useCallback((event: object) => {
    if (dcRef.current?.readyState === 'open') {
      dcRef.current.send(JSON.stringify(event));
    }
  }, []);

  const addEntry = useCallback((role: 'user' | 'agent', text: string) => {
    setTranscript(prev => [
      ...prev,
      { id: `${Date.now()}-${Math.random()}`, role, text },
    ]);
  }, []);

  const scheduleNav = useCallback((action: () => void) => {
    pendingNavRef.current = action;
  }, []);

  // ── Server event handler ────────────────────────────────────────

  // Defined without useCallback — captured via ref below so dc.onmessage
  // always calls the latest version without stale closures.
  const handleServerEvent = (event: Record<string, unknown>) => {
    switch (event.type) {

      case 'session.updated': {
        setStatus('listening');
        break;
      }

      case 'response.audio.delta':
        if (statusRef.current !== 'speaking') setStatus('speaking');
        break;

      case 'input_audio_buffer.speech_started':
        setStatus('listening');
        break;

      case 'conversation.item.input_audio_transcription.completed': {
        const ev = event as { transcript?: string };
        if (ev.transcript?.trim()) addEntry('user', ev.transcript.trim());
        break;
      }

      case 'response.audio_transcript.done': {
        const ev = event as { transcript?: string };
        if (ev.transcript?.trim()) addEntry('agent', ev.transcript.trim());
        break;
      }

      case 'response.output_item.done': {
        const item = event as {
          item?: { type?: string; name?: string; call_id?: string; arguments?: string };
        };
        if (item.item?.type === 'function_call') {
          const { name, call_id, arguments: rawArgs } = item.item;
          try {
            const args = JSON.parse(rawArgs ?? '{}') as Record<string, string>;
            if (name === 'scroll_to_section') {
              scheduleNav(() => {
                if (pathnameRef.current !== '/') {
                  routerRef.current.push(`/#${args.section}`);
                } else {
                  document.getElementById(args.section)?.scrollIntoView({ behavior: 'smooth' });
                }
              });
            } else if (name === 'navigate_to_page') {
              scheduleNav(() => {
                routerRef.current.push(`/projects/${args.slug}`);
              });
            }
          } catch {
            // ignore parse errors
          }

          // Acknowledge function call back to model
          sendEvent({
            type: 'conversation.item.create',
            item: {
              type: 'function_call_output',
              call_id,
              output: JSON.stringify({ success: true }),
            },
          });
          // Prompt model to continue speaking after tool execution
          sendEvent({ type: 'response.create' });
        }
        break;
      }

      case 'response.done': {
        if (pendingNavRef.current) {
          const nav = pendingNavRef.current;
          pendingNavRef.current = null;
          setTimeout(nav, 1500);
        }
        // Re-enable mic after agent finishes speaking
        streamRef.current?.getTracks().forEach(t => { t.enabled = true; });
        setStatus('listening');
        break;
      }

      case 'error':
        console.error('[VoiceAgent]', event);
        break;
    }
  };

  // Keep ref in sync so dc.onmessage always uses latest version
  const handleServerEventRef = useRef(handleServerEvent);
  // Update ref on every render
  handleServerEventRef.current = handleServerEvent;

  // ── Connect ────────────────────────────────────────────────────

  const connect = useCallback(async () => {
    if (pcRef.current || isConnectingRef.current) return;
    isConnectingRef.current = true;

    setStatus('connecting');

    // 1. Get ephemeral token from our server
    const tokenRes = await fetch('/api/realtime', { method: 'POST' });
    if (!tokenRes.ok) {
      console.error('[VoiceAgent] Failed to get token');
      isConnectingRef.current = false;
      setStatus('idle');
      return;
    }
    const { client_secret } = await tokenRes.json() as { client_secret: { value: string } };
    const ephemeralKey = client_secret.value;

    // 2. Create peer connection
    const pc = new RTCPeerConnection();
    pcRef.current = pc;

    // 3. Audio output — must use createElement + appendChild for autoplay to work
    const audio = document.createElement('audio');
    audio.autoplay = true;
    document.body.appendChild(audio);
    audioRef.current = audio;
    pc.ontrack = (e) => { audio.srcObject = e.streams[0]; };

    // 4. Mic input — enabled by default
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;
    stream.getTracks().forEach(track => {
      track.enabled = true;
      pc.addTrack(track, stream);
    });
    setMicEnabled(true);

    // 5. Data channel for events
    const dc = pc.createDataChannel('oai-events');
    dcRef.current = dc;

    dc.onopen = () => {
      sendEvent({
        type: 'session.update',
        session: {
          instructions: SYSTEM_PROMPT,
          voice: 'shimmer',
          input_audio_transcription: { model: 'whisper-1', language: 'en' },
          turn_detection: {
            type: 'server_vad',
            threshold: 0.8,
            prefix_padding_ms: 300,
            silence_duration_ms: 600,
          },
          tools: TOOLS,
          tool_choice: 'auto',
          modalities: ['audio', 'text'],
        },
      });

      // Fire greeting or pending text after a short delay to let session.update settle
      setTimeout(() => {
        const pending = pendingAfterSessionRef.current;
        pendingAfterSessionRef.current = null;

        if (pending?.startsWith('text:')) {
          const text = pending.slice(5);
          sendEvent({
            type: 'conversation.item.create',
            item: { type: 'message', role: 'user', content: [{ type: 'input_text', text }] },
          });
          sendEvent({ type: 'response.create' });
        } else {
          // Mute mic during greeting to prevent echo feedback on mobile
          streamRef.current?.getTracks().forEach(t => { t.enabled = false; });
          sendEvent({
            type: 'response.create',
            response: {
              instructions: GREETING_INSTRUCTION,
              modalities: ['audio', 'text'],
            },
          });
        }
      }, 500);
    };

    dc.onmessage = (e) => {
      handleServerEventRef.current(JSON.parse(e.data as string));
    };

    // 6. SDP handshake
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    const sdpRes = await fetch(
      `https://api.openai.com/v1/realtime?model=${REALTIME_MODEL}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ephemeralKey}`,
          'Content-Type': 'application/sdp',
        },
        body: offer.sdp,
      },
    );

    if (!sdpRes.ok) {
      console.error('[VoiceAgent] SDP exchange failed');
      isConnectingRef.current = false;
      setStatus('idle');
      pcRef.current?.close();
      pcRef.current = null;
      return;
    }

    await pc.setRemoteDescription({ type: 'answer', sdp: await sdpRes.text() });
    isConnectingRef.current = false;
  }, [sendEvent]);

  // ── Public API ─────────────────────────────────────────────────

  /** Open the widget and start the session. */
  const start = useCallback(async () => {
    setIsOpen(true);
    await connect();
  }, [connect]);

  /** Disconnect the session but keep the widget open with history. */
  const stop = useCallback(() => {
    isConnectingRef.current = false;
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    dcRef.current?.close();
    dcRef.current = null;
    pcRef.current?.close();
    pcRef.current = null;
    if (audioRef.current) {
      audioRef.current.remove();
      audioRef.current = null;
    }
    setMicEnabled(false);
    setStatus('stopped');
  }, []);

  /** Stop and fully close+clear the widget. */
  const close = useCallback(() => {
    stop();
    setIsOpen(false);
    setTranscript([]);
    setStatus('idle');
  }, [stop]);

  /** Toggle push-to-talk mic. */
  const toggleMic = useCallback(() => {
    if (!streamRef.current) return;
    const tracks = streamRef.current.getTracks();
    if (micEnabled) {
      tracks.forEach(t => { t.enabled = false; });
      setMicEnabled(false);
    } else {
      sendEvent({ type: 'input_audio_buffer.clear' });
      tracks.forEach(t => { t.enabled = true; });
      setMicEnabled(true);
      setStatus('listening');
    }
  }, [micEnabled, sendEvent]);

  /** Send a text message to the agent. */
  const sendText = useCallback((text: string) => {
    if (!text.trim()) return;
    if (!pcRef.current) {
      // Not connected — connect first, then send after session.updated
      pendingAfterSessionRef.current = `text:${text}`;
      connect();
      return;
    }
    if (dcRef.current?.readyState !== 'open') return;
    addEntry('user', text);
    sendEvent({
      type: 'conversation.item.create',
      item: { type: 'message', role: 'user', content: [{ type: 'input_text', text }] },
    });
    sendEvent({ type: 'response.create' });
  }, [connect, sendEvent, addEntry]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      pcRef.current?.close();
      audioRef.current?.remove();
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  return { status, transcript, isOpen, micEnabled, start, stop, close, toggleMic, sendText };
}
