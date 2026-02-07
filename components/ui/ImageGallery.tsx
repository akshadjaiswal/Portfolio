'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ANIMATION_CONFIG } from '@/lib/constants';

interface ImageGalleryProps {
  images: string[];
  projectTitle: string;
}

export default function ImageGallery({ images, projectTitle }: ImageGalleryProps) {
  // Skip first image (already shown as hero)
  const galleryImages = images.slice(1);

  // Don't render if no gallery images
  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {galleryImages.map((image, index) => (
        <motion.a
          key={index}
          href={image}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: ANIMATION_CONFIG.fadeInDuration,
            ease: ANIMATION_CONFIG.easing,
            delay: index * 0.1,
          }}
          className="relative aspect-video rounded-lg overflow-hidden bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border hover:border-portfolio-light-accent dark:hover:border-portfolio-silver transition-colors group"
        >
          <Image
            src={image}
            alt={`${projectTitle} screenshot ${index + 2}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </motion.a>
      ))}
    </div>
  );
}
