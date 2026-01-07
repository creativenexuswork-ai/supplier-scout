import { useState, useMemo } from 'react';
import { Bookmark, Trash2, MessageSquare, X, Package } from 'lucide-react';
import { useSavedProducts } from '@/hooks/useLocalStorage';
import { getSupplierById } from '@/data/suppliers';
import ScoreBadge from '@/components/ScoreBadge';
import ShipsBadge from '@/components/ShipsBadge';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const Saved = () => {
  const [savedProducts, setSavedProducts] = useSavedProducts();
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [supplierFilter, setSupplierFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteValue, setNoteValue] = useState('');
  const [groupBySupplier, setGroupBySupplier] = useState(false);

  // Get unique values for filters
  const uniqueBrands = [...new Set(savedProducts.map(p => p.brand))].sort();
  const uniqueSuppliers = [...new Set(savedProducts.map(p => p.supplierId))];
  const uniqueCategories = [...new Set(savedProducts.map(p => p.category))];

  // Filter products
  const filteredProducts = useMemo(() => {
    return savedProducts.filter(p => {
      if (brandFilter !== 'all' && p.brand !== brandFilter) return false;
      if (supplierFilter !== 'all' && p.supplierId !== supplierFilter) return false;
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      return true;
    });
  }, [savedProducts, brandFilter, supplierFilter, categoryFilter]);

  // Group by supplier if enabled
  const groupedProducts = useMemo(() => {
    if (!groupBySupplier) return null;
    
    const groups: Record<string, typeof filteredProducts> = {};
    filteredProducts.forEach(p => {
      if (!groups[p.supplierId]) groups[p.supplierId] = [];
      groups[p.supplierId].push(p);
    });
    return groups;
  }, [filteredProducts, groupBySupplier]);

  const handleRemove = (productId: string) => {
    setSavedProducts(prev => prev.filter(p => p.productId !== productId));
  };

  const handleEditNote = (productId: string, currentNote?: string) => {
    setEditingNote(productId);
    setNoteValue(currentNote || '');
  };

  const handleSaveNote = () => {
    if (editingNote) {
      setSavedProducts(prev => 
        prev.map(p => 
          p.productId === editingNote 
            ? { ...p, note: noteValue || undefined }
            : p
        )
      );
      setEditingNote(null);
      setNoteValue('');
    }
  };

  const renderProductCard = (product: typeof savedProducts[0]) => {
    const supplier = getSupplierById(product.supplierId);
    
    return (
      <div 
        key={product.productId}
        className="bg-card rounded-lg overflow-hidden border border-border card-hover animate-fade-in"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Remove Button */}
          <button
            onClick={() => handleRemove(product.productId)}
            className="absolute top-2 right-2 p-2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Score Badge */}
          <div className="absolute top-2 left-2">
            <ScoreBadge score={product.supplierScore} size="sm" />
          </div>
        </div>

        {/* Content */}
        <div className="p-3 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {product.brand}
          </p>
          
          <h3 className="font-medium text-sm text-card-foreground line-clamp-2 leading-tight">
            {product.title}
          </h3>

          {/* Supplier */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground truncate">
              {supplier?.name.split('/')[0].trim() || 'Unknown'}
            </span>
            {supplier && <ShipsBadge shipsSingles={supplier.shipsSingles} showLabel={false} />}
          </div>

          {/* Note */}
          {editingNote === product.productId ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={noteValue}
                onChange={(e) => setNoteValue(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 px-2 py-1 text-xs bg-secondary border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleSaveNote()}
              />
              <button
                onClick={handleSaveNote}
                className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-md"
              >
                Save
              </button>
              <button
                onClick={() => setEditingNote(null)}
                className="p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleEditNote(product.productId, product.note)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              {product.note ? (
                <span className="italic truncate">{product.note}</span>
              ) : (
                <span>Add note</span>
              )}
            </button>
          )}

          <Link 
            to={`/supplier/${product.supplierId}`}
            className="block text-xs text-primary hover:text-primary/80 transition-colors pt-1"
          >
            View supplier →
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Saved Items</h1>
              <p className="text-sm text-muted-foreground">
                {savedProducts.length} items saved
              </p>
            </div>
          </div>

          {/* Filters */}
          {savedProducts.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <Select value={brandFilter} onValueChange={setBrandFilter}>
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {uniqueBrands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                <SelectTrigger className="w-[160px] h-9">
                  <SelectValue placeholder="All Suppliers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suppliers</SelectItem>
                  {uniqueSuppliers.map(id => {
                    const supplier = getSupplierById(id);
                    return (
                      <SelectItem key={id} value={id}>
                        {supplier?.name.split('/')[0].trim() || id}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map(cat => (
                    <SelectItem key={cat} value={cat} className="capitalize">{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <button
                onClick={() => setGroupBySupplier(!groupBySupplier)}
                className={cn(
                  'px-3 py-1.5 text-sm rounded-lg border transition-colors',
                  groupBySupplier 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-secondary text-secondary-foreground border-border hover:border-primary/50'
                )}
              >
                Group by Supplier
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {savedProducts.length === 0 ? (
          <div className="text-center py-16">
            <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No saved items yet</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Start saving products by clicking the star icon
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Package className="w-4 h-4" />
              Browse Products
            </Link>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-foreground mb-2">No matches</h3>
            <p className="text-muted-foreground text-sm">
              Try adjusting your filters
            </p>
          </div>
        ) : groupBySupplier && groupedProducts ? (
          <div className="space-y-8">
            {Object.entries(groupedProducts).map(([supplierId, products]) => {
              const supplier = getSupplierById(supplierId);
              return (
                <div key={supplierId}>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="font-semibold text-foreground">
                      {supplier?.name.split('/')[0].trim() || supplierId}
                    </h2>
                    {supplier && <ScoreBadge score={supplier.score} size="sm" />}
                    <span className="text-sm text-muted-foreground">
                      ({products.length} items)
                    </span>
                  </div>
                  <div className="product-grid">
                    {products.map(renderProductCard)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(renderProductCard)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
