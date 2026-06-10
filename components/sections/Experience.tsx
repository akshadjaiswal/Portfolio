import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import ExperienceCard from '../ui/ExperienceCard';
import CompanyExperienceGroup from '../ui/CompanyExperienceGroup';
import { EXPERIENCES } from '@/lib/data/experience';

export default function Experience() {
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

        <div className="divide-y divide-portfolio-light-border/30 dark:divide-portfolio-border/20">
          {sortedExperiences.map((exp) =>
            exp.positions ? (
              <CompanyExperienceGroup key={exp.id} experience={exp} />
            ) : (
              <ExperienceCard key={exp.id} experience={exp} />
            )
          )}
        </div>
      </Container>
    </Section>
  );
}
