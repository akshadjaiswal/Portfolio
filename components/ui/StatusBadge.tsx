import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export default function StatusBadge() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="relative flex h-2.5 w-2.5 cursor-default">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-portfolio-accent-success/50" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-portfolio-accent-success" />
        </span>
      </TooltipTrigger>
      <TooltipContent>Available for work</TooltipContent>
    </Tooltip>
  );
}
