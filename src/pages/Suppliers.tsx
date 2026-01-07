import { useState, useMemo } from 'react';
import { Building2 } from 'lucide-react';
import { suppliers, Category } from '@/data/suppliers';
import SupplierCard from '@/components/SupplierCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const categories: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'sneakers', label: 'Sneakers' },
  { value: 'bags', label: 'Bags' },
  { value: 'gifts', label: 'Gifts' },
  { value: 'general', label: 'General' }
];

const Suppliers = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');

  const filteredSuppliers = useMemo(() => {
    if (activeCategory === 'all') {
      return [...suppliers].sort((a, b) => b.score - a.score);
    }
    return suppliers
      .filter(s => s.category === activeCategory)
      .sort((a, b) => b.score - a.score);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Supplier Index</h1>
              <p className="text-sm text-muted-foreground">
                {suppliers.length} verified suppliers
              </p>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as Category | 'all')}>
            <TabsList className="w-full justify-start h-auto flex-wrap gap-1 bg-transparent p-0">
              {categories.map(cat => (
                <TabsTrigger 
                  key={cat.value} 
                  value={cat.value}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-lg border border-transparent data-[state=active]:border-primary"
                >
                  {cat.label}
                  {cat.value !== 'all' && (
                    <span className="ml-1.5 text-xs opacity-70">
                      ({suppliers.filter(s => s.category === cat.value).length})
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {filteredSuppliers.length === 0 ? (
          <div className="text-center py-16">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No suppliers</h3>
            <p className="text-muted-foreground text-sm">
              No suppliers found in this category
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSuppliers.map(supplier => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Suppliers;
