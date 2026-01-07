import { useState, useMemo } from 'react';
import { Package, TrendingUp } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import FilterBar, { Filters } from '@/components/FilterBar';
import ProductCard from '@/components/ProductCard';
import { searchProducts, getRelaxedResults } from '@/lib/searchEngine';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({});

  const handleSearch = (query: string) => {
    setActiveQuery(query);
  };

  const { products, message } = useMemo(() => {
    if (!activeQuery && !Object.values(filters).some(Boolean)) {
      // Show all products when no search/filters
      const result = getRelaxedResults('');
      return { products: result.products, message: '' };
    }
    
    const searchResults = searchProducts(activeQuery, {
      supplierId: filters.supplier,
      region: filters.region,
      shipsSingles: filters.shipsSingles,
      minScore: filters.minScore
    });

    if (searchResults.length === 0) {
      const relaxed = getRelaxedResults(activeQuery);
      return { products: relaxed.products, message: relaxed.message };
    }

    return { products: searchResults, message: '' };
  }, [activeQuery, filters]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-nav py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-nav-foreground mb-2">
              Supplier Intelligence
            </h1>
            <p className="text-nav-foreground/70 text-sm sm:text-base">
              Search products, discover suppliers, make informed decisions
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
        {/* Filter Bar */}
        <div className="mb-6">
          <FilterBar filters={filters} onChange={setFilters} />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {activeQuery ? (
              <>
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">
                  Results for "{activeQuery}"
                </span>
              </>
            ) : (
              <>
                <Package className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">
                  All Products
                </span>
              </>
            )}
            <span className="text-sm text-muted-foreground">
              ({products.length} items)
            </span>
          </div>
        </div>

        {/* Fallback Message */}
        {message && (
          <div className="mb-4 p-3 bg-badge-warning/20 text-badge-warning-foreground rounded-lg text-sm">
            {message}
          </div>
        )}

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
