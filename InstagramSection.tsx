import React, { useState } from 'react';
import { Instagram, ArrowUpRight, X } from 'lucide-react';
import { STORE_CONFIG } from '../data/config';
import { IMAGES } from '../data/images';
import { SafeImage } from './SafeImage';

interface LookbookItem {
  id: string;
  image: string;
  caption: string;
  tag: string;
}

export const InstagramSection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<LookbookItem | null>(null);

  const lookbook: LookbookItem[] = [
    {
      id: "edit-1",
      image: IMAGES.hero,
      caption: "Heirloom Balochi Doch silhouette in pure silk with handcrafted geometric front panel.",
      tag: "#BalochiTradition"
    },
    {
      id: "edit-2",
      image: IMAGES.embroideryDetail,
      caption: "Macro view of century-old Makran needlecraft with delicate mirrors and resham thread.",
      tag: "#ArtisanCraft"
    },
    {
      id: "edit-3",
      image: IMAGES.womensFestive,
      caption: "The festive velvet edit. Rich wine tones paired with tissue dupatta drape.",
      tag: "#FestiveWear"
    },
    {
      id: "edit-4",
      image: IMAGES.girlsEthnic,
      caption: "Royal indigo Balochi frock with child-safe soft mirrorwork and playful movement.",
      tag: "#GirlsFashion"
    },
    {
      id: "edit-5",
      image: IMAGES.kidsTraditional,
      caption: "Ivory & gold jacquard kurta set for festive boys and toddlers.",
      tag: "#KidsEthnic"
    },
    {
      id: "edit-6",
      image: IMAGES.embroideryDetail,
      caption: "Hand-finished borders, precision needlework, and heirloom quality in every stitch.",
      tag: "#NeedlePowerEdit"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF6EF] border-b border-[#B18A50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-[11px] font-medium tracking-[0.26em] uppercase text-[#B18A50] mb-1">
            <Instagram className="w-3.5 h-3.5" />
            <span>@needlepower.official</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#272321] font-normal tracking-tight">
            The NEEDLE POWER Edit
          </h2>
          <div className="w-12 h-0.5 bg-[#B18A50] mx-auto my-3" />
          <p className="text-xs sm:text-sm text-[#272321]/70">
            A window into our studio, artisan needlework, seasonal lookbooks, and styling moments.
          </p>
        </div>

        {/* 6-Photo Editorial Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {lookbook.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative aspect-square overflow-hidden bg-[#F1E7D8] cursor-pointer border border-[#B18A50]/20"
            >
              <SafeImage
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#481522]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-[#FAF6EF]">
                <Instagram className="w-5 h-5 text-[#B18A50] mb-2" />
                <span className="text-[10px] tracking-wider uppercase font-semibold text-[#F1E7D8]">
                  {item.tag}
                </span>
                <span className="text-[9px] text-[#FAF6EF]/80 line-clamp-2 mt-1">
                  {item.caption}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Follow Link */}
        <div className="mt-8 text-center">
          <a
            href={STORE_CONFIG.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#681F32] hover:text-[#481522] border-b border-[#681F32]/50 pb-0.5 transition-colors"
          >
            <span>Follow Our Atelier Journey on Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Lightbox / Modal for Instagram Photo Preview */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#272321]/80 backdrop-blur-xs">
          <div className="bg-[#FAF6EF] max-w-lg w-full border border-[#B18A50] p-4 relative shadow-2xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 text-[#272321] hover:text-[#681F32] z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[4/3] overflow-hidden bg-black mb-4">
              <SafeImage
                src={selectedPhoto.image}
                alt={selectedPhoto.caption}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#B18A50]">
                {selectedPhoto.tag}
              </span>
              <p className="text-xs text-[#272321]/85 leading-relaxed">
                {selectedPhoto.caption}
              </p>
              <div className="pt-2 border-t border-[#B18A50]/20 flex items-center justify-between text-xs text-[#681F32]">
                <span className="font-semibold">NEEDLE POWER Official Lookbook</span>
                <a
                  href={STORE_CONFIG.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  View on Instagram <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
