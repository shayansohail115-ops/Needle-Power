import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';
import { useNavigation } from '../context/NavigationContext';

export const NewArrivalsCarousel: React.FC = () => {
  const { navigateTo } = useNavigation();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Products flagged as new or recent
  const newArrivals = PRODUCTS.filter(p => p.isNew || p.category === 'new-arrivals');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF6EF] border-b border-[#B18A50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Prev/Next Navigation Controls */}
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-[#B18A50]/20">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.24em] uppercase text-[#B18A50] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Just Added to Atelier</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#272321] font-normal tracking-tight">
              New Arrivals
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('shop', { category: 'new-arrivals', scrollToTop: true })}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#681F32] hover:text-[#481522] mr-4 cursor-pointer"
            >
              <span>View All New</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Carousel navigation arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="p-2 border border-[#B18A50]/30 hover:border-[#681F32] hover:bg-[#F1E7D8] text-[#272321] transition-colors cursor-pointer"
                aria-label="Previous outfits"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="p-2 border border-[#B18A50]/30 hover:border-[#681F32] hover:bg-[#F1E7D8] text-[#272321] transition-colors cursor-pointer"
                aria-label="Next outfits"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-thin no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {newArrivals.map((product) => (
            <div 
              key={product.id} 
              className="min-w-[260px] sm:min-w-[280px] lg:min-w-[300px] max-w-[300px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-6 text-center sm:hidden">
          <button
            onClick={() => navigateTo('shop', { category: 'new-arrivals', scrollToTop: true })}
            className="text-xs font-semibold tracking-wider uppercase text-[#681F32] inline-flex items-center gap-1"
          >
            <span>View All New Arrivals &rarr;</span>
          </button>
        </div>

      </div>
    </section>
  );
};
