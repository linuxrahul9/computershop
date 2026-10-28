'use client';

import React, { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import { siteConfig } from '@/config/site';
import { useModals } from '@/context/ModalContext';
import { Printer, Wrench, ShieldCheck, Search, X, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PrintersPage() {
  const { openRepairModal } = useModals();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');

  // Filter printers and consumables
  const printerProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.category === 'printers' ||
        (p.category === 'accessories' && p.subcategory === 'toners') ||
        (p.category === 'second-hand' && p.subcategory === 'printers')
    );
  }, []);

  const filtered = useMemo(() => {
    return printerProducts.filter((p) => {
      if (selectedType !== 'all') {
        if (selectedType === 'printers' && p.subcategory !== 'printers') return false;
        if (selectedType === 'toners' && p.subcategory !== 'toners') return false;
      }
      if (selectedCondition !== 'all') {
        if (selectedCondition === 'refurbished' && !p.isSecondHand) return false;
        if (selectedCondition === 'new' && p.isSecondHand) return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        if (!matchName && !matchBrand) return false;
      }
      return true;
    });
  }, [printerProducts, selectedType, selectedCondition, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Printer className="w-3.5 h-3.5" />
            <span>Printers, Scanners & Consumables</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            LaserJet, InkTank & Commercial POS Printers
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Buy ultra-low cost per page ink tank printers, heavy-duty HP LaserJet office workhorses, and original compatible toner cartridges.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => openRepairModal('Laser Printer')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs flex items-center gap-1.5 transition shadow"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Book Printer Repair or Refill</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search printers by model, HP 88A toner..."
            className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none focus:border-emerald-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2.5 top-2.5 text-gray-400">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 outline-none"
          >
            <option value="all">All Products</option>
            <option value="printers">Printers & Hardware</option>
            <option value="toners">Toners & Inks</option>
          </select>

          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 outline-none"
          >
            <option value="all">All Conditions</option>
            <option value="new">Brand New</option>
            <option value="refurbished">Refurbished / Pre-Owned</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Printer Maintenance & Care Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="font-bold text-lg text-emerald-950 dark:text-emerald-200">
            Need Doorstep Printer Cartridge Refill or Paper Jam Repair?
          </h3>
          <p className="text-xs text-emerald-800 dark:text-emerald-400 max-w-xl">
            We provide fast 1-hour doorstep laser toner refilling and on-site roller/head maintenance for clinics, offices, and retail stores.
          </p>
        </div>
        <button
          onClick={() => openRepairModal('Printer Repair & Refill')}
          className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shrink-0 transition"
        >
          Book Doorstep Technician
        </button>
      </div>
    </div>
  );
}

