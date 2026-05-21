'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { PERSONAL_INFO, ANIMATION_CONFIG, SOCIAL_LINKS } from '@/lib/constants';
import { Github, Linkedin } from 'lucide-react';
import { SiX } from 'react-icons/si';
import StatusBadge from '@/components/ui/StatusBadge';
import { useState, useEffect } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

const iconMap = {
  Github: Github,
  Linkedin: Linkedin,
  Twitter: SiX,
};

export default function ProfileHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-portfolio-light-bg dark:bg-portfolio-bg">
      <div className="max-w-portfolio mx-auto">

        {/* Cover image — full bleed, no rounded corners */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: ANIMATION_CONFIG.fadeInDuration }}
          className="relative h-[220px] sm:h-[280px] w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black"
        >
          <Image
            src="/mountains%20%F0%9F%8C%84%F0%9F%AB%B6%F0%9F%8F%BB.jpeg"
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/55" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_CONFIG.fadeInDuration, delay: 0.3 }}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <p className="text-white text-lg sm:text-xl font-light italic text-center leading-relaxed">
              {PERSONAL_INFO.coverQuote}
            </p>
          </motion.div>
        </motion.div>

        {/* Content below cover */}
        <div className="px-4 sm:px-6">

          {/* Profile pic — left-aligned, overlaps cover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: ANIMATION_CONFIG.fadeInDuration, delay: 0.2 }}
            className="relative -mt-10 sm:-mt-12 w-24 h-24 sm:w-28 sm:h-28"
          >
            <Image
              src="/images/profile-pic.jpg"
              alt={PERSONAL_INFO.name}
              fill
              className="rounded-full object-cover border-[3px] border-portfolio-light-bg dark:border-portfolio-bg shadow-xl"
              priority
            />
          </motion.div>

          {/* Name row: name+tagline left, social icons right */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_CONFIG.fadeInDuration, delay: 0.35 }}
            className="flex items-start justify-between mt-3 mb-5"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-portfolio-light-text dark:text-portfolio-text">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-sm text-portfolio-muted mt-1 flex items-center gap-1.5 flex-wrap">
                <span>{PERSONAL_INFO.currentRole}</span>
                <span className="opacity-40">·</span>
                <span>{PERSONAL_INFO.location}</span>
                <StatusBadge />
              </p>
            </div>

            {/* Social icons */}
            <Tooltip.Provider delayDuration={200}>
              <div className="flex gap-2 mt-1">
                {SOCIAL_LINKS.map((link) => {
                  const Icon = iconMap[link.icon as keyof typeof iconMap];
                  return (
                    <Tooltip.Root key={link.platform}>
                      <Tooltip.Trigger asChild>
                        <motion.a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${link.platform} profile`}
                          whileHover={{ scale: 1.08, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-9 h-9 rounded-full border border-portfolio-light-border dark:border-portfolio-border bg-portfolio-light-surface/60 dark:bg-portfolio-surface/40 backdrop-blur-sm flex items-center justify-center hover:border-portfolio-light-accent dark:hover:border-portfolio-silver hover:bg-portfolio-light-surface dark:hover:bg-portfolio-surface hover:shadow-md hover:shadow-black/10 dark:hover:shadow-portfolio-silver/15 transition-all duration-200"
                        >
                          <Icon size={16} className="text-portfolio-light-text dark:text-portfolio-text" />
                        </motion.a>
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
          </motion.div>

          {/* Bio — left-aligned */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_CONFIG.fadeInDuration, delay: 0.45 }}
            className="text-base text-portfolio-light-text dark:text-portfolio-text leading-relaxed pb-10"
          >
            {PERSONAL_INFO.bio}
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center pb-4"
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} className="text-portfolio-muted" />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
