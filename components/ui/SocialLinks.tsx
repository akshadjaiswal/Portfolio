'use client';

import { Github, Linkedin } from 'lucide-react';
import { SiX } from 'react-icons/si';
import { SOCIAL_LINKS } from '@/lib/constants';
import * as Tooltip from '@radix-ui/react-tooltip';

const iconMap = {
  Github: Github,
  Linkedin: Linkedin,
  Twitter: SiX,
};

export default function SocialLinks() {
  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="flex justify-center gap-4">
        {SOCIAL_LINKS.map((link) => {
          const Icon = iconMap[link.icon as keyof typeof iconMap];
          return (
            <Tooltip.Root key={link.platform}>
              <Tooltip.Trigger asChild>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.platform} profile`}
                  className="w-10 h-10 rounded-full border border-portfolio-light-border dark:border-portfolio-border bg-portfolio-light-surface/60 dark:bg-portfolio-surface/40 backdrop-blur-sm flex items-center justify-center hover:border-portfolio-light-accent dark:hover:border-portfolio-silver hover:bg-portfolio-light-surface dark:hover:bg-portfolio-surface hover:shadow-md hover:shadow-black/10 dark:hover:shadow-portfolio-silver/15 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Icon size={17} className="text-portfolio-light-text dark:text-portfolio-text" />
                </a>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-portfolio-light-accent dark:bg-portfolio-silver text-white dark:text-portfolio-bg shadow-md select-none"
                  sideOffset={6}
                >
                  {link.platform}
                  <Tooltip.Arrow className="fill-portfolio-light-accent dark:fill-portfolio-silver" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          );
        })}
      </div>
    </Tooltip.Provider>
  );
}
