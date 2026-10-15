import React, { useState } from 'react';
import { Truck, RotateCcw, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { STORE_CONFIG, formatPKR } from '../data/config';
import { useNavigation } from '../context/NavigationContext';

interface PolicyPageProps {
  initialTab?: 'shipping' | 'returns' | 'privacy' | 'terms';
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ initialTab = 'shipping' }) => {
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'privacy' | 'terms'>(initialTab);
  const { navigateTo } = useNavigation();

  return (
    <div className="bg-[#FAF6EF] min-h-screen py-12 sm:py-16 border-b border-[#B18A50]/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] tracking-[0.26em] uppercase font-semibold text-[#B18A50] block mb-1">
            Store Policies
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#272321] font-normal tracking-tight">
            Policies & Information
          </h1>
          <div className="w-12 h-0.5 bg-[#B18A50] mx-auto my-3" />
          <p className="text-xs sm:text-sm text-[#272321]/70">
            Our transparent guidelines regarding nationwide shipping, size exchanges, privacy, and order conditions.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 border-b border-[#B18A50]/20 pb-4">
          <button
            onClick={() => setActiveTab('shipping')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
              activeTab === 'shipping' ? 'bg-[#681F32] text-[#FAF6EF]' : 'bg-[#F1E7D8]/60 text-[#272321] hover:bg-[#F1E7D8]'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Shipping & Delivery</span>
          </button>

          <button
            onClick={() => setActiveTab('returns')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
              activeTab === 'returns' ? 'bg-[#681F32] text-[#FAF6EF]' : 'bg-[#F1E7D8]/60 text-[#272321] hover:bg-[#F1E7D8]'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Returns & Exchanges</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
              activeTab === 'privacy' ? 'bg-[#681F32] text-[#FAF6EF]' : 'bg-[#F1E7D8]/60 text-[#272321] hover:bg-[#F1E7D8]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
              activeTab === 'terms' ? 'bg-[#681F32] text-[#FAF6EF]' : 'bg-[#F1E7D8]/60 text-[#272321] hover:bg-[#F1E7D8]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="bg-[#FAF6EF] border border-[#B18A50]/30 p-6 sm:p-10 shadow-sm leading-relaxed text-xs sm:text-sm text-[#272321]/80 space-y-6">
          
          {/* 1. SHIPPING & DELIVERY */}
          {activeTab === 'shipping' && (
            <div className="space-y-5">
              <h2 className="font-serif text-2xl text-[#681F32]">
                Shipping & Delivery Policy
              </h2>
              <div className="w-12 h-0.5 bg-[#B18A50]" />

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-[#272321]">
                    1. Delivery Timelines
                  </h3>
                  <p className="mt-1">
                    Standard orders placed across Pakistan are dispatched within 24 to 48 hours of order confirmation. 
                    Delivery generally arrives in <strong>{STORE_CONFIG.estimatedDeliveryDays}</strong> via tracked partner couriers.
                    For urgent festive orders in Karachi, Lahore, and Islamabad, express delivery is available upon prior WhatsApp coordination.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-[#272321]">
                    2. Shipping Charges & Free Delivery
                  </h3>
                  <p className="mt-1">
                    We offer <strong>Complimentary Free Shipping</strong> across all regions of Pakistan on orders totaling 
                    <strong> {formatPKR(STORE_CONFIG.freeShippingThreshold)}</strong> or above.
                    For orders below this amount, a flat rate of {formatPKR(STORE_CONFIG.standardShippingFee)} is applied at checkout.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-[#272321]">
                    3. Order Tracking
                  </h3>
                  <p className="mt-1">
                    Once your outfit leaves our atelier, you will receive an SMS and WhatsApp notification containing your courier tracking number 
                    and live tracking URL.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-[#272321]">
                    4. International Deliveries
                  </h3>
                  <p className="mt-1">
                    We ship to overseas Pakistani diaspora and fashion enthusiasts worldwide via DHL Express. 
                    International shipping fees are computed dynamically based on the final weight of your garments.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. RETURNS & EXCHANGES */}
          {activeTab === 'returns' && (
            <div className="space-y-5">
              <h2 className="font-serif text-2xl text-[#681F32]">
                Returns & Exchange Policy
              </h2>
              <div className="w-12 h-0.5 bg-[#B18A50]" />

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-[#272321]">
                    1. 7-Day Exchange Window
                  </h3>
                  <p className="mt-1">
                    We want you to be completely delighted with your NEEDLE POWER attire. Standard-sized garments may be exchanged 
                    for an alternative size or design within <strong>7 days</strong> of delivery, provided the garment is unworn, unwashed, 
                    with original tags intact.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-[#272321]">
                    2. Custom Made-to-Measure Outfits
                  </h3>
                  <p className="mt-1">
                    Pieces tailored to personalized body measurements (Custom Sizing) or made-to-order Balochi bridal sets cannot be 
                    returned for a refund. However, our atelier happily provides complimentary alterations if any adjustments are needed.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-[#272321]">
                    3. Exchange Procedure
                  </h3>
                  <p className="mt-1">
                    To initiate an exchange, please contact our WhatsApp concierge with your order reference number and photographs of the garment. 
                    Our representative will arrange reverse pickup or provide our studio return address.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-5">
              <h2 className="font-serif text-2xl text-[#681F32]">
                Privacy & Data Protection Policy
              </h2>
              <div className="w-12 h-0.5 bg-[#B18A50]" />

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-[#272321]">
                    1. Information We Collect
                  </h3>
                  <p className="mt-1">
                    We only collect information necessary to fulfill your fashion orders and improve your shopping experience. 
                    This includes your name, delivery address, phone number, and optional email address.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-[#272321]">
                    2. Payment Security
                  </h3>
                  <p className="mt-1">
                    We do not store credit card or bank login credentials on our servers. For online card transactions, processing is handled 
                    via encrypted, level-1 PCI-DSS compliant banking gateways.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-[#272321]">
                    3. No Third-Party Selling
                  </h3>
                  <p className="mt-1">
                    NEEDLE POWER never sells, rents, or discloses client phone numbers or email addresses to third-party telemarketers or advertisers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4. TERMS & CONDITIONS */}
          {activeTab === 'terms' && (
            <div className="space-y-5">
              <h2 className="font-serif text-2xl text-[#681F32]">
                Terms & Conditions of Sale
              </h2>
              <div className="w-12 h-0.5 bg-[#B18A50]" />

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-[#272321]">
                    1. Artisan Craft Variations
                  </h3>
                  <p className="mt-1">
                    Because authentic Balochi Doch needlework is handcrafted by artisan embroiderers, subtle natural variations in stitch tightness, 
                    thread dye shade, and mirror placement are natural hallmarks of handmade heritage, rather than defects.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-[#272321]">
                    2. Pricing & Currency
                  </h3>
                  <p className="mt-1">
                    All prices displayed on this storefront are in Pakistani Rupees (PKR / Rs.) and include all applicable local taxes. 
                    Prices are subject to revision without prior notice for newly introduced collections.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-[#272321]">
                    3. Color Representation
                  </h3>
                  <p className="mt-1">
                    We photograph all garments under balanced natural and studio lighting to represent genuine color tones accurately. 
                    Slight variations may occur depending on individual mobile or monitor display calibration.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Return to shop CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigateTo('shop', { scrollToTop: true })}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#681F32] hover:underline"
          >
            <span>Return to Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
