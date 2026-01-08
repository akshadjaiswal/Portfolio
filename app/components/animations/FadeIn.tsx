'use client';

import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from '@/lib/constants';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: ANIMATION_CONFIG.slideDistance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: ANIMATION_CONFIG.fadeInDuration,
        delay: delay || ANIMATION_CONFIG.fadeInDelay,
        ease: ANIMATION_CONFIG.easing,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
