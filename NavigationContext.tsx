import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Category, Order } from '../types';

export type PageName = 
  | 'home' 
  | 'shop' 
  | 'product' 
  | 'checkout' 
  | 'order-confirmation'
  | 'about' 
  | 'contact' 
  | 'shipping' 
  | 'returns' 
  | 'privacy' 
  | 'terms'
  | 'wishlist';

interface NavigationContextType {
  currentPage: PageName;
  selectedCategory: Category;
  selectedProductId: string | null;
  searchQuery: string;
  lastOrder: Order | null;
  isSearchOpen: boolean;
  navigateTo: (page: PageName, options?: { 
    category?: Category; 
    productId?: string; 
    search?: string;
    order?: Order;
    scrollToTop?: boolean;
  }) => void;
  goToProduct: (productId: string) => void;
  goToCategory: (category: Category) => void;
  openSearch: () => void;
  closeSearch: () => void;
  setSearchQuery: (query: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageName>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Parse location hash on load to support direct links (e.g. #/shop?category=balochi-collection or #/product?id=np-001)
  const parseHash = useCallback(() => {
    try {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        setCurrentPage('home');
        return;
      }
      const [path, queryString] = hash.split('?');
      const params = new URLSearchParams(queryString || '');

      const validPages: PageName[] = [
        'home', 'shop', 'product', 'checkout', 'order-confirmation',
        'about', 'contact', 'shipping', 'returns', 'privacy', 'terms', 'wishlist'
      ];

      if (validPages.includes(path as PageName)) {
        setCurrentPage(path as PageName);
        if (params.get('category')) {
          setSelectedCategory(params.get('category') as Category);
        }
        if (params.get('id')) {
          setSelectedProductId(params.get('id'));
        }
        if (params.get('q')) {
          setSearchQuery(params.get('q') || '');
        }
      }
    } catch (e) {
      console.error('Error parsing hash', e);
    }
  }, []);

  useEffect(() => {
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, [parseHash]);

  const navigateTo = (
    page: PageName,
    options?: {
      category?: Category;
      productId?: string;
      search?: string;
      order?: Order;
      scrollToTop?: boolean;
    }
  ) => {
    if (options?.category !== undefined) {
      setSelectedCategory(options.category);
    }
    if (options?.productId !== undefined) {
      setSelectedProductId(options.productId);
    }
    if (options?.search !== undefined) {
      setSearchQuery(options.search);
    }
    if (options?.order !== undefined) {
      setLastOrder(options.order);
    }

    setCurrentPage(page);

    // Build hash for shareability & history
    const params = new URLSearchParams();
    if (options?.category && options.category !== 'all') {
      params.set('category', options.category);
    }
    if (options?.productId) {
      params.set('id', options.productId);
    }
    if (options?.search) {
      params.set('q', options.search);
    }

    const queryStr = params.toString() ? `?${params.toString()}` : '';
    const newHash = `#/${page}${queryStr}`;
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }

    if (options?.scrollToTop !== false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToProduct = (productId: string) => {
    navigateTo('product', { productId, scrollToTop: true });
  };

  const goToCategory = (category: Category) => {
    navigateTo('shop', { category, scrollToTop: true });
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        selectedCategory,
        selectedProductId,
        searchQuery,
        lastOrder,
        isSearchOpen,
        navigateTo,
        goToProduct,
        goToCategory,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        setSearchQuery,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
