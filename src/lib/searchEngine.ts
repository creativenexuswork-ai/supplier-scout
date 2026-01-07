import { suppliers, Supplier, Category, Region, ShipsSingles } from '@/data/suppliers';
import { sampleProducts, Product, ItemType, ProductCategory } from '@/data/products';

interface ParsedQuery {
  itemType?: ItemType;
  category?: ProductCategory;
  brands: string[];
  region?: Region;
  keywords: string[];
}

const itemKeywords: Record<string, ItemType> = {
  shoes: 'shoes',
  sneakers: 'shoes',
  trainers: 'shoes',
  kicks: 'shoes',
  bag: 'bags',
  bags: 'bags',
  wallet: 'accessories',
  belt: 'accessories',
  accessory: 'accessories',
  accessories: 'accessories',
  hoodie: 'clothing',
  tee: 'clothing',
  tshirt: 'clothing',
  't-shirt': 'clothing',
  jacket: 'clothing',
  jeans: 'clothing',
  pants: 'clothing',
  shirt: 'clothing',
  dress: 'clothing',
  gift: 'gifts',
  candle: 'gifts',
  bundle: 'gifts',
  mug: 'gifts'
};

const regionKeywords: Record<string, Region> = {
  uk: 'UK',
  britain: 'UK',
  british: 'UK',
  eu: 'EU',
  europe: 'EU',
  european: 'EU',
  worldwide: 'WW',
  global: 'WW',
  international: 'WW'
};

// All known brands (lowercase for matching)
const allBrands = new Set(
  suppliers.flatMap(s => s.brands.map(b => b.toLowerCase()))
);

export function parseQuery(query: string): ParsedQuery {
  const normalized = query.toLowerCase().trim();
  const words = normalized.split(/\s+/);
  
  const result: ParsedQuery = {
    brands: [],
    keywords: []
  };

  for (const word of words) {
    // Check for item type
    if (itemKeywords[word]) {
      result.itemType = itemKeywords[word];
      result.category = itemTypeToCategory(result.itemType);
      continue;
    }

    // Check for region
    if (regionKeywords[word]) {
      result.region = regionKeywords[word];
      continue;
    }

    // Check for brand (also check multi-word brands)
    if (allBrands.has(word)) {
      result.brands.push(word);
      continue;
    }

    result.keywords.push(word);
  }

  // Check for multi-word brands
  const fullQuery = normalized;
  for (const brand of allBrands) {
    if (fullQuery.includes(brand) && !result.brands.includes(brand)) {
      result.brands.push(brand);
    }
  }

  return result;
}

function itemTypeToCategory(itemType: ItemType): ProductCategory {
  switch (itemType) {
    case 'shoes': return 'sneakers';
    case 'clothing': return 'clothing';
    case 'bags':
    case 'accessories': return 'bags';
    case 'gifts': return 'gifts';
    default: return 'general';
  }
}

export interface SearchFilters {
  shipsSingles?: ShipsSingles;
  minScore?: number;
  region?: Region;
  supplierId?: string;
}

export function searchProducts(query: string, filters?: SearchFilters): Product[] {
  const parsed = parseQuery(query);
  
  let results = [...sampleProducts];

  // Filter by category/itemType
  if (parsed.category) {
    results = results.filter(p => p.category === parsed.category);
  }

  // Filter by brand
  if (parsed.brands.length > 0) {
    results = results.filter(p => 
      parsed.brands.some(brand => 
        p.brand.toLowerCase().includes(brand) || 
        brand.includes(p.brand.toLowerCase())
      )
    );
  }

  // Apply additional filters
  if (filters) {
    if (filters.supplierId) {
      results = results.filter(p => p.supplierId === filters.supplierId);
    }

    if (filters.region || filters.shipsSingles || filters.minScore) {
      results = results.filter(p => {
        const supplier = suppliers.find(s => s.id === p.supplierId);
        if (!supplier) return false;

        if (filters.region && supplier.region !== filters.region && supplier.region !== 'WW') {
          return false;
        }
        if (filters.shipsSingles && supplier.shipsSingles !== filters.shipsSingles) {
          return false;
        }
        if (filters.minScore && supplier.score < filters.minScore) {
          return false;
        }
        return true;
      });
    }
  }

  // Sort by supplier score and other factors
  results.sort((a, b) => {
    const supplierA = suppliers.find(s => s.id === a.supplierId);
    const supplierB = suppliers.find(s => s.id === b.supplierId);
    
    if (!supplierA || !supplierB) return 0;

    // Ships singles priority
    const singlesOrder = { yes: 0, mixed: 1, no: 2 };
    const singlesCompare = singlesOrder[supplierA.shipsSingles] - singlesOrder[supplierB.shipsSingles];
    if (singlesCompare !== 0) return singlesCompare;

    // Score
    return supplierB.score - supplierA.score;
  });

  return results;
}

export function searchSuppliers(query: string, filters?: SearchFilters): Supplier[] {
  const parsed = parseQuery(query);
  
  let results = [...suppliers];

  // Filter by category
  if (parsed.category) {
    results = results.filter(s => s.category === parsed.category);
  }

  // Filter by brand
  if (parsed.brands.length > 0) {
    results = results.filter(s => 
      s.brands.some(brand => 
        parsed.brands.some(searchBrand => 
          brand.toLowerCase().includes(searchBrand) ||
          searchBrand.includes(brand.toLowerCase())
        )
      )
    );
  }

  // Apply additional filters
  if (filters) {
    if (filters.region) {
      results = results.filter(s => s.region === filters.region || s.region === 'WW');
    }
    if (filters.shipsSingles) {
      results = results.filter(s => s.shipsSingles === filters.shipsSingles);
    }
    if (filters.minScore) {
      results = results.filter(s => s.score >= filters.minScore);
    }
  }

  // Sort
  results.sort((a, b) => {
    // Ships singles priority
    const singlesOrder = { yes: 0, mixed: 1, no: 2 };
    const singlesCompare = singlesOrder[a.shipsSingles] - singlesOrder[b.shipsSingles];
    if (singlesCompare !== 0) return singlesCompare;

    // Score
    if (b.score !== a.score) return b.score - a.score;

    // Crowdedness
    const crowdOrder = { quiet: 0, moderate: 1, saturated: 2 };
    return crowdOrder[a.crowdedness] - crowdOrder[b.crowdedness];
  });

  return results;
}

export function getRelaxedResults(query: string): { products: Product[]; suppliers: Supplier[]; message: string } {
  // Try progressively relaxing constraints
  let products = searchProducts(query);
  let relaxedSuppliers = searchSuppliers(query);

  if (products.length === 0) {
    // Relax to all products
    products = sampleProducts;
    relaxedSuppliers = suppliers;
  }

  return {
    products: products.slice(0, 20),
    suppliers: relaxedSuppliers.slice(0, 10),
    message: products.length < sampleProducts.length 
      ? '' 
      : 'No exact match — showing all available products.'
  };
}
