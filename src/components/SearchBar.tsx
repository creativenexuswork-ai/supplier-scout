import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useSearchHistory } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, onSearch, placeholder = "Search products, brands, or types..." }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useSearchHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      // Add to history (keep last 5)
      setSearchHistory(prev => {
        const newHistory = [value.trim(), ...prev.filter(h => h !== value.trim())].slice(0, 5);
        return newHistory;
      });
      onSearch(value.trim());
    }
  };

  const handleHistoryClick = (query: string) => {
    onChange(query);
    onSearch(query);
    setIsFocused(false);
  };

  const handleClear = () => {
    onChange('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div 
          className={cn(
            'flex items-center gap-3 bg-card border rounded-xl px-4 py-3 transition-all duration-200',
            isFocused 
              ? 'border-primary ring-2 ring-primary/20' 
              : 'border-border hover:border-primary/50'
          )}
        >
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
          {value && (
            <button 
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-secondary rounded-md transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </form>

      {/* Search History Dropdown */}
      {isFocused && searchHistory.length > 0 && !value && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-scale-in">
          <div className="p-2">
            <p className="text-xs text-muted-foreground px-2 py-1">Recent searches</p>
            {searchHistory.map((query, index) => (
              <button
                key={index}
                onClick={() => handleHistoryClick(query)}
                className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors flex items-center gap-2"
              >
                <Search className="w-3 h-3 text-muted-foreground" />
                {query}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Suggestions */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {['Nike sneakers', 'Furla bags', 'UK suppliers', 'Ships singles'].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              onChange(suggestion);
              onSearch(suggestion);
            }}
            className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-secondary/80 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
