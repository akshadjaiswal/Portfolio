'use client';

import { Github, Linkedin, Twitter } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';

const iconMap = {
  Github: Github,
  Linkedin: Linkedin,
  Twitter: Twitter,
};

export default function SocialLinks() {
  return (
    <div className="flex justify-center gap-4">
      {SOCIAL_LINKS.map((link) => {
        const Icon = iconMap[link.icon as keyof typeof iconMap];
        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.platform} profile`}
            className="w-12 h-12 rounded-full border border-portfolio-border flex items-center justify-center hover:bg-portfolio-surface hover:border-portfolio-silver transition-all duration-200"
          >
            <Icon size={20} className="text-portfolio-text" />
          </a>
        );
      })}
    </div>
  );
}
