import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Feather } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { IMAGES } from '../data/images';
import { SafeImage } from '../components/SafeImage';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="bg-[#FAF6EF] min-h-screen py-12 sm:py-20 border-b border-[#B18A50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Story Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[11px] font-medium tracking-[0.28em] uppercase text-[#B18A50] block mb-2">
            The Atelier Story
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#272321] font-normal tracking-tight">
            Tradition in Every Stitch, <br />
            <span className="italic text-[#681F32]">Elegance for Every Generation.</span>
          </h1>
          <div className="w-16 h-0.5 bg-[#B18A50] mx-auto my-4" />
          <p className="text-sm sm:text-base text-[#272321]/75 leading-relaxed font-sans max-w-2xl mx-auto">
            NEEDLE POWER is a luxury Pakistani ethnic fashion house dedicated to preserving, 
            celebrating, and reimagining the magnificent craft of Balochi Doch hand embroidery for modern wardrobes.
          </p>
        </div>

        {/* Hero Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] overflow-hidden bg-[#F1E7D8] border border-[#B18A50]/30 shadow-xl">
              <SafeImage
                src={IMAGES.hero}
                alt="NEEDLE POWER Balochi Heritage Fashion"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#681F32] text-[#FAF6EF] p-4 text-xs font-serif italic max-w-xs shadow-md hidden sm:block">
              "A heritage born of patience, geometric grace, and living devotion to the needle."
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#B18A50]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Creative Genesis</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#272321] font-normal">
              Reclaiming the Art of Doch
            </h2>
            <p className="text-sm text-[#272321]/80 leading-relaxed font-sans">
              The textile geography of Balochistan is among the richest and most complex in South Asia. 
              Known locally as <em>Doch</em>, traditional Balochi needlework involves intricate counted-thread 
              embroidery where motifs are stitched from the reverse or surface of the cloth with mathematical precision.
            </p>
            <p className="text-sm text-[#272321]/80 leading-relaxed font-sans">
              Historically, these dresses—with their iconic elongated neck panels (Pandool) and generous sleeve cuffs—symbolized 
              tribal dignity, celebration, and family heritage. At NEEDLE POWER, we honor these time-honored roots while adapting 
              silhouettes for contemporary everyday elegance, festive Eid gatherings, and grand celebrations.
            </p>
          </div>
        </div>

        {/* Craft Close-Up Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20 bg-[#F1E7D8]/40 p-8 sm:p-12 border border-[#B18A50]/20">
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#B18A50]">
              <Feather className="w-3.5 h-3.5" />
              <span>Technique & Materials</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#272321] font-normal">
              Mirrorwork, Resham & Noble Silks
            </h2>
            <p className="text-sm text-[#272321]/80 leading-relaxed font-sans">
              Our ateliers work exclusively with premium raw silk, fine pure linen, sheer organza, and sumptuous micro-velvet. 
              Each garment incorporates traditional Doch stitches—including the delicate <em>Mosum</em>, <em>Kantan</em>, and 
              <em>Zariwan</em>—paired with hand-set glass mirrors (Sheesha) that catch the ambient light like distant stars.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-3 bg-[#FAF6EF] border border-[#B18A50]/20">
                <strong className="block text-[#681F32] font-serif text-sm">Natural Threads</strong>
                <span className="text-[#272321]/70">Durable resham silk and metallic gold tilla that retain luster across generations.</span>
              </div>
              <div className="p-3 bg-[#FAF6EF] border border-[#B18A50]/20">
                <strong className="block text-[#681F32] font-serif text-sm">Skin Comfort</strong>
                <span className="text-[#272321]/70">Every piece is fully lined with soft mulmul cotton to ensure zero irritation.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="aspect-[4/3] overflow-hidden bg-[#FAF6EF] border border-[#B18A50]/30 shadow-lg">
              <SafeImage
                src={IMAGES.embroideryDetail}
                alt="Balochi needlework detail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Generations Philosophy */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-[#B18A50] block mb-1">
            Inclusive Wardrobes
          </span>
          <h3 className="font-serif text-3xl text-[#272321] font-normal">
            A Wardrobe for Every Stage of Life
          </h3>
          <p className="text-xs sm:text-sm text-[#272321]/70 mt-2">
            Fashion is most meaningful when it binds families together. NEEDLE POWER proudly creates coordinated festive and everyday designs across:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-[#FAF6EF] border border-[#B18A50]/30 text-center">
            <h4 className="font-serif text-xl text-[#681F32] font-semibold mb-2">Women's Couture</h4>
            <p className="text-xs text-[#272321]/75 leading-relaxed">
              Majestic three-piece raw silk suits, flowing anarkalis, festive velvet ensembles, and breathable casual tunics.
            </p>
          </div>
          <div className="p-6 bg-[#FAF6EF] border border-[#B18A50]/30 text-center">
            <h4 className="font-serif text-xl text-[#681F32] font-semibold mb-2">Girls' Festive Frocks</h4>
            <p className="text-xs text-[#272321]/75 leading-relaxed">
              Joyous color palettes, miniature doch yokes, twirl-worthy peshwas, and skin-friendly linings for young girls.
            </p>
          </div>
          <div className="p-6 bg-[#FAF6EF] border border-[#B18A50]/30 text-center">
            <h4 className="font-serif text-xl text-[#681F32] font-semibold mb-2">Kids' & Toddlers</h4>
            <p className="text-xs text-[#272321]/75 leading-relaxed">
              Comfortable jacquard cotton kurtas, embroidered band collars, and easy-wear festive sets for little boys and children.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-[#B18A50]/20">
          <button
            onClick={() => navigateTo('shop', { scrollToTop: true })}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#681F32] text-[#FAF6EF] text-xs font-semibold tracking-widest uppercase hover:bg-[#481522] transition-colors shadow-sm"
          >
            <span>Explore The Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
