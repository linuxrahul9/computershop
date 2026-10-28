'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { siteConfig } from '@/config/site';
import { useCart } from '@/context/CartContext';
import { useModals } from '@/context/ModalContext';
import { ShoppingCart, Eye, Star, MessageCircle, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { openQuickView } = useModals();

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const getWhatsAppLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Hello ${siteConfig.name}, I'm interested in buying: *${product.name}* (${siteConfig.currencySymbol}${product.price.toLocaleString('en-IN')}, ${product.condition}). Is it available?`;
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="group relative flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Condition Badge */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          <span
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide shadow-sm uppercase ${
              product.condition.includes('Brand New')
                ? 'bg-emerald-600 text-white'
                : product.condition.includes('Grade A+')
                ? 'bg-blue-600 text-white'
                : 'bg-amber-600 text-white'
            }`}
          >
            {product.condition}
          </span>
          {product.badge && (
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-900/80 text-white backdrop-blur-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Discount Tag */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 right-2.5 z-10 bg-rose-600 text-white text-[11px] font-bold px-2 py-1 rounded-md shadow-sm">
            {discountPercent}% OFF
          </div>
        )}

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={() => openQuickView(product)}
            className="px-3.5 py-2 rounded-xl bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg hover:scale-105 transition transform"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Reviews */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[11px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-medium">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-gray-400 text-[11px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => openQuickView(product)}
            className="font-bold text-gray-900 dark:text-white text-base leading-snug line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition mb-2"
          >
            {product.name}
          </h3>

          {/* Specs Highlights */}
          <ul className="space-y-1 mb-3">
            {product.shortSpecs.slice(0, 3).map((spec, i) => (
              <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1.5 line-clamp-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="text-xl font-extrabold text-gray-900 dark:text-white">
                {siteConfig.currencySymbol}{product.price.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-gray-400 line-through">
                {siteConfig.currencySymbol}{product.originalPrice.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> {product.warranty.split(' ')[0]} {product.warranty.split(' ')[1]}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product)}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 transition"
              title="Add to Shopping Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={getWhatsAppLink}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition"
              title="Buy or Enquire via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

