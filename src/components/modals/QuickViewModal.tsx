'use client';

import React from 'react';
import { useModals } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';
import { siteConfig } from '@/config/site';
import { X, Star, ShieldCheck, Check, ShoppingCart, MessageCircle, Truck } from 'lucide-react';

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView } = useModals();
  const { addToCart } = useCart();

  if (!quickViewProduct) return null;

  const getWhatsAppProductUrl = () => {
    const msg = `Hello ${siteConfig.name}, I am interested in: *${quickViewProduct.name}* (Price: ${siteConfig.currencySymbol}${quickViewProduct.price.toLocaleString('en-IN')}, Condition: ${quickViewProduct.condition}). Is this available?`;
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={closeQuickView} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden z-10 border border-gray-200 dark:border-gray-800 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-500 hover:text-gray-900 dark:hover:text-white backdrop-blur-xs transition shadow-xs"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="space-y-3">
            <div className="aspect-4/3 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 relative">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-600 text-white shadow-md">
                {quickViewProduct.condition}
              </span>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{quickViewProduct.warranty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Same-day dispatch & local pickup available</span>
              </div>
            </div>
          </div>

          {/* Product Specs & CTAs */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {quickViewProduct.brand} • {quickViewProduct.category}
              </span>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {quickViewProduct.rating} ({quickViewProduct.reviewsCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                  {siteConfig.currencySymbol}{quickViewProduct.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {siteConfig.currencySymbol}{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                  Save {Math.round(((quickViewProduct.originalPrice - quickViewProduct.price) / quickViewProduct.originalPrice) * 100)}%
                </span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 mt-3 line-clamp-3 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Key Specs Pills */}
              <div className="mt-4">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                  Key Specifications:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProduct.shortSpecs.map((spec, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2.5">
              <button
                onClick={() => {
                  addToCart(quickViewProduct);
                  closeQuickView();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Shopping Cart</span>
              </button>

              <a
                href={getWhatsAppProductUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Direct WhatsApp Purchase Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

