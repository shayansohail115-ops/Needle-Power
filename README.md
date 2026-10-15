# NEEDLE POWER — Haute Balochi Craft & Luxury Ethnic Fashion

**NEEDLE POWER** is a premier e-commerce web application for an authentic Pakistani luxury fashion brand specializing in handcrafted Balochi Doch embroidery, women's couture, girls' festive frocks, and children's traditional wear.

---

## Brand Visual Identity & Color System

- **Deep Burgundy**: `#681F32` (Primary brand accent, primary CTA buttons, active state)
- **Rich Wine**: `#481522` (Footer, dark contrast panels, festive highlights)
- **Warm Ivory**: `#FAF6EF` (Main page canvas background)
- **Soft Cream**: `#F1E7D8` (Secondary card panels, subtle separators)
- **Antique Gold**: `#B18A50` (Editorial accents, fine hairline borders, star badges)
- **Muted Rose**: `#C99B9D` (Secondary accents)
- **Deep Charcoal**: `#272321` (High-contrast typography)
- **Typography**: Editorial Serif (*Cormorant Garamond*) + Modern Sans (*Plus Jakarta Sans*)

---

## Key Features Built In

1. **Responsive Header & Navigation**:
   - Announcement bar with free shipping progress notice.
   - Distinctive typography wordmark.
   - Collections dropdown and deep-link routing.
   - Wishlist count badge, real-time search modal, and cart drawer.
   - Smooth mobile slide-out navigation drawer.

2. **Editorial Homepage**:
   - **Hero Section**: Authentic Balochi Doch campaign photograph with dual CTAs.
   - **Shop by Category**: 4 editorial category showcases (Balochi, Women, Girls, Kids).
   - **Curated for You**: 8-product interactive catalog with instant category tabs.
   - **Artisan Craftsmanship Feature**: Macro photography of Balochi Doch needlework and mirrorwork.
   - **New Arrivals Carousel**: Smooth horizontal scrolling with desktop arrow controls.
   - **Festive Banner**: Occasion & Eid wear campaign banner.
   - **The NEEDLE POWER Edit**: 6-photo lookbook grid with interactive preview lightbox.
   - **Customer Feedback & Review Submission**: Verified client testimonials and client review modal.
   - **Newsletter Subscription**: Instant client validation and storage.

3. **Complete E-Commerce Functionality**:
   - **Shop Page**: Category filters, real-time search, price range slider, in-stock toggle, sorting (newest, low/high), responsive filter drawer on mobile.
   - **Product Detail Page**: Multi-angle photo gallery, size selector with **Interactive Size Guide** (inches for Pakistani garments), color selection, stock indicator, Add to Bag, Buy Now, and related recommendations.
   - **Shopping Bag & Cart Drawer**: Slide-out drawer with quantity controls, free delivery progress meter, promo code discount engine (`WELCOME10`), and subtotal calculation.
   - **Checkout Experience**: Full delivery address with Pakistani city selector, Cash on Delivery (COD), Direct Bank Transfer with bank IBAN details, and Card Gateway Ready sandbox.
   - **Direct WhatsApp Ordering**: One-click WhatsApp checkout that automatically compiles product names, sizes, quantities, and delivery address into a pre-filled chat message.
   - **Floating WhatsApp Concierge**: Non-intrusive floating WhatsApp action button with live chat link.
   - **Order Confirmation Page**: Real order reference code (`NP-XXXXXX`), invoice receipt breakdown, and one-click printable invoice.
   - **Informational & Policy Pages**: About Us (Heritage story of Balochi Doch), Contact Us with interactive message submission, Shipping Policy, Returns & Exchange Policy, and Privacy Policy.

---

## 1. How to Install Required Dependencies

Ensure you have **Node.js (v18 or higher)** and `npm` installed on your machine.

```bash
# Clone or extract the repository
git clone <your-repo-url>
cd needle-power

# Install dependencies
npm install
```

---

## 2. How to Run the Website Locally

