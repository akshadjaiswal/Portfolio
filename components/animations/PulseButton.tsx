'use client';

import { motion } from 'framer-motion';
import { pulse, pulseSubtle } from '@/lib/animation-variants';

interface PulseButtonProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'normal';
}

export function PulseButton({ children, className, intensity = 'subtle' }: PulseButtonProps) {
  const animation = intensity === 'subtle' ? pulseSubtle : pulse;

  return (
    <motion.div {...animation} className={className}>
      {children}
    </motion.div>
  );
}
