import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { PRODUCTS } from '../data/products';
import { formatPKR } from '../data/config';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, goToProduct, goToCategory } = useNavigation();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeSearch();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const results: Product[] = query.trim() === '' 
    ? [] 
    : PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.embroideryType.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#272321]/70 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-[#FAF6EF] border border-[#B18A50]/30 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-[#B18A50]/20 flex items-center gap-3 bg-[#F1E7D8]/60">
          <Search className="w-5 h-5 text-[#681F32]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Balochi Doch suits, velvet gowns, girls' frocks, kurtas..."
            className="w-full bg-transparent text-sm sm:text-base text-[#272321] placeholder-[#272321]/50 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#272321]/60 hover:text-[#681F32] uppercase tracking-wider font-semibold"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-1 text-[#272321]/70 hover:text-[#681F32]"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Category Shortcuts */}
        {query.trim() === '' && (
          <div className="p-6">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#B18A50] block mb-3">
              Popular Searches & Categories
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Balochi Doch Suits', cat: 'balochi-collection' },
                { label: 'Women Velvet', cat: 'women' },
                { label: 'Girls Festive Frocks', cat: 'girls' },
                { label: 'Boys Kurtas', cat: 'kids' },
                { label: 'Festive Wear', cat: 'festive-wear' },
                { label: 'New Arrivals', cat: 'new-arrivals' }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    closeSearch();
                    goToCategory(item.cat as any);
                  }}
                  className="px-3 py-1.5 bg-[#F1E7D8]/80 hover:bg-[#681F32] hover:text-[#FAF6EF] text-xs text-[#272321] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query.trim() !== '' && (
          <div className="max-h-96 overflow-y-auto divide-y divide-[#B18A50]/15 p-2">
            {results.length === 0 ? (
              <div className="py-12 text-center text-sm text-[#272321]/70">
                No designs found matching "<span className="font-semibold">{query}</span>".
                <br />
                <span className="text-xs text-[#272321]/50 mt-1 block">
                  Try searching for "Balochi", "Raw Silk", "Doch", or "Velvet".
                </span>
              </div>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    closeSearch();
                    goToProduct(product.id);
                  }}
                  className="p-3 hover:bg-[#F1E7D8]/50 flex items-center gap-4 cursor-pointer transition-colors group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-14 object-cover object-top border border-[#B18A50]/20 bg-[#F1E7D8]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <span className="text-[10px] tracking-wider uppercase text-[#B18A50] font-semibold block">
                      {product.categoryLabel}
                    </span>
                    <h4 className="font-serif text-sm font-medium text-[#272321] group-hover:text-[#681F32] transition-colors">
                      {product.name}
                    </h4>
                    <span className="text-xs font-semibold text-[#681F32] block mt-0.5">
                      {formatPKR(product.price)}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#272321]/40 group-hover:text-[#681F32] group-hover:translate-x-1 transition-all" />
                </div>
              ))
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-3 bg-[#F1E7D8]/40 border-t border-[#B18A50]/15 text-[11px] text-center text-[#272321]/60 flex justify-between items-center px-4">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-[#B18A50]/30 text-[10px]">ESC</kbd> to close</span>
          <span>Showing authentic NEEDLE POWER catalog</span>
        </div>
      </div>
    </div>
  );
};
