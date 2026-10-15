import { Product } from '../types';
import { IMAGES } from './images';

export const PRODUCTS: Product[] = [
  {
    id: "np-001",
    name: "Mahnoor Royal Balochi Doch Suit",
    slug: "mahnoor-royal-balochi-doch-suit",
    category: "balochi-collection",
    categoryLabel: "Balochi Collection",
    price: 28500,
    originalPrice: 32000,
    images: [
      IMAGES.hero,
      IMAGES.embroideryDetail
    ],
    isNew: true,
    isFestive: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 8,
    description: "Our signature ensemble featuring authentic multi-colored Balochi Doch hand embroidery across the front chest panel (Pandool), sleeve cuffs, and neckline. Crafted in premium raw silk with pure organza dupatta accented with delicate antique gold border trims.",
    fabric: "Pure Raw Silk with Sheer Organza Dupatta",
    embroideryType: "Traditional Handcrafted Balochi Doch Needlework with Sheesha (Mirrorwork)",
    details: [
      "Authentic handmade Balochi chest placket and collar embroidery",
      "Traditional wide-cuff sleeve detailing with geometric motifs",
      "Pure raw silk trousers with embroidered ankle borders",
      "2.75-meter organza dupatta with gold tilla edging",
      "Natural hand-dyed thread accents in burgundy, gold, and deep turquoise"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "Custom Size"],
    colors: [
      { name: "Burgundy Wine & Ivory", hex: "#681F32" },
      { name: "Royal Rust & Gold", hex: "#B18A50" }
    ],
    sku: "NP-BAL-001",
    careInstructions: "Dry clean only. Store in breathable muslin bag away from direct sunlight."
  },
  {
    id: "np-002",
    name: "Zohra Heritage Velvet Ensemble",
    slug: "zohra-heritage-velvet-ensemble",
    category: "women",
    categoryLabel: "Women's Collection",
    price: 24900,
    originalPrice: 28000,
    images: [
      IMAGES.womensFestive,
      IMAGES.embroideryDetail
    ],
    isNew: true,
    isFestive: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 12,
    description: "An elegant contemporary silhouette rendered in deep wine micro-velvet, embellished with fine Balochi geometric neckline embroidery and antique gold zari work. Accompanied by a tissue silk dupatta that drapes with graceful fluidity.",
    fabric: "Premium Micro-Velvet with Tissue Silk Dupatta",
    embroideryType: "Balochi Doch Stitching & Antique Zari Needlework",
    details: [
      "Fine geometric collar embroidery inspired by Makran needlework",
      "Scalloped sleeve edges with subtle metallic gota highlights",
      "Comfortable straight cut trousers in matching tone",
      "Lightweight shimmering dupatta with raw-edge selvedge finish",
      "Lined with soft breathable cotton silk for all-day comfort"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Deep Wine", hex: "#481522" },
      { name: "Antique Emerald", hex: "#1A382B" }
    ],
    sku: "NP-WOM-002",
    careInstructions: "Professional dry clean only. Steam iron from reverse side."
  },
  {
    id: "np-003",
    name: "Pariwash Vibrant Balochi Dress for Girls",
    slug: "pariwash-vibrant-balochi-dress-for-girls",
    category: "girls",
    categoryLabel: "Girls' Collection",
    price: 9800,
    images: [
      IMAGES.girlsEthnic,
      IMAGES.embroideryDetail
    ],
    isNew: true,
    isFestive: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 15,
    description: "A celebration of colors and heritage for young girls. Handcrafted with traditional Balochi doch embroidery, delicate mirror accents, and soft gathered pleating designed for effortless twirls and joyful festive gatherings.",
    fabric: "Fine Soft Khaddar Cotton with Soft Mulmul Lining",
    embroideryType: "Multi-Color Balochi Doch with Safe Soft Mirrorwork",
    details: [
      "Child-safe embedded mirrorwork with smooth finished backing",
      "Traditional embroidered front bib and sleeve cuffs",
      "Comfortable elasticated waistband on matching trousers",
      "Lightweight crinkle chiffon dupatta with fun thread tassels",
      "Designed with room for movement and play"
    ],
    sizes: ["4-5 Years", "6-7 Years", "8-9 Years", "10-11 Years", "12-14 Years"],
    colors: [
      { name: "Royal Indigo", hex: "#1D3557" },
      { name: "Festive Crimson", hex: "#8A1C30" }
    ],
    sku: "NP-GIRL-003",
    careInstructions: "Gentle hand wash in cold water or dry clean. Do not bleach."
  },
  {
    id: "np-004",
    name: "Shahmir Junior Festive Kurta Set",
    slug: "shahmir-junior-festive-kurta-set",
    category: "kids",
    categoryLabel: "Kids' Collection",
    price: 7400,
    originalPrice: 8500,
    images: [
      IMAGES.kidsTraditional,
      IMAGES.hero
    ],
    isNew: false,
    isFestive: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 14,
    description: "A timeless ceremonial ensemble for young boys and children. Cut from warm ivory jacquard cotton and accented with intricate Balochi needlework along the band collar and placket, paired with a classic tapered shalwar.",
    fabric: "Breathable Jacquard Cotton with Silk Thread Accents",
    embroideryType: "Balochi Band-Collar Needlework & Zari Borders",
    details: [
      "Understated hand-finished collar and cuff embroidery",
      "Soft concealed inner buttons to protect sensitive skin",
      "Roomy traditional shalwar with adjustable soft elastic waist",
      "Includes a ceremonial pocket square and matching dupatta drape",
      "Pre-shrunk fabric to prevent color bleeding"
    ],
    sizes: ["2-3 Years", "4-5 Years", "6-7 Years", "8-9 Years", "10-12 Years"],
    colors: [
      { name: "Warm Ivory & Gold", hex: "#FAF6EF" },
      { name: "Soft Muted Cream", hex: "#F1E7D8" }
    ],
    sku: "NP-KID-004",
    careInstructions: "Machine wash cold on gentle cycle or hand wash. Warm iron."
  },
  {
    id: "np-005",
    name: "Gul-e-Doch Artisan Heritage Suit",
    slug: "gul-e-doch-artisan-heritage-suit",
    category: "balochi-collection",
    categoryLabel: "Balochi Collection",
    price: 34500,
    images: [
      IMAGES.embroideryDetail,
      IMAGES.hero
    ],
    isNew: true,
    isFestive: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 5,
    description: "A collector's heirloom piece taking over six weeks of patient needlework. Sourced directly with master embroiderers, featuring intricate geometric diamond medallions, mirrorwork, and resham silk threads on a canvas of midnight burgundy.",
    fabric: "Pure Handloom Chanderi Silk",
    embroideryType: "Fine Kalat & Makran Style Doch Embroidery",
    details: [
      "Over 120 hours of intricate hand-stitching across yoke and sleeves",
      "Real glass mirrors meticulously set with silk chain stitches",
      "Pure chiffon dupatta finished with hand-knotted silk thread fringe",
      "Includes tailored silk straight pants",
      "Numbered certificate of authenticity and artisan story card included"
    ],
    sizes: ["S", "M", "L", "Custom Size"],
    colors: [
      { name: "Burgundy & Antique Brass", hex: "#681F32" },
      { name: "Deep Charcoal & Gold", hex: "#272321" }
    ],
    sku: "NP-BAL-005",
    careInstructions: "Specialist dry clean only. Wrap in unbleached cotton when not in use."
  },
  {
    id: "np-006",
    name: "Sheen Rose Contemporary Kurti",
    slug: "sheen-rose-contemporary-kurti",
    category: "women",
    categoryLabel: "Women's Collection",
    price: 13500,
    originalPrice: 15500,
    images: [
      IMAGES.womensFestive,
      IMAGES.hero
    ],
    isNew: true,
    isFestive: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 18,
    description: "Modern minimalist tailoring infused with cultural richness. This everyday-luxe tunic features a clean collar line adorned with subtle Balochi thread accents, side slits, and comfortable straight sleeves.",
    fabric: "High-Count Pure Linen Slub",
    embroideryType: "Subtle Balochi Stitchwork & Tilla Thread",
    details: [
      "Bespoke band collar with fine hand embroidery",
      "Deep side pockets for modern practicality",
      "Relaxed straight silhouette flattering for all body shapes",
      "Breathable fabric ideal for summer and spring gatherings"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Muted Rose", hex: "#C99B9D" },
      { name: "Ivory Cream", hex: "#FAF6EF" }
    ],
    sku: "NP-WOM-006",
    careInstructions: "Hand wash separately in mild detergent. Dry in shade."
  },
  {
    id: "np-007",
    name: "Ayla Little Princess Peshwas",
    slug: "ayla-little-princess-peshwas",
    category: "girls",
    categoryLabel: "Girls' Collection",
    price: 11500,
    images: [
      IMAGES.girlsEthnic,
      IMAGES.kidsTraditional
    ],
    isNew: false,
    isFestive: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 9,
    description: "A flared festive peshwas designed for weddings and Eid celebrations. Features a fitted embroidered bodice with traditional Balochi geometric framing, flowing down into a full-circle flare with gold lace finishing.",
    fabric: "Crinkle Chiffon with Butter Crepe Lining",
    embroideryType: "Balochi Yoke Needlework & Gold Zari Gota",
    details: [
      "Flared silhouette with over 4 meters of fabric gathering",
      "Concealed back zipper with protective fabric flap",
      "Complete with soft churidar pants and net dupatta",
      "Soft inner linings guarantee irritation-free wear"
    ],
    sizes: ["4-5 Years", "6-7 Years", "8-9 Years", "10-11 Years", "12-14 Years"],
    colors: [
      { name: "Festive Navy & Gold", hex: "#1A2536" },
      { name: "Muted Rose & Wine", hex: "#C99B9D" }
    ],
    sku: "NP-GIRL-007",
    careInstructions: "Dry clean recommended for best garment longevity."
  },
  {
    id: "np-008",
    name: "Bibi Noor Toddler Doch Frock",
    slug: "bibi-noor-toddler-doch-frock",
    category: "kids",
    categoryLabel: "Kids' Collection",
    price: 6800,
    originalPrice: 7900,
    images: [
      IMAGES.kidsTraditional,
      IMAGES.girlsEthnic
    ],
    isNew: true,
    isFestive: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 16,
    description: "Adorable miniature Balochi dress tailored specifically for infants and toddlers. Uses 100% organic cotton muslin lined with ultra-soft cotton, keeping delicate skin cool while showcasing timeless traditional style.",
    fabric: "100% Organic Lawn Cotton",
    embroideryType: "Hand-Embroidered Soft Doch Accents",
    details: [
      "Pure non-toxic hand-dyed organic embroidery threads",
      "No scratchy inner labels or rough seams",
      "Easy diaper-access snap buttons on matching bloomers/pajamas",
      "A cherished keepsake garment for milestones and Eid"
    ],
    sizes: ["6-12 Months", "12-18 Months", "18-24 Months", "2-3 Years", "3-4 Years"],
    colors: [
      { name: "Warm Cream & Mustard", hex: "#F1E7D8" },
      { name: "Blush Rose", hex: "#E8D3D4" }
    ],
    sku: "NP-KID-008",
    careInstructions: "Machine wash delicate cycle in cold water. Iron on medium."
  },
  {
    id: "np-009",
    name: "Darya Occasion Wear Anarkali",
    slug: "darya-occasion-wear-anarkali",
    category: "festive-wear",
    categoryLabel: "Festive Wear",
    price: 36000,
    originalPrice: 40000,
    images: [
      IMAGES.womensFestive,
      IMAGES.embroideryDetail
    ],
    isNew: true,
    isFestive: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 6,
    description: "A grand statement piece marrying regal Mughal volume with intricate Balochistan needlecraft. Boasts a heavily worked yoke featuring mirrors and antique copper zari, falling into twenty-four panels of pure georgette silk.",
    fabric: "Pure Georgette Silk with Organza Border Inserts",
    embroideryType: "Doch Floral & Geometric Symmetry with Copper Tilla",
    details: [
      "24 individual kalis (panels) hand-joined with tilla piping",
      "Full 3-meter embroidered dupatta with four-sided borders",
      "Heavy embroidered cuffs with custom antique metal buttons",
      "Includes bespoke tailoring consultation upon order"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "Custom Size"],
    colors: [
      { name: "Rich Wine", hex: "#481522" },
      { name: "Antique Ivory", hex: "#FAF6EF" }
    ],
    sku: "NP-FEST-009",
    careInstructions: "Specialist dry clean only."
  },
  {
    id: "np-010",
    name: "Koh-e-Noor Ceremonial Shawl & Suit",
    slug: "koh-e-noor-ceremonial-shawl-and-suit",
    category: "balochi-collection",
    categoryLabel: "Balochi Collection",
    price: 42000,
    images: [
      IMAGES.hero,
      IMAGES.embroideryDetail
    ],
    isNew: true,
    isFestive: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 4,
    description: "An extraordinary masterwork featuring an opulent Balochi hand-embroidered shawl paired with an understated solid raw silk three-piece suit. Each corner of the shawl depicts ancestral motifs of protection and prosperity.",
    fabric: "Pure Pashmina Blend Shawl with Raw Silk Shirt & Trouser",
    embroideryType: "Ancestral Balochi Doch & Fine Kantha Stitches",
    details: [
      "Full-sized 2.5m x 1.25m artisan embroidered pashmina shawl",
      "Solid pure silk kurta with embroidered placket buttons",
      "Classic matching trousers with hand-hemmed finish",
      "Heirloom presentation box included"
    ],
    sizes: ["S", "M", "L", "Custom Size"],
    colors: [
      { name: "Burgundy & Antique Brass", hex: "#681F32" }
    ],
    sku: "NP-BAL-010",
    careInstructions: "Dry clean only. Store with cedar balls."
  },
  {
    id: "np-011",
    name: "Simin Everyday Embroidered Tunic",
    slug: "simin-everyday-embroidered-tunic",
    category: "new-arrivals",
    categoryLabel: "New Arrivals",
    price: 11900,
    images: [
      IMAGES.womensFestive,
      IMAGES.embroideryDetail
    ],
    isNew: true,
    isFestive: false,
    isBestSeller: false,
    inStock: true,
    stockCount: 20,
    description: "Effortless daytime elegance for the modern woman. Rendered in breathable lawn-linen with subtle doch neckline patterns that elevate your casual and work wardrobe.",
    fabric: "Premium Lawn-Linen Blend",
    embroideryType: "Delicate Balochi Stitch Detailing",
    details: [
      "V-slit neckline with neat hand-finished topstitching",
      "Side pockets and curved hemline",
      "Pair with white cigarette pants or traditional shalwar"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Warm Ivory", hex: "#FAF6EF" },
      { name: "Soft Charcoal", hex: "#272321" }
    ],
    sku: "NP-NEW-011",
    careInstructions: "Machine wash cold. Line dry in shade."
  },
  {
    id: "np-012",
    name: "Zariwan Festive Boys Kurta Pajama",
    slug: "zariwan-festive-boys-kurta-pajama",
    category: "kids",
    categoryLabel: "Kids' Collection",
    price: 6900,
    images: [
      IMAGES.kidsTraditional,
      IMAGES.hero
    ],
    isNew: true,
    isFestive: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 15,
    description: "Sharply tailored traditional boy's ethnic suit with contrast Balochi Doch collar stitching. Ideal for weddings, Jummah prayers, and Eid festivals.",
    fabric: "Crisp Cotton Karandi with Contrast Threadwork",
    embroideryType: "Balochi Neckline & Placket Stitching",
    details: [
      "Stiffened mandarin collar with comfortable soft inner band",
      "Mother of pearl buttons with metallic thread accents",
      "Comfortable straight pajama with elastic waist"
    ],
    sizes: ["3-4 Years", "5-6 Years", "7-8 Years", "9-10 Years", "11-12 Years"],
    colors: [
      { name: "Cream & Maroon", hex: "#F1E7D8" },
      { name: "Classic Navy", hex: "#1D3557" }
    ],
    sku: "NP-KID-012",
    careInstructions: "Gentle machine wash or hand wash."
  }
];

