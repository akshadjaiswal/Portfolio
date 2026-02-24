'use client';

import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricsCardProps {
  label: string;
  value: string;
  description: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: LucideIcon;
}

export default function MetricsCard({ label, value, description, trend = 'neutral', icon: Icon }: MetricsCardProps) {
  const trendConfig = {
    up: { icon: TrendingUp, color: 'text-portfolio-accent-success' },
    down: { icon: TrendingDown, color: 'text-red-500' },
    neutral: { icon: Minus, color: 'text-portfolio-muted' },
  };

  const TrendIcon = trendConfig[trend].icon;
  const trendColor = trendConfig[trend].color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border rounded-lg p-4 shadow-card dark:shadow-dark-card"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-portfolio-muted tracking-wide">{label}</span>
        {Icon && <Icon size={16} className="text-portfolio-muted" />}
      </div>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-semibold text-portfolio-light-text dark:text-portfolio-text tracking-tight">
          {value}
        </span>
        <TrendIcon size={16} className={trendColor} />
      </div>
      <p className="text-xs text-portfolio-muted">{description}</p>
    </motion.div>
  );
}
