import React from 'react';
import { ArrowRight, Compass, Users, Sparkles, Feather } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export const BrandTrustSection: React.FC = () => {
  const { navigateTo } = useNavigation();

  const highlights = [
    {
      icon: Feather,
      title: "Inspired by Balochi Tradition",
      description: "Rooted in authentic Doch needlecraft, geometric motifs, and the textile language of Balochistan."
    },
    {
      icon: Users,
      title: "Designed for Every Generation",
      description: "Cohesive traditional silhouettes and celebratory outfits thoughtfully made for women, girls, and children."
    },
    {
      icon: Sparkles,
      title: "Style Rooted in Culture",
      description: "Honoring traditional craftsmanship through contemporary cuts, natural luxury fabrics, and mindful finishing."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF6EF] border-b border-[#B18A50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-[11px] font-medium tracking-[0.26em] uppercase text-[#B18A50] block mb-2">
            The NEEDLE POWER Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#272321] font-normal tracking-tight">
            More Than Fashion. A Feeling of Heritage.
          </h2>
          <div className="w-12 h-0.5 bg-[#B18A50] mx-auto my-3" />
          <p className="text-sm sm:text-base text-[#272321]/75 leading-relaxed font-sans max-w-xl mx-auto">
            NEEDLE POWER is born from a deep reverence for the timeless embroidery of Balochistan. 
            We create pieces that connect generations through wearable art, celebrating South Asian 
            craftsmanship with dignity, grace, and modern ease.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-8 bg-[#F1E7D8]/40 border border-[#B18A50]/25 text-center flex flex-col items-center justify-between transition-all duration-300 hover:bg-[#F1E7D8]/80 hover:border-[#681F32]/40"
              >
                <div>
                  <div className="w-12 h-12 mb-5 rounded-none border border-[#B18A50] flex items-center justify-center text-[#681F32] bg-[#FAF6EF]">
                    <Icon className="w-5 h-5 text-[#681F32]" />
                  </div>
                  <h3 className="font-serif text-xl text-[#272321] font-medium mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#272321]/70 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Discover Our Story CTA */}
        <div className="text-center">
          <button
            onClick={() => navigateTo('about', { scrollToTop: true })}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#681F32] hover:text-[#481522] border-b border-[#681F32] pb-1 cursor-pointer group"
          >
            <span>Read Our Full Story & Craft Journey</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
