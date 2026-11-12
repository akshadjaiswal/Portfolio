'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO, ANIMATION_CONFIG } from '@/lib/constants';
import { EXPERIENCES } from '@/lib/data/experience';
import type { GitHubActivity } from '@/app/api/github/activity/route';

const current = EXPERIENCES[0];

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: ANIMATION_CONFIG.fadeInDuration, delay },
  };
}

function CompanyChip({ name, url, logo }: { name: string; url?: string; logo: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 align-middle mx-0.5 px-1.5 py-0.5 rounded-md border border-portfolio-light-border dark:border-portfolio-border bg-portfolio-light-surface/70 dark:bg-portfolio-surface/60 text-sm font-medium text-portfolio-light-text dark:text-portfolio-text hover:border-portfolio-light-accent dark:hover:border-portfolio-silver hover:-translate-y-px transition-all duration-200"
    >
      <Image src={logo} alt="" width={16} height={16} className="rounded-[4px] object-cover" />
      {name}
    </a>
  );
}

function daysAgoLabel(date: string): string {
  const diff = Math.round(
    (new Date().setHours(0, 0, 0, 0) - new Date(`${date}T00:00:00`).getTime()) / 86_400_000
  );
  if (diff <= 0) return 'today';
  if (diff === 1) return 'yesterday';
  return `${diff} days ago`;
}

function ShippingLine() {
  const { data } = useQuery<GitHubActivity>({
    queryKey: ['github-activity'],
    queryFn: () => fetch('/api/github/activity').then((r) => r.json()),
    staleTime: 5 * 60 * 1000,
  });

  if (!data || data.week === 0) return null;

  const text =
    data.today > 0
      ? `${data.today} contribution${data.today === 1 ? '' : 's'} today · ${data.week} this week`
      : `${data.week} contributions this week · last shipped ${daysAgoLabel(data.lastActiveDate!)}`;

  return (
    <motion.a
      {...fadeUp(0.75)}
      href={`https://github.com/${PERSONAL_INFO.githubUsername}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 font-mono text-xs text-portfolio-muted hover:text-portfolio-light-text dark:hover:text-portfolio-text transition-colors"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-portfolio-accent-success/60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-portfolio-accent-success" />
      </span>
      <span className="uppercase tracking-wider text-[10px] opacity-70">shipping</span>
      <span>{text}</span>
    </motion.a>
  );
}

export default function HeroBio() {
  return (
    <div className="pb-4 space-y-4">
      {/* Lead line */}
      <motion.p
        {...fadeUp(0.45)}
        className="text-lg sm:text-xl font-medium tracking-tight leading-snug text-portfolio-light-text dark:text-portfolio-text"
      >
        {PERSONAL_INFO.bioLead.before}
        <span className="relative whitespace-nowrap">
          {PERSONAL_INFO.bioLead.highlight}
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease: ANIMATION_CONFIG.easing }}
            className="absolute left-0 right-0 -bottom-0.5 h-[3px] origin-left rounded-full bg-portfolio-accent-success/70"
          />
        </span>
        {PERSONAL_INFO.bioLead.after}{' '}
        <span className="text-portfolio-muted font-normal">{PERSONAL_INFO.bioLead.tail}</span>
      </motion.p>

      {/* Current work */}
      <motion.p
        {...fadeUp(0.55)}
        className="text-[15px] leading-loose text-portfolio-light-text/80 dark:text-portfolio-text/80"
      >
        Currently building AI products at{' '}
        <CompanyChip name={current.company} url={current.companyUrl} logo={current.logo} />, from
        LLM agents to the full-stack platform around them.
      </motion.p>

      {/* Human line */}
      <motion.p
        {...fadeUp(0.65)}
        className="text-[15px] leading-relaxed text-portfolio-muted"
      >
        {PERSONAL_INFO.humanLine}
      </motion.p>

      {/* Live shipping status */}
      <ShippingLine />

      {/* CTAs */}
      <motion.div {...fadeUp(0.85)} className="flex flex-wrap items-center gap-3 pt-1">
        <a
          href={PERSONAL_INFO.calComLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-portfolio-light-accent dark:bg-portfolio-silver text-white dark:text-portfolio-bg shadow-[0_4px_10px_-4px_rgba(0,0,0,0.35)] hover:translate-y-px active:translate-y-0.5 transition-transform"
        >
          <CalendarDays size={15} />
          Book a call
        </a>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-portfolio-light-text dark:text-portfolio-text hover:opacity-80 transition-opacity"
        >
          See what I&apos;ve shipped
          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
