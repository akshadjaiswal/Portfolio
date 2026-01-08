interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-6 md:mb-8">
      <h2 className="text-2xl md:text-3xl font-medium text-portfolio-text mb-2">
        {title}
      </h2>
      <div className="w-16 h-0.5 bg-portfolio-silver mb-4" />
      {subtitle && (
        <p className="text-portfolio-muted text-base md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
