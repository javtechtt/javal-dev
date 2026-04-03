'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useVoiceAgent } from '@/hooks/useVoiceAgent';

type VoiceAgentContextValue = ReturnType<typeof useVoiceAgent>;

const VoiceAgentContext = createContext<VoiceAgentContextValue | null>(null);

export function VoiceAgentProvider({ children }: { children: ReactNode }) {
  const agent = useVoiceAgent();
  return (
    <VoiceAgentContext.Provider value={agent}>
      {children}
    </VoiceAgentContext.Provider>
  );
}

export function useVoiceAgentContext(): VoiceAgentContextValue {
  const ctx = useContext(VoiceAgentContext);
  if (!ctx) throw new Error('useVoiceAgentContext must be used inside VoiceAgentProvider');
  return ctx;
}
