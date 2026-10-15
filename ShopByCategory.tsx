import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { CATEGORIES_DATA } from '../data/products';
import { Category } from '../types';

export const ShopByCategory: React.FC = () => {
  const { goToCategory } = useNavigation();

  return (
    <section className="py-14 sm:py-20 bg-[#F1E7D8]/40 border-b border-[#B18A50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[11px] font-medium tracking-[0.26em] uppercase text-[#B18A50] block mb-2">
            Curated Wardrobes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#272321] font-normal tracking-tight">
            Find Your Signature Style
          </h2>
          <div className="w-12 h-0.5 bg-[#B18A50] mx-auto my-3" />
          <p className="text-sm text-[#272321]/75 leading-relaxed">
            Distinctive designs for every generation and every occasion. Hand-finished with authentic embroidery and luxurious fabrics.
          </p>
        </div>

        {/* 4-Column Editorial Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => goToCategory(cat.id as Category)}
              className="group relative bg-[#FAF6EF] border border-[#B18A50]/25 overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-[#681F32]"
            >
              {/* Category Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F1E7D8]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Subtle gradient vignette at bottom of image for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#272321]/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                
                {/* Discrete piece count tag */}
                <div className="absolute top-3 left-3 bg-[#FAF6EF]/90 backdrop-blur-xs px-2.5 py-1 text-[10px] tracking-wider uppercase font-semibold text-[#681F32]">
                  {cat.itemCount} Designs
                </div>
              </div>

              {/* Category Information */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-[#FAF6EF]">
                <div>
                  <h3 className="font-serif text-xl text-[#272321] group-hover:text-[#681F32] transition-colors font-medium">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#272321]/70 mt-1.5 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#B18A50]/20 flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#681F32] group-hover:text-[#481522] transition-colors flex items-center gap-1.5">
                    {cat.linkText}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
