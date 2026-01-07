export type Category = 'clothing' | 'sneakers' | 'bags' | 'gifts' | 'general';
export type ShipsSingles = 'yes' | 'mixed' | 'no';
export type Region = 'UK' | 'EU' | 'WW';
export type Margin = 'high' | 'medium' | 'low' | 'medium-high' | 'low-medium';
export type Crowdedness = 'quiet' | 'moderate' | 'saturated';
export type SupplierCategory = 'core' | 'boutique' | 'utility' | 'reps';
export type ExclusivityTier = 'exclusive' | 'semi' | 'utility' | 'reps';

export interface Supplier {
  id: string;
  name: string;
  category: Category;
  supplierCategory: SupplierCategory;
  exclusivityTier: ExclusivityTier;
  bestFor: string;
  brands: string[];
  categories: string[]; // product categories supplied
  shipsSingles: boolean;
  region: Region;
  margin: Margin;
  crowdedness: Crowdedness;
  leverageScore: number; // 1-10
  links: {
    site?: string;
    portal?: string;
  };
}

export const suppliers: Supplier[] = [
  // CORE EXCLUSIVES
  {
    id: 'style-centre',
    name: 'Style Centre',
    category: 'clothing',
    supplierCategory: 'core',
    exclusivityTier: 'exclusive',
    bestFor: 'UK designer access',
    brands: ['Tommy Hilfiger', 'Calvin Klein', 'DKNY', 'Michael Kors'],
    categories: ['clothing', 'bags', 'accessories'],
    shipsSingles: true,
    region: 'UK',
    margin: 'high',
    crowdedness: 'quiet',
    leverageScore: 9,
    links: {
      site: 'https://www.stylecentre.com'
    }
  },
  {
    id: 'b2b-griffati',
    name: 'B2B Griffati',
    category: 'bags',
    supplierCategory: 'core',
    exclusivityTier: 'exclusive',
    bestFor: 'Premium leather bags',
    brands: ['Furla', 'Coccinelle', 'Pinko', 'Liu Jo', 'Guess Bags'],
    categories: ['bags', 'accessories'],
    shipsSingles: true,
    region: 'EU',
    margin: 'high',
    crowdedness: 'quiet',
    leverageScore: 9.5,
    links: {
      site: 'https://b2b.griffati.it'
    }
  },
  {
    id: 'brandsdistribution',
    name: 'BrandsDistribution / BDroppy',
    category: 'clothing',
    supplierCategory: 'core',
    exclusivityTier: 'exclusive',
    bestFor: 'Designer dropship',
    brands: ['Guess', 'Calvin Klein', 'Tommy Hilfiger', 'Armani', 'Diesel', 'Michael Kors'],
    categories: ['clothing', 'bags', 'sneakers'],
    shipsSingles: true,
    region: 'EU',
    margin: 'medium-high',
    crowdedness: 'moderate',
    leverageScore: 8,
    links: {
      site: 'https://www.brandsdistribution.com',
      portal: 'https://www.bdroppy.com'
    }
  },
  {
    id: 'brandsgateway',
    name: 'BrandsGateway',
    category: 'clothing',
    supplierCategory: 'core',
    exclusivityTier: 'semi',
    bestFor: 'Wide brand range',
    brands: ['Versace', 'Moschino', 'Hugo Boss', 'Ralph Lauren', 'Lacoste'],
    categories: ['clothing', 'bags', 'accessories'],
    shipsSingles: true,
    region: 'WW',
    margin: 'medium',
    crowdedness: 'saturated',
    leverageScore: 7,
    links: {
      site: 'https://www.brandsgateway.com'
    }
  },

  // BOUTIQUE / NICHE
  {
    id: 'slamjam',
    name: 'Slam Jam (Trade)',
    category: 'sneakers',
    supplierCategory: 'boutique',
    exclusivityTier: 'semi',
    bestFor: 'Streetwear curation',
    brands: ['Stüssy', 'Carhartt WIP', 'Stone Island', 'Off-White', 'AMBUSH'],
    categories: ['clothing', 'sneakers'],
    shipsSingles: false,
    region: 'EU',
    margin: 'medium',
    crowdedness: 'moderate',
    leverageScore: 7.5,
    links: {
      site: 'https://www.slamjam.com'
    }
  },
  {
    id: 'matterhorn',
    name: 'Matterhorn Wholesale',
    category: 'clothing',
    supplierCategory: 'boutique',
    exclusivityTier: 'semi',
    bestFor: 'Quiet margin plays',
    brands: ['Levi\'s', 'Superdry', 'G-Star Raw', 'Pepe Jeans'],
    categories: ['clothing'],
    shipsSingles: true,
    region: 'EU',
    margin: 'medium',
    crowdedness: 'quiet',
    leverageScore: 7.5,
    links: {
      site: 'https://b2b.mfrn.pl'
    }
  },
  {
    id: 'luxury-brands-dist',
    name: 'Luxury Brands Distribution',
    category: 'bags',
    supplierCategory: 'boutique',
    exclusivityTier: 'exclusive',
    bestFor: 'High-end accessories',
    brands: ['Burberry', 'Prada', 'Gucci', 'YSL', 'Bottega Veneta'],
    categories: ['bags', 'accessories'],
    shipsSingles: true,
    region: 'EU',
    margin: 'high',
    crowdedness: 'quiet',
    leverageScore: 9,
    links: {
      site: 'https://luxurybrandsdistribution.com'
    }
  },
  {
    id: 'stylewise-direct',
    name: 'Stylewise Direct',
    category: 'clothing',
    supplierCategory: 'boutique',
    exclusivityTier: 'semi',
    bestFor: 'UK fashion wholesale',
    brands: ['French Connection', 'Ted Baker', 'Karen Millen', 'Coast'],
    categories: ['clothing'],
    shipsSingles: true,
    region: 'UK',
    margin: 'medium',
    crowdedness: 'quiet',
    leverageScore: 7,
    links: {
      site: 'https://www.stylewisedirect.com'
    }
  },
  {
    id: 'paris-fashion-shops',
    name: 'Paris Fashion Shops',
    category: 'clothing',
    supplierCategory: 'boutique',
    exclusivityTier: 'semi',
    bestFor: 'EU aggregator',
    brands: ['Zadig & Voltaire', 'Sandro', 'Maje', 'Kenzo'],
    categories: ['clothing', 'bags'],
    shipsSingles: true,
    region: 'EU',
    margin: 'medium',
    crowdedness: 'moderate',
    leverageScore: 7,
    links: {
      site: 'https://www.parisfashionshops.com'
    }
  },

  // UTILITY (HIDDEN BY DEFAULT)
  {
    id: 'bigbuy',
    name: 'BigBuy',
    category: 'general',
    supplierCategory: 'utility',
    exclusivityTier: 'utility',
    bestFor: 'EU general backup',
    brands: ['Mixed'],
    categories: ['general', 'gifts'],
    shipsSingles: true,
    region: 'EU',
    margin: 'low-medium',
    crowdedness: 'saturated',
    leverageScore: 5,
    links: {
      site: 'https://www.bigbuy.eu'
    }
  },
  {
    id: 'avasam',
    name: 'Avasam',
    category: 'general',
    supplierCategory: 'utility',
    exclusivityTier: 'utility',
    bestFor: 'UK dropship backup',
    brands: ['Mixed'],
    categories: ['general'],
    shipsSingles: true,
    region: 'UK',
    margin: 'low-medium',
    crowdedness: 'saturated',
    leverageScore: 5,
    links: {
      site: 'https://www.avasam.com'
    }
  },
  {
    id: 'puckator',
    name: 'Puckator',
    category: 'gifts',
    supplierCategory: 'utility',
    exclusivityTier: 'utility',
    bestFor: 'Gift bundles only',
    brands: ['Puckator Originals', 'Licensed Characters'],
    categories: ['gifts'],
    shipsSingles: true,
    region: 'UK',
    margin: 'medium',
    crowdedness: 'moderate',
    leverageScore: 6,
    links: {
      site: 'https://www.puckator.co.uk'
    }
  },
  {
    id: 'ancient-wisdom',
    name: 'Ancient Wisdom',
    category: 'gifts',
    supplierCategory: 'utility',
    exclusivityTier: 'utility',
    bestFor: 'Candles & wellness',
    brands: ['Ancient Wisdom', 'Stamford'],
    categories: ['gifts'],
    shipsSingles: true,
    region: 'UK',
    margin: 'medium',
    crowdedness: 'quiet',
    leverageScore: 6,
    links: {
      site: 'https://www.ancientwisdom.biz'
    }
  }
];

export const getSupplierById = (id: string): Supplier | undefined => {
  return suppliers.find(s => s.id === id);
};

export const getSuppliersByCategory = (category: Category): Supplier[] => {
  return suppliers.filter(s => s.category === category).sort((a, b) => b.leverageScore - a.leverageScore);
};

export const getSuppliersBySupplierCategory = (supplierCategory: SupplierCategory): Supplier[] => {
  return suppliers.filter(s => s.supplierCategory === supplierCategory).sort((a, b) => b.leverageScore - a.leverageScore);
};

export const getVisibleSuppliers = (showUtility: boolean = false): Supplier[] => {
  return suppliers
    .filter(s => s.supplierCategory !== 'reps' && (showUtility || s.supplierCategory !== 'utility'))
    .sort((a, b) => b.leverageScore - a.leverageScore);
};

export const getAllBrands = (): string[] => {
  const brands = new Set<string>();
  suppliers.forEach(s => s.brands.forEach(b => brands.add(b)));
  return Array.from(brands).sort();
};
