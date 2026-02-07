'use client';

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxOptions {
  offset?: number; // Parallax intensity (default: 50)
  offsetRange?: [number, number]; // Custom input range for scroll progress
}

export function useParallax(options: ParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options.offsetRange || ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, options.offset || 50]);

  return { ref, y, scrollYProgress };
}
