import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { IMAGES } from '../data/images';
import { SafeImage } from './SafeImage';

export const Hero: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <section className="relative bg-[#FAF6EF] overflow-hidden border-b border-[#B18A50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column: Editorial luxury typography */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center space-y-6">
            
            {/* Eyebrow - anti-pill rule: unboxed text with subtle gold accent */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-[0.28em] uppercase text-[#B18A50]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Art of Balochi Craftsmanship</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-[#272321] leading-[1.15] font-normal tracking-tight">
              Tradition, <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#681F32]">Woven Into</span> Every Thread.
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-[#272321]/80 leading-relaxed font-sans max-w-xl">
              Discover thoughtfully curated Balochi dresses and contemporary ethnic styles for women, 
              girls, and little ones. Celebrate heritage through authentic Doch embroidery, natural fabrics, 
              and timeless design crafted for celebrations and everyday grace.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => navigateTo('shop', { scrollToTop: true })}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#681F32] text-[#FAF6EF] text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#481522] transition-colors shadow-sm group cursor-pointer"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('about', { scrollToTop: true })}
                className="inline-flex items-center justify-center px-6 py-3.5 border border-[#B18A50] text-[#272321] text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#F1E7D8] transition-colors cursor-pointer"
              >
                <span>Discover Our Story</span>
              </button>
            </div>

            {/* Heritage Micro highlights */}
            <div className="pt-6 border-t border-[#B18A50]/20 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <span className="block font-serif text-lg sm:text-xl font-bold text-[#681F32]">100%</span>
                <span className="text-[11px] text-[#272321]/70 tracking-wider uppercase">Authentic Doch</span>
              </div>
              <div>
                <span className="block font-serif text-lg sm:text-xl font-bold text-[#681F32]">Pure</span>
                <span className="text-[11px] text-[#272321]/70 tracking-wider uppercase">Luxury Fabrics</span>
              </div>
              <div>
                <span className="block font-serif text-lg sm:text-xl font-bold text-[#681F32]">Custom</span>
                <span className="text-[11px] text-[#272321]/70 tracking-wider uppercase">Made-to-Measure</span>
              </div>
            </div>

          </div>

          {/* Right Image Column: High fashion editorial imagery */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative group">
              {/* Outer decorative subtle framing */}
              <div className="absolute -inset-2 sm:-inset-3 border border-[#B18A50]/30 -z-0 pointer-events-none transition-transform duration-500 group-hover:scale-[1.01]" />
              
              {/* Main Image Container */}
              <div className="relative z-10 overflow-hidden bg-[#F1E7D8] aspect-[16/10] sm:aspect-[16/11] lg:aspect-[16/10] shadow-lg">
                <SafeImage
                  src={IMAGES.hero}
                  alt="Pakistani Baloch woman wearing luxury authentic handcrafted Balochi dress with Doch needlework"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                />

                {/* Subtle Image Tag/Caption */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-[#FAF6EF]/90 backdrop-blur-xs px-3.5 py-1.5 border border-[#B18A50]/30 shadow-xs">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#681F32]">
                    Signature Doch Edit · 2026
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
