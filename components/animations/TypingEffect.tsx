'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingEffectProps {
  roles: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypingEffect({
  roles,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 1500,
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];

    if (!isDeleting && displayText === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentRole.slice(0, displayText.length - 1)
          : currentRole.slice(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, currentRoleIndex, isDeleting, roles, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
        className="ml-0.5"
      >
        |
      </motion.span>
    </span>
  );
}
