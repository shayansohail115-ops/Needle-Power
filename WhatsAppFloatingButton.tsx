import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { STORE_CONFIG, getWhatsAppLink } from '../data/config';
import { useNavigation } from '../context/NavigationContext';

export const WhatsAppFloatingButton: React.FC = () => {
  const { currentPage } = useNavigation();
  const [showTooltip, setShowTooltip] = useState(false);

  // Avoid obscuring buttons on checkout page
  if (currentPage === 'checkout') {
    return null;
  }

  const message = "Hello NEEDLE POWER! I would like to inquire about customized Balochi dresses and order assistance.";

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2">
      {/* Tooltip on hover */}
      {showTooltip && (
        <div className="hidden sm:flex bg-[#FAF6EF] text-[#272321] border border-[#B18A50]/40 p-2.5 shadow-xl text-xs rounded-none max-w-xs animate-in fade-in slide-in-from-right-2">
          <div>
            <p className="font-semibold text-[#681F32]">Need Styling Assistance?</p>
            <p className="text-[11px] text-[#272321]/80 mt-0.5">Chat with our atelier team on WhatsApp for orders & custom sizing.</p>
          </div>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-[#272321]/40 hover:text-[#681F32] ml-2 self-start"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#1EBE5B] transition-transform hover:scale-105 group relative focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="Chat with NEEDLE POWER on WhatsApp"
        title="WhatsApp Order & Support"
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
        
        {/* Subtle pulsating online indicator */}
        <span className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
          <span className="w-2 h-2 bg-[#25D366] rounded-full animate-ping" />
        </span>
      </a>
    </div>
  );
};
