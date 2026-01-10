'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import Container from './Container';
import SocialLinks from './SocialLinks';
import { PERSONAL_INFO } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-portfolio-border py-12">
      <Container>
        <div className="space-y-8">
          {/* Schedule Call Button */}
          <div className="flex justify-center">
            <motion.a
              href={PERSONAL_INFO.calComLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-portfolio-surface border border-portfolio-border rounded-lg text-portfolio-text hover:border-portfolio-silver hover:bg-portfolio-surface/50 transition-all duration-200"
            >
              <Calendar
                size={18}
                className="text-portfolio-silver group-hover:text-portfolio-text transition-colors"
              />
              <span className="font-medium">Schedule a Call</span>
              <motion.div
                className="w-0 group-hover:w-2 h-2 bg-portfolio-silver rounded-full transition-all duration-200"
                initial={{ width: 0 }}
                whileHover={{ width: 8 }}
              />
            </motion.a>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-medium text-portfolio-text mb-6">
              Let&apos;s Connect
            </h3>
            <SocialLinks />
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-portfolio-muted">
              © {currentYear} {PERSONAL_INFO.name}
            </p>
            <p className="text-xs text-portfolio-muted">
              Built by Akshad
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
