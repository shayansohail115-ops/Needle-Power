import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { STORE_CONFIG, getWhatsAppLink } from '../data/config';
import { Category } from '../types';

export const Header: React.FC = () => {
  const { cartCount, openCart, wishlist } = useCart();
  const { currentPage, selectedCategory, navigateTo, goToCategory, openSearch } = useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsDropdownOpen, setIsCollectionsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCollectionsDropdownOpen(false);
  }, [currentPage, selectedCategory]);

  const navLinks: { label: string; page?: 'home' | 'about' | 'contact'; category?: Category; hasDropdown?: boolean }[] = [
    { label: 'Home', page: 'home' },
    { label: 'New Arrivals', category: 'new-arrivals' },
    { label: 'Balochi Collection', category: 'balochi-collection' },
    { label: 'Women', category: 'women', hasDropdown: true },
    { label: 'Girls', category: 'girls' },
    { label: 'Kids', category: 'kids' },
    { label: 'Festive Wear', category: 'festive-wear' },
    { label: 'Our Story', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* 1. Announcement Bar */}
      <div className="bg-[#681F32] text-[#FAF6EF] text-xs py-2 px-4 border-b border-[#B18A50]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-[11px] tracking-wider uppercase text-[#FAF6EF]/80">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B18A50]" />
            <span>Artisanal Heritage · Balochi Doch Needlework</span>
          </div>

          <div className="w-full sm:w-auto text-center font-normal tracking-wide text-[11px] sm:text-xs">
            Discover the Art of Balochi Craftsmanship &nbsp;|&nbsp; 
            <span className="text-[#F1E7D8] font-medium ml-1">
              Complimentary Delivery in Pakistan over Rs. 10,000
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] tracking-wider text-[#FAF6EF]/90">
            <a 
              href={getWhatsAppLink("Hello NEEDLE POWER, I would like to inquire about your collections.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#B18A50] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#B18A50]" />
              <span>WhatsApp Styling Concierge</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF6EF]/95 backdrop-blur-md shadow-sm border-b border-[#B18A50]/20 py-3' 
            : 'bg-[#FAF6EF] border-b border-[#272321]/10 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-[#272321] hover:text-[#681F32] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#681F32]"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={openSearch}
                className="p-2 text-[#272321] hover:text-[#681F32] transition-colors ml-1 focus:outline-none"
                aria-label="Search clothing"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop Left Quick Info or Search */}
            <div className="hidden lg:flex items-center gap-6 w-1/4">
              <button
                type="button"
                onClick={openSearch}
                className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#272321]/70 hover:text-[#681F32] transition-colors group cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#272321]/60 group-hover:text-[#681F32] transition-colors" />
                <span className="border-b border-transparent group-hover:border-[#681F32] pb-0.5">Search Outfits</span>
              </button>
              <span className="text-[#272321]/20">|</span>
              <button
                onClick={() => navigateTo('shop', { category: 'festive-wear' })}
                className="text-xs tracking-wider uppercase text-[#681F32] font-medium flex items-center gap-1 hover:text-[#481522] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B18A50]" />
                <span>Festive Edit</span>
              </button>
            </div>

            {/* Centered Brand Typography Wordmark */}
            <div className="text-center flex-1 lg:w-2/4">
              <button 
                onClick={() => navigateTo('home')}
                className="inline-block group focus:outline-none cursor-pointer text-center"
              >
                <span className="block font-serif text-2xl sm:text-3xl md:text-3xl tracking-[0.22em] text-[#681F32] font-semibold uppercase leading-tight group-hover:text-[#481522] transition-colors">
                  NEEDLE POWER
                </span>
                <span className="block text-[9px] sm:text-[10px] tracking-[0.35em] text-[#B18A50] font-medium uppercase mt-0.5">
                  HAUTE BALOCHI CRAFT & ETHNIC WEAR
                </span>
              </button>
            </div>

            {/* Right Action Icons (Wishlist, Shopping Bag, Contact) */}
            <div className="flex items-center justify-end gap-3 sm:gap-5 w-auto lg:w-1/4">
              {/* WhatsApp Quick Link */}
              <a
                href={getWhatsAppLink("Hi! I would like to order or inquire from the NEEDLE POWER online store.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center text-xs text-[#272321]/80 hover:text-[#681F32] transition-colors"
                title="Direct WhatsApp Order"
              >
                <MessageCircle className="w-4 h-4 text-[#B18A50] mr-1" />
                <span className="hidden xl:inline text-[11px] tracking-wider uppercase">Order on WhatsApp</span>
              </a>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => navigateTo('wishlist')}
                className="p-2 text-[#272321] hover:text-[#681F32] transition-colors relative cursor-pointer"
                aria-label={`Wishlist (${wishlist.length} items)`}
              >
                <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-[#681F32] text-[#681F32]' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-[#681F32] text-[#FAF6EF] text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button */}
              <button
                type="button"
                onClick={openCart}
                className="p-2 text-[#272321] hover:text-[#681F32] transition-colors relative flex items-center gap-1.5 cursor-pointer group"
                aria-label={`Shopping bag containing ${cartCount} items`}
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#681F32] text-[#FAF6EF] text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-xs tracking-wider uppercase font-medium text-[#272321]/80 group-hover:text-[#681F32]">
                  Bag ({cartCount})
                </span>
              </button>
            </div>
          </div>

          {/* 3. Desktop Navigation Menu */}
          <nav className="hidden lg:block pt-3 border-t border-[#B18A50]/15 mt-3">
            <ul className="flex items-center justify-center gap-7 text-[12px] tracking-[0.14em] uppercase font-medium text-[#272321]/80">
              {navLinks.map((link) => {
                const isActive = link.page 
                  ? currentPage === link.page 
                  : (currentPage === 'shop' && selectedCategory === link.category);

                if (link.hasDropdown) {
                  return (
                    <li 
                      key={link.label}
                      className="relative group py-1"
                      onMouseEnter={() => setIsCollectionsDropdownOpen(true)}
                      onMouseLeave={() => setIsCollectionsDropdownOpen(false)}
                    >
                      <button
                        onClick={() => goToCategory('women')}
                        className={`flex items-center gap-1 hover:text-[#681F32] transition-colors pb-1 border-b-2 cursor-pointer ${
                          isActive 
                            ? 'text-[#681F32] border-[#681F32] font-semibold' 
                            : 'border-transparent'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-[#B18A50] group-hover:rotate-180 transition-transform duration-200" />
                      </button>

                      {/* Dropdown Menu */}
                      <div 
                        className={`absolute top-full left-0 w-64 bg-[#FAF6EF] shadow-xl border border-[#B18A50]/20 py-3 px-2 rounded-none transition-all duration-200 z-50 ${
                          isCollectionsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'
                        }`}
                      >
                        <div className="text-[10px] font-sans tracking-widest text-[#B18A50] uppercase px-3 py-1 font-semibold">
                          Women's Categories
                        </div>
                        <button
                          onClick={() => { goToCategory('women'); setIsCollectionsDropdownOpen(false); }}
                          className="w-full text-left px-3 py-2 text-xs normal-case tracking-normal hover:bg-[#F1E7D8] hover:text-[#681F32] transition-colors flex items-center justify-between"
                        >
                          <span>All Women's Ensembles</span>
                          <span className="text-[10px] text-[#272321]/50">18 pieces</span>
                        </button>
                        <button
                          onClick={() => { goToCategory('balochi-collection'); setIsCollectionsDropdownOpen(false); }}
                          className="w-full text-left px-3 py-2 text-xs normal-case tracking-normal hover:bg-[#F1E7D8] hover:text-[#681F32] transition-colors flex items-center justify-between"
                        >
                          <span>Traditional Balochi Doch Suits</span>
                          <span className="text-[10px] text-[#B18A50]">Heirloom</span>
                        </button>
                        <button
                          onClick={() => { goToCategory('festive-wear'); setIsCollectionsDropdownOpen(false); }}
                          className="w-full text-left px-3 py-2 text-xs normal-case tracking-normal hover:bg-[#F1E7D8] hover:text-[#681F32] transition-colors flex items-center justify-between"
                        >
                          <span>Occasion & Festive Velvet</span>
                          <span className="text-[10px] text-[#681F32]">Eid Special</span>
                        </button>
                        <div className="border-t border-[#B18A50]/15 my-1 pt-1">
                          <button
                            onClick={() => { navigateTo('shop'); setIsCollectionsDropdownOpen(false); }}
                            className="w-full text-left px-3 py-1.5 text-[11px] tracking-wider uppercase text-[#681F32] font-semibold hover:underline"
                          >
                            Browse Entire Lookbook &rarr;
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={link.label}>
                    <button
                      onClick={() => {
                        if (link.page) navigateTo(link.page);
                        else if (link.category) goToCategory(link.category);
                      }}
                      className={`hover:text-[#681F32] transition-colors pb-1 border-b-2 cursor-pointer ${
                        isActive 
                          ? 'text-[#681F32] border-[#681F32] font-semibold' 
                          : 'border-transparent'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* 4. Mobile Slide-out Drawer */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-[#272321]/60 backdrop-blur-xs"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Content */}
        <div 
          className={`fixed inset-y-0 left-0 w-full max-w-xs sm:max-w-sm bg-[#FAF6EF] shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out border-r border-[#B18A50]/20 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#B18A50]/20 bg-[#F1E7D8]/60">
              <div>
                <span className="font-serif text-lg tracking-[0.18em] text-[#681F32] font-bold uppercase">
                  NEEDLE POWER
                </span>
                <span className="block text-[9px] tracking-widest text-[#B18A50] uppercase">
                  Balochi Craft & Fashion
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#272321] hover:text-[#681F32]"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input in Mobile Drawer */}
            <div className="p-4 border-b border-[#272321]/10">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openSearch();
                }}
                className="w-full flex items-center justify-between px-3 py-2 bg-[#F1E7D8]/60 border border-[#B18A50]/30 text-xs text-[#272321]/70"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#681F32]" />
                  <span>Search Balochi dresses, kurtas...</span>
                </span>
              </button>
            </div>

            {/* Navigation Links list */}
            <div className="py-2 px-4 max-h-[calc(100vh-280px)] overflow-y-auto">
              <div className="text-[10px] tracking-widest uppercase font-semibold text-[#B18A50] px-2 py-2">
                Collections & Categories
              </div>
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => {
                        if (link.page) navigateTo(link.page);
                        else if (link.category) goToCategory(link.category);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2.5 text-sm font-medium tracking-wide text-[#272321] hover:text-[#681F32] hover:bg-[#F1E7D8]/50 rounded-none flex items-center justify-between transition-colors"
                    >
                      <span>{link.label}</span>
                      {link.category && (
                        <span className="text-[10px] tracking-widest uppercase text-[#B18A50]">
                          Explore
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Informational Links */}
              <div className="border-t border-[#B18A50]/20 my-3 pt-3">
                <div className="text-[10px] tracking-widest uppercase font-semibold text-[#B18A50] px-2 py-1">
                  Customer Assistance
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => { navigateTo('shipping'); setIsMobileMenuOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#272321]/80 hover:text-[#681F32]"
                  >
                    Shipping & Delivery Across Pakistan
                  </button>
                  <button
                    onClick={() => { navigateTo('returns'); setIsMobileMenuOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#272321]/80 hover:text-[#681F32]"
                  >
                    Returns & Exchange Policy
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Footer with Direct Contact */}
          <div className="p-4 bg-[#F1E7D8]/80 border-t border-[#B18A50]/20">
            <a
              href={getWhatsAppLink("Hello! I am browsing NEEDLE POWER on mobile and have a question.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#681F32] text-[#FAF6EF] text-xs font-semibold tracking-wider uppercase hover:bg-[#481522] transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#B18A50]" />
              <span>WhatsApp Concierge</span>
            </a>
            <div className="mt-2 text-center text-[10px] text-[#272321]/70">
              <a href={STORE_CONFIG.telLink} className="hover:text-[#681F32] hover:underline transition-colors">
                Call us: {STORE_CONFIG.formattedPhone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
