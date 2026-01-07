import { cn } from '@/lib/utils';

interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ScoreBadge = ({ score, size = 'md', className }: ScoreBadgeProps) => {
  const getScoreClass = (score: number) => {
    if (score >= 8) return 'score-high';
    if (score >= 6.5) return 'score-medium';
    return 'score-low';
  };

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-0.5',
    lg: 'text-base px-2.5 py-1'
  };

  return (
    <span 
      className={cn(
        'score-badge font-semibold',
        getScoreClass(score),
        sizeClasses[size],
        className
      )}
    >
      {score.toFixed(1)}
    </span>
  );
};

export default ScoreBadge;
