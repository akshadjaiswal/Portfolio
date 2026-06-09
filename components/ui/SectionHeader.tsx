'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const wordVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  const titleWords = title.split(' ');

  return (
    <div className="mb-6 md:mb-8">
      <motion.h2
        className="text-2xl md:text-3xl font-medium text-portfolio-light-text dark:text-portfolio-text mb-2 flex flex-wrap gap-x-[0.3em]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {titleWords.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>
      <div className="w-16 h-0.5 bg-portfolio-light-accent dark:bg-portfolio-silver mb-4" />
      {subtitle && (
        <motion.p
          className="text-portfolio-muted text-base md:text-lg"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: titleWords.length * 0.06 + 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
