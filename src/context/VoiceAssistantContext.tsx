'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';

type VoiceAssistantContextType = ReturnType<typeof useVoiceAssistant>;

const VoiceAssistantContext = createContext<VoiceAssistantContextType | null>(null);

export function VoiceAssistantProvider({ children }: { children: ReactNode }) {
  const assistant = useVoiceAssistant();
  return (
    <VoiceAssistantContext.Provider value={assistant}>
      {children}
    </VoiceAssistantContext.Provider>
  );
}

export function useVoiceAssistantContext(): VoiceAssistantContextType {
  const ctx = useContext(VoiceAssistantContext);
  if (!ctx) throw new Error('useVoiceAssistantContext must be used inside VoiceAssistantProvider');
  return ctx;
}
