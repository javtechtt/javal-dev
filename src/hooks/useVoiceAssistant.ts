'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { VoiceState } from '@/types';
import { PORTFOLIO_CONTEXT, PROJECT_BRIEFS } from '@/lib/portfolioContext';

// ── Public types ──────────────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

export interface NavAction {
  type: 'scroll' | 'navigate';
  target: string;
}

// ── System prompt ─────────────────────────────────────────────────

function buildSystemPrompt(): string {
  const { about, contact, tech, services, stats, careerHighlights, workHistory, education } = PORTFOLIO_CONTEXT;
  const projectList = Object.entries(PROJECT_BRIEFS)
    .map(([slug, brief]) => `- ${slug.replace(/-/g, ' ')}: ${brief}`)
    .join('\n');

  return `CRITICAL LANGUAGE RULE: You MUST speak and respond in English only, at all times. Do NOT use French, Spanish, or any other language under any circumstance, unless the user explicitly requests it in that turn. If you are unsure of the language to use, default to English.

You are the AI portfolio assistant for Javal Joseph (pronounced "Juh-val") at javal.dev.

Javal is an AI Agent Developer & UI/UX Engineer with ${stats.experience} of experience — ${stats.projects} projects delivered for ${stats.clients} clients. He's based in ${contact.location} and works remotely worldwide.

## About
${about}

## Contact
Email: ${contact.email} | Website: ${contact.site} | LinkedIn: ${contact.linkedin}

## Tech Stack
Design: ${tech.design.join(', ')}
Frontend: ${tech.frontend.join(', ')}
Backend: ${tech.backend.join(', ')}
AI/ML: ${tech.ai.join(', ')}
CMS/E-commerce: ${tech.cms.join(', ')}

## Services
${services.map((s) => `- ${s.name}: ${s.detail}`).join('\n')}

## Career Highlights
${careerHighlights.map((h) => `- ${h}`).join('\n')}

## Work History
${workHistory.map((w) => `- ${w.role} at ${w.company} (${w.period}): ${w.highlights}`).join('\n')}

## Education
${education.map((e) => `- ${e}`).join('\n')}

## Projects
${projectList}

## Navigation Reference
Use scroll_to_section or navigate_to_page — ONLY the exact values listed below, never invent others.

scroll_to_section targets:
- "hero" → top of page, home, scroll to top
- "projects" → portfolio gallery, show me the work, take me to projects
- "about" → about section, about page, who is Javal, background, bio, skills
- "services" → services section, what do you offer, capabilities, what can you do
- "testimonials" → testimonials, what clients say, reviews
- "contact" → contact section, hire, reach out, get in touch, work together

navigate_to_page paths:
- /projects/baloto-visual-agent → Baloto, Baloto Visual Agent, visual agent
- /projects/lotto-voice-agent → Lotto, Lotto Voice Agent, lotto agent
- /projects/javal-dev → this portfolio, javal.dev, your own site
- /projects/cazova → CAZOVA, Caribbean Zonal, volleyball
- /projects/homeland-furnishings → Homeland Furnishings, Homeland, furniture
- /projects/utt-outreach → UTT Outreach, UTT, University of Trinidad
- /projects/javtech-ltd → Javtech, Javtech Ltd
- /projects/amcs-limited → AMCS, AMCS Limited
- /projects/the-harambee-house → Harambee, Harambee House
- /projects/ecliff-elie → Ecliff Elie, Ecliff
- /projects/a-team-band-tt → A Team Band, A Team Band TT
- /projects/javal-protoverse → ProtoVerse, Javal ProtoVerse, Figma prototype

## Your Tone & Personality
You're genuinely enthusiastic about Javal and his work — you think he's exceptional at what he does, and you're proud to represent him. When someone asks about a specific project, light up a little. Share achievements with real pride. Think: knowledgeable friend who's a huge fan, not a corporate press release.

Examples of the energy to bring:
- "Oh, that one's really cool — he built the whole thing from scratch..."
- "Honestly, the 347% sales jump at Homeland Furnishings is one of my favorite stories to tell."
- "His AI work is genuinely impressive — the Baloto Visual Agent was a full LLM integration in a live web interface."
- "You're going to love this one." / "This is a great project to look at."

## Your Rules
- "Javal" is pronounced "Juh-val" — say it naturally in conversation
- ALWAYS respond in English only, unless the user explicitly asks you to speak a different language
- Keep voice responses concise: 2–3 sentences max — punchy, not padded
- Be warm, enthusiastic, and conversational — use contractions, genuine excitement
- Never sound like a formal report or press release
- When navigating: finish speaking your response FULLY first, then call the navigation tool — never mid-sentence
- For pricing questions, suggest reaching out to Javal directly at ${contact.email}
- If asked where you are, you're on Javal's portfolio website`;
}

