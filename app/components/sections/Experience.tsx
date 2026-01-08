import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import ExperienceCard from '../ui/ExperienceCard';
import { EXPERIENCES } from '@/lib/data/experience';

export default function Experience() {
  // Sort by start date (most recent first)
  const sortedExperiences = [...EXPERIENCES].sort((a, b) =>
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <Section id="experience">
      <Container>
        <SectionHeader
          title="Experience"
          subtitle="My professional journey"
        />
        <div className="space-y-6">
          {sortedExperiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
