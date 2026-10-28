'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { siteConfig } from '@/config/site';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Tag,
  ArrowLeft,
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shippingEstimate,
    grandTotal,
    getWhatsAppOrderUrl,
  } = useCart();
  const { showToast } = useToast();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'WELCOME10') {
      setDiscountPercent(10);
      showToast('Coupon WELCOME10 applied: 10% Discount!', 'success');
    } else {
      showToast('Invalid coupon code. Try "WELCOME10"', 'error');
    }
  };

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = grandTotal - discountAmount;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Shopping Cart is Empty</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mt-2 mb-8">
          Explore our certified refurbished laptops, laser printers, and genuine hardware components.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/computers"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition"
          >
            Browse Computers & Laptops
          </Link>
          <Link
            href="/printers"
            className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm transition"
          >
            Browse Printers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            Shopping Cart
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {cart.reduce((a, b) => a + b.quantity, 0)} items in your cart
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-500 hover:text-rose-600 font-semibold transition"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xs"
            >
              {/* Product Image */}
              <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {item.product.brand} • {item.product.category}
                      </span>
                      <h3 className="font-bold text-base text-gray-900 dark:text-white line-clamp-1">
                        {item.product.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-rose-500 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                      {item.product.condition}
                    </span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> {item.product.warranty}
                    </span>
                  </div>
                </div>

                {/* Price and Counter */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-xl transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-xl transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-400 line-through">
                      {siteConfig.currencySymbol}{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                    </div>
                    <div className="text-base sm:text-lg font-extrabold text-blue-600 dark:text-blue-400">
                      {siteConfig.currencySymbol}{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/computers"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping for More Hardware</span>
          </Link>
        </div>

        {/* Order Summary & Checkout Box */}
        <div className="lg:col-span-4 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 shadow-xl space-y-6">
          <h3 className="font-extrabold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
            Order Summary
          </h3>

          {/* Coupon Code Input */}
          <form onSubmit={applyCoupon} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Coupon (use WELCOME10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl text-xs uppercase bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:border-blue-500 font-mono"
              />
              <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
            </div>
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 text-white text-xs font-semibold"
            >
              Apply
            </button>
          </form>

          {/* Calculations */}
          <div className="space-y-2.5 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {siteConfig.currencySymbol}{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Discount (WELCOME10 - 10%)</span>
                <span>-{siteConfig.currencySymbol}{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span>
                {shippingEstimate === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  `${siteConfig.currencySymbol}${shippingEstimate.toLocaleString('en-IN')}`
                )}
              </span>
            </div>

            <div className="flex justify-between text-base font-extrabold text-gray-900 dark:text-white pt-3 border-t border-gray-100 dark:border-gray-800">
              <span>Grand Total</span>
              <span className="text-blue-600 dark:text-blue-400">
                {siteConfig.currencySymbol}{finalTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-2.5 pt-2">
            <a
              href={getWhatsAppOrderUrl(discountAmount > 0 ? `Coupon Applied: WELCOME10 (-${siteConfig.currencySymbol}${discountAmount})` : undefined)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/25 transition"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Direct WhatsApp Order</span>
            </a>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/25 transition"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-2 text-[11px] text-gray-500 dark:text-gray-400 space-y-1 text-center">
            <p>🛡️ All orders verified with 90-day store replacement warranty.</p>
            <p>🚚 Free standard delivery for orders over {siteConfig.currencySymbol}999.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

