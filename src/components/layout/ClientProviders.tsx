'use client';

import { ReactNode } from 'react';
import { VoiceAssistantProvider } from '@/context/VoiceAssistantContext';
import FloatingVoiceAssistant from '@/components/sections/FloatingVoiceAssistant';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <VoiceAssistantProvider>
      {children}
      <FloatingVoiceAssistant />
    </VoiceAssistantProvider>
  );
}
