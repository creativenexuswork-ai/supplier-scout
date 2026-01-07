import { Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product, isValidProduct } from '@/data/products';
import { getSupplierById } from '@/data/suppliers';
import ScoreBadge from './ScoreBadge';
import ShipsBadge from './ShipsBadge';
import { useSavedProducts, SavedProduct } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const supplier = getSupplierById(product.supplierId);
  const [savedProducts, setSavedProducts] = useSavedProducts();
  
  const isSaved = savedProducts.some(p => p.productId === product.id);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isSaved) {
      setSavedProducts(prev => prev.filter(p => p.productId !== product.id));
    } else if (supplier) {
      const newSaved: SavedProduct = {
        productId: product.id,
        title: product.name,
        brand: product.brand,
        itemType: product.itemType,
        imageUrl: product.imageUrl,
        supplierId: product.supplierId,
        supplierScore: supplier.leverageScore,
        category: product.category,
        savedAt: new Date().toISOString(),
        price: product.price,
        currency: product.currency
      };
      setSavedProducts(prev => [...prev, newSaved]);
    }
  };

  // Do not render if product is invalid (missing imageUrl or price)
  if (!supplier || !isValidProduct(product)) return null;

  const formatPrice = (price: number, currency: string) => {
    const symbol = currency === 'GBP' ? '£' : '€';
    return `${symbol}${price.toFixed(2)}`;
  };

  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border card-hover animate-fade-in">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Save Button */}
        <button
          onClick={handleSave}
          className={cn(
            'absolute top-2 right-2 p-2 rounded-full transition-all duration-200',
            isSaved 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-card/80 backdrop-blur-sm text-foreground hover:bg-card'
          )}
        >
          <Star className={cn('w-4 h-4', isSaved && 'fill-current')} />
        </button>

        {/* Score Badge */}
        <div className="absolute top-2 left-2">
          <ScoreBadge score={supplier.leverageScore} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        {/* Brand */}
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {product.brand}
        </p>
        
        {/* Title */}
        <h3 className="font-medium text-sm text-card-foreground line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Price */}
        <p className="text-sm font-semibold text-primary">
          {formatPrice(product.price, product.currency)}
        </p>

        {/* Supplier Info */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs text-muted-foreground truncate">
              {supplier.name.split('/')[0].trim()}
            </span>
          </div>
          <ShipsBadge shipsSingles={supplier.shipsSingles} showLabel={false} />
        </div>

        {/* View Supplier Link */}
        <Link 
          to={`/supplier/${supplier.id}`}
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors pt-1"
        >
          <span>View supplier</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
