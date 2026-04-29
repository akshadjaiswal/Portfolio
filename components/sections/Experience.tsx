'use client';

import { useState } from 'react';
import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import ExperienceCard from '../ui/ExperienceCard';
import CompanyExperienceGroup from '../ui/CompanyExperienceGroup';
import { EXPERIENCES } from '@/lib/data/experience';

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sortedExperiences = [...EXPERIENCES].sort((a, b) => {
    const aDate = a.positions?.[0]?.startDate || a.startDate || '';
    const bDate = b.positions?.[0]?.startDate || b.startDate || '';
    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Section id="experience">
      <Container>
        <SectionHeader
          title="Experience"
          subtitle="My professional journey"
        />

        <div>
          {sortedExperiences.map((exp) => (
            exp.positions ? (
              <CompanyExperienceGroup
                key={exp.id}
                experience={exp}
                isExpanded={expandedId === exp.id}
                onToggle={() => handleToggle(exp.id)}
              />
            ) : (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                isExpanded={expandedId === exp.id}
                onToggle={() => handleToggle(exp.id)}
              />
            )
          ))}
        </div>
      </Container>
    </Section>
  );
}
