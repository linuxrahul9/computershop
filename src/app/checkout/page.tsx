'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { siteConfig } from '@/config/site';
import {
  ShoppingBag,
  CheckCircle2,
  Truck,
  Building,
  CreditCard,
  MessageCircle,
  Printer,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';

export default function CheckoutPage() {
  const { cart, subtotal, shippingEstimate, grandTotal, clearCart } = useCart();
  const { showToast } = useToast();

  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'cod' | 'card'>('whatsapp');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [notes, setNotes] = useState('');

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">No items in your cart to checkout</h2>
        <p className="text-xs text-gray-500 mt-2 mb-6">Add computers, laptops, printers, or accessories to proceed.</p>
        <Link
          href="/computers"
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast('Please provide your name and phone number', 'error');
      return;
    }
    if (deliveryMethod === 'delivery' && !address) {
      showToast('Please provide your delivery address', 'error');
      return;
    }

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(orderId);
    setOrderPlaced(true);
    showToast(`Order #${orderId} placed successfully!`, 'success');

    if (paymentMethod === 'whatsapp') {
      let msg = `*CONFIRMED ORDER - ${siteConfig.name}*\n`;
      msg += `Order ID: *#${orderId}*\n`;
      msg += `------------------------------------\n`;
      msg += `*Customer:* ${name}\n`;
      msg += `*Phone:* ${phone}\n`;
      msg += `*Email:* ${email || 'N/A'}\n`;
      msg += `*Delivery Mode:* ${deliveryMethod === 'delivery' ? `Doorstep Delivery (${address}, ${city} ${zip})` : 'Store Pickup'}\n\n`;
      msg += `*Ordered Items:*\n`;
      cart.forEach((item, i) => {
        msg += `${i + 1}. ${item.product.name} (x${item.quantity}) - ${siteConfig.currencySymbol}${(item.product.price * item.quantity).toLocaleString('en-IN')}\n`;
      });
      msg += `\n*Total Payable:* ${siteConfig.currencySymbol}${(deliveryMethod === 'pickup' ? subtotal : grandTotal).toLocaleString('en-IN')}\n`;
      msg += `*Payment Preference:* ${paymentMethod.toUpperCase()}\n`;
      if (notes) msg += `*Notes:* ${notes}\n`;
      msg += `------------------------------------\n`;
      msg += `Please confirm dispatch and receipt invoice.`;

      setTimeout(() => {
        window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
      }, 800);
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Order Confirmed
          </span>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mt-1">
            Thank You, {name}!
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Your order has been recorded. Our team will contact you on <strong>{phone}</strong> to confirm dispatch.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-md text-left space-y-3 text-xs sm:text-sm">
          <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <span className="text-gray-500">Order Reference:</span>
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">#{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Delivery Mode:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {deliveryMethod === 'delivery' ? 'Doorstep Courier Delivery' : 'Store Walk-In Pickup'}
            </span>
          </div>
          {deliveryMethod === 'delivery' && (
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping Address:</span>
              <span className="font-semibold text-gray-900 dark:text-white max-w-xs text-right">
                {address}, {city} {zip}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-500">Payment Option:</span>
            <span className="font-semibold text-gray-900 dark:text-white uppercase">
              {paymentMethod === 'whatsapp' ? 'Direct WhatsApp Confirmation' : paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'UPI / Card / NetBanking'}
            </span>
          </div>
          <div className="flex justify-between border-t border-gray-100 dark:border-gray-800 pt-3 text-base font-extrabold text-gray-900 dark:text-white">
            <span>Total Payable:</span>
            <span className="text-blue-600 dark:text-blue-400">
              {siteConfig.currencySymbol}{(deliveryMethod === 'pickup' ? subtotal : grandTotal).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button
            onClick={() => window.print()}
            className="px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold text-xs flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice Receipt</span>
          </button>

          <Link
            href="/"
            onClick={() => clearCart()}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const effectiveTotal = deliveryMethod === 'pickup' ? subtotal : grandTotal;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
          Complete Your Order
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Direct purchase with fast dispatch & 90-day warranty certificate.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Customer & Delivery Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Fulfillment Mode */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              1. Delivery or Store Pickup
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryMethod('delivery')}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition ${
                  deliveryMethod === 'delivery'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">Doorstep Delivery</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">Shipped securely to your door</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition ${
                  deliveryMethod === 'pickup'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <Building className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">Store Pickup</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">Collect same day at our shop</div>
                </div>
              </button>
            </div>
          </div>

          {/* 2. Customer Contact Info */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              2. Contact & Address Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  Mobile / WhatsApp Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +1 (555) 0199"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com (for PDF invoice)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm outline-none focus:border-blue-500"
              />
            </div>

            {deliveryMethod === 'delivery' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House / Flat No, Street, Landmark"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City / Region"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                      Postal Code / ZIP
                    </label>
                    <input
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="Postal Code"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Order Notes / Specific Requirements (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Please install Windows 11 in Spanish, or call before arriving..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm outline-none resize-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              3. Payment & Confirmation Method
            </h3>

            <div className="space-y-2">
              <label
                onClick={() => setPaymentMethod('whatsapp')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                  paymentMethod === 'whatsapp'
                    ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20'
                    : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                      Instant WhatsApp Direct Order (Recommended)
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Submit order directly to our WhatsApp support team for instant confirmation.
                    </div>
                  </div>
                </div>
                <input
                  type="radio"
                  checked={paymentMethod === 'whatsapp'}
                  onChange={() => setPaymentMethod('whatsapp')}
                  className="w-4 h-4 text-emerald-600"
                />
              </label>

              <label
                onClick={() => setPaymentMethod('cod')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                  paymentMethod === 'cod'
                    ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/20'
                    : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                      Cash on Delivery (COD) / Pay at Store
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Pay after inspecting your device upon arrival or at pickup.
                    </div>
                  </div>
                </div>
                <input
                  type="radio"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="w-4 h-4 text-blue-600"
                />
              </label>

              <label
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                  paymentMethod === 'card'
                    ? 'border-purple-500 bg-purple-50/40 dark:bg-purple-950/20'
                    : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                      UPI / GPay / PhonePe / Paytm / QR Code / NetBanking
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Instant digital payment via UPI QR code or bank transfer.
                    </div>
                  </div>
                </div>
                <input
                  type="radio"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="w-4 h-4 text-purple-600"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 shadow-xl space-y-6">
          <h3 className="font-bold text-base text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
            Review Items ({cart.reduce((a, b) => a + b.quantity, 0)})
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="flex gap-3 text-xs">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 dark:text-white line-clamp-1">{item.product.name}</div>
                  <div className="text-[11px] text-gray-500">Qty: {item.quantity} × {siteConfig.currencySymbol}{item.product.price.toLocaleString('en-IN')}</div>
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {siteConfig.currencySymbol}{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900 dark:text-white">{siteConfig.currencySymbol}{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>
                {deliveryMethod === 'pickup' || shippingEstimate === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  `${siteConfig.currencySymbol}${shippingEstimate.toLocaleString('en-IN')}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-gray-800">
              <span>Total Payable</span>
              <span className="text-blue-600 dark:text-blue-400">{siteConfig.currencySymbol}{effectiveTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/25 transition"
          >
            Confirm & Place Order ({siteConfig.currencySymbol}{effectiveTotal.toLocaleString('en-IN')})
          </button>

          <div className="text-[11px] text-gray-400 text-center space-y-1">
            <p className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Genuine Parts & Hardware Warranty
            </p>
            <p>Need support? Call helpline: {siteConfig.phone}</p>
          </div>
        </div>
      </form>
    </div>
  );
}

