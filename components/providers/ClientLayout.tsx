'use client';

import { useKeyboardShortcuts } from '@/lib/hooks/use-keyboard-shortcuts';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { BackToTop } from '@/components/ui/BackToTop';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useKeyboardShortcuts();

  return (
    <TooltipProvider delayDuration={300}>
      <ScrollProgress />
      {children}
      <BackToTop />
      <Toaster />
    </TooltipProvider>
  );
}
