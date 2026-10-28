'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { useModals } from '@/context/ModalContext';
import {
  Laptop,
  Printer,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  PhoneCall,
  DollarSign,
  Star,
} from 'lucide-react';

export default function HeroSection() {
  const { openRepairModal, openSellModal } = useModals();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-gray-50/30 dark:from-gray-900 dark:via-gray-900/80 dark:to-gray-950 py-12 lg:py-20 border-b border-gray-200 dark:border-gray-800">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 dark:bg-blue-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Certified Tech Store & Master Chip-Level Repair Lab</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.15]">
              Buy, Sell & Repair{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
                Computers, Laptops
              </span>{' '}
              & Printers.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Explore certified refurbished laptops with 90-day warranty, custom gaming rigs, laser printers, and original accessories. Plus, get same-day chip-level motherboard repairs with 100% free diagnostics.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-gray-700 dark:text-gray-300 pt-1">
              <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>40-Point Quality Inspection</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span>90-Day Warranty</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-xs">
                <Wrench className="w-4 h-4 text-amber-500" />
                <span>Zero Diagnostic Fee</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/second-hand"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition"
              >
                <span>Browse Refurbished Deals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => openRepairModal()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold text-sm shadow-md flex items-center justify-center gap-2 transition"
              >
                <Wrench className="w-4 h-4" />
                <span>Book a Repair</span>
              </button>

              <button
                onClick={openSellModal}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold text-sm flex items-center justify-center gap-2 transition"
              >
                <DollarSign className="w-4 h-4 text-emerald-500" />
                <span>Sell Old Tech</span>
              </button>
            </div>

            {/* Social Proof Stats */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 border-t border-gray-200 dark:border-gray-800 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">15,000+</div>
                <div className="text-xs text-gray-500">Devices Repaired</div>
              </div>
              <div className="h-8 w-px bg-gray-200 dark:bg-gray-800" />
              <div>
                <div className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">8,500+</div>
                <div className="text-xs text-gray-500">Satisfied Buyers</div>
              </div>
              <div className="h-8 w-px bg-gray-200 dark:bg-gray-800" />
              <div>
                <div className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-1">
                  <span>4.9</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-xs text-gray-500">Google Reviews</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/80 p-2">
              <div className="relative rounded-2xl overflow-hidden aspect-4/3">
                <img
                  src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=900&auto=format&fit=crop&q=80"
                  alt="High quality laptops, computers and printers showcase"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Floating Overlay Badge on Hero Image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/20 shadow-lg text-gray-900 dark:text-white flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                      Featured Pre-Owned
                    </span>
                    <h4 className="font-bold text-sm">Lenovo ThinkPad & Dell Laptops</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Starting from {siteConfig.currencySymbol}15,499</p>
                  </div>
                  <Link
                    href="/second-hand"
                    className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Floating Highlight Chips */}
              <div className="grid grid-cols-3 gap-2 mt-2 p-1 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-blue-50/60 dark:bg-gray-900 border border-blue-100 dark:border-gray-700">
                  <Laptop className="w-4 h-4 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
                  <span className="font-bold text-gray-900 dark:text-white block text-[11px]">Computers</span>
                  <span className="text-[10px] text-gray-500">Laptops & PCs</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-gray-900 border border-emerald-100 dark:border-gray-700">
                  <Printer className="w-4 h-4 mx-auto mb-1 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-bold text-gray-900 dark:text-white block text-[11px]">Printers</span>
                  <span className="text-[10px] text-gray-500">Laser & Ink</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-gray-900 border border-amber-100 dark:border-gray-700">
                  <Wrench className="w-4 h-4 mx-auto mb-1 text-amber-600 dark:text-amber-400" />
                  <span className="font-bold text-gray-900 dark:text-white block text-[11px]">Repairs</span>
                  <span className="text-[10px] text-gray-500">Chip-Level</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

