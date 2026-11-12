'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiGo, SiNodedotjs,
  SiPython, SiExpress, SiFastapi, SiPostgresql, SiMongodb, SiRedis, SiSupabase,
  SiDocker, SiGit, SiFigma, SiVercel, SiGithub,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip';
import { TechItem } from '@/lib/data/techstack';
import { ANIMATION_CONFIG } from '@/lib/constants';
import { useThemeStore } from '@/lib/stores/theme-store';

interface TechIconProps {
  tech: TechItem;
  index: number;
}

const DRIFT = 6;

// Named imports only — `import * as Si` pulled the entire Simple Icons set into the bundle.
// Add new icons here when adding to TECH_STACK.
const ICONS: Record<string, IconType> = {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiGo, SiNodedotjs,
  SiPython, SiExpress, SiFastapi, SiPostgresql, SiMongodb, SiRedis, SiSupabase,
  SiDocker, SiGit, SiFigma, SiVercel, SiGithub,
  SiAmazonwebservices: FaAws, // Simple Icons dropped the AWS logo
};

export default function TechIcon({ tech, index }: TechIconProps) {
  const [hovered, setHovered] = useState(false);
  const resolvedTheme = useThemeStore((s) => s.resolvedTheme);
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 20 });
  const y = useSpring(rawY, { stiffness: 300, damping: 20 });

  const IconComponent = ICONS[tech.icon];

  const hoverColor = hovered
    ? resolvedTheme === 'dark' && tech.darkColor
      ? tech.darkColor
      : tech.color
    : undefined;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set(((e.clientX - cx) / (rect.width / 2)) * DRIFT);
    rawY.set(((e.clientY - cy) / (rect.height / 2)) * DRIFT);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: ANIMATION_CONFIG.fadeInDuration,
            ease: ANIMATION_CONFIG.easing,
            delay: index * 0.04,
          }}
          style={{ x, y }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-portfolio-light-border dark:border-portfolio-border bg-portfolio-light-surface dark:bg-portfolio-surface/60 hover:border-portfolio-light-accent/40 dark:hover:border-portfolio-silver/30 hover:shadow-card dark:hover:shadow-dark-card transition-colors duration-200 cursor-default"
        >
          {IconComponent ? (
            <IconComponent size={24} color={hoverColor} />
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
