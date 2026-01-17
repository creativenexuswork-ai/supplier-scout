import { PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShipsBadgeProps {
  shipsSingles: boolean;
  showLabel?: boolean;
  className?: string;
}

const ShipsBadge = ({ shipsSingles, showLabel = true, className }: ShipsBadgeProps) => {
  // If shipsSingles is false, render nothing
  if (!shipsSingles) return null;

  return (
    <span 
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
        'bg-badge-success text-badge-success-foreground',
        className
      )}
    >
      <PackageCheck className="w-3 h-3" />
      {showLabel && <span>Ships Singles</span>}
    </span>
  );
};

export default ShipsBadge;