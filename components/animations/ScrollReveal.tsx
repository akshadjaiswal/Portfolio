'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  fadeInUp,
  fadeInDown,
  slideInFromLeft,
  slideInFromRight,
  scaleIn,
} from '@/lib/animation-variants';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fadeInUp' | 'fadeInDown' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number; // Viewport intersection threshold
  className?: string;
}

const variants = {
  fadeInUp,
  fadeInDown,
  slideLeft: slideInFromLeft,
  slideRight: slideInFromRight,
  scale: scaleIn,
};

export function ScrollReveal({
  children,
  variant = 'fadeInUp',
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.3,
  className,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const selectedVariant = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={selectedVariant}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