// ── Navigation tools (strict enums — no hallucination possible) ───

const SCROLL_TOOL = {
  type: 'function' as const,
  name: 'scroll_to_section',
  description:
    'Scroll to a section on the homepage. IMPORTANT: Only call this AFTER you have FINISHED speaking your full response.',
  parameters: {
    type: 'object',
    properties: {
      section: {
        type: 'string',
        enum: ['hero', 'projects', 'about', 'services', 'testimonials', 'contact'],
        description: 'The homepage section to scroll to.',
      },
    },
    required: ['section'],
  },
};

const NAVIGATE_TOOL = {
  type: 'function' as const,
  name: 'navigate_to_page',
  description:
    'Navigate to a project case study page. IMPORTANT: Only call this AFTER you have FINISHED speaking your full response.',
  parameters: {
    type: 'object',
    properties: {
      path: {
        type: 'string',
        enum: [
          '/projects/baloto-visual-agent',
          '/projects/lotto-voice-agent',
          '/projects/javal-dev',
          '/projects/cazova',
          '/projects/homeland-furnishings',
          '/projects/utt-outreach',
          '/projects/javtech-ltd',
          '/projects/amcs-limited',
          '/projects/the-harambee-house',
          '/projects/ecliff-elie',
          '/projects/a-team-band-tt',
          '/projects/javal-protoverse',
        ],
        description: 'The exact case study path to navigate to.',
      },
    },
    required: ['path'],
  },
};

// ── Hook ──────────────────────────────────────────────────────────

