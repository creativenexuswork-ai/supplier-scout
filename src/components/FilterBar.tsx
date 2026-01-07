import { Filter } from 'lucide-react';
import { suppliers, Region, ShipsSingles } from '@/data/suppliers';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface Filters {
  supplier?: string;
  region?: Region;
  shipsSingles?: ShipsSingles;
  minScore?: number;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const FilterBar = ({ filters, onChange }: FilterBarProps) => {
  const uniqueSuppliers = suppliers.map(s => ({ id: s.id, name: s.name.split('/')[0].trim() }));

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-card border border-border rounded-xl">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="w-4 h-4" />
        <span className="hidden sm:inline">Filters</span>
      </div>

      {/* Supplier */}
      <Select 
        value={filters.supplier || 'all'} 
        onValueChange={(v) => onChange({ ...filters, supplier: v === 'all' ? undefined : v })}
      >
        <SelectTrigger className="w-[160px] h-9">
          <SelectValue placeholder="All Suppliers" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Suppliers</SelectItem>
          {uniqueSuppliers.map(s => (
            <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Region */}
      <Select 
        value={filters.region || 'all'} 
        onValueChange={(v) => onChange({ ...filters, region: v === 'all' ? undefined : v as Region })}
      >
        <SelectTrigger className="w-[120px] h-9">
          <SelectValue placeholder="All Regions" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Regions</SelectItem>
          <SelectItem value="UK">🇬🇧 UK</SelectItem>
          <SelectItem value="EU">🇪🇺 EU</SelectItem>
          <SelectItem value="WW">🌍 Worldwide</SelectItem>
        </SelectContent>
      </Select>

      {/* Ships Singles */}
      <Select 
        value={filters.shipsSingles || 'all'} 
        onValueChange={(v) => onChange({ ...filters, shipsSingles: v === 'all' ? undefined : v as ShipsSingles })}
      >
        <SelectTrigger className="w-[140px] h-9">
          <SelectValue placeholder="MOQ" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any MOQ</SelectItem>
          <SelectItem value="yes">Ships Singles</SelectItem>
          <SelectItem value="mixed">Mixed MOQ</SelectItem>
          <SelectItem value="no">Bulk Only</SelectItem>
        </SelectContent>
      </Select>

      {/* Min Score */}
      <Select 
        value={filters.minScore?.toString() || 'all'} 
        onValueChange={(v) => onChange({ ...filters, minScore: v === 'all' ? undefined : Number(v) })}
      >
        <SelectTrigger className="w-[120px] h-9">
          <SelectValue placeholder="Min Score" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any Score</SelectItem>
          <SelectItem value="9">9+ Only</SelectItem>
          <SelectItem value="8">8+ Only</SelectItem>
          <SelectItem value="7">7+ Only</SelectItem>
        </SelectContent>
      </Select>

      {/* Clear Filters */}
      {(filters.supplier || filters.region || filters.shipsSingles || filters.minScore) && (
        <button
          onClick={() => onChange({})}
          className="px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default FilterBar;
