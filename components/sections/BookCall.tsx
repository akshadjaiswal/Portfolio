import { Calendar } from 'lucide-react';
import Container from '../ui/Container';
import Section from '../ui/Section';
import { PERSONAL_INFO } from '@/lib/constants';

export default function BookCall() {
  return (
    <Section id="contact">
      <Container>
        <div className="mx-auto max-w-2xl border border-portfolio-light-border dark:border-portfolio-border rounded-lg px-6 py-10 md:px-10 md:py-12 text-center bg-portfolio-light-surface dark:bg-portfolio-surface">
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
            className="inline-flex items-center justify-center px-6 py-2.5 bg-portfolio-silver text-portfolio-bg font-medium rounded-lg hover:bg-opacity-90 transition-all duration-200"
          >
            Schedule a Call
          </a>
        </div>
      </Container>
    </Section>
  );
}
