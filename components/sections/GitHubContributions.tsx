'use client';

import { useEffect, useRef } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { ExternalLink, GitCommit, GitPullRequest, Star, CalendarDays } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { PERSONAL_INFO } from '@/lib/constants';
import { useThemeStore } from '@/lib/stores/theme-store';
import type { GitHubUserStats } from '@/app/api/github/stats/route';
import type { LucideIcon } from 'lucide-react';

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  Go: '#00ADD8',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Shell: '#89e051',
  Rust: '#dea584',
  Java: '#b07219',
  'C++': '#f34b7d',
  Ruby: '#701516',
  Swift: '#F05138',
};

async function fetchGitHubStats(): Promise<GitHubUserStats> {
  const res = await fetch('/api/github/stats');
  if (!res.ok) throw new Error('Failed to fetch GitHub stats');
  return res.json();
}

interface StatTileProps {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  index: number;
}

function StatTile({ label, value, suffix = '', icon: Icon, index }: StatTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      className="bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border rounded-lg p-4"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs text-portfolio-muted tracking-wide">{label}</span>
        <Icon size={14} className="text-portfolio-muted" />
      </div>
      <div className="text-2xl font-semibold text-portfolio-light-text dark:text-portfolio-text tracking-tight tabular-nums">
        <AnimatedCounter end={value} duration={1200} />
        {suffix && <span className="text-lg font-normal text-portfolio-muted">{suffix}</span>}
      </div>
    </motion.div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border rounded-lg p-4 h-20 animate-pulse"
        />
      ))}
    </div>
  );
}

export default function GitHubContributions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useThemeStore();

  const { data: stats, isLoading } = useQuery<GitHubUserStats>({
    queryKey: ['github-stats'],
    queryFn: fetchGitHubStats,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });

  useEffect(() => {
    const scrollToRight = () => {
      if (containerRef.current) {
        const possibleSelectors = [
          'article',
          '.react-activity-calendar',
          '[class*="activity-calendar"]',
          'div[style*="overflow"]',
        ];
        for (const selector of possibleSelectors) {
          const scrollable = containerRef.current.querySelector(selector) as HTMLElement;
          if (scrollable && scrollable.scrollWidth > scrollable.clientWidth) {
            scrollable.scrollLeft = scrollable.scrollWidth;
            break;
          }
        }
      }
    };
    const t1 = setTimeout(scrollToRight, 100);
    const t2 = setTimeout(scrollToRight, 300);
    const t3 = setTimeout(scrollToRight, 500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const hasStats = stats && (
    stats.totalCommits > 0 ||
    stats.totalPRsMerged > 0 ||
    stats.totalStars > 0 ||
    stats.yearsOnGitHub > 0
  );

  return (
    <Section id="github">
      <Container>
        <SectionHeader
          title="GitHub Activity"
          subtitle="My open source contributions"
        />

        {isLoading && <StatsSkeleton />}

        {!isLoading && hasStats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <StatTile label="Total Commits"    value={stats.totalCommits}    suffix="+"     icon={GitCommit}    index={0} />
            <StatTile label="PRs Merged"       value={stats.totalPRsMerged}                icon={GitPullRequest} index={1} />
            <StatTile label="Stars Earned"     value={stats.totalStars}                     icon={Star}         index={2} />
            <StatTile label="Years on GitHub"  value={stats.yearsOnGitHub}  suffix=" yrs"  icon={CalendarDays} index={3} />
          </div>
        )}

        {!isLoading && stats?.topLanguages && stats.topLanguages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="mb-8"
          >
            <p className="text-xs text-portfolio-muted mb-3 font-mono tracking-wide">Top Languages</p>
            <div className="flex h-1.5 rounded-full overflow-hidden gap-px mb-3">
              {stats.topLanguages.map((lang) => (
                <motion.div
                  key={lang.name}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{
                    width: `${lang.percentage}%`,
                    background: LANG_COLORS[lang.name] ?? '#6B7280',
                    transformOrigin: 'left',
                  }}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              {stats.topLanguages.map((lang) => (
                <span key={lang.name} className="flex items-center gap-1.5 text-xs text-portfolio-muted">
                  <span
                    className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: LANG_COLORS[lang.name] ?? '#6B7280' }}
                  />
                  {lang.name}
                  <span className="text-portfolio-muted/60">{lang.percentage}%</span>
                </span>
              ))}
            </div>
          </motion.div>
        )}

        <div ref={containerRef} className="flex justify-center mb-6 overflow-hidden">
          <GitHubCalendar
            username={PERSONAL_INFO.githubUsername}
            theme={{
              light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
              dark: ['#0A0A0A', '#0e4429', '#006d32', '#26a641', '#39d353'],
            }}
            colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
            blockSize={12}
            blockMargin={4}
          />
        </div>

        <div className="text-center">
          <a
            href={`https://github.com/${PERSONAL_INFO.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-portfolio-light-accent dark:text-portfolio-silver hover:text-portfolio-light-text dark:text-portfolio-text transition-colors"
          >
            <span>View on GitHub</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </Container>
    </Section>
  );
}
