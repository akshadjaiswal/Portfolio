'use client';

import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import TestimonialCard from '../ui/TestimonialCard';
import { TESTIMONIALS } from '@/lib/data/testimonials';

export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <Section id="testimonials">
      <Container>
        <SectionHeader
          title="What People Say"
          subtitle="Recommendations from colleagues and managers"
        />
        <div className={`grid gap-6 grid-cols-1 ${TESTIMONIALS.length > 1 ? 'md:grid-cols-2' : 'max-w-xl mx-auto'}`}>
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
