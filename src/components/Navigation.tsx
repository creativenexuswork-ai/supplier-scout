import { Link, useLocation } from 'react-router-dom';
import { Search, Bookmark, Building2 } from 'lucide-react';
import { useSavedProducts } from '@/hooks/useLocalStorage';

const Navigation = () => {
  const location = useLocation();
  const [savedProducts] = useSavedProducts();
  
  const navItems = [
    { path: '/', label: 'Search', icon: Search },
    { path: '/saved', label: 'Saved', icon: Bookmark, count: savedProducts.length },
    { path: '/suppliers', label: 'Suppliers', icon: Building2 },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-nav border-b border-nav-foreground/10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SI</span>
            </div>
            <span className="font-semibold text-nav-foreground hidden sm:block">SupplierIntel</span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon, count }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`nav-link flex items-center gap-2 ${
                    isActive ? 'nav-link-active' : 'nav-link-inactive'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                  {typeof count === 'number' && count > 0 && (
                    <span className="bg-primary/20 text-primary-foreground px-1.5 py-0.5 rounded-full text-xs font-medium">
                      {count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
