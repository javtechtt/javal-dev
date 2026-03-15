'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, X, Send, Sparkles } from 'lucide-react';
import { useVoiceAssistantContext } from '@/context/VoiceAssistantContext';
import { cn } from '@/lib/utils';

const QUICK_PROMPTS = [
  'Show me AI projects',
  'Tell me about Javal',
  'What platforms do you build on?',
  'Open CAZOVA',
];

// ── Waveform bars (listening) ─────────────────────────────────────
const BAR_HEIGHTS = [6, 14, 20, 28, 22, 16, 24, 18, 26, 12, 20, 16, 28, 14, 22, 10, 18, 24, 16, 12];

function ListeningWave() {
  return (
    <div className="flex items-center justify-center gap-[3px] h-8">
      {BAR_HEIGHTS.map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-red-500 to-red-300"
          animate={{ height: [4, h, 4] }}
          transition={{
            duration: 0.5 + (i % 4) * 0.1,
            repeat: Infinity,
            delay: i * 0.04,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ── Speaking wave (subtle) ────────────────────────────────────────
function SpeakingWave() {
  return (
    <div className="flex items-center gap-[3px]">
      {[10, 16, 22, 16, 10].map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-cyan-400"
          animate={{ height: [3, h, 3] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ── Thinking dots ─────────────────────────────────────────────────
function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 px-3.5 py-2.5 bg-white/[0.05] rounded-2xl rounded-bl-md border border-white/[0.06] w-fit">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-slate-400"
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ── Status label ──────────────────────────────────────────────────
const STATUS: Record<string, { label: string; color: string }> = {
  idle: { label: 'Ready', color: 'bg-emerald-400' },
  listening: { label: 'Listening...', color: 'bg-red-400 animate-pulse' },
  thinking: { label: 'Thinking...', color: 'bg-amber-400 animate-pulse' },
  speaking: { label: 'Speaking...', color: 'bg-cyan-400 animate-pulse' },
};

// ── Main component ────────────────────────────────────────────────

export default function VoiceAssistant() {
  const {
    voiceState,
    transcript,
    chatHistory,
    isOpen,
    startListening,
    stopListening,
    sendText,
    activate,
    close,
  } = useVoiceAssistantContext();

  const [inputText, setInputText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isListening = voiceState === 'listening';
  const isThinking = voiceState === 'thinking';
  const isSpeaking = voiceState === 'speaking';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    setInputText('');
    sendText(text);
  };

  const handleQuickPrompt = (prompt: string) => sendText(prompt);

  const toggleMic = () => (isListening ? stopListening() : startListening());

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">

        {/* ── Invitation state ── */}
        {!isOpen && (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.05) 0%, transparent 65%), #0d0d1a',
              boxShadow: '0 0 0 1px rgba(34,211,238,0.12), 0 0 80px rgba(34,211,238,0.07), 0 24px 60px rgba(0,0,0,0.55)',
            }}
          >
            {/* Top badge */}
            <div className="flex items-center justify-center pt-7 pb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/[0.07] text-cyan-400 text-[11px] font-semibold uppercase tracking-widest">
                <Sparkles size={10} />
                AI Portfolio Assistant
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* Tagline */}
            <p className="text-center text-slate-500 text-sm px-6 mt-1">
              Ask me about Javal&apos;s work, or tell me where to take you.
            </p>

            {/* Mic orb */}
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <div className="relative flex items-center justify-center">
                {/* Outer breathing ring */}
                <motion.div
                  animate={{ scale: [1, 1.22, 1], opacity: [0.08, 0.18, 0.08] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute w-36 h-36 rounded-full bg-cyan-400"
                />
                {/* Middle ring */}
                <motion.div
                  animate={{ scale: [1, 1.14, 1], opacity: [0.12, 0.25, 0.12] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  className="absolute w-28 h-28 rounded-full bg-cyan-400"
                />
                {/* Inner ring */}
                <motion.div
                  animate={{ scale: [1, 1.06, 1], opacity: [0.18, 0.35, 0.18] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                  className="absolute w-20 h-20 rounded-full bg-cyan-500"
                />
                {/* Core button */}
                <motion.button
                  onClick={activate}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-shadow duration-300"
                  aria-label="Activate AI assistant"
                >
                  <Mic size={26} className="text-white" />
                </motion.button>
              </div>

              <p className="text-white/70 text-xs font-medium tracking-wide uppercase">
                Tap mic to speak
              </p>
            </div>

            {/* Quick prompts */}
            <div className="px-6 pb-4 flex flex-wrap justify-center gap-2">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="px-3 py-1.5 rounded-full border border-white/[0.09] bg-white/[0.04] text-xs text-slate-400 hover:text-white hover:border-cyan-500/30 hover:bg-cyan-500/[0.07] transition-all duration-200"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 px-6 pb-4">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-slate-600 text-xs">or type</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            {/* Text input */}
            <div className="px-6 pb-6 flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] focus-within:border-cyan-500/30 transition-colors duration-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="text-slate-600 hover:text-cyan-400 disabled:opacity-30 transition-colors duration-200"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Conversation state ── */}
        {isOpen && (
          <motion.div
            key="conversation"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.04) 0%, transparent 60%), #0d0d1a',
              boxShadow: '0 0 0 1px rgba(34,211,238,0.12), 0 0 80px rgba(34,211,238,0.07), 0 24px 60px rgba(0,0,0,0.55)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.05]">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className={cn(
                    'w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg transition-shadow duration-300',
                    (isListening || isSpeaking) && 'shadow-cyan-500/40'
                  )}
                >
                  <Sparkles size={16} className="text-white" />
                </div>
                <span
                  className={cn(
                    'absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0d0d1a] transition-colors duration-300',
                    STATUS[voiceState]?.color ?? 'bg-emerald-400'
                  )}
                />
              </div>

              <div className="flex-1">
                <p className="text-white text-sm font-semibold leading-none mb-1">AI Portfolio Assistant</p>
                <div className="flex items-center gap-1.5">
                  {isSpeaking && <SpeakingWave />}
                  <p className="text-xs text-slate-500">{STATUS[voiceState]?.label ?? 'Ready'}</p>
                </div>
              </div>

              <button
                onClick={close}
                className="p-1.5 rounded-lg text-slate-600 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                aria-label="Close assistant"
              >
                <X size={15} />
              </button>
            </div>

            {/* Listening waveform */}
            <AnimatePresence>
              {isListening && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 py-3 flex items-center justify-center gap-3 bg-red-500/[0.04] border-b border-red-500/[0.08]"
                >
                  <ListeningWave />
                  {transcript && (
                    <span className="text-xs text-slate-400 italic truncate max-w-[200px]">
                      &ldquo;{transcript}&rdquo;
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat messages */}
            <div className="h-56 overflow-y-auto px-5 py-4 space-y-3">
              {chatHistory.length === 0 && !isThinking && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-slate-600 text-sm">Listening for your question...</p>
                </div>
              )}

              {chatHistory.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-[4px]'
                        : 'bg-white/[0.05] text-slate-200 rounded-bl-[4px] border border-white/[0.06]'
                    )}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <ThinkingDots />
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick prompts */}
            <div className="px-5 pb-3 flex flex-wrap gap-1.5 border-t border-white/[0.04] pt-3">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleQuickPrompt(prompt)}
                  disabled={isThinking || isListening}
                  className="px-2.5 py-1 rounded-full border border-white/[0.07] bg-white/[0.03] text-xs text-slate-500 hover:text-white hover:border-cyan-500/25 hover:bg-cyan-500/[0.06] transition-all duration-200 disabled:opacity-40"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input bar */}
            <div className="px-5 pb-5 flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] focus-within:border-cyan-500/30 transition-colors duration-200">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="text-slate-600 hover:text-cyan-400 disabled:opacity-30 transition-colors duration-200"
                >
                  <Send size={14} />
                </button>
              </div>

              {/* Mic button — primary voice action */}
              <motion.button
                onClick={toggleMic}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                disabled={isThinking}
                className={cn(
                  'relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 disabled:opacity-40',
                  isListening
                    ? 'bg-red-500 shadow-lg shadow-red-500/35'
                    : 'bg-gradient-to-br from-cyan-500/80 to-blue-600/80 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35'
                )}
                aria-label={isListening ? 'Stop listening' : 'Start voice input'}
              >
                {isListening ? (
                  <MicOff size={16} className="text-white" />
                ) : (
                  <Mic size={16} className="text-white" />
                )}
                {/* Pulse ring when listening */}
                {isListening && (
                  <motion.span
                    className="absolute inset-0 rounded-xl border-2 border-red-400"
                    animate={{ scale: [1, 1.3], opacity: [0.8, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                  />
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
