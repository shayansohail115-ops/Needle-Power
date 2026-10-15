import React from 'react';
import { 
  Instagram, 
  Facebook, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CreditCard 
} from 'lucide-react';
import { STORE_CONFIG, getWhatsAppLink } from '../data/config';
import { useNavigation } from '../context/NavigationContext';
import { Category } from '../types';

export const Footer: React.FC = () => {
  const { navigateTo, goToCategory } = useNavigation();

  return (
    <footer className="bg-[#481522] text-[#FAF6EF] border-t border-[#B18A50]/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Props Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-[#B18A50]/20 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="p-2 border border-[#B18A50]/40 text-[#B18A50]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#F1E7D8]">
                Nationwide Delivery
              </h5>
              <p className="text-[11px] text-[#FAF6EF]/70 mt-0.5">
                Reliable shipping across all cities of Pakistan.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="p-2 border border-[#B18A50]/40 text-[#B18A50]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#F1E7D8]">
                Authentic Craft
              </h5>
              <p className="text-[11px] text-[#FAF6EF]/70 mt-0.5">
                Genuine Balochi Doch needlework and premium fabrics.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="p-2 border border-[#B18A50]/40 text-[#B18A50]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#F1E7D8]">
                Easy Exchange
              </h5>
              <p className="text-[11px] text-[#FAF6EF]/70 mt-0.5">
                7-day seamless size and design exchange policy.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="p-2 border border-[#B18A50]/40 text-[#B18A50]">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#F1E7D8]">
                Cash On Delivery
              </h5>
              <p className="text-[11px] text-[#FAF6EF]/70 mt-0.5">
                COD and Direct Bank Transfer supported.
              </p>
            </div>
          </div>
        </div>

        {/* Multi-Column Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#B18A50]/20">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => navigateTo('home', { scrollToTop: true })}
              className="text-left group cursor-pointer"
            >
              <span className="font-serif text-2xl tracking-[0.2em] font-semibold uppercase text-[#FAF6EF] group-hover:text-[#B18A50] transition-colors block">
                NEEDLE POWER
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#B18A50] font-medium block mt-0.5">
                HAUTE BALOCHI CRAFT & ETHNIC WEAR
              </span>
            </button>

            <p className="text-xs text-[#FAF6EF]/75 leading-relaxed font-sans max-w-sm">
              Celebrating the authentic textile heritage of Balochistan. We bring together century-old Doch embroidery, 
              luxurious natural fabrics, and refined modern silhouettes for women, girls, and children.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={STORE_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-[#B18A50]/40 hover:border-[#B18A50] hover:text-[#B18A50] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={STORE_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-[#B18A50]/40 hover:border-[#B18A50] hover:text-[#B18A50] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppLink("Hello NEEDLE POWER")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-[#B18A50]/40 hover:border-[#B18A50] hover:text-[#B18A50] flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Collections */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-[#B18A50] mb-4">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF6EF]/80 font-sans">
              <li>
                <button
                  onClick={() => goToCategory('balochi-collection')}
                  className="hover:text-[#B18A50] transition-colors"
                >
                  Balochi Doch Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => goToCategory('women')}
                  className="hover:text-[#B18A50] transition-colors"
                >
                  Women's Pret & Suits
                </button>
              </li>
              <li>
                <button
                  onClick={() => goToCategory('girls')}
                  className="hover:text-[#B18A50] transition-colors"
                >
                  Girls' Ethnic Frocks
                </button>
              </li>
              <li>
                <button
                  onClick={() => goToCategory('kids')}
                  className="hover:text-[#B18A50] transition-colors"
                >
                  Kids' Kurtas & Traditional
                </button>
              </li>
              <li>
                <button
                  onClick={() => goToCategory('festive-wear')}
                  className="hover:text-[#B18A50] transition-colors"
                >
                  Festive & Eid Edit
                </button>
              </li>
              <li>
                <button
                  onClick={() => goToCategory('new-arrivals')}
                  className="hover:text-[#B18A50] transition-colors"
                >
                  New Arrivals
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-[#B18A50] mb-4">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF6EF]/80 font-sans">
              <li>
                <button
                  onClick={() => navigateTo('shipping', { scrollToTop: true })}
                  className="hover:text-[#B18A50] transition-colors"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('returns', { scrollToTop: true })}
                  className="hover:text-[#B18A50] transition-colors"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about', { scrollToTop: true })}
                  className="hover:text-[#B18A50] transition-colors"
                >
                  Our Story & Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact', { scrollToTop: true })}
                  className="hover:text-[#B18A50] transition-colors"
                >
                  Contact & Atelier
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('terms', { scrollToTop: true })}
                  className="hover:text-[#B18A50] transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('privacy', { scrollToTop: true })}
                  className="hover:text-[#B18A50] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-[#B18A50] mb-4">
              Atelier Inquiries
            </h4>
            <div className="space-y-3 text-xs text-[#FAF6EF]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B18A50] shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.address.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B18A50] shrink-0" />
                <a href={STORE_CONFIG.telLink} className="hover:text-[#B18A50] transition-colors">
                  {STORE_CONFIG.formattedPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B18A50] shrink-0" />
                <a href={`mailto:${STORE_CONFIG.email}`} className="hover:text-[#B18A50] transition-colors">
                  {STORE_CONFIG.email}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={getWhatsAppLink("Hello NEEDLE POWER, I would like to place an order.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#B18A50] text-[#272321] text-[11px] font-bold tracking-wider uppercase hover:bg-[#C9A46B] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Order</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment icons */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#FAF6EF]/60 gap-4">
          <div>
            &copy; {new Date().getFullYear()} {STORE_CONFIG.brandName}. All Rights Reserved. Handcrafted in Pakistan.
          </div>

          {/* Supported Payment badges */}
          <div className="flex items-center gap-3 text-[11px] text-[#FAF6EF]/80">
            <span className="border border-[#B18A50]/30 px-2 py-0.5">Cash On Delivery</span>
            <span className="border border-[#B18A50]/30 px-2 py-0.5">Bank Transfer</span>
            <span className="border border-[#B18A50]/30 px-2 py-0.5">Card Gateway Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
