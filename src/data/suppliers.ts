export type Category = 'clothing' | 'sneakers' | 'bags' | 'gifts' | 'general';
export type ShipsSingles = 'yes' | 'mixed' | 'no';
export type Region = 'UK' | 'EU' | 'WW';
export type Margin = 'high' | 'medium' | 'low' | 'medium-high' | 'low-medium';
export type Crowdedness = 'quiet' | 'moderate' | 'saturated';

export interface Supplier {
  id: string;
  name: string;
  category: Category;
  bestFor: string;
  brands: string[];
  shipsSingles: ShipsSingles;
  region: Region;
  margin: Margin;
  crowdedness: Crowdedness;
  score: number;
  links: {
    site?: string;
    portal?: string;
  };
}

export const suppliers: Supplier[] = [
  // CLOTHING
  {
    id: 'brandsdistribution',
    name: 'BrandsDistribution / BDroppy',
    category: 'clothing',
    bestFor: 'Designer dropship',
    brands: ['Guess', 'Calvin Klein', 'Tommy Hilfiger', 'Armani', 'Diesel', 'Michael Kors'],
    shipsSingles: 'yes',
    region: 'EU',
    margin: 'medium-high',
    crowdedness: 'moderate',
    score: 8,
    links: {
      site: 'https://www.brandsdistribution.com',
      portal: 'https://www.bdroppy.com'
    }
  },
  {
    id: 'brandsgateway',
    name: 'BrandsGateway',
    category: 'clothing',
    bestFor: 'Wide brand range',
    brands: ['Versace', 'Moschino', 'Hugo Boss', 'Ralph Lauren', 'Lacoste'],
    shipsSingles: 'yes',
    region: 'WW',
    margin: 'medium',
    crowdedness: 'saturated',
    score: 7,
    links: {
      site: 'https://www.brandsgateway.com'
    }
  },
  {
    id: 'matterhorn',
    name: 'Matterhorn Wholesale',
    category: 'clothing',
    bestFor: 'Quiet margin plays',
    brands: ['Levi\'s', 'Superdry', 'G-Star Raw', 'Pepe Jeans'],
    shipsSingles: 'yes',
    region: 'EU',
    margin: 'medium',
    crowdedness: 'quiet',
    score: 7.5,
    links: {
      site: 'https://b2b.mfrn.pl'
    }
  },
  // SNEAKERS & STREETWEAR
  {
    id: 'jd-trade',
    name: 'JD / Size? / Footlocker Trade',
    category: 'sneakers',
    bestFor: 'Hype sneaker access',
    brands: ['Nike', 'Jordan', 'Adidas', 'New Balance', 'Puma', 'ASICS'],
    shipsSingles: 'mixed',
    region: 'UK',
    margin: 'high',
    crowdedness: 'quiet',
    score: 9,
    links: {
      site: 'https://www.jdsports.co.uk'
    }
  },
  {
    id: 'slamjam',
    name: 'Slam Jam / One Block Down',
    category: 'sneakers',
    bestFor: 'Streetwear curation',
    brands: ['Stüssy', 'Carhartt WIP', 'Stone Island', 'Off-White', 'AMBUSH'],
    shipsSingles: 'mixed',
    region: 'EU',
    margin: 'medium',
    crowdedness: 'moderate',
    score: 7.5,
    links: {
      site: 'https://www.slamjam.com'
    }
  },
  // BAGS & ACCESSORIES
  {
    id: 'b2b-griffati',
    name: 'B2B Griffati',
    category: 'bags',
    bestFor: 'Premium leather bags',
    brands: ['Furla', 'Coccinelle', 'Pinko', 'Liu Jo', 'Guess Bags'],
    shipsSingles: 'yes',
    region: 'EU',
    margin: 'high',
    crowdedness: 'quiet',
    score: 9.5,
    links: {
      site: 'https://b2b.griffati.it'
    }
  },
  {
    id: 'luxury-brands-dist',
    name: 'Luxury Brands Distribution',
    category: 'bags',
    bestFor: 'High-end accessories',
    brands: ['Burberry', 'Prada', 'Gucci', 'YSL', 'Bottega Veneta'],
    shipsSingles: 'yes',
    region: 'EU',
    margin: 'high',
    crowdedness: 'quiet',
    score: 9,
    links: {
      site: 'https://luxurybrandsdistribution.com'
    }
  },
  // GIFTS / ADD-ONS
  {
    id: 'puckator',
    name: 'Puckator',
    category: 'gifts',
    bestFor: 'Gift bundles',
    brands: ['Puckator Originals', 'Licensed Characters'],
    shipsSingles: 'yes',
    region: 'UK',
    margin: 'medium',
    crowdedness: 'moderate',
    score: 7.5,
    links: {
      site: 'https://www.puckator.co.uk'
    }
  },
  {
    id: 'ancient-wisdom',
    name: 'Ancient Wisdom',
    category: 'gifts',
    bestFor: 'Candles & wellness',
    brands: ['Ancient Wisdom', 'Stamford'],
    shipsSingles: 'yes',
    region: 'UK',
    margin: 'medium',
    crowdedness: 'quiet',
    score: 7,
    links: {
      site: 'https://www.ancientwisdom.biz'
    }
  },
  // GENERAL / BACKUP
  {
    id: 'avasam',
    name: 'Avasam',
    category: 'general',
    bestFor: 'UK dropship backup',
    brands: ['Mixed'],
    shipsSingles: 'yes',
    region: 'UK',
    margin: 'low-medium',
    crowdedness: 'saturated',
    score: 6,
    links: {
      site: 'https://www.avasam.com'
    }
  },
  {
    id: 'bigbuy',
    name: 'BigBuy',
    category: 'general',
    bestFor: 'EU general backup',
    brands: ['Mixed'],
    shipsSingles: 'yes',
    region: 'EU',
    margin: 'low-medium',
    crowdedness: 'saturated',
    score: 6,
    links: {
      site: 'https://www.bigbuy.eu'
    }
  }
];

export const getSupplierById = (id: string): Supplier | undefined => {
  return suppliers.find(s => s.id === id);
};

export const getSuppliersByCategory = (category: Category): Supplier[] => {
  return suppliers.filter(s => s.category === category).sort((a, b) => b.score - a.score);
};

export const getAllBrands = (): string[] => {
  const brands = new Set<string>();
  suppliers.forEach(s => s.brands.forEach(b => brands.add(b)));
  return Array.from(brands).sort();
};
