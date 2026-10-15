import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { IMAGES } from '../data/images';
import { SafeImage } from './SafeImage';

export const PromotionalBanner: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <section className="relative overflow-hidden bg-[#481522] text-[#FAF6EF] py-16 sm:py-24 border-y border-[#B18A50]/30">
      {/* Background with subtle overlay */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src={IMAGES.womensFestive}
          alt="Pakistani Festive Fashion"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity filter blur-[1px]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#481522] via-[#681F32]/90 to-[#481522]/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-[#B18A50]/40 text-[#B18A50] text-[11px] tracking-[0.24em] uppercase font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Festive & Occasion Edit</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FAF6EF] font-normal tracking-tight leading-tight">
            Celebrate Every Occasion <br />
            <span className="italic text-[#F1E7D8] font-light">in Color & Heritage.</span>
          </h2>

          <div className="w-12 h-0.5 bg-[#B18A50] mx-auto" />

          <p className="text-sm sm:text-base text-[#FAF6EF]/85 leading-relaxed font-sans max-w-xl mx-auto">
            Discover statement-making ethnic styles for celebrations, Eid, weddings, and family gatherings. 
            Detailed with centuries of embroidery traditions for modern wardrobes.
          </p>

          <div className="pt-2">
            <button
              onClick={() => navigateTo('shop', { category: 'festive-wear', scrollToTop: true })}
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-[#FAF6EF] text-[#681F32] hover:bg-[#F1E7D8] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-200 shadow-md group cursor-pointer"
            >
              <span>Shop Festive Wear</span>
              <ArrowRight className="w-4 h-4 text-[#681F32] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
