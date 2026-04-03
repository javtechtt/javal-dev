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

// Browser audio processing — critical for mobile echo prevention
const AUDIO_CONSTRAINTS: MediaTrackConstraints = {
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,
};

// ── Hook ──────────────────────────────────────────────────────────

export function useVoiceAgent() {
  const router = useRouter();
  const pathname = usePathname();

  const [status, setStatus] = useState<AgentStatus>('idle');
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);

  // Stable refs for use inside event handlers (avoids stale closures)
  const routerRef = useRef(router);
  const pathnameRef = useRef(pathname);
  const statusRef = useRef<AgentStatus>('idle');
  useEffect(() => { routerRef.current = router; }, [router]);
  useEffect(() => { pathnameRef.current = pathname; }, [pathname]);
  useEffect(() => { statusRef.current = status; }, [status]);

  // WebRTC refs
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // State guards
  const isConnectingRef = useRef(false);
  const isGreetingRef = useRef(false);
  const userMutedRef = useRef(false); // tracks intentional user mute vs system mute
  const pendingNavRef = useRef<(() => void) | null>(null);
  const pendingTextRef = useRef<string | null>(null);

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

  const setMicTracks = useCallback((enabled: boolean) => {
    streamRef.current?.getTracks().forEach(t => { t.enabled = enabled; });
    setMicEnabled(enabled);
  }, []);

  // ── Server event handler ────────────────────────────────────────

  const handleServerEvent = (event: Record<string, unknown>) => {
    switch (event.type) {

      case 'session.updated':
        break;

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
              pendingNavRef.current = () => {
                if (pathnameRef.current !== '/') {
                  routerRef.current.push(`/#${args.section}`);
                } else {
                  document.getElementById(args.section)?.scrollIntoView({ behavior: 'smooth' });
                }
              };
            } else if (name === 'navigate_to_page') {
              pendingNavRef.current = () => {
                routerRef.current.push(`/projects/${args.slug}`);
              };
            }
          } catch {
            // ignore parse errors
          }

          sendEvent({
            type: 'conversation.item.create',
            item: {
              type: 'function_call_output',
              call_id,
              output: JSON.stringify({ success: true }),
            },
          });
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

        if (isGreetingRef.current) {
          isGreetingRef.current = false;
          // Wait 5s for audio buffer to fully drain, then enable VAD + unmute mic
          setTimeout(() => {
            sendEvent({
              type: 'session.update',
              session: {
                turn_detection: {
                  type: 'server_vad',
                  threshold: 0.8,
                  prefix_padding_ms: 300,
                  silence_duration_ms: 600,
                },
              },
            });
            if (!userMutedRef.current) {
              setMicTracks(true);
            }
            setStatus('listening');
          }, 5000);
        } else {
          setStatus('listening');
        }
        break;
      }

      case 'error':
        console.error('[VoiceAgent]', event);
        break;
    }
  };

  const handleServerEventRef = useRef(handleServerEvent);
  handleServerEventRef.current = handleServerEvent;

  // ── Connect ────────────────────────────────────────────────────

  const connect = useCallback(async () => {
    if (pcRef.current || isConnectingRef.current) return;
    isConnectingRef.current = true;

    setStatus('connecting');

    try {
      // 1. Ephemeral token
      const tokenRes = await fetch('/api/realtime', { method: 'POST' });
      if (!tokenRes.ok) {
        console.error('[VoiceAgent] Token fetch failed:', tokenRes.status);
        setStatus('idle');
        return;
      }
      const { client_secret } = await tokenRes.json() as { client_secret: { value: string } };

      // 2. Peer connection
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // 3. Audio output
      const audio = document.createElement('audio');
      audio.autoplay = true;
      document.body.appendChild(audio);
      audioRef.current = audio;
      pc.ontrack = (e) => { audio.srcObject = e.streams[0]; };

      // 4. Mic input — starts muted, unmutes after greeting via response.done
      const stream = await navigator.mediaDevices.getUserMedia({ audio: AUDIO_CONSTRAINTS });
      streamRef.current = stream;
      stream.getTracks().forEach(track => {
        track.enabled = false;
        pc.addTrack(track, stream);
      });
      setMicEnabled(false);

      // 5. Data channel
      const dc = pc.createDataChannel('oai-events');
      dcRef.current = dc;

      dc.onopen = () => {
        // Configure session with turn detection OFF during greeting
        sendEvent({
          type: 'session.update',
          session: {
            instructions: SYSTEM_PROMPT,
            voice: 'shimmer',
            input_audio_transcription: { model: 'whisper-1', language: 'en' },
            turn_detection: null, // disabled until greeting finishes
            tools: TOOLS,
            tool_choice: 'auto',
            modalities: ['audio', 'text'],
          },
        });

        // Fire greeting or pending text
        const pending = pendingTextRef.current;
        pendingTextRef.current = null;

        if (pending) {
          addEntry('user', pending);
          sendEvent({
            type: 'conversation.item.create',
            item: { type: 'message', role: 'user', content: [{ type: 'input_text', text: pending }] },
          });
          sendEvent({ type: 'response.create' });
        } else {
          isGreetingRef.current = true;
          sendEvent({
            type: 'response.create',
            response: {
              instructions: GREETING_INSTRUCTION,
              modalities: ['audio', 'text'],
            },
          });
        }
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
            Authorization: `Bearer ${client_secret.value}`,
            'Content-Type': 'application/sdp',
          },
          body: offer.sdp,
        },
      );

      if (!sdpRes.ok) {
        console.error('[VoiceAgent] SDP exchange failed:', sdpRes.status);
        pc.close();
        pcRef.current = null;
        setStatus('idle');
        return;
      }

      await pc.setRemoteDescription({ type: 'answer', sdp: await sdpRes.text() });
    } catch (err) {
      console.error('[VoiceAgent] Connection error:', err);
      pcRef.current?.close();
      pcRef.current = null;
      dcRef.current = null;
      streamRef.current?.getTracks().forEach(t => t.stop());
      streamRef.current = null;
      audioRef.current?.remove();
      audioRef.current = null;
      setStatus('idle');
    } finally {
      isConnectingRef.current = false;
    }
  }, [sendEvent]);

  // ── Public API ─────────────────────────────────────────────────

  const start = useCallback(async () => {
    setIsOpen(true);
    await connect();
  }, [connect]);

  const stop = useCallback(() => {
    isConnectingRef.current = false;
    isGreetingRef.current = false;
    userMutedRef.current = false;
    pendingNavRef.current = null;
    pendingTextRef.current = null;
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

  const close = useCallback(() => {
    stop();
    setIsOpen(false);
    setTranscript([]);
    setStatus('idle');
  }, [stop]);

  const toggleMic = useCallback(() => {
    if (!streamRef.current) return;
    if (micEnabled) {
      setMicTracks(false);
      userMutedRef.current = true;
    } else {
      sendEvent({ type: 'input_audio_buffer.clear' });
      setMicTracks(true);
      userMutedRef.current = false;
      setStatus('listening');
    }
  }, [micEnabled, sendEvent, setMicTracks]);

  const sendText = useCallback((text: string) => {
    if (!text.trim()) return;
    if (!pcRef.current) {
      pendingTextRef.current = text;
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
