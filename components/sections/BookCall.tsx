import { Calendar } from 'lucide-react';
import Container from '../ui/Container';
import Section from '../ui/Section';
import { PERSONAL_INFO } from '@/lib/constants';

export default function BookCall() {
  return (
    <Section id="contact">
      <Container>
        <div className="mx-auto max-w-2xl rounded-xl px-6 py-10 md:px-10 md:py-12 text-center bg-gradient-to-br from-portfolio-light-surface to-portfolio-light-bg dark:from-portfolio-surface dark:to-portfolio-bg border border-portfolio-light-border/60 dark:border-portfolio-border/60 shadow-card dark:shadow-dark-card">
          <Calendar size={36} className="mx-auto mb-5 text-portfolio-light-accent dark:text-portfolio-silver" />
          <h2 className="text-2xl md:text-3xl font-medium text-portfolio-light-text dark:text-portfolio-text mb-3">
            Schedule a Call
          </h2>
          <p className="text-portfolio-muted text-base md:text-lg mb-7 max-w-md mx-auto">
            Quick 15-minute chat to align on scope, timelines, and next steps.
          </p>
          <a
            href={PERSONAL_INFO.calComLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-150 ease-out bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-black/50 text-portfolio-light-text dark:text-portfolio-text shadow-[0_4px_10px_-4px_rgba(15,23,42,0.15)] dark:shadow-[0_4px_10px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_2px_6px_-2px_rgba(15,23,42,0.1)] dark:hover:shadow-[0_2px_6px_-2px_rgba(0,0,0,0.5)] hover:translate-y-px active:translate-y-0.5"
          >
            <Calendar size={16} className="text-portfolio-light-accent dark:text-portfolio-silver" />
            Schedule a Call
          </a>
        </div>
      </Container>
    </Section>
  );
}
