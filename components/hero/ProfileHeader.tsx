'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { PERSONAL_INFO, ANIMATION_CONFIG, SOCIAL_LINKS } from '@/lib/constants';
import { Github, Linkedin, Twitter } from 'lucide-react';

const iconMap = {
  Github: Github,
  Linkedin: Linkedin,
  Twitter: Twitter,
};

export default function ProfileHeader() {
  return (
    <div className="relative bg-portfolio-light-bg dark:bg-portfolio-bg">
      <div className="max-w-portfolio mx-auto px-4 sm:px-6">
        {/* Centered Cover Image Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: ANIMATION_CONFIG.fadeInDuration }}
          className="relative h-[280px] md:h-[340px] w-full overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 via-gray-800 to-black"
        >
          {/* Cover Image */}
          <Image
            src="/mountains%20%F0%9F%8C%84%F0%9F%AB%B6%F0%9F%8F%BB.jpeg"
            alt="Cover"
            fill
            className="object-cover"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

          {/* Quote Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: ANIMATION_CONFIG.fadeInDuration,
              delay: 0.3,
            }}
            className="absolute inset-0 flex items-center justify-center px-4"
          >
            <p className="text-white text-xl md:text-2xl font-light italic text-center leading-relaxed">
              {PERSONAL_INFO.coverQuote}
            </p>
          </motion.div>
        </motion.div>

        {/* Content Section Below Cover */}
        <div className="relative">
          {/* Profile Image - Overlapping Cover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: ANIMATION_CONFIG.fadeInDuration,
              delay: 0.2,
            }}
            className="relative -mt-16 md:-mt-20 mb-6 flex justify-center"
          >
            <div className="relative w-36 h-36 md:w-40 md:h-40">
              <Image
                src="/images/profile-pic.jpg"
                alt={PERSONAL_INFO.name}
                fill
                className="rounded-full object-cover border-[3px] border-portfolio-silver shadow-2xl"
                priority
              />
            </div>
          </motion.div>

          {/* Name and Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: ANIMATION_CONFIG.fadeInDuration,
              delay: 0.4,
            }}
            className="text-center space-y-4 pb-8 md:pb-10"
          >
            {/* Name */}
            <h1 className="text-4xl md:text-5xl font-medium text-portfolio-light-text dark:text-portfolio-text">
              {PERSONAL_INFO.name}
            </h1>

            {/* Role and Location */}
            <div className="space-y-2">
              <p className="text-lg md:text-xl text-portfolio-muted">
                {PERSONAL_INFO.currentRole}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-portfolio-muted">
                <MapPin size={16} />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-base md:text-lg text-portfolio-light-text dark:text-portfolio-text leading-relaxed max-w-2xl mx-auto pt-4">
              {PERSONAL_INFO.bio}
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-4 pt-4">
              {SOCIAL_LINKS.map((link) => {
                const Icon = iconMap[link.icon as keyof typeof iconMap];
                return (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.platform} profile`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full border border-portfolio-light-border dark:border-portfolio-border flex items-center justify-center hover:bg-portfolio-light-surface dark:hover:bg-portfolio-surface hover:border-portfolio-light-accent dark:hover:border-portfolio-silver transition-all duration-200"
                  >
                    <Icon size={20} className="text-portfolio-light-text dark:text-portfolio-text" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
