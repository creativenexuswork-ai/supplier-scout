export type ItemType = 'shoes' | 'clothing' | 'bags' | 'accessories' | 'gifts';
export type ProductCategory = 'sneakers' | 'clothing' | 'bags' | 'gifts' | 'general';
export type Currency = 'GBP' | 'EUR';

export interface Product {
  id: string;
  name: string;
  brand: string;
  itemType: ItemType;
  category: ProductCategory;
  imageUrl: string;
  price: number;
  currency: Currency;
  supplierId: string;
  tags?: string[];
}

// Validation: only render products with both imageUrl and price
export const isValidProduct = (product: Product): boolean => {
  return Boolean(product.imageUrl) && Boolean(product.price) && product.price > 0;
};

// Map itemType to category
export const itemTypeToCategory = (itemType: ItemType): ProductCategory => {
  switch (itemType) {
    case 'shoes':
      return 'sneakers';
    case 'clothing':
      return 'clothing';
    case 'bags':
    case 'accessories':
      return 'bags';
    case 'gifts':
      return 'gifts';
    default:
      return 'general';
  }
};

// Sample products - all must have imageUrl AND price
export const sampleProducts: Product[] = [
  // B2B Griffati products
  {
    id: 'p1',
    name: 'Classic Leather Tote',
    brand: 'Furla',
    itemType: 'bags',
    category: 'bags',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
    price: 189.99,
    currency: 'EUR',
    supplierId: 'b2b-griffati',
    tags: ['premium', 'bestseller']
  },
  {
    id: 'p2',
    name: 'Quilted Chain Bag',
    brand: 'Pinko',
    itemType: 'bags',
    category: 'bags',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    price: 245.00,
    currency: 'EUR',
    supplierId: 'b2b-griffati',
    tags: ['premium']
  },
  {
    id: 'p3',
    name: 'Liu Jo Crossbody',
    brand: 'Liu Jo',
    itemType: 'bags',
    category: 'bags',
    imageUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop',
    price: 165.00,
    currency: 'EUR',
    supplierId: 'b2b-griffati',
    tags: ['premium']
  },

  // BrandsDistribution products
  {
    id: 'p4',
    name: 'Essential Logo Hoodie',
    brand: 'Tommy Hilfiger',
    itemType: 'clothing',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
    price: 89.99,
    currency: 'EUR',
    supplierId: 'brandsdistribution',
    tags: ['staple']
  },
  {
    id: 'p5',
    name: 'Guess Logo T-Shirt',
    brand: 'Guess',
    itemType: 'clothing',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    price: 45.00,
    currency: 'EUR',
    supplierId: 'brandsdistribution',
    tags: ['staple']
  },

  // Slam Jam products
  {
    id: 'p6',
    name: 'Carhartt WIP Chase Hoodie',
    brand: 'Carhartt WIP',
    itemType: 'clothing',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop',
    price: 95.00,
    currency: 'EUR',
    supplierId: 'slamjam',
    tags: ['streetwear']
  },
  {
    id: 'p7',
    name: 'Stone Island Compass Patch Crewneck',
    brand: 'Stone Island',
    itemType: 'clothing',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop',
    price: 285.00,
    currency: 'EUR',
    supplierId: 'slamjam',
    tags: ['premium', 'streetwear']
  },
  {
    id: 'p8',
    name: 'Stüssy Basic Logo Tee',
    brand: 'Stüssy',
    itemType: 'clothing',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
    price: 55.00,
    currency: 'EUR',
    supplierId: 'slamjam',
    tags: ['streetwear']
  },

  // Style Centre products
  {
    id: 'p9',
    name: 'Calvin Klein Slim Fit Shirt',
    brand: 'Calvin Klein',
    itemType: 'clothing',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
    price: 75.00,
    currency: 'GBP',
    supplierId: 'style-centre',
    tags: ['classic']
  },
  {
    id: 'p10',
    name: 'DKNY Logo Sweatshirt',
    brand: 'DKNY',
    itemType: 'clothing',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop',
    price: 85.00,
    currency: 'GBP',
    supplierId: 'style-centre',
    tags: ['urban']
  },

  // Luxury Brands Distribution
  {
    id: 'p11',
    name: 'YSL Envelope Clutch',
    brand: 'YSL',
    itemType: 'bags',
    category: 'bags',
    imageUrl: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=400&fit=crop',
    price: 895.00,
    currency: 'EUR',
    supplierId: 'luxury-brands-dist',
    tags: ['luxury', 'premium']
  },
  {
    id: 'p12',
    name: 'Gucci Marmont Mini',
    brand: 'Gucci',
    itemType: 'bags',
    category: 'bags',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
    price: 1250.00,
    currency: 'EUR',
    supplierId: 'luxury-brands-dist',
    tags: ['luxury', 'iconic']
  },

  // Matterhorn Wholesale
  {
    id: 'p13',
    name: 'Levi\'s 501 Original Jeans',
    brand: 'Levi\'s',
    itemType: 'clothing',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    price: 65.00,
    currency: 'EUR',
    supplierId: 'matterhorn',
    tags: ['classic', 'bestseller']
  },
  {
    id: 'p14',
    name: 'Superdry Windcheater',
    brand: 'Superdry',
    itemType: 'clothing',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop',
    price: 89.00,
    currency: 'EUR',
    supplierId: 'matterhorn',
    tags: ['outerwear']
  },

  // BrandsGateway
  {
    id: 'p15',
    name: 'Versace Medusa T-Shirt',
    brand: 'Versace',
    itemType: 'clothing',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop',
    price: 195.00,
    currency: 'EUR',
    supplierId: 'brandsgateway',
    tags: ['luxury']
  },
  {
    id: 'p16',
    name: 'Hugo Boss Polo',
    brand: 'Hugo Boss',
    itemType: 'clothing',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1625910513413-5fc4e5d6e764?w=400&h=400&fit=crop',
    price: 85.00,
    currency: 'EUR',
    supplierId: 'brandsgateway',
    tags: ['classic']
  },

  // Stylewise Direct
  {
    id: 'p17',
    name: 'Ted Baker Blazer',
    brand: 'Ted Baker',
    itemType: 'clothing',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop',
    price: 175.00,
    currency: 'GBP',
    supplierId: 'stylewise-direct',
    tags: ['formal']
  },

  // Paris Fashion Shops
  {
    id: 'p18',
    name: 'Sandro Knit Sweater',
    brand: 'Sandro',
    itemType: 'clothing',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
    price: 145.00,
    currency: 'EUR',
    supplierId: 'paris-fashion-shops',
    tags: ['french', 'premium']
  }
];

// Get all valid products (with imageUrl and price)
export const getValidProducts = (): Product[] => {
  return sampleProducts.filter(isValidProduct);
};

// Get products by supplier
export const getProductsBySupplierId = (supplierId: string): Product[] => {
  return getValidProducts().filter(p => p.supplierId === supplierId);
};
