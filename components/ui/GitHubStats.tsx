import { Star, GitFork, Code, Clock, ExternalLink } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils/date';
import { getTopLanguages, LanguageStats } from '@/lib/utils/github';

interface GitHubStatsProps {
  stars?: number;
  forks?: number;
  primaryLanguage?: string;
  languages?: { [key: string]: number };
  lastUpdated?: string;
  repositoryUrl?: string;
}

export default function GitHubStats({
  stars,
  forks,
  primaryLanguage,
  languages,
  lastUpdated,
  repositoryUrl,
}: GitHubStatsProps) {
  // Don't render if no data available
  if (!stars && !forks && !primaryLanguage && !languages && !lastUpdated) {
    return null;
  }

  const topLanguages: LanguageStats[] = languages ? getTopLanguages(languages, 5) : [];

  return (
    <div className="rounded-lg bg-portfolio-light-surface dark:bg-portfolio-surface/30 border border-portfolio-light-border dark:border-portfolio-border p-6">
      <h3 className="text-lg font-medium text-portfolio-light-text dark:text-portfolio-text mb-4">
        GitHub Statistics
      </h3>
      <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />

      {/* Stats Grid */}
      <div className="space-y-4 mb-6">
        {stars !== undefined && (
          <div className="flex items-center gap-3">
            <Star size={18} className="text-portfolio-light-accent dark:text-portfolio-silver" />
            <span className="text-portfolio-light-text dark:text-portfolio-text">
              {stars.toLocaleString()} {stars === 1 ? 'Star' : 'Stars'}
            </span>
          </div>
        )}

        {forks !== undefined && (
          <div className="flex items-center gap-3">
            <GitFork size={18} className="text-portfolio-light-accent dark:text-portfolio-silver" />
            <span className="text-portfolio-light-text dark:text-portfolio-text">
              {forks.toLocaleString()} {forks === 1 ? 'Fork' : 'Forks'}
            </span>
          </div>
        )}

        {primaryLanguage && (
          <div className="flex items-center gap-3">
            <Code size={18} className="text-portfolio-light-accent dark:text-portfolio-silver" />
            <span className="text-portfolio-light-text dark:text-portfolio-text">{primaryLanguage}</span>
          </div>
        )}

        {lastUpdated && (
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-portfolio-light-accent dark:text-portfolio-silver" />
            <span className="text-portfolio-light-text dark:text-portfolio-text">
              Updated {formatRelativeTime(lastUpdated)}
            </span>
          </div>
        )}
      </div>

      {/* Languages Breakdown */}
      {topLanguages.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-portfolio-light-accent dark:text-portfolio-silver mb-3">
            Languages
          </h4>
          <div className="space-y-3">
            {topLanguages.map((lang) => (
              <div key={lang.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-portfolio-light-text dark:text-portfolio-text">{lang.name}</span>
                  <span className="text-portfolio-muted">
                    {lang.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-portfolio-light-surface dark:bg-portfolio-surface rounded-full overflow-hidden">
                  <div
                    className="h-full bg-portfolio-silver rounded-full transition-all"
                    style={{ width: `${lang.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Link to Repository */}
      {repositoryUrl && (
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-portfolio-light-accent dark:text-portfolio-silver hover:text-portfolio-light-text dark:text-portfolio-text transition-colors mt-6"
        >
          <span>View on GitHub</span>
          <ExternalLink size={14} />
        </a>
      )}
    </div>
  );
}
