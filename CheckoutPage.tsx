import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Building2, 
  MessageCircle, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  ShoppingBag,
  Tag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { STORE_CONFIG, formatPKR, getWhatsAppLink } from '../data/config';
import { Order, PaymentMethod } from '../types';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    subtotal, 
    shippingFee, 
    discount, 
    appliedPromo, 
    total, 
    clearCart,
    applyPromoCode,
    removePromoCode,
    promoError 
  } = useCart();
  const { navigateTo } = useNavigation();

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Karachi');
  const [customCity, setCustomCity] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [sendToWhatsApp, setSendToWhatsApp] = useState(true);
  const [promoInput, setPromoInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const majorCities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Quetta',
    'Peshawar',
    'Multan',
    'Faisalabad',
    'Sialkot',
    'Hyderabad',
    'Gujranwala',
    'Other City'
  ];

  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF6EF] min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-16 h-16 border border-[#B18A50]/40 flex items-center justify-center text-[#681F32] mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-3xl text-[#272321] mb-2">Your Bag is Empty</h2>
        <p className="text-xs text-[#272321]/70 mb-6 max-w-sm">
          You need items in your shopping bag before proceeding to checkout.
        </p>
        <button
          onClick={() => navigateTo('shop', { scrollToTop: true })}
          className="px-8 py-3 bg-[#681F32] text-[#FAF6EF] text-xs font-semibold tracking-widest uppercase hover:bg-[#481522] transition-colors"
        >
          Return to Collections
        </button>
      </div>
    );
  }

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!phone.trim()) {
      errs.phone = 'Please provide a contact phone number';
    } else if (phone.trim().length < 10) {
      errs.phone = 'Please enter a valid Pakistani phone number (e.g. 03363226843)';
    }
    if (!address.trim()) errs.address = 'Please provide your full delivery address';
    if (city === 'Other City' && !customCity.trim()) errs.city = 'Please specify your city name';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const chosenCity = city === 'Other City' ? customCity.trim() : city;
    const orderNumber = `NP-${Date.now().toString().slice(-6)}`;

    const newOrder: Order = {
      orderNumber,
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        city: chosenCity,
        province: 'Pakistan',
        address: address.trim(),
        deliveryInstructions: deliveryInstructions.trim(),
      },
      items: [...cart],
      subtotal,
      shippingFee,
      discount,
      total,
      paymentMethod,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      notes: deliveryInstructions.trim()
    };

    // Save order in localStorage
    try {
      const orders = JSON.parse(localStorage.getItem('np_customer_orders') || '[]');
      orders.unshift(newOrder);
      localStorage.setItem('np_customer_orders', JSON.stringify(orders));
    } catch (err) {
      console.error('Error saving order', err);
    }

    setTimeout(() => {
      // Clear Cart
      clearCart();
      setIsSubmitting(false);

      // If customer opted for instant WhatsApp confirmation, open WhatsApp with order details
      if (sendToWhatsApp) {
        const orderSummaryText = 
          `*NEEDLE POWER - Order Confirmation #${orderNumber}*\n\n` +
          `Customer: ${fullName.trim()}\n` +
          `Phone: ${phone.trim()}\n` +
          `Delivery City: ${chosenCity}\n` +
          `Address: ${address.trim()}\n` +
          `Payment Method: ${paymentMethod.toUpperCase()}\n\n` +
          `*Items:*\n` +
          cart.map((item, idx) => `${idx + 1}. ${item.product.name} (${item.selectedSize}) x${item.quantity}`).join('\n') +
          `\n\n*Total Payable: ${formatPKR(total)}*`;

        try {
          const a = document.createElement('a');
          a.href = getWhatsAppLink(orderSummaryText);
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.click();
        } catch {
          // Handled on confirmation page
        }
      }

      // Navigate to confirmation page
      navigateTo('order-confirmation', { order: newOrder, scrollToTop: true });
    }, 700);
  };

  return (
    <div className="bg-[#FAF6EF] min-h-screen py-10 sm:py-14 border-b border-[#B18A50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header */}
        <div className="text-center max-w-xl mx-auto mb-10 pb-4 border-b border-[#B18A50]/20">
          <span className="text-[10px] tracking-[0.24em] uppercase text-[#B18A50] font-semibold block mb-1">
            Secure Checkout
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#272321] font-normal">
            Finalize Your Order
          </h1>
          <p className="text-xs text-[#272321]/70 mt-1">
            Complimentary delivery in Pakistan for orders above {formatPKR(STORE_CONFIG.freeShippingThreshold)}.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Form: Delivery Details & Payment */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Customer & Shipping Address */}
            <div className="bg-[#FAF6EF] border border-[#B18A50]/30 p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 pb-3 border-b border-[#B18A50]/20">
                <Truck className="w-4 h-4 text-[#681F32]" />
                <h2 className="font-serif text-lg text-[#272321] font-semibold">
                  1. Delivery Information
                </h2>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#272321] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Syeda Zubaida Baloch"
                  className={`w-full px-3.5 py-2.5 bg-white border text-xs focus:outline-none ${
                    errors.fullName ? 'border-red-600' : 'border-[#B18A50]/40 focus:border-[#681F32]'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#272321] mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="03363226843"
                    className={`w-full px-3.5 py-2.5 bg-white border text-xs focus:outline-none ${
                      errors.phone ? 'border-red-600' : 'border-[#B18A50]/40 focus:border-[#681F32]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                  <span className="text-[10px] text-[#272321]/50 mt-0.5 block">
                    Used for courier delivery confirmation.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#272321] mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="order@example.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#B18A50]/40 text-xs focus:outline-none focus:border-[#681F32]"
                  />
                  <span className="text-[10px] text-[#272321]/50 mt-0.5 block">
                    Receive tracking emails & receipt.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#272321] mb-1">
                    City *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#B18A50]/40 text-xs focus:outline-none focus:border-[#681F32]"
                  >
                    {majorCities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {city === 'Other City' && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#272321] mb-1">
                      Specify City Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customCity}
                      onChange={(e) => setCustomCity(e.target.value)}
                      placeholder="e.g. Turbat, Gwadar, Bahawalpur"
                      className={`w-full px-3.5 py-2.5 bg-white border text-xs focus:outline-none ${
                        errors.city ? 'border-red-600' : 'border-[#B18A50]/40 focus:border-[#681F32]'
                      }`}
                    />
                    {errors.city && <p className="text-[11px] text-red-600 mt-1">{errors.city}</p>}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#272321] mb-1">
                  Complete Street Address & House # *
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House/Apartment #, Street, Sector / Area name"
                  className={`w-full px-3.5 py-2.5 bg-white border text-xs focus:outline-none resize-none ${
                    errors.address ? 'border-red-600' : 'border-[#B18A50]/40 focus:border-[#681F32]'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-red-600 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#272321] mb-1">
                  Special Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  placeholder="e.g. Call before delivery, leave with neighbor if unavailable"
                  className="w-full px-3.5 py-2 bg-white border border-[#B18A50]/40 text-xs focus:outline-none focus:border-[#681F32]"
                />
              </div>
            </div>

            {/* 2. Payment Method Selection */}
            <div className="bg-[#FAF6EF] border border-[#B18A50]/30 p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 pb-3 border-b border-[#B18A50]/20">
                <CreditCard className="w-4 h-4 text-[#681F32]" />
                <h2 className="font-serif text-lg text-[#272321] font-semibold">
                  2. Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                {/* Cash on delivery */}
                <label className={`block p-4 border cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-[#681F32] bg-[#F1E7D8]/60' : 'border-[#B18A50]/30 bg-white'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-[#681F32]"
                      />
                      <div>
                        <span className="font-semibold text-xs text-[#272321] uppercase tracking-wider block">
                          Cash On Delivery (COD)
                        </span>
                        <span className="text-[11px] text-[#272321]/70">
                          Pay in cash directly to the courier representative upon delivery.
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#681F32] border border-[#681F32]/30 px-2 py-0.5">
                      Most Popular
                    </span>
                  </div>
                </label>

                {/* Direct Bank Transfer */}
                <label className={`block p-4 border cursor-pointer transition-all ${
                  paymentMethod === 'bank_transfer' ? 'border-[#681F32] bg-[#F1E7D8]/60' : 'border-[#B18A50]/30 bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="accent-[#681F32]"
                    />
                    <div>
                      <span className="font-semibold text-xs text-[#272321] uppercase tracking-wider block">
                        Direct Bank Transfer (Online Banking / Raast)
                      </span>
                      <span className="text-[11px] text-[#272321]/70">
                        Transfer to our official Meezan / Habib Bank account via mobile banking or Raast ID.
                      </span>
                    </div>
                  </div>

                  {paymentMethod === 'bank_transfer' && (
                    <div className="mt-3 p-3 bg-white border border-[#B18A50]/30 text-xs text-[#272321]/80 space-y-1">
                      <p><strong>Bank:</strong> {STORE_CONFIG.bankDetails.bankName} ({STORE_CONFIG.bankDetails.branch})</p>
                      <p><strong>Account Title:</strong> {STORE_CONFIG.bankDetails.accountTitle}</p>
                      <p><strong>Account Number:</strong> {STORE_CONFIG.bankDetails.accountNumber}</p>
                      <p><strong>IBAN:</strong> {STORE_CONFIG.bankDetails.iban}</p>
                      <p><strong>Raast ID / Mobile:</strong> {STORE_CONFIG.bankDetails.raastId}</p>
                      <p className="text-[11px] text-[#681F32] pt-1">
                        Please send your transfer receipt screenshot on WhatsApp ({STORE_CONFIG.formattedPhone}) for immediate dispatch.
                      </p>
                    </div>
                  )}
                </label>

                {/* Online Payment Gateway (Sandbox/Production Ready) */}
                <label className={`block p-4 border cursor-pointer transition-all ${
                  paymentMethod === 'online_gateway' ? 'border-[#681F32] bg-[#F1E7D8]/60' : 'border-[#B18A50]/30 bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'online_gateway'}
                      onChange={() => setPaymentMethod('online_gateway')}
                      className="accent-[#681F32]"
                    />
                    <div>
                      <span className="font-semibold text-xs text-[#272321] uppercase tracking-wider block">
                        Visa / Mastercard / PayFast (Gateway Sandbox)
                      </span>
                      <span className="text-[11px] text-[#272321]/70">
                        Pay securely with your debit or credit card. Ready for merchant API credentials.
                      </span>
                    </div>
                  </div>
                </label>
              </div>

              {/* WhatsApp instant copy checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs text-[#272321] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendToWhatsApp}
                    onChange={(e) => setSendToWhatsApp(e.target.checked)}
                    className="accent-[#681F32]"
                  />
                  <span>Send duplicate order invoice to WhatsApp for instant customer assistance</span>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-[#F1E7D8]/60 border border-[#B18A50]/30 p-6 sticky top-24 space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#B18A50]/20">
                <h3 className="font-serif text-lg text-[#272321] font-semibold">
                  Order Summary
                </h3>
                <span className="text-xs text-[#272321]/60 font-medium">
                  {cart.length} {cart.length === 1 ? 'Design' : 'Designs'}
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#B18A50]/15 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3 items-center first:pt-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-14 h-16 object-cover object-top border border-[#B18A50]/30 bg-[#FAF6EF]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1">
                      <h4 className="font-serif text-xs font-medium text-[#272321] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-[#272321]/70 mt-0.5">
                        Size: {item.selectedSize} · Qty: {item.quantity}
                      </p>
                      <span className="text-xs font-semibold text-[#681F32] block mt-0.5">
                        {formatPKR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code section */}
              <div className="pt-2 border-t border-[#B18A50]/20">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2 bg-[#FAF6EF] border border-emerald-600/30 text-xs text-emerald-800">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      Promo '{appliedPromo}' Applied (-{formatPKR(discount)})
                    </span>
                    <button
                      type="button"
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
                      placeholder="Promo code (WELCOME10)"
                      className="w-full px-3 py-1.5 bg-white border border-[#B18A50]/40 text-xs uppercase focus:outline-none focus:border-[#681F32]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (applyPromoCode(promoInput)) setPromoInput('');
                      }}
                      className="px-3 py-1.5 bg-[#681F32] text-[#FAF6EF] text-xs font-semibold uppercase hover:bg-[#481522] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-600 mt-1">{promoError}</p>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-xs text-[#272321]/80 pt-2 border-t border-[#B18A50]/20">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#272321]">{formatPKR(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Promo Discount</span>
                    <span>-{formatPKR(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPKR(shippingFee)}</span>
                </div>

                <div className="border-t border-[#B18A50]/30 pt-3 flex justify-between text-base font-bold text-[#272321]">
                  <span>Total Amount</span>
                  <span className="text-[#681F32] text-lg font-serif">
                    {formatPKR(total)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#681F32] text-[#FAF6EF] hover:bg-[#481522] text-xs font-semibold tracking-widest uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Recording Order...' : 'Confirm & Place Order'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-[#272321]/70 space-y-1 text-center">
                <p>✓ 100% Authentic Handcrafted Balochistan Doch</p>
                <p>✓ 7-Day Exchange Guarantee on Unworn Outfits</p>
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
