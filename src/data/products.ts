export type ItemType = 'shoes' | 'clothing' | 'bags' | 'accessories' | 'gifts';
export type ProductCategory = 'sneakers' | 'clothing' | 'bags' | 'gifts' | 'general';

export interface Product {
  id: string;
  title: string;
  brand: string;
  itemType: ItemType;
  category: ProductCategory;
  imageUrl: string;
  supplierId: string;
  tags?: string[];
  note?: string;
}

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

// Sample products for demonstration
export const sampleProducts: Product[] = [
  {
    id: 'p1',
    title: 'Air Jordan 1 Retro High OG',
    brand: 'Jordan',
    itemType: 'shoes',
    category: 'sneakers',
    imageUrl: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop',
    supplierId: 'jd-trade',
    tags: ['hype', 'limited']
  },
  {
    id: 'p2',
    title: 'Classic Leather Tote',
    brand: 'Furla',
    itemType: 'bags',
    category: 'bags',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
    supplierId: 'b2b-griffati',
    tags: ['premium', 'bestseller']
  },
  {
    id: 'p3',
    title: 'Essential Logo Hoodie',
    brand: 'Tommy Hilfiger',
    itemType: 'clothing',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
    supplierId: 'brandsdistribution',
    tags: ['staple']
  },
  {
    id: 'p4',
    title: 'New Balance 550',
    brand: 'New Balance',
    itemType: 'shoes',
    category: 'sneakers',
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop',
    supplierId: 'jd-trade',
    tags: ['trending']
  },
  {
    id: 'p5',
    title: 'Quilted Chain Bag',
    brand: 'Pinko',
    itemType: 'bags',
    category: 'bags',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    supplierId: 'b2b-griffati',
    tags: ['premium']
  },
  {
    id: 'p6',
    title: 'Carhartt WIP Chase Hoodie',
    brand: 'Carhartt WIP',
    itemType: 'clothing',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop',
    supplierId: 'slamjam',
    tags: ['streetwear']
  },
  {
    id: 'p7',
    title: 'Scented Candle Set',
    brand: 'Ancient Wisdom',
    itemType: 'gifts',
    category: 'gifts',
    imageUrl: 'https://images.unsplash.com/photo-1602607753145-80dc60e1e920?w=400&h=400&fit=crop',
    supplierId: 'ancient-wisdom',
    tags: ['bundle']
  },
  {
    id: 'p8',
    title: 'Guess Logo T-Shirt',
    brand: 'Guess',
    itemType: 'clothing',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    supplierId: 'brandsdistribution',
    tags: ['staple']
  },
  {
    id: 'p9',
    title: 'Nike Dunk Low Panda',
    brand: 'Nike',
    itemType: 'shoes',
    category: 'sneakers',
    imageUrl: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400&h=400&fit=crop',
    supplierId: 'jd-trade',
    tags: ['hype', 'bestseller']
  },
  {
    id: 'p10',
    title: 'Liu Jo Crossbody',
    brand: 'Liu Jo',
    itemType: 'bags',
    category: 'bags',
    imageUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop',
    supplierId: 'b2b-griffati',
    tags: ['premium']
  },
  {
    id: 'p11',
    title: 'Stone Island Compass Patch Crewneck',
    brand: 'Stone Island',
    itemType: 'clothing',
    category: 'clothing',
    imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop',
    supplierId: 'slamjam',
    tags: ['premium', 'streetwear']
  },
  {
    id: 'p12',
    title: 'Novelty Gift Mug Set',
    brand: 'Puckator Originals',
    itemType: 'gifts',
    category: 'gifts',
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop',
    supplierId: 'puckator',
    tags: ['bundle', 'bestseller']
  }
];