export function useVoiceAssistant() {
  const router = useRouter();
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const pendingNavRef = useRef<NavAction | null>(null);
  const partialAssistantRef = useRef('');
  const pendingTextRef = useRef<string | null>(null);

  // ── Execute navigation ──
  const executeAction = useCallback(
    (action: NavAction) => {
      if (action.type === 'scroll') {
        const el = document.getElementById(action.target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else router.push(`/#${action.target}`);
      } else {
        router.push(action.target);
      }
    },
    [router]
  );

  // ── Send event via data channel ──
  const sendEvent = useCallback((event: object) => {
    if (dcRef.current?.readyState === 'open') {
      dcRef.current.send(JSON.stringify(event));
    }
  }, []);

  // ── Handle incoming realtime events ──
  const handleEvent = useCallback(
    (raw: string) => {
      let event: { type: string; [key: string]: unknown };
      try {
        event = JSON.parse(raw);
      } catch {
        return;
      }

      switch (event.type) {
        // User started speaking
        case 'input_audio_buffer.speech_started':
          setVoiceState('listening');
          setTranscript('');
          break;

        // User stopped speaking — API is processing
        case 'input_audio_buffer.speech_stopped':
          setVoiceState('thinking');
          break;

        // User's audio transcription ready — add to chat
        case 'conversation.item.input_audio_transcription.completed': {
          const userText = String(event.transcript ?? '').trim();
          if (userText) {
            setChatHistory((prev) => [...prev, { role: 'user', text: userText }]);
          }
          break;
        }

        // Assistant response audio starts streaming
        case 'response.audio.delta':
          setVoiceState('speaking');
          break;

        // Assistant transcript streaming — accumulate
        case 'response.audio_transcript.delta': {
          const delta = String(event.delta ?? '');
          partialAssistantRef.current += delta;
          break;
        }

        // Assistant turn complete — add full text to chat
        case 'response.audio_transcript.done': {
          const text = String(
            event.transcript ?? partialAssistantRef.current
          ).trim();
          if (text) {
            setChatHistory((prev) => [...prev, { role: 'assistant', text }]);
          }
          partialAssistantRef.current = '';
          setTranscript('');
          break;
        }

        // Text response (for text-only input)
        case 'response.output_item.done': {
          const item = event.item as { type?: string; content?: Array<{ type: string; text?: string }> } | undefined;
          if (item?.type === 'message' && item.content) {
            const textBlock = item.content.find((c) => c.type === 'text');
            if (textBlock?.text) {
              setChatHistory((prev) => {
                // Avoid duplicate if audio transcript already added it
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant' && last.text === textBlock.text) return prev;
                return [...prev, { role: 'assistant', text: textBlock.text! }];
              });
            }
          }
          break;
        }

        // Navigation tools called — queue action, acknowledge, continue
        case 'response.function_call_arguments.done': {
          const toolName = String(event.name);
          try {
            const args = JSON.parse(String(event.arguments ?? '{}')) as Record<string, string>;
            if (toolName === 'scroll_to_section' && args.section) {
              pendingNavRef.current = { type: 'scroll', target: args.section };
            } else if (toolName === 'navigate_to_page' && args.path) {
              pendingNavRef.current = { type: 'navigate', target: args.path };
            }
          } catch {
            /* ignore */
          }
          if (toolName === 'scroll_to_section' || toolName === 'navigate_to_page') {
            sendEvent({
              type: 'conversation.item.create',
              item: {
                type: 'function_call_output',
                call_id: event.call_id,
                output: 'Navigation queued — will execute after speaking.',
              },
            });
            sendEvent({ type: 'response.create' });
          }
          break;
        }

        // Response fully done — fire navigation if queued
        case 'response.done':
          setVoiceState('idle');
          if (pendingNavRef.current) {
            const nav = pendingNavRef.current;
            pendingNavRef.current = null;
            executeAction(nav);
          }
          break;

        case 'error':
          console.error('[OpenAI Realtime]', event);
          setVoiceState('idle');
          break;
      }
    },
    [executeAction, sendEvent]
  );

  // ── Disconnect ──
  const disconnect = useCallback(() => {
    pcRef.current?.close();
    pcRef.current = null;
    dcRef.current = null;
    if (audioElRef.current) {
      audioElRef.current.srcObject = null;
      audioElRef.current = null;
    }
  }, []);

  // ── Connect to OpenAI Realtime via WebRTC ──
  const connect = useCallback(async () => {
    if (pcRef.current) return; // already connected

    // 1. Get ephemeral token from our API route
    let ephemeralKey: string;
    try {
      const res = await fetch('/api/realtime', { method: 'POST' });
      const data = await res.json() as { error?: string; client_secret?: { value: string } };
      if (data.error || !data.client_secret?.value) {
        setChatHistory((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: data.error
              ? `Voice unavailable: ${data.error}`
              : 'Could not start voice. Make sure OPENAI_API_KEY is set in .env.local.',
          },
        ]);
        return;
      }
      ephemeralKey = data.client_secret.value;
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', text: 'Network error. Could not reach voice service.' },
      ]);
      return;
    }

    // 2. Set up WebRTC peer connection
    const pc = new RTCPeerConnection();
    pcRef.current = pc;

    // 3. Route remote audio to an audio element
    const audioEl = new Audio();
    audioEl.autoplay = true;
    audioElRef.current = audioEl;
    pc.ontrack = (e) => {
      if (e.streams[0]) audioEl.srcObject = e.streams[0];
    };

    // 4. Add microphone track
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => pc.addTrack(t, stream));
    } catch {
      setChatHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Microphone access denied. Please allow mic permissions and try again.',
        },
      ]);
      pc.close();
      pcRef.current = null;
      return;
    }

    // 5. Create data channel for events
    const dc = pc.createDataChannel('oai-events');
    dcRef.current = dc;

    dc.onmessage = (e) => handleEvent(e.data as string);

    dc.onopen = () => {
      // Configure session
      dc.send(
        JSON.stringify({
          type: 'session.update',
          session: {
            modalities: ['audio', 'text'],
            instructions: buildSystemPrompt(),
            voice: 'alloy',
            input_audio_transcription: { model: 'whisper-1', language: 'en' },
            turn_detection: {
              type: 'server_vad',
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 800,
            },
            tools: [SCROLL_TOOL, NAVIGATE_TOOL],
            tool_choice: 'auto',
          },
        })
      );

      if (pendingTextRef.current) {
        // Text was queued before connection — send it now
        const text = pendingTextRef.current;
        pendingTextRef.current = null;
        dc.send(
          JSON.stringify({
            type: 'conversation.item.create',
            item: {
              type: 'message',
              role: 'user',
              content: [{ type: 'input_text', text }],
            },
          })
        );
        dc.send(JSON.stringify({ type: 'response.create' }));
      } else {
        // Voice activation — have GPT-4o greet the user
        dc.send(
          JSON.stringify({
            type: 'response.create',
            response: {
              instructions:
                "Respond in English only. Greet the user warmly and briefly in 1–2 sentences. Tell them they can ask about Javal's work or say where they'd like to go. IMPORTANT: Do NOT call navigate_to or any other function. Just speak the greeting.",
            },
          })
        );
      }
    };

    // 6. SDP exchange
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    try {
      const sdpRes = await fetch(
        'https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${ephemeralKey}`,
            'Content-Type': 'application/sdp',
          },
          body: offer.sdp,
        }
      );

      if (!sdpRes.ok) {
        setChatHistory((prev) => [
          ...prev,
          { role: 'assistant', text: 'Failed to connect to OpenAI Realtime. Check your API key.' },
        ]);
        pc.close();
        pcRef.current = null;
        return;
      }

      await pc.setRemoteDescription({ type: 'answer', sdp: await sdpRes.text() });
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', text: 'Connection to voice service failed. Please try again.' },
      ]);
      pc.close();
      pcRef.current = null;
    }
  }, [handleEvent]);

  // ── Public API ──

  // With server VAD, the mic is always on — this is used to reconnect if dropped
  const startListening = useCallback(() => {
    if (!pcRef.current) connect();
  }, [connect]);

  // Cancel current voice input
  const stopListening = useCallback(() => {
    sendEvent({ type: 'input_audio_buffer.clear' });
    setVoiceState('idle');
  }, [sendEvent]);

  // Send a text message
  const sendText = useCallback(
    (text: string) => {
      if (!isOpen) setIsOpen(true);
      setChatHistory((prev) => [...prev, { role: 'user', text }]);
      setVoiceState('thinking');

      if (!pcRef.current || dcRef.current?.readyState !== 'open') {
        // Not connected yet — queue and connect
        pendingTextRef.current = text;
        connect();
        return;
      }

      sendEvent({
        type: 'conversation.item.create',
        item: {
          type: 'message',
          role: 'user',
          content: [{ type: 'input_text', text }],
        },
      });
      sendEvent({ type: 'response.create' });
    },
    [isOpen, connect, sendEvent]
  );

  // Open the panel
  const open = useCallback(async () => {
    setIsOpen(true);
    if (!pcRef.current) await connect();
  }, [connect]);

  // Open the panel and connect (invitation mic tap)
  const activate = useCallback(async () => {
    setIsOpen(true);
    if (!pcRef.current) await connect();
  }, [connect]);

  // Close and fully disconnect
  const close = useCallback(() => {
    disconnect();
    setIsOpen(false);
    setVoiceState('idle');
    setTranscript('');
    setChatHistory([]);
  }, [disconnect]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    voiceState,
    transcript,
    chatHistory,
    isOpen,
    startListening,
    stopListening,
    sendText,
    open,
    activate,
    close,
  };
}
