import React from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist } = useCart();
  const { navigateTo } = useNavigation();

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-[#FAF6EF] min-h-screen py-12 sm:py-16 border-b border-[#B18A50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 pb-4 border-b border-[#B18A50]/20">
          <span className="text-[10px] tracking-[0.26em] uppercase font-semibold text-[#B18A50] block mb-1">
            Personal Curation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#272321] font-normal tracking-tight">
            Your Wishlist ({wishlist.length})
          </h1>
          <div className="w-12 h-0.5 bg-[#B18A50] mx-auto my-3" />
          <p className="text-xs text-[#272321]/70">
            Designs and heirloom pieces you've saved for upcoming celebrations and weddings.
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#F1E7D8]/40 border border-[#B18A50]/25 p-8 max-w-md mx-auto">
            <Heart className="w-12 h-12 text-[#B18A50]/50 mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-[#272321]">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-[#272321]/70 mt-2 mb-6 leading-relaxed">
              Explore our handcrafted Balochi Doch dresses, women's Pret, and kids' traditional outfits to save your favorites.
            </p>
            <button
              onClick={() => navigateTo('shop', { scrollToTop: true })}
              className="px-6 py-3 bg-[#681F32] text-[#FAF6EF] text-xs font-semibold tracking-wider uppercase hover:bg-[#481522] transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
