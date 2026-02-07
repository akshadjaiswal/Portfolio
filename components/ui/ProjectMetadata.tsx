import { Tag, Calendar, RefreshCw } from 'lucide-react';
import { formatMonthYear, formatRelativeTime } from '@/lib/utils/date';

interface ProjectMetadataProps {
  category: string;
  createdAt: string;
  lastUpdated?: string;
  autoFetched?: boolean;
}

export default function ProjectMetadata({
  category,
  createdAt,
  lastUpdated,
  autoFetched,
}: ProjectMetadataProps) {
  return (
    <div className="rounded-lg bg-portfolio-light-surface dark:bg-portfolio-surface/30 border border-portfolio-light-border dark:border-portfolio-border p-6">
      <h3 className="text-lg font-medium text-portfolio-light-text dark:text-portfolio-text mb-4">
        Project Information
      </h3>
      <div className="w-12 h-0.5 bg-portfolio-silver mb-6" />

      <div className="space-y-4">
        {/* Category */}
        <div className="flex items-start gap-3">
          <Tag size={18} className="text-portfolio-light-accent dark:text-portfolio-silver mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-portfolio-muted mb-1">Category</p>
            <p className="text-portfolio-light-text dark:text-portfolio-text">{category}</p>
          </div>
        </div>

        {/* Created Date */}
        <div className="flex items-start gap-3">
          <Calendar size={18} className="text-portfolio-light-accent dark:text-portfolio-silver mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-portfolio-muted mb-1">Created</p>
            <p className="text-portfolio-light-text dark:text-portfolio-text">{formatMonthYear(createdAt)}</p>
          </div>
        </div>

        {/* Last Updated */}
        {lastUpdated && (
          <div className="flex items-start gap-3">
            <RefreshCw size={18} className="text-portfolio-light-accent dark:text-portfolio-silver mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-portfolio-muted mb-1">Last Updated</p>
              <p className="text-portfolio-light-text dark:text-portfolio-text">{formatRelativeTime(lastUpdated)}</p>
            </div>
          </div>
        )}

        {/* Auto-synced Badge */}
        {autoFetched && (
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border rounded-full text-xs text-portfolio-light-text dark:text-portfolio-text">
              <RefreshCw size={12} className="text-portfolio-light-accent dark:text-portfolio-silver" />
              <span>Auto-synced from GitHub</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
