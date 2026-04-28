'use client';

import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import TechIcon from '../ui/TechIcon';
import { TECH_STACK } from '@/lib/data/techstack';

export default function TechStack() {
  return (
    <Section id="techstack">
      <Container>
        <SectionHeader
          title="My Tech Stack"
          subtitle="Tools I reach for day-to-day"
        />
        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-3">
          {TECH_STACK.map((tech, index) => (
            <TechIcon key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
