import React from 'react';
import { CheckCircle2, MessageCircle, Printer, ArrowRight, Truck, MapPin } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { STORE_CONFIG, formatPKR, getWhatsAppLink } from '../data/config';

export const OrderConfirmationPage: React.FC = () => {
  const { lastOrder, navigateTo } = useNavigation();

  if (!lastOrder) {
    return (
      <div className="bg-[#FAF6EF] min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="font-serif text-2xl text-[#272321] mb-2">No Recent Order Found</h2>
        <p className="text-xs text-[#272321]/70 mb-6">
          You haven't placed an order in this active session.
        </p>
        <button
          onClick={() => navigateTo('shop', { scrollToTop: true })}
          className="px-6 py-2.5 bg-[#681F32] text-[#FAF6EF] text-xs font-semibold tracking-wider uppercase hover:bg-[#481522]"
        >
          Browse Collections
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const whatsappInquiryText = 
    `*NEEDLE POWER - Order Status Inquiry*\n\n` +
    `Order Reference: *#${lastOrder.orderNumber}*\n` +
    `Customer Name: ${lastOrder.customer.fullName}\n` +
    `City: ${lastOrder.customer.city}\n` +
    `Total: ${formatPKR(lastOrder.total)}\n\n` +
    `Hello, could you please provide dispatch tracking details for my order?`;

  return (
    <div className="bg-[#FAF6EF] min-h-screen py-12 sm:py-16 border-b border-[#B18A50]/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Receipt Container */}
        <div className="bg-white border border-[#B18A50]/40 p-6 sm:p-10 shadow-lg">
          
          {/* Header */}
          <div className="text-center pb-8 border-b border-[#B18A50]/20">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-[10px] tracking-[0.26em] uppercase text-[#B18A50] font-bold block mb-1">
              Order Confirmed & Received
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#681F32]">
              Thank You, {lastOrder.customer.fullName.split(' ')[0]}
            </h1>
            <p className="text-xs text-[#272321]/75 mt-2">
              Your order <strong className="text-[#272321]">#{lastOrder.orderNumber}</strong> has been logged into our atelier dispatch system.
            </p>
          </div>

          {/* Delivery & Timeline Notice */}
          <div className="py-6 border-b border-[#B18A50]/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#FAF6EF] p-4 my-6">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-[#681F32] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold uppercase tracking-wider block text-[#272321]">
                  Estimated Delivery
                </span>
                <span className="text-[#272321]/80 mt-0.5 block">
                  {STORE_CONFIG.estimatedDeliveryDays}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#681F32] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold uppercase tracking-wider block text-[#272321]">
                  Shipping Destination
                </span>
                <span className="text-[#272321]/80 mt-0.5 block">
                  {lastOrder.customer.address}, {lastOrder.customer.city}
                </span>
              </div>
            </div>
          </div>

          {/* Items Summary Table */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-semibold text-[#272321] uppercase tracking-wider">
              Ensemble Details
            </h3>

            <div className="divide-y divide-[#B18A50]/15">
              {lastOrder.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-14 object-cover object-top border border-[#B18A50]/30"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-medium text-[#272321]">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#272321]/60">
                        Size: {item.selectedSize} · Color: {item.selectedColor} · Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <span className="font-semibold text-[#681F32]">
                    {formatPKR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Breakdown */}
            <div className="pt-4 border-t border-[#B18A50]/20 space-y-2 text-xs text-[#272321]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPKR(lastOrder.subtotal)}</span>
              </div>
              {lastOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Discount Applied</span>
                  <span>-{formatPKR(lastOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Charges</span>
                <span>{lastOrder.shippingFee === 0 ? 'FREE' : formatPKR(lastOrder.shippingFee)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#272321] pt-2 border-t border-[#B18A50]/20">
                <span>Total Amount</span>
                <span className="text-[#681F32] font-serif text-lg">
                  {formatPKR(lastOrder.total)}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-[#272321]/60">
                <span>Payment Mode</span>
                <span className="uppercase font-semibold text-[#272321]">
                  {lastOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : lastOrder.paymentMethod}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-[#B18A50]/20 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={getWhatsAppLink(whatsappInquiryText)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3 px-4 bg-[#25D366] text-white hover:bg-[#1EBE5B] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Track on WhatsApp</span>
            </a>

            <button
              onClick={handlePrint}
              className="w-full sm:w-auto py-3 px-5 border border-[#B18A50] text-[#272321] hover:bg-[#F1E7D8] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-[#681F32]" />
              <span>Print Invoice</span>
            </button>

            <button
              onClick={() => navigateTo('shop', { scrollToTop: true })}
              className="w-full sm:w-auto py-3 px-5 bg-[#681F32] text-[#FAF6EF] hover:bg-[#481522] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
