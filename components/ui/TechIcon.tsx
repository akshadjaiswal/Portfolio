'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Si from 'react-icons/si';
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip';
import { TechItem } from '@/lib/data/techstack';
import { ANIMATION_CONFIG } from '@/lib/constants';

interface TechIconProps {
  tech: TechItem;
  index: number;
}

export default function TechIcon({ tech, index }: TechIconProps) {
  const [hovered, setHovered] = useState(false);

  // Dynamically resolve icon from react-icons/si
  const IconComponent = (Si as Record<string, React.ComponentType<{ size?: number; color?: string }>>)[tech.icon];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: ANIMATION_CONFIG.fadeInDuration,
            ease: ANIMATION_CONFIG.easing,
            delay: index * 0.04,
          }}
          whileHover={{ y: -4, scale: 1.08 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-portfolio-light-border dark:border-portfolio-border bg-portfolio-light-surface dark:bg-portfolio-surface/60 hover:border-portfolio-light-accent/40 dark:hover:border-portfolio-silver/30 hover:shadow-card dark:hover:shadow-dark-card transition-colors duration-200 cursor-default"
        >
          {IconComponent ? (
            <IconComponent
              size={24}
              color={hovered ? tech.color : undefined}
            />
          ) : (
            <span className="text-xs font-mono text-portfolio-muted">
              {tech.name.slice(0, 2)}
            </span>
          )}
        </motion.div>
      </TooltipTrigger>
      <TooltipContent>{tech.name}</TooltipContent>
    </Tooltip>
  );
}
