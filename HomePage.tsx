import React from 'react';
import { Hero } from '../components/Hero';
import { ShopByCategory } from '../components/ShopByCategory';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { CraftsmanshipSection } from '../components/CraftsmanshipSection';
import { NewArrivalsCarousel } from '../components/NewArrivalsCarousel';
import { PromotionalBanner } from '../components/PromotionalBanner';
import { BrandTrustSection } from '../components/BrandTrustSection';
import { CustomerReviewsSection } from '../components/CustomerReviewsSection';
import { InstagramSection } from '../components/InstagramSection';
import { Newsletter } from '../components/Newsletter';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ShopByCategory />
      <FeaturedProducts />
      <CraftsmanshipSection />
      <NewArrivalsCarousel />
      <PromotionalBanner />
      <BrandTrustSection />
      <CustomerReviewsSection />
      <InstagramSection />
      <Newsletter />
    </div>
  );
};
