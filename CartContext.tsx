import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { STORE_CONFIG } from '../data/config';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  shippingFee: number;
  discount: number;
  appliedPromo: string | null;
  promoError: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'needle_power_cart_v1';
const WISHLIST_STORAGE_KEY = 'needle_power_wishlist_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCart(prev => {
      const itemId = `${product.id}-${size}-${color}`;
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item => 
          item.id === itemId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, {
          id: itemId,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity
        }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity: newQty } : item));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  // Promo discount calculation
  let discount = 0;
  let isFreeShippingByPromo = false;

  if (appliedPromo && STORE_CONFIG.promoCodes[appliedPromo as keyof typeof STORE_CONFIG.promoCodes]) {
    const promo = STORE_CONFIG.promoCodes[appliedPromo as keyof typeof STORE_CONFIG.promoCodes];
    if ('discountPercent' in promo && promo.discountPercent) {
      discount = Math.round((subtotal * promo.discountPercent) / 100);
    } else if ('discountAmount' in promo && promo.discountAmount) {
      discount = promo.discountAmount;
    } else if ('freeShipping' in promo && promo.freeShipping) {
      isFreeShippingByPromo = true;
    }
  }

  // Shipping Fee calculation
  const shippingFee = (subtotal === 0 || subtotal >= STORE_CONFIG.freeShippingThreshold || isFreeShippingByPromo)
    ? 0
    : STORE_CONFIG.standardShippingFee;

  const total = Math.max(0, subtotal - discount + shippingFee);

  const applyPromoCode = (code: string): boolean => {
    setPromoError(null);
    const cleaned = code.trim().toUpperCase();
    if (STORE_CONFIG.promoCodes[cleaned as keyof typeof STORE_CONFIG.promoCodes]) {
      setAppliedPromo(cleaned);
      return true;
    } else {
      setPromoError("Invalid promo code. Try 'WELCOME10' for 10% off.");
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        shippingFee,
        discount,
        appliedPromo,
        promoError,
        applyPromoCode,
        removePromoCode,
        total,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
