import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, Tag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { STORE_CONFIG, formatPKR, getWhatsAppLink } from '../data/config';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    shippingFee, 
    discount,
    appliedPromo,
    promoError,
    applyPromoCode,
    removePromoCode,
    total 
  } = useCart();
  
  const { navigateTo } = useNavigation();
  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  // Free shipping progress calculation
  const remainingForFreeShipping = Math.max(0, STORE_CONFIG.freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / STORE_CONFIG.freeShippingThreshold) * 100));

  // Build WhatsApp order message
  const generateWhatsAppOrderText = () => {
    let msg = `*NEEDLE POWER - New Order Inquiry*\n\n`;
    cart.forEach((item, index) => {
      msg += `${index + 1}. *${item.product.name}*\n`;
      msg += `   Size: ${item.selectedSize} | Color: ${item.selectedColor}\n`;
      msg += `   Qty: ${item.quantity} x ${formatPKR(item.product.price)} = ${formatPKR(item.product.price * item.quantity)}\n\n`;
    });
    msg += `Subtotal: ${formatPKR(subtotal)}\n`;
    if (discount > 0) msg += `Discount: -${formatPKR(discount)}\n`;
    msg += `Shipping: ${shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}\n`;
    msg += `*Estimated Total: ${formatPKR(total)}*\n\n`;
    msg += `Please confirm availability and share payment/delivery details. Thank you!`;
    return msg;
  };

  const handleCheckoutClick = () => {
    closeCart();
    navigateTo('checkout', { scrollToTop: true });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#272321]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6EF] shadow-2xl flex flex-col justify-between border-l border-[#B18A50]/20">
          
          {/* 1. Header */}
          <div className="p-4 sm:p-5 border-b border-[#B18A50]/20 bg-[#F1E7D8]/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#681F32]" />
              <h2 className="font-serif text-xl text-[#272321] font-medium">
                Your Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#272321]/70 hover:text-[#681F32] transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Free Delivery Bar */}
          <div className="px-5 py-3 bg-[#FAF6EF] border-b border-[#B18A50]/15 text-xs">
            {remainingForFreeShipping > 0 ? (
              <div>
                <p className="text-[#272321]/80 mb-1.5">
                  Add <span className="font-semibold text-[#681F32]">{formatPKR(remainingForFreeShipping)}</span> more to unlock <span className="font-semibold text-[#B18A50]">Free Delivery</span>
                </p>
                <div className="w-full bg-[#F1E7D8] h-1.5 overflow-hidden">
                  <div 
                    className="bg-[#681F32] h-full transition-all duration-300" 
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-emerald-800 font-medium flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>You've unlocked Complimentary Nationwide Delivery!</span>
              </p>
            )}
          </div>

          {/* 3. Items List or Empty State */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#B18A50]/15">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto border border-[#B18A50]/40 flex items-center justify-center text-[#B18A50]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#272321]">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#272321]/70 max-w-xs mx-auto leading-relaxed">
                  Discover our authentic Balochi Doch embroidered outfits, women's festive wear, and children's collections.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    navigateTo('shop', { scrollToTop: true });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#681F32] text-[#FAF6EF] text-xs font-semibold tracking-wider uppercase hover:bg-[#481522] transition-colors"
                >
                  <span>Explore Collections</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-start first:pt-0">
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover object-top border border-[#B18A50]/20 bg-[#F1E7D8]"
                    referrerPolicy="no-referrer"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-medium text-[#272321] line-clamp-1 pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#272321]/40 hover:text-red-700 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#272321]/70 mt-1 space-x-2">
                        <span>Size: <strong className="text-[#272321]">{item.selectedSize}</strong></span>
                        <span>·</span>
                        <span>Color: <strong className="text-[#272321]">{item.selectedColor}</strong></span>
                      </div>

                      <div className="font-semibold text-xs text-[#681F32] mt-1.5">
                        {formatPKR(item.product.price)}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#B18A50]/30 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#F1E7D8] text-[#272321] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#F1E7D8] text-[#272321] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#272321]">
                        {formatPKR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 4. Footer & Actions (only when cart has items) */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#F1E7D8]/60 border-t border-[#B18A50]/20 space-y-3">
              
              {/* Promo Code Input */}
              <div className="border border-[#B18A50]/30 p-2 bg-[#FAF6EF]">
                {appliedPromo ? (
                  <div className="flex items-center justify-between text-xs text-emerald-800">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      Promo '{appliedPromo}' Applied (-{formatPKR(discount)})
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-[#681F32] hover:underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code (e.g. WELCOME10)"
                      className="w-full px-2.5 py-1 text-xs bg-white border border-[#B18A50]/30 uppercase focus:outline-none focus:border-[#681F32]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (applyPromoCode(promoInput)) {
                          setPromoInput('');
                        }
                      }}
                      className="px-3 py-1 bg-[#681F32] text-[#FAF6EF] text-xs font-semibold uppercase hover:bg-[#481522] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-600 mt-1">{promoError}</p>
                )}
              </div>

              {/* Subtotal & Calculations */}
              <div className="space-y-1.5 text-xs text-[#272321]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#272321]">{formatPKR(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Discount</span>
                    <span>-{formatPKR(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPKR(shippingFee)}</span>
                </div>

                <div className="border-t border-[#B18A50]/20 pt-2 flex justify-between text-sm sm:text-base font-semibold text-[#272321]">
                  <span>Total</span>
                  <span className="text-[#681F32]">{formatPKR(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                {/* Proceed to Checkout button */}
                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 bg-[#681F32] text-[#FAF6EF] text-xs font-semibold tracking-widest uppercase hover:bg-[#481522] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* WhatsApp Quick Order button */}
                <a
                  href={getWhatsAppLink(generateWhatsAppOrderText())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#25D366] text-white hover:bg-[#1EBE5B] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Directly via WhatsApp</span>
                </a>
              </div>

              <p className="text-[10px] text-center text-[#272321]/60">
                Cash on Delivery & Direct Bank Transfer available across Pakistan.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
