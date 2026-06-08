'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, BookOpen, MapPin, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';
import type { GitHubUserStats } from '@/app/api/github/stats/route';

function fmt(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export default function GitHubProfileCard({ stats }: { stats: GitHubUserStats }) {
  const bio = stats.bio ?? PERSONAL_INFO.bio;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border rounded-xl p-5 sm:p-6 flex flex-col md:flex-row gap-5 md:gap-6 items-center md:items-start mb-8"
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Image
          src={`https://avatars.githubusercontent.com/${PERSONAL_INFO.githubUsername}`}
          alt={`${PERSONAL_INFO.name} GitHub avatar`}
          width={80}
          height={80}
          className="w-20 h-20 rounded-full ring-2 ring-portfolio-light-border dark:ring-portfolio-border object-cover"
          unoptimized={false}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 text-center md:text-left">
        <p className="text-base font-semibold text-portfolio-light-text dark:text-portfolio-text tracking-tight">
          {PERSONAL_INFO.name}
        </p>
        <p className="text-sm text-portfolio-muted font-mono mt-0.5">
          @{PERSONAL_INFO.githubUsername}
        </p>

        {bio && (
          <p className="text-sm text-portfolio-muted leading-relaxed mt-2 line-clamp-3">
            {bio}
          </p>
        )}

        {/* Stat chips */}
        <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1.5 mt-3">
          <span className="flex items-center gap-1.5 text-xs text-portfolio-muted">
            <Users size={12} className="flex-shrink-0" />
            <span className="font-semibold text-portfolio-light-text dark:text-portfolio-text">
              {fmt(stats.followers)}
            </span>
            followers
          </span>
          <span className="flex items-center gap-1.5 text-xs text-portfolio-muted">
            <span className="font-semibold text-portfolio-light-text dark:text-portfolio-text">
              {fmt(stats.following)}
            </span>
            following
          </span>
          <span className="flex items-center gap-1.5 text-xs text-portfolio-muted">
            <BookOpen size={12} className="flex-shrink-0" />
            <span className="font-semibold text-portfolio-light-text dark:text-portfolio-text">
              {stats.publicRepos}
            </span>
            repos
          </span>
        </div>

        {/* Location + link */}
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-2">
          <span className="flex items-center gap-1 text-xs text-portfolio-muted">
            <MapPin size={11} className="flex-shrink-0" />
            {PERSONAL_INFO.location}
          </span>
          <a
            href={`https://github.com/${PERSONAL_INFO.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-portfolio-light-accent dark:text-portfolio-silver hover:text-portfolio-light-text dark:hover:text-portfolio-text transition-colors"
          >
            View Profile
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
