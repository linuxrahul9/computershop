'use client';

import React, { useState } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import { siteConfig } from '@/config/site';
import { useModals } from '@/context/ModalContext';
import {
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Award,
  BatteryCharging,
  Cpu,
  Layers,
} from 'lucide-react';

export default function SecondHandHubPage() {
  const { openSellModal } = useModals();
  const [selectedSub, setSelectedSub] = useState<'all' | 'laptops' | 'computers' | 'printers'>('all');

  const secondHandItems = products.filter((p) => p.isSecondHand);

  const filtered = secondHandItems.filter((p) => {
    if (selectedSub === 'all') return true;
    return p.subcategory === selectedSub;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Certified Pre-Owned & Refurbished Hub</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            Save Up To 70% On Enterprise Laptops & Printers
          </h1>
          <p className="text-sm text-amber-100 leading-relaxed">
            Why spend full price on brand new equipment? Our certified pre-owned ThinkPads, MacBooks, and Dell workstations undergo rigorous 40-point hardware inspections and come with full store warranties.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={openSellModal}
              className="px-5 py-3 rounded-xl bg-white text-gray-900 hover:bg-amber-50 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition"
            >
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Sell / Exchange Your Device</span>
            </button>
          </div>
        </div>
      </div>

      {/* 40-Point Quality Check & Grading Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-gray-900 dark:text-white">Grade A+ (Like New)</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Virtually indistinguishable from brand new. Pristine screen, zero scratches, keyboard with original matte texture, and 90%+ battery health.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-gray-900 dark:text-white">Grade A (Excellent)</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Very faint signs of handling on outer casing. Internals, display, battery, motherboard, and cooling fans are 100% factory certified.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <BatteryCharging className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-gray-900 dark:text-white">Warranty & Genuine OS</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Includes 90 to 180-day store replacement warranty. Every computer is formatted, disinfected, and preloaded with genuine Windows 11 Pro.
          </p>
        </div>
      </div>

      {/* Subcategory Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-gray-100 dark:bg-gray-800 max-w-md">
        {[
          { id: 'all', label: 'All Pre-Owned' },
          { id: 'laptops', label: 'Refurbished Laptops' },
          { id: 'computers', label: 'Refurbished PCs' },
          { id: 'printers', label: 'Refurbished Printers' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedSub(tab.id as any)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition text-center ${
              selectedSub === tab.id
                ? 'bg-white dark:bg-gray-900 text-amber-600 dark:text-amber-400 shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Trade-In Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold">Want to Sell Your Used Computer or Printer?</h3>
          <p className="text-xs text-slate-400 max-w-xl">
            We buy used laptops, desktops, and printers in any condition. Get paid instantly via Cash or Bank Transfer, or upgrade to a faster model with exchange discounts.
          </p>
        </div>
        <button
          onClick={openSellModal}
          className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold text-xs uppercase tracking-wider shrink-0 transition"
        >
          Check Valuation & Sell Now
        </button>
      </div>
    </div>
  );
}

