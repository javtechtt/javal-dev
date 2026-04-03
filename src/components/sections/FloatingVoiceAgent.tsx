'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Square, X, Send, Bot, Minus, MessageCircle } from 'lucide-react';
import { useVoiceAgentContext } from '@/context/VoiceAgentContext';
import type { AgentStatus } from '@/hooks/useVoiceAgent';

// ── Status label + colour map ──────────────────────────────────────

const STATUS_LABEL: Record<AgentStatus, string> = {
  idle: 'Ready',
  connecting: 'Connecting…',
  listening: 'Listening',
  speaking: 'Speaking',
  stopped: 'Session ended',
};

const STATUS_COLOR: Record<AgentStatus, string> = {
  idle: '#94a3b8',
  connecting: '#f59e0b',
  listening: '#22d3ee',
  speaking: '#8b5cf6',
  stopped: '#4b5563',
};

// ── Component ──────────────────────────────────────────────────────

export default function FloatingVoiceAgent() {
  const { status, transcript, isOpen, micEnabled, stop, close, toggleMic, sendText } =
    useVoiceAgentContext();

  const [minimized, setMinimized] = useState(false);
  const [inputText, setInputText] = useState('');
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll transcript to bottom
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendText(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClose = () => {
    setMinimized(false);
    close();
  };

  const isActive = status !== 'idle' && status !== 'stopped';
  const statusColor = STATUS_COLOR[status];

  if (!isOpen) return null;

  // ── Minimized: floating orb ────────────────────────────────────
  if (minimized) {
    return (
      <motion.button
        key="floating-orb"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        onClick={() => setMinimized(false)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer group"
        style={{
          background: 'rgba(13, 13, 26, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${isActive ? 'rgba(34,211,238,0.3)' : 'rgba(255,255,255,0.1)'}`,
          boxShadow: isActive
            ? '0 4px 24px rgba(0,0,0,0.4), 0 0 16px rgba(34,211,238,0.15)'
            : '0 4px 24px rgba(0,0,0,0.4)',
        }}
        title="Open assistant"
      >
        {/* Pulse ring when active */}
        {isActive && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: statusColor }}
          />
        )}
        <MessageCircle size={18} className="text-cyan-400 group-hover:scale-110 transition-transform" />
        {/* Status dot */}
        <span
          className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
          style={{
            background: statusColor,
            borderColor: 'rgba(13, 13, 26, 0.92)',
          }}
        />
      </motion.button>
    );
  }

  // ── Expanded: full panel ───────────────────────────────────────
  return (
    <AnimatePresence>
      <motion.div
        key="floating-agent"
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 340, damping: 30 }}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[340px] flex flex-col max-h-[70vh]"
        style={{
          background: 'rgba(13, 13, 26, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '16px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,211,238,0.06)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
          <div className="flex items-center gap-2.5">
            {/* Animated status dot */}
            <span className="relative flex h-2 w-2">
              {isActive && (
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                  style={{ background: statusColor }}
                />
              )}
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: statusColor }}
              />
            </span>

            <div className="flex items-center gap-1.5">
              <Bot size={13} className="text-cyan-400" />
              <span className="text-xs font-semibold text-white/80 tracking-wide">
                Portfolio Assistant
              </span>
            </div>

            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
              style={{
                color: statusColor,
                background: `${statusColor}18`,
                border: `1px solid ${statusColor}30`,
              }}
            >
              {STATUS_LABEL[status]}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Stop button — ends session, keeps panel open */}
            {isActive && (
              <button
                onClick={stop}
                title="End session"
                className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
              >
                <Square size={13} />
              </button>
            )}
            {/* Minimize button */}
            <button
              onClick={() => setMinimized(true)}
              title="Minimize"
              className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Minus size={13} />
            </button>
            {/* Close button — clears everything */}
            <button
              onClick={handleClose}
              title="Close"
              className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Transcript */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 max-h-[260px] min-h-[80px]">
          {transcript.length === 0 ? (
            <p className="text-xs text-slate-600 text-center mt-4 select-none">
              {status === 'connecting' ? 'Starting up…' : 'Waiting for response…'}
            </p>
          ) : (
            transcript.map(entry => (
              <div
                key={entry.id}
                className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <span
                  className="text-xs leading-relaxed px-3 py-2 rounded-xl max-w-[82%]"
                  style={
                    entry.role === 'agent'
                      ? {
                          background: 'rgba(34,211,238,0.07)',
                          border: '1px solid rgba(34,211,238,0.12)',
                          color: '#e2e8f0',
                        }
                      : {
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          color: '#94a3b8',
                        }
                  }
                >
                  {entry.text}
                </span>
              </div>
            ))
          )}
          <div ref={transcriptEndRef} />
        </div>

        {/* Controls */}
        <div className="px-4 py-3 border-t border-white/[0.05] flex items-center gap-2">
          {/* Mic button */}
          <button
            onClick={toggleMic}
            disabled={!isActive}
            title={micEnabled ? 'Mute mic' : 'Speak'}
            className="relative flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: micEnabled
                ? 'rgba(34,211,238,0.15)'
                : 'rgba(255,255,255,0.05)',
              border: micEnabled
                ? '1px solid rgba(34,211,238,0.4)'
                : '1px solid rgba(255,255,255,0.08)',
              color: micEnabled ? '#22d3ee' : '#64748b',
              boxShadow: micEnabled ? '0 0 12px rgba(34,211,238,0.2)' : 'none',
            }}
          >
            {/* Pulse ring while mic is on */}
            {micEnabled && (
              <span
                className="absolute inset-0 rounded-xl animate-ping opacity-30"
                style={{ background: 'rgba(34,211,238,0.3)' }}
              />
            )}
            {micEnabled ? <Mic size={15} /> : <MicOff size={15} />}
          </button>

          {/* Text input */}
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            disabled={!isActive}
            className="flex-1 bg-transparent text-xs text-white/80 placeholder-slate-600 outline-none disabled:opacity-30"
          />

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!isActive || !inputText.trim()}
            title="Send"
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: inputText.trim() ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.04)',
              border: inputText.trim()
                ? '1px solid rgba(34,211,238,0.35)'
                : '1px solid rgba(255,255,255,0.07)',
              color: inputText.trim() ? '#22d3ee' : '#4b5563',
            }}
          >
            <Send size={13} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
