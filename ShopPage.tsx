import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  ChevronDown, 
  Search, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { useNavigation } from '../context/NavigationContext';
import { Category, Product } from '../types';
import { formatPKR } from '../data/config';

export const ShopPage: React.FC = () => {
  const { selectedCategory, goToCategory, searchQuery, setSearchQuery } = useNavigation();
  const [activeCategory, setActiveCategory] = useState<Category>(selectedCategory || 'all');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  // Sync when selectedCategory changes from navigation
  React.useEffect(() => {
    setActiveCategory(selectedCategory);
    setVisibleCount(8);
  }, [selectedCategory]);

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Collections' },
    { id: 'balochi-collection', label: 'Balochi Doch Collection' },
    { id: 'women', label: "Women's Collection" },
    { id: 'girls', label: "Girls' Collection" },
    { id: 'kids', label: "Kids' Collection" },
    { id: 'festive-wear', label: 'Festive & Eid Wear' },
    { id: 'new-arrivals', label: 'New Arrivals' },
  ];

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'new-arrivals') {
          if (!product.isNew && product.category !== 'new-arrivals') return false;
        } else if (activeCategory === 'festive-wear') {
          if (!product.isFestive && product.category !== 'festive-wear') return false;
        } else if (product.category !== activeCategory) {
          return false;
        }
      }

      // Search Query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match = 
          product.name.toLowerCase().includes(q) ||
          product.fabric.toLowerCase().includes(q) ||
          product.embroideryType.toLowerCase().includes(q) ||
          product.categoryLabel.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Price filter
      if (product.price > maxPrice) return false;

      // In-stock filter
      if (inStockOnly && !product.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // featured default order
    });
  }, [activeCategory, searchQuery, maxPrice, inStockOnly, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const resetFilters = () => {
    setActiveCategory('all');
    goToCategory('all');
    setSearchQuery('');
    setMaxPrice(50000);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters = activeCategory !== 'all' || searchQuery !== '' || maxPrice < 50000 || inStockOnly;

  return (
    <div className="bg-[#FAF6EF] min-h-screen py-10 sm:py-14 border-b border-[#B18A50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Collection Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 pb-6 border-b border-[#B18A50]/20">
          <div className="flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.24em] uppercase text-[#B18A50] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisanal Lookbook</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#272321] font-normal tracking-tight">
            {categories.find(c => c.id === activeCategory)?.label || "All Collections"}
          </h1>

          <div className="w-12 h-0.5 bg-[#B18A50] mx-auto my-3" />

          <p className="text-xs sm:text-sm text-[#272321]/75 max-w-xl mx-auto leading-relaxed">
            Discover our complete assortment of handcrafted Balochi Doch dresses, pure silk suits, 
            children's festive attire, and contemporary ethnic styles made for cherished occasions.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 gap-4 border-b border-[#B18A50]/15">
          
          {/* Mobile Filter Toggle & Product Count */}
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-[#F1E7D8] border border-[#B18A50]/30 text-xs font-semibold uppercase tracking-wider text-[#272321]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#681F32]" />
              <span>Filters {hasActiveFilters && '(Active)'}</span>
            </button>

            <span className="text-xs text-[#272321]/70 tracking-wider uppercase font-medium">
              Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'Design' : 'Designs'}
            </span>
          </div>

          {/* Search Box on Shop Page */}
          <div className="flex-1 max-w-xs relative hidden sm:block">
            <Search className="w-4 h-4 text-[#272321]/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in collections..."
              className="w-full pl-9 pr-3 py-1.5 bg-white/80 border border-[#B18A50]/30 text-xs text-[#272321] placeholder-[#272321]/40 focus:outline-none focus:border-[#681F32]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#272321]/50 hover:text-[#681F32]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center justify-between sm:justify-end gap-2">
            <label className="text-xs text-[#272321]/70 tracking-wider uppercase font-medium shrink-0">
              Sort By:
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-[#B18A50]/30 px-3 py-1.5 pr-8 text-xs font-medium text-[#272321] focus:outline-none focus:border-[#681F32]"
              >
                <option value="featured">Featured Curations</option>
                <option value="newest">New Arrivals First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#272321]/60 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Main Content Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Filter Sidebar */}
          <div className="hidden lg:block space-y-6">
            
            {/* Clear All Filters Header */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between pb-3 border-b border-[#B18A50]/20">
                <span className="text-xs font-semibold text-[#681F32] uppercase tracking-wider">
                  Active Filters
                </span>
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#272321]/60 hover:text-[#681F32] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              </div>
            )}

            {/* Categories List */}
            <div>
              <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-[#B18A50] mb-3">
                Categories
              </h3>
              <ul className="space-y-1.5 text-xs">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => {
                        setActiveCategory(cat.id);
                        goToCategory(cat.id);
                      }}
                      className={`w-full text-left py-1 px-2 transition-colors flex items-center justify-between ${
                        activeCategory === cat.id
                          ? 'bg-[#681F32] text-[#FAF6EF] font-medium'
                          : 'text-[#272321]/80 hover:bg-[#F1E7D8]/60 hover:text-[#272321]'
                      }`}
                    >
                      <span>{cat.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter Slider */}
            <div className="pt-4 border-t border-[#B18A50]/20">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-[#B18A50]">
                  Max Price
                </h3>
                <span className="text-xs font-semibold text-[#681F32]">
                  {formatPKR(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="50000"
                step="2500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#681F32] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#272321]/60 mt-1">
                <span>Rs. 5,000</span>
                <span>Rs. 50,000</span>
              </div>
            </div>

            {/* In-Stock Only Toggle */}
            <div className="pt-4 border-t border-[#B18A50]/20">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#272321]/80">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded-none text-[#681F32] focus:ring-[#681F32]"
                />
                <span className="font-medium">In-Stock Pieces Only</span>
              </label>
            </div>

            {/* WhatsApp Custom Sizing Banner */}
            <div className="p-4 bg-[#F1E7D8]/80 border border-[#B18A50]/30 mt-6">
              <h4 className="font-serif text-sm font-semibold text-[#681F32]">
                Custom Measurements?
              </h4>
              <p className="text-[11px] text-[#272321]/75 mt-1 leading-relaxed">
                We craft made-to-measure Balochi Doch suits. Speak with our master master-cutter on WhatsApp.
              </p>
            </div>

          </div>

          {/* Right Product Grid Column */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-[#F1E7D8]/30 border border-[#B18A50]/20 p-8">
                <h3 className="font-serif text-2xl text-[#272321]">
                  No outfits match your selection
                </h3>
                <p className="text-xs sm:text-sm text-[#272321]/70 mt-2 max-w-md mx-auto">
                  Try adjusting your price range, clearing search terms, or exploring our other collections.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 bg-[#681F32] text-[#FAF6EF] text-xs font-semibold tracking-wider uppercase hover:bg-[#481522] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {visibleCount < filteredProducts.length && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 6)}
                      className="px-8 py-3 border border-[#681F32] text-[#681F32] hover:bg-[#681F32] hover:text-[#FAF6EF] text-xs font-semibold tracking-[0.16em] uppercase transition-colors"
                    >
                      Load More Outfits ({filteredProducts.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-[#272321]/60 backdrop-blur-xs"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-[#FAF6EF] h-full shadow-2xl p-5 overflow-y-auto z-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#B18A50]/20">
                <h3 className="font-serif text-lg text-[#272321]">Filter Collections</h3>
                <button onClick={() => setIsMobileFiltersOpen(false)}>
                  <X className="w-5 h-5 text-[#272321]" />
                </button>
              </div>

              {/* Category selection */}
              <div className="py-4 border-b border-[#B18A50]/15">
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#B18A50] block mb-2">
                  Category
                </span>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        goToCategory(cat.id);
                      }}
                      className={`w-full text-left py-1.5 px-2 text-xs ${
                        activeCategory === cat.id ? 'bg-[#681F32] text-white font-medium' : 'text-[#272321]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price slider */}
              <div className="py-4 border-b border-[#B18A50]/15">
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-semibold text-[#B18A50] uppercase tracking-wider">Max Price</span>
                  <span className="font-bold text-[#681F32]">{formatPKR(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="50000"
                  step="2500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#681F32]"
                />
              </div>

              {/* In stock toggle */}
              <div className="py-4">
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-[#681F32]"
                  />
                  <span>In-Stock Only</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-[#B18A50]/20 space-y-2">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-3 bg-[#681F32] text-white text-xs font-semibold tracking-wider uppercase"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    resetFilters();
                    setIsMobileFiltersOpen(false);
                  }}
                  className="w-full py-2 border border-[#B18A50] text-[#681F32] text-xs font-semibold uppercase"
                >
                  Reset All
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