Start the local development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` (or the port indicated in terminal).

---

## 3. How to Customize Store Data, Logo, Colors & Products

### A. Centralized Business Information & WhatsApp Number
Open `src/data/config.ts`:
```typescript
export const STORE_CONFIG = {
  brandName: "NEEDLE POWER",
  tagline: "Tradition, Woven Into Every Thread",
  
  // Official Contact Information
  email: "shayansohail115@gmail.com",
  contactNumber: "03363226843",
  formattedPhone: "03363226843",
  telLink: "tel:03363226843",
  whatsappNumber: "923363226843",
  
  // Official Address
  address: {
    fullAddress: "Central Information Society, House No. C23",
  },

  // Bank Account & Raast for Direct Transfers
  bankDetails: {
    bankName: "Meezan Bank Ltd",
    branch: "Main Branch",
    accountTitle: "NEEDLE POWER",
    accountNumber: "0102-0105829102",
    iban: "PK42MEZN0001020105829102",
    raastId: "03363226843"
  },

  standardShippingFee: 250, // PKR
  freeShippingThreshold: 10000, // Free shipping threshold in PKR
  ...
};
```

### B. Catalog, Products, Prices & Sizes
Open `src/data/products.ts`:
- Each item has `name`, `price`, `originalPrice`, `fabric`, `embroideryType`, `sizes`, `colors`, and `images`.
- Add, edit, or remove products directly.

### C. Color Palette & Typography
Open `src/index.css` under `@theme`:
- `--color-burgundy`, `--color-gold`, `--color-ivory`, etc. can be adjusted to match your brand palette.

---

## 4. Operational vs. Production Backend Setup

| Feature | Current Status | Production Evolution |
|---|---|---|
| **Shopping Cart & Wishlist** | ✅ Fully Functional (localStorage persistence) | Can be synced with customer account DB |
| **Catalog Browsing, Filters & Search** | ✅ Fully Functional on client | Can query server-side SQL/Firestore |
| **WhatsApp Direct Orders** | ✅ 100% Operational | Sends pre-formatted WhatsApp chat to owner |
| **Cash on Delivery (COD) Checkout** | ✅ Functional (records orders in state & storage) | Connect to courier booking APIs (e.g. TCS / Leopards API) |
| **Bank Transfer Checkout** | ✅ Functional (shows IBAN & bank instructions) | Automatic transaction reference verification |
| **Card Payment Gateway** | 🛠 Prepared (Sandbox UI ready) | Plug in PayFast, JazzCash, EasyPaisa, or Stripe API keys |

---

## 5. How to Create a Production Build

To build the static optimized production bundle:

```bash
npm run build
```

This generates a standalone `dist/` directory containing:
- `index.html`
- `assets/` (bundled JS, CSS, and optimized images)
- `.htaccess` (pre-configured for Hostinger URL rewrites and Gzip compression)
- `robots.txt` & `sitemap.xml`

---

## 6. How to Deploy to Hostinger (Step-by-Step)

Hostinger supports static and Single Page Applications on all **Web Hosting**, **Cloud Hosting**, or **VPS** plans.

### Step 1: Build the Project
```bash
npm run build
```

### Step 2: Access Hostinger File Manager
1. Log in to your **Hostinger hPanel** (`hpanel.hostinger.com`).
2. Navigate to **Websites** > Click **Manage** next to your domain (`needlepower.pk`).
3. Under the **Files** section, click **File Manager** (or connect via FTP / FileZilla).
4. Double-click the `public_html` directory.

### Step 3: Upload Files
1. Select all files and folders inside your local `dist/` directory (`index.html`, `assets/`, `.htaccess`, `robots.txt`, `sitemap.xml`).
2. Upload them directly into `public_html`.
   *(Ensure `index.html` is located directly in `public_html/index.html`, not nested inside a subfolder).*

---

## 7. How to Connect Your Domain and Enable HTTPS

1. In Hostinger hPanel, go to **Domains** > **DNS / Nameservers**.
2. If your domain is purchased from Hostinger, DNS is configured automatically.
3. If purchased elsewhere (e.g. GoDaddy, PKNIC), point your domain's A-record to your Hostinger server IP address.
4. Go to **Security** > **SSL** in hPanel and click **Install Free SSL (Let's Encrypt)**.
5. Toggle **Force HTTPS** to on.

---

## 8. How to Connect to Google Search Console

1. Visit [Google Search Console](https://search.google.com/search-console).
2. Choose **URL prefix** and enter `https://yourdomain.pk`.
3. Choose verification method:
   - **HTML Tag**: Paste the meta tag into `index.html` inside `<head>`.
   - **DNS TXT record**: Add the TXT record in Hostinger DNS manager.
4. Once verified, submit your sitemap under **Sitemaps** by entering `https://yourdomain.pk/sitemap.xml`.

---

© 2026 NEEDLE POWER. All rights reserved. Handcrafted in Pakistan.
