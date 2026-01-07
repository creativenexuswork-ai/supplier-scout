import { useState, useMemo } from 'react';
import { Building2, Eye, EyeOff } from 'lucide-react';
import { suppliers, SupplierCategory, getVisibleSuppliers } from '@/data/suppliers';
import SupplierCard from '@/components/SupplierCard';
import { cn } from '@/lib/utils';

const supplierCategoryLabels: Record<SupplierCategory, string> = {
  core: 'Core Exclusives',
  boutique: 'Boutique / Niche',
  utility: 'Utility',
  reps: 'Reps'
};

const supplierCategoryOrder: SupplierCategory[] = ['core', 'boutique', 'utility'];

const Suppliers = () => {
  const [showUtility, setShowUtility] = useState(false);

  // Get visible suppliers (never show reps here)
  const visibleSuppliers = useMemo(() => {
    return getVisibleSuppliers(showUtility);
  }, [showUtility]);

  // Group by supplier category
  const groupedSuppliers = useMemo(() => {
    const groups: Partial<Record<SupplierCategory, typeof visibleSuppliers>> = {};
    
    for (const category of supplierCategoryOrder) {
      const suppliersInCategory = visibleSuppliers.filter(s => s.supplierCategory === category);
      if (suppliersInCategory.length > 0) {
        groups[category] = suppliersInCategory;
      }
    }
    
    return groups;
  }, [visibleSuppliers]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Supplier Index</h1>
                <p className="text-sm text-muted-foreground">
                  {visibleSuppliers.length} verified suppliers
                </p>
              </div>
            </div>

            {/* Show/Hide Utility Toggle */}
            <button
              onClick={() => setShowUtility(!showUtility)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border transition-colors',
                showUtility 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'bg-secondary text-secondary-foreground border-border hover:border-primary/50'
              )}
            >
              {showUtility ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showUtility ? 'Hide Utility' : 'Show Utility'}
            </button>
          </div>
        </div>
      </div>

      {/* Content - Grouped by Supplier Category */}
      <div className="container mx-auto px-4 py-6 space-y-10">
        {supplierCategoryOrder.map(category => {
          const suppliersInCategory = groupedSuppliers[category];
          if (!suppliersInCategory || suppliersInCategory.length === 0) return null;

          return (
            <div key={category}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  {supplierCategoryLabels[category]}
                </h2>
                <span className="text-sm text-muted-foreground">
                  ({suppliersInCategory.length})
                </span>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {suppliersInCategory.map(supplier => (
                  <SupplierCard key={supplier.id} supplier={supplier} />
                ))}
              </div>
            </div>
          );
        })}

        {visibleSuppliers.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No suppliers</h3>
            <p className="text-muted-foreground text-sm">
              No suppliers available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Suppliers;
