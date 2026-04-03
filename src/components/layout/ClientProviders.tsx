'use client';

import { ReactNode } from 'react';
import { VoiceAgentProvider } from '@/context/VoiceAgentContext';
import FloatingVoiceAgent from '@/components/sections/FloatingVoiceAgent';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <VoiceAgentProvider>
      {children}
      <FloatingVoiceAgent />
    </VoiceAgentProvider>
  );
}
