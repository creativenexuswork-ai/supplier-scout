import { useState, useMemo } from 'react';
import { Star, Package, TrendingUp, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import FilterBar, { Filters } from '@/components/FilterBar';
import ProductCard from '@/components/ProductCard';
import { useSavedProducts } from '@/hooks/useLocalStorage';
import { searchProducts } from '@/lib/searchEngine';
import { sampleProducts, isValidProduct } from '@/data/products';
import { getSupplierById } from '@/data/suppliers';
import ScoreBadge from '@/components/ScoreBadge';
import ShipsBadge from '@/components/ShipsBadge';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({});
  const [savedProducts] = useSavedProducts();

  const handleSearch = (query: string) => {
    setActiveQuery(query);
  };

  // Global search results - only when user types
  const searchResults = useMemo(() => {
    if (!activeQuery.trim()) return [];
    
    return searchProducts(activeQuery, {
      supplierId: filters.supplier,
      region: filters.region,
      shipsSingles: filters.shipsSingles === 'yes' ? true : filters.shipsSingles === 'no' ? false : undefined,
      minScore: filters.minScore,
      includeUtility: false // Never include utility in global search
    });
  }, [activeQuery, filters]);

  // Convert saved products to displayable format
  const starredProductsToDisplay = useMemo(() => {
    return savedProducts
      .map(saved => {
        // Find the actual product from sample data
        const product = sampleProducts.find(p => p.id === saved.productId);
        return product && isValidProduct(product) ? product : null;
      })
      .filter(Boolean);
  }, [savedProducts]);

  const isSearchActive = activeQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-nav py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-nav-foreground mb-2">
              Supplier Scout
            </h1>
            <p className="text-nav-foreground/70 text-sm sm:text-base">
              Your working set • Search to discover more
            </p>
          </div>
          
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {isSearchActive ? (
          <>
            {/* Search Results Mode */}
            <div className="mb-6">
              <FilterBar filters={filters} onChange={setFilters} />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">
                  Results for "{activeQuery}"
                </span>
                <span className="text-sm text-muted-foreground">
                  ({searchResults.length} items)
                </span>
              </div>
              <button
                onClick={() => {
                  setActiveQuery('');
                  setSearchQuery('');
                }}
                className="text-sm text-primary hover:text-primary/80"
              >
                Clear search
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="product-grid">
                {searchResults.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground text-sm">
                  Try a different search term
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Main Page: Starred Products Only */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary fill-primary" />
                <span className="font-medium text-foreground">
                  Your Working Set
                </span>
                <span className="text-sm text-muted-foreground">
                  ({starredProductsToDisplay.length} items)
                </span>
              </div>
            </div>

            {starredProductsToDisplay.length > 0 ? (
              <div className="product-grid">
                {starredProductsToDisplay.map(product => (
                  product && <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No items in your working set</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Browse suppliers and star products to build your selling collection
                </p>
                <Link
                  to="/suppliers"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Building2 className="w-4 h-4" />
                  Browse Suppliers
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
