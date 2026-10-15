export type Category = 
  | 'all'
  | 'balochi-collection'
  | 'women'
  | 'girls'
  | 'kids'
  | 'festive-wear'
  | 'new-arrivals';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  images: string[];
  isNew?: boolean;
  isFestive?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  stockCount: number;
  description: string;
  fabric: string;
  embroideryType: string;
  details: string[];
  sizes: string[];
  colors: ProductColor[];
  sku: string;
  careInstructions: string;
}

export interface CartItem {
  id: string; // unique item key: `${productId}-${size}-${color}`
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  province: string;
  address: string;
  postalCode?: string;
  deliveryInstructions?: string;
}

export type PaymentMethod = 'cod' | 'bank_transfer' | 'online_gateway';

export interface Order {
  orderNumber: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'confirmed' | 'dispatched' | 'delivered';
  createdAt: string;
  notes?: string;
}

export interface Review {
  id: string;
  productId?: string;
  productTitle?: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface FilterOptions {
  category: Category;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'name-asc';
  inStockOnly: boolean;
  selectedSize?: string;
}
