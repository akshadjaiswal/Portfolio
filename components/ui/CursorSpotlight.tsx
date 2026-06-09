'use client';

import { useEffect } from 'react';

export default function CursorSpotlight() {
  useEffect(() => {
    const root = document.documentElement;

    const handleMove = (e: MouseEvent) => {
      root.style.setProperty('--cursor-x', `${e.clientX}px`);
      root.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      className="cursor-spotlight"
      aria-hidden
    />
  );
}
