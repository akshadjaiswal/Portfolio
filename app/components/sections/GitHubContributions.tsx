'use client';

import { GitHubCalendar } from 'react-github-calendar';
import { ExternalLink } from 'lucide-react';
import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import { PERSONAL_INFO } from '@/lib/constants';

export default function GitHubContributions() {
  return (
    <Section id="github">
      <Container>
        <SectionHeader
          title="GitHub Activity"
          subtitle="My open source contributions"
        />
        <div className="flex justify-center mb-6">
          <GitHubCalendar
            username={PERSONAL_INFO.githubUsername}
            theme={{
              dark: ['#0A0A0A', '#1A1A1A', '#404040', '#808080', '#C0C0C0'],
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
