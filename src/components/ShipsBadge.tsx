import { Package, PackageCheck, PackageX } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ShipsSingles } from '@/data/suppliers';

interface ShipsBadgeProps {
  shipsSingles: ShipsSingles;
  showLabel?: boolean;
  className?: string;
}

const ShipsBadge = ({ shipsSingles, showLabel = true, className }: ShipsBadgeProps) => {
  const config = {
    yes: {
      icon: PackageCheck,
      label: 'Ships Singles',
      className: 'bg-badge-success text-badge-success-foreground'
    },
    mixed: {
      icon: Package,
      label: 'Mixed MOQ',
      className: 'bg-badge-warning text-badge-warning-foreground'
    },
    no: {
      icon: PackageX,
      label: 'Bulk Only',
      className: 'bg-badge-muted text-badge-muted-foreground'
    }
  };

  const { icon: Icon, label, className: badgeClass } = config[shipsSingles];

  return (
    <span 
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
        badgeClass,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {showLabel && <span>{label}</span>}
    </span>
  );
};

export default ShipsBadge;
