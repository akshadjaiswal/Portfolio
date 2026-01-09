'use client';

import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from '@/lib/constants';

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function StaggerContainer({ children, className }: StaggerContainerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: ANIMATION_CONFIG.staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
