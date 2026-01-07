import { Star, ExternalLink, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Supplier } from '@/data/suppliers';
import ScoreBadge from './ScoreBadge';
import ShipsBadge from './ShipsBadge';
import { useSavedSuppliers } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';

interface SupplierCardProps {
  supplier: Supplier;
}

const SupplierCard = ({ supplier }: SupplierCardProps) => {
  const [savedSuppliers, setSavedSuppliers] = useSavedSuppliers();
  
  const isSaved = savedSuppliers.some(s => s.supplierId === supplier.id);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isSaved) {
      setSavedSuppliers(prev => prev.filter(s => s.supplierId !== supplier.id));
    } else {
      setSavedSuppliers(prev => [...prev, { supplierId: supplier.id, savedAt: new Date().toISOString() }]);
    }
  };

  const regionLabel = {
    UK: '🇬🇧 UK',
    EU: '🇪🇺 EU',
    WW: '🌍 Worldwide'
  };

  const crowdLabel = {
    quiet: 'Quiet',
    moderate: 'Moderate',
    saturated: 'Saturated'
  };

  return (
    <Link 
      to={`/supplier/${supplier.id}`}
      className="block bg-card rounded-lg border border-border p-4 card-hover animate-fade-in"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <ScoreBadge score={supplier.score} />
            <ShipsBadge shipsSingles={supplier.shipsSingles} />
          </div>

          {/* Name */}
          <h3 className="font-semibold text-card-foreground mt-2 truncate">
            {supplier.name}
          </h3>

          {/* Best For */}
          <p className="text-sm text-muted-foreground mt-1">
            {supplier.bestFor}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
            <span>{regionLabel[supplier.region]}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>{crowdLabel[supplier.crowdedness]} competition</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="capitalize">{supplier.margin} margin</span>
          </div>

          {/* Brands */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {supplier.brands.slice(0, 4).map(brand => (
              <span 
                key={brand}
                className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-md text-xs"
              >
                {brand}
              </span>
            ))}
            {supplier.brands.length > 4 && (
              <span className="px-2 py-0.5 text-muted-foreground text-xs">
                +{supplier.brands.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={cn(
            'p-2 rounded-lg transition-all duration-200 flex-shrink-0',
            isSaved 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          <Star className={cn('w-4 h-4', isSaved && 'fill-current')} />
        </button>
      </div>

      {/* External Link */}
      {supplier.links.site && (
        <div className="mt-3 pt-3 border-t border-border">
          <span className="flex items-center gap-1.5 text-xs text-primary">
            <Globe className="w-3 h-3" />
            <span className="truncate">{supplier.links.site.replace('https://', '').replace('www.', '')}</span>
            <ExternalLink className="w-3 h-3 flex-shrink-0" />
          </span>
        </div>
      )}
    </Link>
  );
};

export default SupplierCard;
