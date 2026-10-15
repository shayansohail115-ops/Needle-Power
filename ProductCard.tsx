import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { formatPKR } from '../data/config';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const { goToProduct } = useNavigation();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [isQuickAdding, setIsQuickAdding] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const isWish = wishlist.includes(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsQuickAdding(true);
    addToCart(
      product, 
      selectedSize, 
      product.colors[0]?.name || 'Standard', 
      1
    );
    setAddedNotice(true);
    setTimeout(() => {
      setIsQuickAdding(false);
      setAddedNotice(false);
    }, 1500);
  };

  return (
    <div 
      className="group relative flex flex-col bg-[#FAF6EF] border border-[#B18A50]/20 transition-all duration-300 hover:shadow-lg hover:border-[#681F32]/50 cursor-pointer"
      onClick={() => goToProduct(product.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Box */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F1E7D8]">
        {/* Main Image */}
        <SafeImage
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Wishlist Button (always accessible) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 z-10 p-2 bg-[#FAF6EF]/85 backdrop-blur-xs hover:bg-[#FAF6EF] text-[#272321] transition-colors shadow-xs"
          aria-label={isWish ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 transition-colors ${isWish ? 'fill-[#681F32] text-[#681F32]' : 'text-[#272321]/70'}`} />
        </button>

        {/* Labels: clean editorial text tags (not garish pills) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNew && (
            <span className="bg-[#681F32] text-[#FAF6EF] text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 shadow-xs">
              New Arrival
            </span>
          )}
          {hasDiscount && (
            <span className="bg-[#B18A50] text-[#FAF6EF] text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 shadow-xs">
              Special Offer
            </span>
          )}
          {product.isFestive && !product.isNew && !hasDiscount && (
            <span className="bg-[#481522] text-[#FAF6EF] text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 shadow-xs">
              Festive Edit
            </span>
          )}
        </div>

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="hidden sm:flex absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#272321]/80 via-[#272321]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-between gap-2 z-10">
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!product.inStock || isQuickAdding}
            className="flex-1 py-2 px-3 bg-[#FAF6EF] text-[#681F32] hover:bg-[#681F32] hover:text-[#FAF6EF] text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            {addedNotice ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToProduct(product.id);
            }}
            className="p-2 bg-[#FAF6EF] text-[#272321] hover:bg-[#681F32] hover:text-[#FAF6EF] transition-colors shadow-sm"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {/* Metadata: clean unboxed text (anti-pill rule) */}
          <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#B18A50] font-medium mb-1">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.embroideryType.split(' ')[0]}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base text-[#272321] font-medium group-hover:text-[#681F32] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Color swatches preview */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.map((color) => (
                <span
                  key={color.name}
                  className="w-3 h-3 rounded-full border border-black/20"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              <span className="text-[10px] text-[#272321]/60 ml-1">
                {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
              </span>
            </div>
          )}
        </div>

        {/* Price & Mobile Add Button */}
        <div className="pt-3 mt-2 border-t border-[#B18A50]/15 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-sans font-semibold text-sm sm:text-base text-[#681F32]">
              {formatPKR(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-[#272321]/50 line-through">
                {formatPKR(product.originalPrice!)}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Icon button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className="sm:hidden p-1.5 text-[#681F32] hover:bg-[#F1E7D8] transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
