import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { STORE_CONFIG, getWhatsAppLink } from '../data/config';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Record submission
    try {
      const submissions = JSON.parse(localStorage.getItem('np_contact_submissions') || '[]');
      submissions.push({
        name,
        email,
        phone,
        subject,
        message,
        date: new Date().toISOString()
      });
      localStorage.setItem('np_contact_submissions', JSON.stringify(submissions));
    } catch (err) {
      console.error(err);
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 500);
  };

  const faqs = [
    {
      q: "How long does delivery take within Pakistan?",
      a: "Standard nationwide delivery takes 3 to 5 business days via reliable tracked courier services (TCS / Leopard / Call Courier). For Karachi, Lahore, and Islamabad, express 1 to 2 business day delivery is available upon request."
    },
    {
      q: "Can I order custom sizes or bespoke tailoring?",
      a: "Yes, our master atelier provides made-to-measure tailoring for all Balochi Doch suits and festive dresses. Select 'Custom Size' on the product page or message our WhatsApp concierge with your specific bust, waist, hips, and shirt length measurements."
    },
    {
      q: "Do you ship internationally?",
      a: `Yes, we ship to customers across the United Kingdom, United States, UAE, Canada, and Australia via DHL Express. Please contact us on WhatsApp (${STORE_CONFIG.formattedPhone}) to calculate international shipping rates based on your parcel weight.`
    },
    {
      q: "What is your return and exchange policy?",
      a: "We offer a 7-day hassle-free exchange window for all standard sized, unworn outfits in original packaging. Custom-made bespoke outfits are tailored specifically to your dimensions and are non-refundable, but complimentary fitting alterations are provided."
    }
  ];

  return (
    <div className="bg-[#FAF6EF] min-h-screen py-12 sm:py-16 border-b border-[#B18A50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-medium tracking-[0.26em] uppercase text-[#B18A50] block mb-1">
            Atelier Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#272321] font-normal tracking-tight">
            Connect With NEEDLE POWER
          </h1>
          <div className="w-12 h-0.5 bg-[#B18A50] mx-auto my-3" />
          <p className="text-xs sm:text-sm text-[#272321]/75 leading-relaxed">
            Whether inquiring about authentic Balochi doch needlework, bespoke festive sizing, or an active order, our client team is here to assist you.
          </p>
        </div>

        {/* 2-Column Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-20">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F1E7D8]/60 border border-[#B18A50]/30 p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-2xl text-[#681F32]">
                Atelier & Studio Details
              </h3>

              <div className="space-y-4 text-xs text-[#272321]/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#681F32] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#272321] text-xs font-semibold uppercase tracking-wider">
                      Business Address
                    </strong>
                    <p className="mt-0.5 font-medium text-[#272321]">{STORE_CONFIG.address.fullAddress}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#681F32] shrink-0" />
                  <div>
                    <strong className="block text-[#272321] text-xs font-semibold uppercase tracking-wider">
                      Contact Number
                    </strong>
                    <p className="mt-0.5">
                      <a href={STORE_CONFIG.telLink} className="font-medium text-[#272321] hover:text-[#681F32] hover:underline transition-colors">
                        {STORE_CONFIG.formattedPhone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#681F32] shrink-0" />
                  <div>
                    <strong className="block text-[#272321] text-xs font-semibold uppercase tracking-wider">
                      Email Address
                    </strong>
                    <p className="mt-0.5">
                      <a href={`mailto:${STORE_CONFIG.email}`} className="font-medium text-[#272321] hover:text-[#681F32] hover:underline transition-colors">
                        {STORE_CONFIG.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#681F32] shrink-0" />
                  <div>
                    <strong className="block text-[#272321] text-xs font-semibold uppercase tracking-wider">
                      Consultation Hours
                    </strong>
                    <p className="mt-0.5">{STORE_CONFIG.supportHours}</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Box */}
              <div className="p-4 bg-white border border-[#B18A50]/30 mt-6 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs uppercase tracking-wider">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Instant WhatsApp Service</span>
                </div>
                <p className="text-[11px] text-[#272321]/75 leading-relaxed">
                  Fastest response for sizing advice, video previews of embroidery, and instant order placement.
                </p>
                <a
                  href={getWhatsAppLink("Hello NEEDLE POWER! I am contacting you from your official website.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1EBE5B] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp ({STORE_CONFIG.formattedPhone})</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF6EF] border border-[#B18A50]/30 p-6 sm:p-8 shadow-sm">
              <h3 className="font-serif text-2xl text-[#272321] mb-2">
                Send an Atelier Message
              </h3>
              <p className="text-xs text-[#272321]/70 mb-6">
                Fill in your details and our senior styling concierge will get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-3 bg-[#F1E7D8]/40 border border-[#B18A50]/30 p-6">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-2xl text-[#681F32]">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs text-[#272321]/80 max-w-sm mx-auto">
                    Thank you for contacting NEEDLE POWER. Our styling concierge will reach out to you shortly via phone or email.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2 bg-[#681F32] text-[#FAF6EF] text-xs font-semibold uppercase tracking-wider"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#272321] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Mahrukh Baloch"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#B18A50]/40 text-xs focus:outline-none focus:border-[#681F32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#272321] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="mahrukh@example.com"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#B18A50]/40 text-xs focus:outline-none focus:border-[#681F32]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#272321] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="03363226843"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#B18A50]/40 text-xs focus:outline-none focus:border-[#681F32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#272321] mb-1">
                        Inquiry Subject
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#B18A50]/40 text-xs focus:outline-none focus:border-[#681F32]"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Custom Size / Doch Bespoke">Custom Size / Doch Bespoke</option>
                        <option value="Bridal & Festive Order">Bridal & Festive Order</option>
                        <option value="Existing Order Tracking">Existing Order Tracking</option>
                        <option value="International Shipping">International Shipping</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#272321] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please let us know how we can assist you with your wardrobe selections..."
                      className="w-full px-3.5 py-2.5 bg-white border border-[#B18A50]/40 text-xs focus:outline-none focus:border-[#681F32] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#681F32] text-[#FAF6EF] hover:bg-[#481522] text-xs font-semibold tracking-widest uppercase transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Atelier</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* FAQ Accordion */}
        <div className="pt-12 border-t border-[#B18A50]/20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#B18A50]">
              Quick Answers
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#272321]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-[#FAF6EF] border border-[#B18A50]/30 transition-all"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#272321] hover:text-[#681F32]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#B18A50] transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} />
                </button>

                {activeFaq === index && (
                  <div className="px-5 pb-4 text-xs text-[#272321]/80 leading-relaxed border-t border-[#B18A50]/15 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
