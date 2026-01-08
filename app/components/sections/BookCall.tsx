import { Calendar } from 'lucide-react';
import Container from '../ui/Container';
import Section from '../ui/Section';
import { PERSONAL_INFO } from '@/lib/constants';

export default function BookCall() {
  return (
    <Section id="contact">
      <Container>
        <div className="border border-portfolio-border rounded-lg p-8 md:p-12 text-center bg-portfolio-surface">
          <Calendar size={48} className="mx-auto mb-6 text-portfolio-silver" />
          <h2 className="text-2xl md:text-3xl font-medium text-portfolio-text mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-portfolio-muted mb-8 max-w-md mx-auto">
            Have a project in mind? Let&apos;s discuss how I can help bring it to life.
          </p>
          <a
            href={PERSONAL_INFO.calComLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-portfolio-silver text-portfolio-bg font-medium rounded-lg hover:bg-opacity-90 transition-all duration-200 hover:scale-105"
          >
            Schedule a Call
          </a>
        </div>
      </Container>
    </Section>
  );
}
