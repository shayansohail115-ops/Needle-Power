import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Strict email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('np_newsletter_subscribers') || '[]');
        if (!existing.includes(email.trim().toLowerCase())) {
          existing.push(email.trim().toLowerCase());
          localStorage.setItem('np_newsletter_subscribers', JSON.stringify(existing));
        }
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setErrorMessage('Unable to subscribe at this moment. Please try again.');
      }
    }, 600);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#F1E7D8]/80 border-b border-[#B18A50]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="text-[11px] font-medium tracking-[0.26em] uppercase text-[#B18A50] block mb-2">
          Atelier Correspondence
        </span>
        
        <h2 className="font-serif text-3xl sm:text-4xl text-[#272321] font-normal tracking-tight">
          A Little Beauty in Your Inbox
        </h2>
        
        <div className="w-12 h-0.5 bg-[#B18A50] mx-auto my-3" />
        
        <p className="text-sm text-[#272321]/75 max-w-lg mx-auto mb-8 leading-relaxed">
          Be the first to discover new collections, seasonal edits, and special announcements. 
          We share thoughtful stories of artisan Doch embroidery and private festive previews.
        </p>

        {status === 'success' ? (
          <div className="bg-[#FAF6EF] border border-[#B18A50]/40 p-6 max-w-md mx-auto shadow-sm">
            <div className="flex items-center justify-center gap-2 text-emerald-800 font-serif text-lg font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Welcome to the NEEDLE POWER Circle</span>
            </div>
            <p className="text-xs text-[#272321]/75 mt-2">
              Thank you for subscribing. You will receive private previews of our upcoming handcrafted Balochi collections.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-[#272321]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF6EF] border border-[#B18A50]/40 text-xs text-[#272321] placeholder-[#272321]/45 focus:border-[#681F32] focus:outline-none transition-colors"
                  disabled={status === 'loading'}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-[#681F32] text-[#FAF6EF] text-xs font-semibold tracking-widest uppercase hover:bg-[#481522] transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <span>{status === 'loading' ? 'Joining...' : 'Subscribe'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {status === 'error' && (
              <p className="text-xs text-red-700 text-left pl-1">
                {errorMessage}
              </p>
            )}

            <p className="text-[11px] text-[#272321]/60 text-center">
              We respect your privacy. Unsubscribe at any time with one click.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
