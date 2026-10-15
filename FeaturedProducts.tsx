import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';
import { useNavigation } from '../context/NavigationContext';
import { Category } from '../types';

export const FeaturedProducts: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState<'all' | 'balochi-collection' | 'women' | 'girls' | 'kids'>('all');

  const filteredProducts = activeTab === 'all' 
    ? PRODUCTS.slice(0, 8) 
    : PRODUCTS.filter(p => p.category === activeTab).slice(0, 8);

  const tabs: { id: 'all' | 'balochi-collection' | 'women' | 'girls' | 'kids'; label: string }[] = [
    { id: 'all', label: 'All Curated' },
    { id: 'balochi-collection', label: 'Balochi Doch' },
    { id: 'women', label: 'Women' },
    { id: 'girls', label: 'Girls' },
    { id: 'kids', label: 'Kids & Toddlers' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF6EF] border-b border-[#B18A50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#B18A50]/20 gap-4">
          <div>
            <span className="text-[11px] font-medium tracking-[0.26em] uppercase text-[#B18A50] block mb-1">
              Handpicked Craftsmanship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#272321] font-normal tracking-tight">
              Curated for You
            </h2>
            <p className="text-xs sm:text-sm text-[#272321]/70 mt-1.5 max-w-lg">
              Explore statement Balochi Doch suits, contemporary cuts, and timeless festive outfits created with artisan devotion.
            </p>
          </div>

          {/* Interactive Filter Tabs (Anti-pill compliant: functional button segments) */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#681F32] text-[#FAF6EF]'
                    : 'bg-[#F1E7D8]/60 text-[#272321]/75 hover:bg-[#F1E7D8] hover:text-[#272321]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8-Product Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('shop', { scrollToTop: true })}
            className="inline-flex items-center justify-center gap-2 px-10 py-3.5 border-2 border-[#681F32] text-[#681F32] text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#681F32] hover:text-[#FAF6EF] transition-all duration-200 group cursor-pointer"
          >
            <span>View All Products ({PRODUCTS.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
