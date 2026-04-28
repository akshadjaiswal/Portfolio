'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, FolderOpen } from 'lucide-react';
import Container from '@/components/ui/Container';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-portfolio-light-bg dark:bg-portfolio-bg flex items-center justify-center">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center text-center gap-6 py-20"
        >
          {/* Large muted 404 */}
          <p className="text-[8rem] md:text-[10rem] font-mono font-semibold leading-none text-portfolio-light-border dark:text-portfolio-border select-none">
            404
          </p>

          {/* Message */}
          <div className="space-y-2 -mt-4">
            <h1 className="text-xl md:text-2xl font-medium text-portfolio-light-text dark:text-portfolio-text">
              This page doesn&apos;t exist.
            </h1>
            <p className="text-sm text-portfolio-muted max-w-sm">
              It might have been moved, deleted, or you may have followed a broken link.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-portfolio-light-border dark:border-portfolio-border text-portfolio-light-text dark:text-portfolio-text hover:border-portfolio-light-accent dark:hover:border-portfolio-silver hover:bg-portfolio-light-surface dark:hover:bg-portfolio-surface/50 transition-all duration-200 text-sm font-medium"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-portfolio-light-accent dark:bg-portfolio-silver text-white dark:text-portfolio-bg hover:opacity-90 transition-all duration-200 text-sm font-medium"
            >
              <FolderOpen size={16} />
              View Projects
            </Link>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}
