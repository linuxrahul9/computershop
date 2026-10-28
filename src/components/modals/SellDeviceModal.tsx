'use client';

import React, { useState } from 'react';
import { useModals } from '@/context/ModalContext';
import { useToast } from '@/context/ToastContext';
import { siteConfig } from '@/config/site';
import { X, DollarSign, CheckCircle2, MessageCircle, Laptop, ArrowRight } from 'lucide-react';

export default function SellDeviceModal() {
  const { isSellModalOpen, closeSellModal } = useModals();
  const { showToast } = useToast();

  const [deviceCategory, setDeviceCategory] = useState('Laptop');
  const [brand, setBrand] = useState('Dell');
  const [modelSpecs, setModelSpecs] = useState('');
  const [condition, setCondition] = useState('Working Flawlessly (Minor Scratches)');
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);

  if (!isSellModalOpen) return null;

  const calculateEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelSpecs || !sellerPhone) {
      showToast('Please provide your device details and phone number', 'error');
      return;
    }

    // Dynamic valuation algorithm based on device and condition
    let base = 8000;
    if (deviceCategory === 'Laptop') base = 12000;
    else if (deviceCategory === 'Gaming PC') base = 25000;
    else if (deviceCategory === 'Printer') base = 3500;
    else if (deviceCategory === 'Desktop') base = 7500;
    else if (deviceCategory === 'MacBook') base = 28000;

    if (condition.includes('Flawlessly')) base *= 1.35;
    else if (condition.includes('Faulty')) base *= 0.55;

    const finalVal = Math.round(base);
    setEstimatedValue(finalVal);
    showToast(`Instant estimate generated: ${siteConfig.currencySymbol}${finalVal.toLocaleString('en-IN')}`, 'success');
  };

  const getWhatsAppValuationUrl = () => {
    let msg = `*SELL / TRADE-IN INQUIRY - ${siteConfig.name}*\n`;
    msg += `------------------------------------\n`;
    msg += `*Name:* ${sellerName}\n`;
    msg += `*Phone:* ${sellerPhone}\n`;
    msg += `*Device Category:* ${deviceCategory}\n`;
    msg += `*Brand & Specs:* ${brand} - ${modelSpecs}\n`;
    msg += `*Physical Condition:* ${condition}\n`;
    if (estimatedValue) msg += `*Estimated Web Value:* ${siteConfig.currencySymbol}${estimatedValue}\n`;
    msg += `------------------------------------\n`;
    msg += `I would like to sell/exchange this device. Please let me know how to proceed.`;

    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  const reset = () => {
    setEstimatedValue(null);
    closeSellModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={reset} />

      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden z-10 border border-gray-200 dark:border-gray-800 animate-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Sell or Trade-In Your Old Device</h3>
              <p className="text-xs text-emerald-100">Get top cash or upgrade discount for used computers & printers</p>
            </div>
          </div>
          <button
            onClick={reset}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {estimatedValue !== null ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Estimated Valuation</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                  {siteConfig.currencySymbol}{estimatedValue.toLocaleString('en-IN')} - {siteConfig.currencySymbol}{(estimatedValue + 2000).toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Final payout is confirmed after rapid 10-minute hardware inspection at our center.
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-left text-sm space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Device:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{brand} {modelSpecs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Condition:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{condition}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <a
                  href={getWhatsAppValuationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Claim Cash Quote on WhatsApp</span>
                </a>
                <button
                  onClick={() => setEstimatedValue(null)}
                  className="w-full py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Recalculate with different specs
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={calculateEstimate} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                    Device
                  </label>
                  <select
                    value={deviceCategory}
                    onChange={(e) => setDeviceCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none"
                  >
                    <option value="Laptop">Used Laptop</option>
                    <option value="Desktop">Desktop PC</option>
                    <option value="Printer">Laser/Inkjet Printer</option>
                    <option value="Gaming PC">Gaming Computer</option>
                    <option value="MacBook">MacBook / Apple Mac</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                    Brand
                  </label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none"
                  >
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Apple">Apple</option>
                    <option value="Asus">ASUS</option>
                    <option value="Acer">Acer</option>
                    <option value="Canon">Canon</option>
                    <option value="Epson">Epson</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Processor / Model / Specs *
                </label>
                <input
                  type="text"
                  required
                  value={modelSpecs}
                  onChange={(e) => setModelSpecs(e.target.value)}
                  placeholder="e.g. Core i5 8th Gen, 8GB RAM, 256GB SSD"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Current Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none"
                >
                  <option value="Working Flawlessly (Minor Scratches)">Working Flawlessly (Minor Scratches)</option>
                  <option value="Working Good (Battery weak or charger missing)">Working Good (Battery weak or charger missing)</option>
                  <option value="Needs Minor Repair (Keyboard/Port issue)">Needs Minor Repair (Keyboard/Port issue)</option>
                  <option value="Dead / Faulty / Non-Working (For Scrap/Parts)">Dead / Faulty / Non-Working (For Scrap/Parts)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value)}
                    placeholder="Mobile Number"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition flex items-center justify-center gap-2 mt-2"
              >
                <span>Calculate Instant Cash Offer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

