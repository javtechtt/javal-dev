'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, X, Send, Sparkles } from 'lucide-react';
import { useVoiceAssistantContext } from '@/context/VoiceAssistantContext';
import { cn } from '@/lib/utils';

const BAR_HEIGHTS = [6, 14, 20, 28, 22, 16, 24, 18, 26, 12, 20, 16, 28, 14, 22, 10, 18, 24, 16, 12];

function ListeningWave() {
  return (
    <div className="flex items-center justify-center gap-[3px] h-6">
      {BAR_HEIGHTS.slice(0, 12).map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-red-500 to-red-300"
          animate={{ height: [3, h * 0.7, 3] }}
          transition={{ duration: 0.5 + (i % 4) * 0.1, repeat: Infinity, delay: i * 0.04, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function SpeakingWave() {
  return (
    <div className="flex items-center gap-[3px]">
      {[8, 14, 18, 14, 8].map((h, i) => (
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

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2 bg-white/[0.05] rounded-2xl rounded-bl-md border border-white/[0.06] w-fit">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-slate-400"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

const STATUS: Record<string, { label: string; color: string }> = {
  idle:      { label: 'Ready',       color: 'bg-emerald-400' },
  listening: { label: 'Listening...', color: 'bg-red-400 animate-pulse' },
  thinking:  { label: 'Thinking...',  color: 'bg-amber-400 animate-pulse' },
  speaking:  { label: 'Speaking...',  color: 'bg-cyan-400 animate-pulse' },
};

const QUICK_PROMPTS = ['Show me AI projects', 'Tell me about Javal', 'Open CAZOVA'];

export default function FloatingVoiceAssistant() {
  const pathname = usePathname();
  const {
    voiceState, transcript, chatHistory, isOpen,
    startListening, stopListening, sendText, activate, close,
  } = useVoiceAssistantContext();

  const [inputText, setInputText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Only render on non-home pages
  if (pathname === '/') return null;

  const isListening = voiceState === 'listening';
  const isThinking  = voiceState === 'thinking';
  const isSpeaking  = voiceState === 'speaking';

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    setInputText('');
    sendText(text);
  };

  const toggleMic = () => (isListening ? stopListening() : startListening());

  return (
    <div className="fixed bottom-20 right-4 z-50 w-80">
      <AnimatePresence mode="wait">

        {/* Floating mic button (closed state) */}
        {!isOpen && (
          <motion.div
            key="float-closed"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.25 }}
            className="flex justify-end"
          >
            <div className="relative">
              {/* Breathing ring */}
              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.12, 0.25, 0.12] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-cyan-400 pointer-events-none"
              />
              <motion.button
                onClick={activate}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-shadow duration-300"
                aria-label="Open AI assistant"
              >
                <Sparkles size={20} className="text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Conversation panel (open state) */}
        {isOpen && (
          <motion.div
            key="float-open"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.04) 0%, transparent 60%), #0d0d1a',
              boxShadow: '0 0 0 1px rgba(34,211,238,0.12), 0 0 60px rgba(34,211,238,0.07), 0 20px 50px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.05]">
              <div className="relative shrink-0">
                <div className={cn(
                  'w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center',
                  (isListening || isSpeaking) && 'shadow-lg shadow-cyan-500/40'
                )}>
                  <Sparkles size={14} className="text-white" />
                </div>
                <span className={cn(
                  'absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0d0d1a]',
                  STATUS[voiceState]?.color ?? 'bg-emerald-400'
                )} />
              </div>
              <div className="flex-1">
                <p className="text-white text-xs font-semibold leading-none mb-0.5">AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  {isSpeaking && <SpeakingWave />}
                  <p className="text-[11px] text-slate-500">{STATUS[voiceState]?.label ?? 'Ready'}</p>
                </div>
              </div>
              <button
                onClick={close}
                className="p-1 rounded-lg text-slate-600 hover:text-white hover:bg-white/[0.06] transition-all"
                aria-label="Close assistant"
              >
                <X size={14} />
              </button>
            </div>

            {/* Listening waveform */}
            <AnimatePresence>
              {isListening && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 py-2 flex items-center gap-2 bg-red-500/[0.04] border-b border-red-500/[0.08]"
                >
                  <ListeningWave />
                  {transcript && (
                    <span className="text-[11px] text-slate-400 italic truncate">&ldquo;{transcript}&rdquo;</span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat messages */}
            <div className="h-48 overflow-y-auto px-4 py-3 space-y-2.5">
              {chatHistory.length === 0 && !isThinking && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-slate-600 text-xs">Ask me anything about Javal...</p>
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div className={cn(
                    'max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-[3px]'
                      : 'bg-white/[0.05] text-slate-200 rounded-bl-[3px] border border-white/[0.06]'
                  )}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isThinking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <ThinkingDots />
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick prompts */}
            <div className="px-4 pb-2 flex flex-wrap gap-1 border-t border-white/[0.04] pt-2">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => sendText(p)}
                  disabled={isThinking || isListening}
                  className="px-2 py-0.5 rounded-full border border-white/[0.07] bg-white/[0.03] text-[11px] text-slate-500 hover:text-white hover:border-cyan-500/25 transition-all disabled:opacity-40"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input bar */}
            <div className="px-4 pb-4 flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.07] bg-white/[0.03] focus-within:border-cyan-500/30 transition-colors">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-xs text-white placeholder-slate-600 outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="text-slate-600 hover:text-cyan-400 disabled:opacity-30 transition-colors"
                >
                  <Send size={12} />
                </button>
              </div>
              <motion.button
                onClick={toggleMic}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                disabled={isThinking}
                className={cn(
                  'relative w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0 disabled:opacity-40',
                  isListening
                    ? 'bg-red-500 shadow-lg shadow-red-500/35'
                    : 'bg-gradient-to-br from-cyan-500/80 to-blue-600/80 shadow-lg shadow-cyan-500/20'
                )}
                aria-label={isListening ? 'Stop' : 'Speak'}
              >
                {isListening ? <MicOff size={14} className="text-white" /> : <Mic size={14} className="text-white" />}
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
