import { suppliers, Supplier, Category, Region, SupplierCategory, ExclusivityTier } from '@/data/suppliers';
import { sampleProducts, Product, ItemType, ProductCategory, isValidProduct } from '@/data/products';

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
  shipsSingles?: boolean;
  minScore?: number;
  region?: Region;
  supplierId?: string;
  includeUtility?: boolean;
}

// Calculate text relevance score (0-1)
function calculateTextRelevance(product: Product, query: string): number {
  if (!query) return 0.5;
  
  const normalized = query.toLowerCase();
  const fields = [
    product.name.toLowerCase(),
    product.brand.toLowerCase(),
    product.category.toLowerCase()
  ];
  
  let score = 0;
  for (const field of fields) {
    if (field.includes(normalized)) {
      score += 0.5;
    }
    // Partial word matching
    const words = normalized.split(/\s+/);
    for (const word of words) {
      if (field.includes(word)) {
        score += 0.2;
      }
    }
  }
  
  return Math.min(1, score);
}

// Calculate supplier text relevance
function calculateSupplierTextRelevance(supplier: Supplier, query: string): number {
  if (!query) return 0.5;
  
  const normalized = query.toLowerCase();
  let score = 0;
  
  if (supplier.name.toLowerCase().includes(normalized)) score += 0.5;
  if (supplier.bestFor.toLowerCase().includes(normalized)) score += 0.3;
  
  for (const brand of supplier.brands) {
    if (brand.toLowerCase().includes(normalized)) {
      score += 0.3;
      break;
    }
  }
  
  return Math.min(1, score);
}

// Exclusivity tier weights for ranking
const exclusivityWeight: Record<ExclusivityTier, number> = {
  exclusive: 1.0,
  semi: 0.7,
  utility: 0.3,
  reps: 0.0
};

export function searchProducts(query: string, filters?: SearchFilters): Product[] {
  const parsed = parseQuery(query);
  
  // Only return valid products
  let results = sampleProducts.filter(isValidProduct);

  // Filter out utility and reps suppliers unless explicitly included
  results = results.filter(p => {
    const supplier = suppliers.find(s => s.id === p.supplierId);
    if (!supplier) return false;
    if (supplier.supplierCategory === 'reps') return false;
    if (supplier.supplierCategory === 'utility' && !filters?.includeUtility) return false;
    return true;
  });

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

    if (filters.region || filters.shipsSingles !== undefined || filters.minScore) {
      results = results.filter(p => {
        const supplier = suppliers.find(s => s.id === p.supplierId);
        if (!supplier) return false;

        if (filters.region && supplier.region !== filters.region && supplier.region !== 'WW') {
          return false;
        }
        if (filters.shipsSingles !== undefined && supplier.shipsSingles !== filters.shipsSingles) {
          return false;
        }
        if (filters.minScore && supplier.leverageScore < filters.minScore) {
          return false;
        }
        return true;
      });
    }
  }

  // Rank results: exclusivityTier 40%, leverageScore 30%, text relevance 30%
  results.sort((a, b) => {
    const supplierA = suppliers.find(s => s.id === a.supplierId);
    const supplierB = suppliers.find(s => s.id === b.supplierId);
    
    if (!supplierA || !supplierB) return 0;

    // Calculate composite score
    const exclusivityA = exclusivityWeight[supplierA.exclusivityTier] * 0.4;
    const exclusivityB = exclusivityWeight[supplierB.exclusivityTier] * 0.4;
    
    const leverageA = (supplierA.leverageScore / 10) * 0.3;
    const leverageB = (supplierB.leverageScore / 10) * 0.3;
    
    const relevanceA = calculateTextRelevance(a, query) * 0.3;
    const relevanceB = calculateTextRelevance(b, query) * 0.3;
    
    const scoreA = exclusivityA + leverageA + relevanceA;
    const scoreB = exclusivityB + leverageB + relevanceB;
    
    return scoreB - scoreA;
  });

  return results;
}

export function searchSuppliers(query: string, filters?: SearchFilters): Supplier[] {
  const parsed = parseQuery(query);
  
  // Filter out reps and optionally utility
  let results = suppliers.filter(s => {
    if (s.supplierCategory === 'reps') return false;
    if (s.supplierCategory === 'utility' && !filters?.includeUtility) return false;
    return true;
  });

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
    if (filters.shipsSingles !== undefined) {
      results = results.filter(s => s.shipsSingles === filters.shipsSingles);
    }
    if (filters.minScore) {
      results = results.filter(s => s.leverageScore >= filters.minScore);
    }
  }

  // Rank: exclusivityTier 40%, leverageScore 30%, text relevance 30%
  results.sort((a, b) => {
    const exclusivityA = exclusivityWeight[a.exclusivityTier] * 0.4;
    const exclusivityB = exclusivityWeight[b.exclusivityTier] * 0.4;
    
    const leverageA = (a.leverageScore / 10) * 0.3;
    const leverageB = (b.leverageScore / 10) * 0.3;
    
    const relevanceA = calculateSupplierTextRelevance(a, query) * 0.3;
    const relevanceB = calculateSupplierTextRelevance(b, query) * 0.3;
    
    const scoreA = exclusivityA + leverageA + relevanceA;
    const scoreB = exclusivityB + leverageB + relevanceB;
    
    return scoreB - scoreA;
  });

  return results;
}

// Scoped search within a single supplier
export function searchWithinSupplier(supplierId: string, query: string): Product[] {
  if (!query.trim()) {
    // Return all products for this supplier when no query
    return sampleProducts.filter(p => p.supplierId === supplierId && isValidProduct(p));
  }

  const normalized = query.toLowerCase().trim();
  
  return sampleProducts
    .filter(p => p.supplierId === supplierId && isValidProduct(p))
    .filter(p => 
      p.name.toLowerCase().includes(normalized) ||
      p.brand.toLowerCase().includes(normalized) ||
      p.category.toLowerCase().includes(normalized)
    );
}
