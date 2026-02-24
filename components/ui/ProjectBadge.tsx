'use client';

import { Star, TrendingUp, CheckCircle, Clock } from 'lucide-react';

interface ProjectBadgeProps {
  variant: 'complexity' | 'impact' | 'status' | 'featured';
  value: string;
}

const badgeConfig = {
  complexity: {
    icon: TrendingUp,
    colors: {
      Beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
      Intermediate: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      Advanced: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      Expert: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    },
  },
  impact: {
    icon: Star,
    colors: {
      Personal: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
      Team: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      Production: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      Enterprise: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    },
  },
  status: {
    icon: CheckCircle,
    colors: {
      'In Development': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      Completed: 'bg-green-500/10 text-green-500 border-green-500/20',
      Maintained: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      Archived: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
    },
  },
  featured: {
    icon: Star,
    colors: {
      Featured: 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-500 border-purple-500/20',
    },
  },
};

export default function ProjectBadge({ variant, value }: ProjectBadgeProps) {
  const config = badgeConfig[variant];
  const Icon = config.icon;
  const colorClass = (config.colors as Record<string, string>)[value] || (config.colors as Record<string, string>)[Object.keys(config.colors)[0]];

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 backdrop-blur-sm border rounded-full text-xs font-medium ${colorClass}`}>
      <Icon size={12} />
      <span>{value}</span>
    </div>
  );
}
