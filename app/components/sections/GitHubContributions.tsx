'use client';

import { useEffect, useRef } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { ExternalLink } from 'lucide-react';
import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import { PERSONAL_INFO } from '@/lib/constants';

export default function GitHubContributions() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the right (most recent contributions) after calendar renders
    const scrollToRight = () => {
      if (containerRef.current) {
        // Try multiple possible selectors for the scrollable container
        const possibleSelectors = [
          'article',
          '.react-activity-calendar',
          '[class*="activity-calendar"]',
          'div[style*="overflow"]'
        ];

        for (const selector of possibleSelectors) {
          const scrollable = containerRef.current.querySelector(selector) as HTMLElement;
          if (scrollable && scrollable.scrollWidth > scrollable.clientWidth) {
            scrollable.scrollLeft = scrollable.scrollWidth;
            break;
          }
        }
      }
    };

    // Try multiple times with increasing delays to ensure calendar is fully rendered
    const timer1 = setTimeout(scrollToRight, 100);
    const timer2 = setTimeout(scrollToRight, 300);
    const timer3 = setTimeout(scrollToRight, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <Section id="github">
      <Container>
        <SectionHeader
          title="GitHub Activity"
          subtitle="My open source contributions"
        />
        <div ref={containerRef} className="flex justify-center mb-6 overflow-hidden">
          <GitHubCalendar
            username={PERSONAL_INFO.githubUsername}
            theme={{
              dark: ['#0A0A0A', '#0e4429', '#006d32', '#26a641', '#39d353'],
            }}
            colorScheme="dark"
            blockSize={12}
            blockMargin={4}
          />
        </div>
        <div className="text-center">
          <a
            href={`https://github.com/${PERSONAL_INFO.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-portfolio-silver hover:text-portfolio-text transition-colors"
          >
            <span>View on GitHub</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </Container>
    </Section>
  );
}
