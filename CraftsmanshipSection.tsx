import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { IMAGES } from '../data/images';
import { SafeImage } from './SafeImage';

export const CraftsmanshipSection: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <section className="py-16 sm:py-24 bg-[#F1E7D8]/60 border-b border-[#B18A50]/20 relative overflow-hidden">
      {/* Decorative antique gold fine line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B18A50]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Close-up Macro Embroidery Detail with Editorial Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Outer border offset */}
              <div className="absolute -inset-3 border border-[#681F32]/20 -z-0" />
              
              <div className="relative z-10 aspect-[4/3] overflow-hidden shadow-xl bg-[#FAF6EF]">
                <SafeImage
                  src={IMAGES.embroideryDetail}
                  alt="Extreme close-up macro detail of authentic traditional Balochi Doch hand embroidery and mirrorwork"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />

                {/* Floating Craft Badge */}
                <div className="absolute bottom-4 left-4 bg-[#FAF6EF]/95 backdrop-blur-xs p-3 border-l-2 border-[#681F32] shadow-sm max-w-xs">
                  <span className="block text-[10px] tracking-[0.2em] uppercase font-bold text-[#681F32]">
                    Balochi Doch Needlecraft
                  </span>
                  <span className="text-[11px] text-[#272321]/80 mt-0.5 block">
                    Geometric symmetry, natural resham threads & genuine sheesha mirrorwork.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.28em] uppercase text-[#B18A50]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Living Art of Balochistan</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#272321] font-normal tracking-tight leading-[1.2]">
              A Heritage <br />
              <span className="italic text-[#681F32]">Made by Hand</span>
            </h2>

            <div className="w-16 h-0.5 bg-[#B18A50]" />

            <p className="text-base text-[#272321]/80 leading-relaxed font-sans">
              Every thread carries a story. Inspired by the rich visual language of Balochi embroidery, 
              our collections celebrate intricate patterns, expressive colors, and the artistry of traditional dress. 
              NEEDLE POWER brings heritage-inspired fashion into the wardrobes of today's women, girls, and families.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-none bg-[#681F32]/10 text-[#681F32] flex items-center justify-center shrink-0 mt-0.5 font-serif font-bold text-xs">
                  I
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#272321]">
                    The Doch Tradition
                  </h4>
                  <p className="text-xs text-[#272321]/70 mt-0.5 leading-normal">
                    Complex needlework passed down across generations, featuring distinctive triangular, diamond, and chevron motifs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-none bg-[#681F32]/10 text-[#681F32] flex items-center justify-center shrink-0 mt-0.5 font-serif font-bold text-xs">
                  II
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#272321]">
                    Tactile Natural Textiles
                  </h4>
                  <p className="text-xs text-[#272321]/70 mt-0.5 leading-normal">
                    Harmoniously paired with raw silk, sheer organza, fine lawn, and supple micro-velvet tailored for contemporary wear.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-none bg-[#681F32]/10 text-[#681F32] flex items-center justify-center shrink-0 mt-0.5 font-serif font-bold text-xs">
                  III
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#272321]">
                    Intergenerational Elegance
                  </h4>
                  <p className="text-xs text-[#272321]/70 mt-0.5 leading-normal">
                    Curated matching and complementary pieces allowing mothers, daughters, and children to celebrate heritage together.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigateTo('about', { scrollToTop: true })}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#681F32] text-[#FAF6EF] text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#481522] transition-colors shadow-sm group cursor-pointer"
              >
                <span>Explore Our Heritage</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
