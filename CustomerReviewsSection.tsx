import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle, X, Sparkles } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data/reviews';
import { Review } from '../types';

export const CustomerReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      city: newCity.trim() || 'Pakistan',
      rating: newRating,
      productTitle: newProduct.trim() || 'Balochi Heritage Ensemble',
      comment: newComment.trim(),
      date: 'Just now',
      verifiedPurchase: true
    };

    setReviews([newRev, ...reviews]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsModalOpen(false);
      setNewAuthor('');
      setNewCity('');
      setNewComment('');
      setNewProduct('');
    }, 1800);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF6EF] border-b border-[#B18A50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#B18A50]/20 gap-4">
          <div>
            <span className="text-[11px] font-medium tracking-[0.26em] uppercase text-[#B18A50] block mb-1">
              Patrons & Collectors
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#272321] font-normal tracking-tight">
              Words From Our Clients
            </h2>
            <p className="text-xs sm:text-sm text-[#272321]/70 mt-1 max-w-md">
              Genuine reflections on our embroidery, fabrics, and customer care across Pakistan and abroad.
            </p>
          </div>

          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#B18A50] text-[#681F32] hover:bg-[#F1E7D8] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Share Your Experience</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-[#F1E7D8]/30 border border-[#B18A50]/20 p-6 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3 text-[#B18A50]">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-[#B18A50]' : 'text-[#B18A50]/30'}`} 
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#272321]/80 italic leading-relaxed mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-3 border-t border-[#B18A50]/15">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs text-[#272321]">
                    {rev.author}
                  </span>
                  <span className="text-[11px] text-[#272321]/50">
                    {rev.city}
                  </span>
                </div>

                {rev.productTitle && (
                  <div className="text-[10px] text-[#681F32] truncate mt-0.5">
                    {rev.productTitle}
                  </div>
                )}

                {rev.verifiedPurchase && (
                  <div className="flex items-center gap-1 text-[10px] text-emerald-700 mt-1 font-medium">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Purchase</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#272321]/60 backdrop-blur-xs">
          <div className="bg-[#FAF6EF] border border-[#B18A50] w-full max-w-md p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#272321]/60 hover:text-[#681F32]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#B18A50]">
                Client Experience
              </span>
              <h3 className="font-serif text-2xl text-[#681F32]">
                Leave a Review
              </h3>
              <p className="text-xs text-[#272321]/70 mt-1">
                Your feedback helps us continuously elevate our handcrafted Balochi collections.
              </p>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center text-emerald-800 space-y-2">
                <CheckCircle className="w-10 h-10 mx-auto text-emerald-600" />
                <h4 className="font-serif text-lg font-medium">Thank You!</h4>
                <p className="text-xs text-[#272321]/80">
                  Your review has been recorded and will appear on our product showcases.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#272321] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Ayesha Khan"
                    className="w-full px-3 py-2 bg-white border border-[#B18A50]/40 text-xs focus:border-[#681F32] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#272321] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder="e.g. Lahore, Karachi"
                      className="w-full px-3 py-2 bg-white border border-[#B18A50]/40 text-xs focus:border-[#681F32] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#272321] mb-1">
                      Rating
                    </label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-[#B18A50]/40 text-xs focus:border-[#681F32] focus:outline-none"
                    >
                      <option value={5}>5 Stars - Exceptional</option>
                      <option value={4}>4 Stars - Very Good</option>
                      <option value={3}>3 Stars - Good</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#272321] mb-1">
                    Product Purchased
                  </label>
                  <input
                    type="text"
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    placeholder="e.g. Royal Balochi Doch Suit"
                    className="w-full px-3 py-2 bg-white border border-[#B18A50]/40 text-xs focus:border-[#681F32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#272321] mb-1">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Describe the fabric, embroidery detail, fitting or delivery..."
                    className="w-full px-3 py-2 bg-white border border-[#B18A50]/40 text-xs focus:border-[#681F32] focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#681F32] text-[#FAF6EF] text-xs font-semibold tracking-widest uppercase hover:bg-[#481522] transition-colors shadow-sm"
                  >
                    Submit Verified Review
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
};
