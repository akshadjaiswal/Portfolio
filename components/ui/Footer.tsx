'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import Container from './Container';
import SocialLinks from './SocialLinks';
import { PERSONAL_INFO } from '@/lib/constants';

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Learning', href: '#learning' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-portfolio-light-border dark:border-portfolio-border">
      {/* Band 1 — CTA */}
      <div className="py-16 border-b border-portfolio-light-border dark:border-portfolio-border">
        <Container>
          <div className="flex flex-col items-center text-center gap-4">
            <h2 className="text-2xl font-medium text-portfolio-light-text dark:text-portfolio-text">
              Let&apos;s build something together.
            </h2>
            <p className="text-sm text-portfolio-muted max-w-sm">
              Open to full-time roles, freelance, and interesting side projects.
            </p>
            <motion.a
              href={PERSONAL_INFO.calComLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 mt-2 px-6 py-3 bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border rounded-lg text-portfolio-light-text dark:text-portfolio-text hover:border-portfolio-light-accent dark:hover:border-portfolio-silver hover:bg-portfolio-light-surface/50 dark:hover:bg-portfolio-surface/50 transition-all duration-200"
            >
              <Calendar
                size={18}
                className="text-portfolio-light-accent dark:text-portfolio-silver group-hover:text-portfolio-light-text dark:group-hover:text-portfolio-text transition-colors"
              />
              <span className="font-medium">Schedule a Call</span>
              <motion.div
                className="w-0 group-hover:w-2 h-2 bg-portfolio-light-accent dark:bg-portfolio-silver rounded-full transition-all duration-200"
                initial={{ width: 0 }}
                whileHover={{ width: 8 }}
              />
            </motion.a>
          </div>
        </Container>
      </div>

      {/* Band 2 — Identity + nav + socials */}
      <div className="py-10 border-b border-portfolio-light-border dark:border-portfolio-border">
        <Container>
          <div className="flex flex-col items-center text-center md:flex-row md:items-start md:justify-between md:text-left gap-8">
            {/* Left: identity */}
            <div className="space-y-1">
              <p className="text-base font-medium text-portfolio-light-text dark:text-portfolio-text">
                {PERSONAL_INFO.name}
              </p>
              <p className="text-sm text-portfolio-muted">{PERSONAL_INFO.currentRole}</p>
              <p className="flex items-center justify-center md:justify-start gap-1 text-sm text-portfolio-muted">
                <MapPin size={13} />
                {PERSONAL_INFO.location}
              </p>
            </div>

            {/* Right: nav + socials */}
            <div className="flex flex-col items-center md:items-end gap-4">
              <nav className="flex items-center gap-5">
                {NAV_LINKS.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    className="text-sm text-portfolio-muted hover:text-portfolio-light-text dark:hover:text-portfolio-text transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <SocialLinks />
            </div>
          </div>
        </Container>
      </div>

      {/* Band 3 — Copyright */}
      <div className="py-5">
        <Container>
          <p className="text-center text-xs text-portfolio-muted flex items-center justify-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-portfolio-accent-success opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-portfolio-accent-success" />
            </span>
            Available for opportunities · © {currentYear} {PERSONAL_INFO.name}
          </p>
        </Container>
      </div>
    </footer>
  );
}
