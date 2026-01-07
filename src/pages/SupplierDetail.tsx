import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Globe, Star, Package, Search } from 'lucide-react';
import { getSupplierById } from '@/data/suppliers';
import { getProductsBySupplierId } from '@/data/products';
import { useSavedProducts, useSavedSuppliers } from '@/hooks/useLocalStorage';
import { searchWithinSupplier } from '@/lib/searchEngine';
import ScoreBadge from '@/components/ScoreBadge';
import ShipsBadge from '@/components/ShipsBadge';
import ProductCard from '@/components/ProductCard';
import { cn } from '@/lib/utils';

const SupplierDetail = () => {
  const { id } = useParams<{ id: string }>();
  const supplier = id ? getSupplierById(id) : undefined;
  const [savedSuppliers, setSavedSuppliers] = useSavedSuppliers();
  const [searchQuery, setSearchQuery] = useState('');

  const isSaved = savedSuppliers.some(s => s.supplierId === id);

  const handleSave = () => {
    if (!id) return;
    
    if (isSaved) {
      setSavedSuppliers(prev => prev.filter(s => s.supplierId !== id));
    } else {
      setSavedSuppliers(prev => [...prev, { supplierId: id, savedAt: new Date().toISOString() }]);
    }
  };

  // Get ALL products from this supplier (full inventory)
  // When search query is empty, show all. When typing, filter.
  const supplierProducts = useMemo(() => {
    if (!id) return [];
    return searchWithinSupplier(id, searchQuery);
  }, [id, searchQuery]);

  if (!supplier) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Supplier not found</h2>
          <Link to="/suppliers" className="text-primary hover:underline">
            Back to suppliers
          </Link>
        </div>
      </div>
    );
  }

  const regionLabel = {
    UK: '🇬🇧 United Kingdom',
    EU: '🇪🇺 European Union',
    WW: '🌍 Worldwide'
  };

  const marginLabel = {
    high: 'High margins',
    medium: 'Medium margins',
    low: 'Low margins',
    'medium-high': 'Medium-high margins',
    'low-medium': 'Low-medium margins'
  };

  const exclusivityLabel = {
    exclusive: 'Exclusive',
    semi: 'Semi-Exclusive',
    utility: 'Utility',
    reps: 'Reps'
  };

  const exclusivityColor = {
    exclusive: 'text-badge-success-foreground bg-badge-success/20',
    semi: 'text-badge-info-foreground bg-badge-info/20',
    utility: 'text-muted-foreground bg-muted',
    reps: 'text-badge-warning-foreground bg-badge-warning/20'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border py-6">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link 
            to="/suppliers"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to suppliers
          </Link>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                <ScoreBadge score={supplier.leverageScore} size="lg" />
                <ShipsBadge shipsSingles={supplier.shipsSingles} />
                <span className={cn(
                  'px-2 py-0.5 rounded text-xs font-medium',
                  exclusivityColor[supplier.exclusivityTier]
                )}>
                  {exclusivityLabel[supplier.exclusivityTier]}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {supplier.name}
              </h1>

              {/* Best For */}
              <p className="text-lg text-muted-foreground mb-4">
                {supplier.bestFor}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2 text-foreground">
                  {regionLabel[supplier.region]}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-foreground capitalize">
                  {marginLabel[supplier.margin]}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-foreground">
                  Leverage Score: {supplier.leverageScore}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSave}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
                  isSaved 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                <Star className={cn('w-4 h-4', isSaved && 'fill-current')} />
                {isSaved ? 'Saved' : 'Save Supplier'}
              </button>

              {supplier.links.site && (
                <a
                  href={supplier.links.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Visit Site
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              {supplier.links.portal && (
                <a
                  href={supplier.links.portal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors"
                >
                  Portal
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Brands */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Brands Available</h3>
            <div className="flex flex-wrap gap-2">
              {supplier.brands.map(brand => (
                <span 
                  key={brand}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Scoped Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search within this supplier..."
              className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Full Inventory */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            {searchQuery ? `Results for "${searchQuery}"` : 'Full Inventory'} ({supplierProducts.length})
          </h2>
          
          {supplierProducts.length > 0 ? (
            <div className="product-grid">
              {supplierProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchQuery ? 'No products match your search' : 'No products yet'}
              </h3>
              <p className="text-muted-foreground text-sm">
                {searchQuery ? 'Try a different search term' : 'Products from this supplier will appear here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;