export const CATEGORIES_DATA = [
  {
    id: "balochi-collection",
    title: "Balochi Collection",
    subtitle: "Authentic Doch Needlework & Heirloom Craftsmanship",
    description: "Exquisite traditional dresses featuring century-old Doch motifs, intricate mirrorwork, and authentic Baloch artisan patterns.",
    image: IMAGES.hero,
    linkText: "EXPLORE BALOCHI",
    itemCount: 12
  },
  {
    id: "women",
    title: "Women's Collection",
    subtitle: "Contemporary Silhouettes, Rooted in Tradition",
    description: "Curated dresses, festive ensembles, and everyday luxury tunics tailored with rich fabrics and heritage accents.",
    image: IMAGES.womensFestive,
    linkText: "SHOP WOMEN",
    itemCount: 18
  },
  {
    id: "girls",
    title: "Girls' Collection",
    subtitle: "Vibrant Colors, Charming Embroidered Frocks",
    description: "Charming traditional outfits, celebratory peshwas, and colorful Balochi dresses designed for young girls.",
    image: IMAGES.girlsEthnic,
    linkText: "SHOP GIRLS",
    itemCount: 14
  },
  {
    id: "kids",
    title: "Kids' Collection",
    subtitle: "Comfort Meets Celebration for Little Ones",
    description: "Soft, skin-friendly traditional kurtas, shalwars, and miniature doch outfits designed with festive elegance.",
    image: IMAGES.kidsTraditional,
    linkText: "SHOP KIDS",
    itemCount: 16
  }
];
