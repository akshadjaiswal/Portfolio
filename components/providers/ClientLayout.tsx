'use client';

import { useKeyboardShortcuts } from '@/lib/hooks/use-keyboard-shortcuts';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { BackToTop } from '@/components/ui/BackToTop';
import { Toaster } from '@/components/ui/toaster';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useKeyboardShortcuts();

  return (
    <>
      <ScrollProgress />
      {children}
      <BackToTop />
      <Toaster />
    </>
  );
}
