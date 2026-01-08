import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import ExperienceCard from '../ui/ExperienceCard';
import CompanyExperienceGroup from '../ui/CompanyExperienceGroup';
import { EXPERIENCES } from '@/lib/data/experience';

export default function Experience() {
  // Sort by start date (most recent first)
  // For grouped experiences, use the first position's startDate
  const sortedExperiences = [...EXPERIENCES].sort((a, b) => {
    const aDate = a.positions?.[0]?.startDate || a.startDate || '';
    const bDate = b.positions?.[0]?.startDate || b.startDate || '';
    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

  return (
    <Section id="experience">
      <Container>
        <SectionHeader
          title="Experience"
          subtitle="My professional journey"
        />
        <div className="space-y-4">
          {sortedExperiences.map((exp) => {
            // If has positions array, render as grouped company experience
            if (exp.positions && exp.positions.length > 0) {
              return <CompanyExperienceGroup key={exp.id} experience={exp} />;
            }
            // Otherwise render as single experience card (backward compatible)
            return <ExperienceCard key={exp.id} experience={exp} />;
          })}
        </div>
      </Container>
    </Section>
  );
}
