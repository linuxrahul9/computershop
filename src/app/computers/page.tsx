'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import { siteConfig } from '@/config/site';
import { Laptop, Filter, Search, ShieldCheck, RefreshCw, X } from 'lucide-react';
import { useModals } from '@/context/ModalContext';

function ComputersContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const { openSellModal } = useModals();

  const [search, setSearch] = useState(initialSearch);
  const [selectedSubcategory, setSelectedSubcategory] = useState<'all' | 'laptops' | 'computers'>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  // Filter only computers and laptops
  const computerProducts = useMemo(() => {
    return products.filter(
      (p) => p.category === 'computers' || p.subcategory === 'laptops' || p.subcategory === 'computers'
    );
  }, []);

  const filteredProducts = useMemo(() => {
    return computerProducts
      .filter((p) => {
        if (selectedSubcategory !== 'all' && p.subcategory !== selectedSubcategory) {
          return false;
        }
        if (selectedCondition !== 'all') {
          if (selectedCondition === 'refurbished' && !p.isSecondHand) return false;
          if (selectedCondition === 'new' && p.isSecondHand) return false;
        }
        if (selectedBrand !== 'all' && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchSpecs = p.shortSpecs.some((s) => s.toLowerCase().includes(q));
          if (!matchName && !matchBrand && !matchSpecs) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [computerProducts, selectedSubcategory, selectedCondition, selectedBrand, search, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
            <Laptop className="w-3.5 h-3.5" />
            <span>Computers & Laptops Store</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            Brand New & Certified Refurbished Computers
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            High performance Dell, HP, Lenovo ThinkPad business laptops, Apple MacBooks, and custom gaming PCs. Fully inspected with 90-Day store warranty.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={openSellModal}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 underline underline-offset-4"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Have an old laptop to sell or exchange? Get instant cash quote
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by model, Core i5/i7, RAM..."
            className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none focus:border-blue-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Subcategory */}
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value as any)}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 outline-none"
          >
            <option value="all">All Types</option>
            <option value="laptops">Laptops Only</option>
            <option value="computers">Desktops / Custom PCs</option>
          </select>

          {/* Condition */}
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 outline-none"
          >
            <option value="all">All Conditions</option>
            <option value="refurbished">Certified Second-Hand / Refurbished</option>
            <option value="new">Brand New Sealed</option>
          </select>

          {/* Brand */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 outline-none"
          >
            <option value="all">All Brands</option>
            <option value="Lenovo">Lenovo</option>
            <option value="Dell">Dell</option>
            <option value="Apple">Apple</option>
            <option value="HP">HP</option>
            <option value="ASUS">ASUS</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 outline-none"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Count & Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Showing {filteredProducts.length} computers & laptops available</span>
        {(selectedSubcategory !== 'all' || selectedCondition !== 'all' || selectedBrand !== 'all' || search) && (
          <button
            onClick={() => {
              setSelectedSubcategory('all');
              setSelectedCondition('all');
              setSelectedBrand('all');
              setSearch('');
            }}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8">
          <Laptop className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">No computers match your filters</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or reset the brand and condition filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ComputersPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-xs text-gray-400">Loading catalog...</div>}>
      <ComputersContent />
    </Suspense>
  );
}
