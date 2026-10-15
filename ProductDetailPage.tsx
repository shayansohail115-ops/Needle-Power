import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  ArrowRight, 
  Ruler, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  MessageCircle, 
  ChevronRight, 
  Share2, 
  Sparkles, 
  Check, 
  X,
  Plus,
  Minus
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { STORE_CONFIG, formatPKR, getWhatsAppLink } from '../data/config';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { selectedProductId, navigateTo, goToCategory } = useNavigation();
  const { addToCart, wishlist, toggleWishlist } = useCart();

  // Find product by id, default to first product if none selected
  const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'craft' | 'fabric' | 'delivery'>('craft');

  useEffect(() => {
    // Reset state on product change
    setActiveImageIndex(0);
    setSelectedSize(product.sizes[0] || '');
    setSelectedColor(product.colors[0]?.name || '');
    setQuantity(1);
    setValidationError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const isWish = wishlist.includes(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      setValidationError('Please select a garment size before adding to bag.');
      return;
    }
    setValidationError(null);
    addToCart(product, selectedSize, selectedColor || product.colors[0]?.name || 'Standard', quantity);
  };

  // Handle Buy Now
  const handleBuyNow = () => {
    if (!selectedSize) {
      setValidationError('Please select a garment size before proceeding.');
      return;
    }
    setValidationError(null);
    addToCart(product, selectedSize, selectedColor || product.colors[0]?.name || 'Standard', quantity);
    navigateTo('checkout', { scrollToTop: true });
  };

  // Generate WhatsApp Direct Order Message for this outfit
  const whatsappProductMessage = `*NEEDLE POWER - Product Order Inquiry*\n\n` +
    `Product: *${product.name}*\n` +
    `SKU: ${product.sku}\n` +
    `Size: ${selectedSize || 'Not selected yet'}\n` +
    `Color: ${selectedColor || product.colors[0]?.name}\n` +
    `Quantity: ${quantity}\n` +
    `Price: ${formatPKR(product.price * quantity)}\n\n` +
    `Is this piece available in atelier for dispatch?`;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Related products from same category or festive
  const relatedProducts = PRODUCTS.filter(
    p => p.id !== product.id && (p.category === product.category || p.isFestive)
  ).slice(0, 4);

  return (
    <div className="bg-[#FAF6EF] min-h-screen py-8 sm:py-12 border-b border-[#B18A50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#272321]/60 mb-6 font-sans">
          <button 
            onClick={() => navigateTo('home')} 
            className="hover:text-[#681F32] transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B18A50]" />
          <button 
            onClick={() => goToCategory(product.category)} 
            className="hover:text-[#681F32] transition-colors"
          >
            {product.categoryLabel}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B18A50]" />
          <span className="text-[#681F32] font-medium truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout: Gallery + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F1E7D8] border border-[#B18A50]/25 shadow-lg group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                referrerPolicy="no-referrer"
              />

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-2.5 bg-[#FAF6EF]/90 backdrop-blur-xs hover:bg-[#FAF6EF] text-[#272321] transition-colors shadow-sm"
                aria-label={isWish ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${isWish ? 'fill-[#681F32] text-[#681F32]' : 'text-[#272321]/70'}`} />
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isNew && (
                  <span className="bg-[#681F32] text-[#FAF6EF] text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 shadow-xs">
                    New Arrival
                  </span>
                )}
                {product.isFestive && (
                  <span className="bg-[#B18A50] text-[#FAF6EF] text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 shadow-xs">
                    Festive Edition
                  </span>
                )}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 sm:w-24 aspect-[3/4] overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx 
                        ? 'border-[#681F32] shadow-sm' 
                        : 'border-[#B18A50]/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details & Purchase Form */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs text-[#B18A50] font-medium tracking-[0.2em] uppercase mb-1">
                <span>{product.categoryLabel}</span>
                <span className="text-[#272321]/50 text-[10px]">SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#272321] font-normal tracking-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-xl sm:text-2xl font-bold font-sans text-[#681F32]">
                  {formatPKR(product.price)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-[#272321]/50 line-through">
                    {formatPKR(product.originalPrice!)}
                  </span>
                )}
                <span className="text-[11px] text-emerald-800 font-medium">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Stock Indicator */}
              <div className="mt-2 flex items-center gap-2 text-xs text-[#272321]/80">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>
                  {product.inStock ? `In Stock (${product.stockCount} pieces available in atelier)` : 'Sold Out'}
                </span>
              </div>

              {/* Brief Description */}
              <p className="mt-4 text-xs sm:text-sm text-[#272321]/80 leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6 pt-4 border-t border-[#B18A50]/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold tracking-wider uppercase text-[#272321]">
                      Color: <strong className="text-[#681F32] font-semibold">{selectedColor}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full border-2 p-0.5 transition-all ${
                          selectedColor === color.name ? 'border-[#681F32] scale-110' : 'border-transparent'
                        }`}
                        title={color.name}
                      >
                        <span 
                          className="w-full h-full rounded-full block border border-black/20" 
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection with Size Guide Modal Button */}
              <div className="mt-6 pt-4 border-t border-[#B18A50]/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#272321]">
                    Select Size *
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[11px] text-[#B18A50] hover:text-[#681F32] flex items-center gap-1 uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSelectedSize(size);
                        setValidationError(null);
                      }}
                      className={`py-2 px-2 text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-[#681F32] bg-[#681F32] text-[#FAF6EF]'
                          : 'border-[#B18A50]/40 bg-white text-[#272321] hover:border-[#681F32]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {validationError && (
                  <p className="text-xs text-red-700 mt-2 font-medium">
                    {validationError}
                  </p>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mt-6 pt-4 border-t border-[#B18A50]/20 flex items-center gap-4">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#272321]">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#B18A50]/40 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-[#F1E7D8] text-[#272321] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold font-sans">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="p-2 hover:bg-[#F1E7D8] text-[#272321] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Bag, Buy Now, WhatsApp Order */}
              <div className="mt-8 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 bg-[#681F32] text-[#FAF6EF] hover:bg-[#481522] text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="flex-1 py-3.5 px-6 border-2 border-[#681F32] text-[#681F32] hover:bg-[#681F32] hover:text-[#FAF6EF] text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Buy Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* WhatsApp Quick Order button */}
                <a
                  href={getWhatsAppLink(whatsappProductMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#25D366] text-white hover:bg-[#1EBE5B] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp Direct</span>
                </a>
              </div>

              {/* Share & Guarantee */}
              <div className="mt-6 flex items-center justify-between text-xs text-[#272321]/70 pt-4 border-t border-[#B18A50]/20">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 hover:text-[#681F32] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share Design'}</span>
                </button>
                <span className="text-[11px] text-[#B18A50] font-semibold">
                  100% Authentic Needlework
                </span>
              </div>
            </div>

            {/* Information Accordion / Tabs */}
            <div className="pt-6 border-t border-[#B18A50]/20">
              <div className="flex border-b border-[#B18A50]/20 gap-4 text-xs font-semibold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('craft')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'craft' ? 'border-[#681F32] text-[#681F32]' : 'border-transparent text-[#272321]/60'
                  }`}
                >
                  Craft & Details
                </button>
                <button
                  onClick={() => setActiveTab('fabric')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'fabric' ? 'border-[#681F32] text-[#681F32]' : 'border-transparent text-[#272321]/60'
                  }`}
                >
                  Fabric & Care
                </button>
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'delivery' ? 'border-[#681F32] text-[#681F32]' : 'border-transparent text-[#272321]/60'
                  }`}
                >
                  Delivery & Returns
                </button>
              </div>

              <div className="py-4 text-xs text-[#272321]/80 leading-relaxed space-y-2">
                {activeTab === 'craft' && (
                  <div className="space-y-2">
                    <p><strong>Embroidery:</strong> {product.embroideryType}</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'fabric' && (
                  <div className="space-y-2">
                    <p><strong>Textile Composition:</strong> {product.fabric}</p>
                    <p><strong>Care Instructions:</strong> {product.careInstructions}</p>
                  </div>
                )}

                {activeTab === 'delivery' && (
                  <div className="space-y-2">
                    <p><strong>Delivery:</strong> Standard delivery across Pakistan in {STORE_CONFIG.estimatedDeliveryDays}.</p>
                    <p><strong>Shipping Charges:</strong> Free shipping on orders over {formatPKR(STORE_CONFIG.freeShippingThreshold)}. Standard shipping is {formatPKR(STORE_CONFIG.standardShippingFee)}.</p>
                    <p><strong>Exchange:</strong> Unstitched or unworn pieces can be exchanged within 7 days of delivery.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#B18A50]/20">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-[#B18A50] block mb-1">
                Complementary Styles
              </span>
              <h3 className="font-serif text-3xl text-[#272321] font-normal tracking-tight">
                You May Also Admire
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#272321]/60 backdrop-blur-xs">
          <div className="bg-[#FAF6EF] border border-[#B18A50] w-full max-w-lg p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-4 right-4 text-[#272321]/70 hover:text-[#681F32]"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#B18A50]">
              NEEDLE POWER Sizing
            </span>
            <h3 className="font-serif text-2xl text-[#681F32] mb-2">
              Garment Measurement Guide
            </h3>
            <p className="text-xs text-[#272321]/70 mb-4">
              All measurements are in inches. For custom bespoke tailoring, please select "Custom Size" and our atelier will contact you.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#F1E7D8] text-[#681F32] uppercase tracking-wider font-semibold">
                    <th className="p-2.5 border border-[#B18A50]/30">Size</th>
                    <th className="p-2.5 border border-[#B18A50]/30">Chest / Bust</th>
                    <th className="p-2.5 border border-[#B18A50]/30">Waist</th>
                    <th className="p-2.5 border border-[#B18A50]/30">Hips</th>
                    <th className="p-2.5 border border-[#B18A50]/30">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#B18A50]/20">
                  <tr>
                    <td className="p-2 font-bold border border-[#B18A50]/20">XS</td>
                    <td className="p-2 border border-[#B18A50]/20">36"</td>
                    <td className="p-2 border border-[#B18A50]/20">32"</td>
                    <td className="p-2 border border-[#B18A50]/20">38"</td>
                    <td className="p-2 border border-[#B18A50]/20">42"</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold border border-[#B18A50]/20">S</td>
                    <td className="p-2 border border-[#B18A50]/20">38"</td>
                    <td className="p-2 border border-[#B18A50]/20">34"</td>
                    <td className="p-2 border border-[#B18A50]/20">40"</td>
                    <td className="p-2 border border-[#B18A50]/20">43"</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold border border-[#B18A50]/20">M</td>
                    <td className="p-2 border border-[#B18A50]/20">41"</td>
                    <td className="p-2 border border-[#B18A50]/20">37"</td>
                    <td className="p-2 border border-[#B18A50]/20">43"</td>
                    <td className="p-2 border border-[#B18A50]/20">44"</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold border border-[#B18A50]/20">L</td>
                    <td className="p-2 border border-[#B18A50]/20">44"</td>
                    <td className="p-2 border border-[#B18A50]/20">40"</td>
                    <td className="p-2 border border-[#B18A50]/20">46"</td>
                    <td className="p-2 border border-[#B18A50]/20">45"</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold border border-[#B18A50]/20">XL</td>
                    <td className="p-2 border border-[#B18A50]/20">47"</td>
                    <td className="p-2 border border-[#B18A50]/20">43"</td>
                    <td className="p-2 border border-[#B18A50]/20">49"</td>
                    <td className="p-2 border border-[#B18A50]/20">45"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-3 border-t border-[#B18A50]/20 flex justify-end">
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="px-5 py-2 bg-[#681F32] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
