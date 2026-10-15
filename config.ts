/**
 * NEEDLE POWER — Centralized Business & Store Configuration
 * 
 * Official Business Details:
 * BUSINESS NAME: NEEDLE POWER
 * BUSINESS ADDRESS: Central Information Society, House No. C23
 * CONTACT NUMBER: 03363226843
 * WHATSAPP: 923363226843
 */

export const STORE_CONFIG = {
  // Brand Identity
  brandName: "NEEDLE POWER",
  tagline: "Tradition, Woven Into Every Thread",
  description: "Specializing in authentic Balochi Doch embroidery, luxury women's ethnic ensembles, girls' festive dresses, and children's traditional fashion.",
  
  // Official Contact Information
  email: "shayansohail115@gmail.com",
  
  // Official Phone & WhatsApp Details
  contactNumber: "03363226843",
  formattedPhone: "03363226843",
  telLink: "tel:03363226843",
  whatsappNumber: "923363226843",
  
  // Operating Hours
  supportHours: "Monday – Saturday: 10:00 AM – 8:00 PM (PKT)",
  
  // Official Physical Address
  address: {
    fullAddress: "Central Information Society, House No. C23",
  },

  // Official Business Bank Details for Direct Bank Transfer / Raast
  bankDetails: {
    bankName: "Meezan Bank Ltd",
    branch: "Main Branch",
    accountTitle: "NEEDLE POWER",
    accountNumber: "0102-0105829102",
    iban: "PK42MEZN0001020105829102",
    raastId: "03363226843"
  },
  
  // E-Commerce Delivery & Currency Settings
  currency: "PKR",
  currencySymbol: "Rs.",
  standardShippingFee: 250, // Standard shipping in PKR
  freeShippingThreshold: 10000, // Free shipping threshold in PKR (orders over Rs. 10,000)
  estimatedDeliveryDays: "3 to 5 business days",
  expressDeliveryDays: "1 to 2 business days",
  
  // Social Media Links
  socialLinks: {
    instagram: "https://instagram.com/needlepower.official",
    facebook: "https://facebook.com/needlepower.pk",
    whatsapp: "https://wa.me/923363226843",
    pinterest: "https://pinterest.com/needlepower",
  },

  // Promotional Discount Codes
  promoCodes: {
    "WELCOME10": { discountPercent: 10, label: "Welcome Offer (10% Off)" },
    "EIDSPECIAL": { discountAmount: 1500, label: "Festive Discount (Rs. 1,500 Off)" },
    "FREESHIP": { freeShipping: true, label: "Complimentary Nationwide Shipping" }
  }
};

/**
 * Generates an instant WhatsApp chat link with optional pre-filled order or query text.
 */
export function getWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${STORE_CONFIG.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Formats a numeric price into formatted Pakistani Rupees string (e.g. "Rs. 24,500")
 */
export function formatPKR(amount: number): string {
  return `${STORE_CONFIG.currencySymbol} ${amount.toLocaleString('en-PK')}`;
}
