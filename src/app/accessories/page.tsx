'use client';

import React, { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import { siteConfig } from '@/config/site';
import { HardDrive, Search, X, ShieldCheck, Zap } from 'lucide-react';

export default function AccessoriesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const accessories = useMemo(() => {
    return products.filter((p) => p.category === 'accessories');
  }, []);

  const filtered = useMemo(() => {
    return accessories.filter((p) => {
      if (selectedCategory !== 'all' && p.subcategory !== selectedCategory) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      }
      return true;
    });
  }, [accessories, selectedCategory, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold">
            <HardDrive className="w-3.5 h-3.5" />
            <span>Hardware Upgrades & Accessories</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            Speed Up Your Computer With High-Speed SSDs & RAM
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Upgrade sluggish laptops and PCs with Gen4 NVMe solid state drives, DDR4/DDR5 memory modules, ergonomic Logitech mice, mechanical gaming keyboards, and high-yield laser printer toners.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search NVMe SSD, DDR4 RAM, keyboard, charger..."
            className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none focus:border-purple-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2.5 top-2.5 text-gray-400">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Upgrades' },
            { id: 'storage', label: 'SSDs & Storage' },
            { id: 'ram', label: 'RAM Memory' },
            { id: 'peripherals', label: 'Keyboards & Mice' },
            { id: 'monitors', label: 'Monitors' },
            { id: 'chargers', label: 'Adapters & GaN' },
            { id: 'toners', label: 'Printer Toners' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Free Upgrade Installation Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold">
            <Zap className="w-4 h-4" /> Free Upgrade Service
          </div>
          <h3 className="font-bold text-lg text-blue-950 dark:text-blue-200">
            Complimentary Data Migration & SSD Installation
          </h3>
          <p className="text-xs text-blue-800 dark:text-blue-400 max-w-xl">
            When you purchase any SSD or RAM from our store, we clone your existing Windows, apps, and files to the new fast SSD free of cost within 30 minutes!
          </p>
        </div>
      </div>
    </div>
  );
}

