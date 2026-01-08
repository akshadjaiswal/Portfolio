import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn(
      'max-w-portfolio mx-auto px-4 sm:px-6',
      className
    )}>
      {children}
    </div>
  );
}
