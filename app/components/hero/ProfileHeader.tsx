'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { PERSONAL_INFO, ANIMATION_CONFIG } from '@/lib/constants';

export default function ProfileHeader() {
  return (
    <div className="relative">
      {/* Background Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: ANIMATION_CONFIG.fadeInDuration }}
        className="h-[300px] md:h-[400px] bg-gradient-to-b from-portfolio-bg to-portfolio-surface"
      />

      {/* Content Container */}
      <div className="max-w-portfolio mx-auto px-4 sm:px-6">
        {/* Profile Image - Overlapping */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: ANIMATION_CONFIG.fadeInDuration,
            delay: 0.2,
          }}
          className="relative -mt-20 mb-8 flex justify-center"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src="/images/profile/avatar.jpg"
              alt={PERSONAL_INFO.name}
              fill
              className="rounded-full object-cover border-2 border-portfolio-silver shadow-xl"
              priority
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: ANIMATION_CONFIG.fadeInDuration,
            delay: 0.4,
          }}
          className="text-center space-y-3 pb-12"
        >
          <h1 className="text-3xl md:text-4xl font-medium text-portfolio-text">
            {PERSONAL_INFO.name}
          </h1>
          <p className="text-lg md:text-xl text-portfolio-muted">
            {PERSONAL_INFO.tagline}
          </p>
          <p className="text-sm text-portfolio-muted">
            {PERSONAL_INFO.currentRole}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-portfolio-muted">
            <MapPin size={14} />
            <span>{PERSONAL_INFO.location}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
