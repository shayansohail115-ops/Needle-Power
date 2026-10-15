/**
 * NEEDLE POWER — Centralized Image Assets
 * 
 * Direct ES module imports ensure Vite processes, hashes, and includes
 * all image files in both development and production (published/deployed) builds.
 */

import heroBalochiImg from '../assets/images/hero_balochi_fashion_1792057341193.jpg';
import embroideryDetailImg from '../assets/images/balochi_embroidery_detail_1792057341122.jpg';
import womensFestiveImg from '../assets/images/womens_festive_collection_1792057342279.jpg';
import girlsEthnicImg from '../assets/images/girls_ethnic_wear_1792057343832.jpg';
import kidsTraditionalImg from '../assets/images/kids_traditional_outfit_1792057343364.jpg';

export const IMAGES = {
  hero: heroBalochiImg,
  embroideryDetail: embroideryDetailImg,
  womensFestive: womensFestiveImg,
  girlsEthnic: girlsEthnicImg,
  kidsTraditional: kidsTraditionalImg,
};

// SVG Fallback image in luxury Balochi burgundy & antique gold palette
export const LUXURY_FALLBACK_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800" fill="none">
  <rect width="600" height="800" fill="#FAF6EF"/>
  <rect x="20" y="20" width="560" height="760" stroke="#B18A50" stroke-width="1.5" stroke-dasharray="4 4" fill="none"/>
  <rect x="35" y="35" width="530" height="730" stroke="#681F32" stroke-width="0.8" fill="none"/>
  
  <!-- Traditional Balochi Doch Motifs -->
  <g transform="translate(300, 360)">
    <!-- Diamonddoch geometric emblem -->
    <polygon points="0,-70 70,0 0,70 -70,0" fill="#681F32" opacity="0.9"/>
    <polygon points="0,-55 55,0 0,55 -55,0" fill="#481522"/>
    <polygon points="0,-40 40,0 0,40 -40,0" fill="#FAF6EF"/>
    <polygon points="0,-25 25,0 0,25 -25,0" fill="#B18A50"/>
    <circle cx="0" cy="0" r="10" fill="#FAF6EF"/>
    <circle cx="0" cy="0" r="4" fill="#681F32"/>
    
    <!-- Accent petals -->
    <circle cx="-85" cy="0" r="6" fill="#B18A50"/>
    <circle cx="85" cy="0" r="6" fill="#B18A50"/>
    <circle cx="0" cy="-85" r="6" fill="#B18A50"/>
    <circle cx="0" cy="85" r="6" fill="#B18A50"/>
  </g>
  
  <text x="300" y="480" font-family="'Cormorant Garamond', Georgia, serif" font-size="24" font-weight="600" letter-spacing="4" fill="#681F32" text-anchor="middle">NEEDLE POWER</text>
  <text x="300" y="510" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="500" letter-spacing="3" fill="#B18A50" text-anchor="middle">HAUTE BALOCHI CRAFT</text>
  <text x="300" y="535" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="400" letter-spacing="1" fill="#272321" opacity="0.6" text-anchor="middle">Atelier Collection</text>
</svg>
`)}`;
