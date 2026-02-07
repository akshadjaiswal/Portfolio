'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { iconBounce, iconRotate, iconPulse, iconShake } from '@/lib/animation-variants';

interface AnimatedIconProps {
  Icon: LucideIcon;
  size?: number;
  className?: string;
  animation?: 'bounce' | 'rotate' | 'pulse' | 'shake';
}

export function AnimatedIcon({
  Icon,
  size = 20,
  className,
  animation = 'bounce',
}: AnimatedIconProps) {
  const animations = {
    bounce: iconBounce,
    rotate: iconRotate,
    pulse: iconPulse,
    shake: iconShake,
  };

  return (
    <motion.div whileHover={animations[animation]} className={className}>
      <Icon size={size} />
    </motion.div>
  );
}
