'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { services } from '@/data/services';
import { reviews } from '@/data/reviews';
import { siteConfig } from '@/config/site';
import { useModals } from '@/context/ModalContext';
import HeroSection from '@/components/home/HeroSection';
import RepairCostEstimator from '@/components/home/RepairCostEstimator';
import ProductCard from '@/components/ui/ProductCard';
import ServiceCard from '@/components/ui/ServiceCard';
import {
  Laptop,
  Printer,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Phone,
  MessageCircle,
  Cpu,
  RefreshCw,
  HardDrive,
  Award,
  Star,
  MapPin,
  Clock,
} from 'lucide-react';

export default function HomePage() {
  const { openRepairModal, openSellModal } = useModals();
  const [activeTab, setActiveTab] = useState<'all' | 'second-hand' | 'printers' | 'accessories'>('all');

  const filteredFeaturedProducts = products.filter((prod) => {
    if (activeTab === 'all') return prod.featured;
    if (activeTab === 'second-hand') return prod.isSecondHand;
    if (activeTab === 'printers') return prod.category === 'printers';
    if (activeTab === 'accessories') return prod.category === 'accessories';
    return true;
  });

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Category Shortcuts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Explore By Department
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
            Quality Hardware & Specialized Services
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Laptops & PCs */}
          <Link
            href="/computers"
            className="group relative p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <Laptop className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">Computers & Laptops</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Dell, Lenovo, Mac, Gaming Rigs</p>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-3 flex items-center gap-1 group-hover:translate-x-1 transition">
              Browse 50+ Models <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Printers & Consumables */}
          <Link
            href="/printers"
            className="group relative p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <Printer className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">Printers & Scanners</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">LaserJet, InkTank, POS Printers</p>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-3 flex items-center gap-1 group-hover:translate-x-1 transition">
              Shop Printers <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Second Hand Marketplace */}
          <Link
            href="/second-hand"
            className="group relative p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-amber-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
          >
            <span className="absolute top-3 right-3 text-[10px] font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">
              Grade A+
            </span>
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <RefreshCw className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">Second-Hand Tech</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Inspected, Tested with Warranty</p>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-3 flex items-center gap-1 group-hover:translate-x-1 transition">
              View Certified Stock <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          {/* Chip-level Repairs */}
          <Link
            href="/services"
            className="group relative p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-purple-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <Wrench className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">Repair Services</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Chip-Level, Screens, Cartridges</p>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-3 flex items-center gap-1 group-hover:translate-x-1 transition">
              Free Diagnostics <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </section>

      {/* 3. Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Hand-Picked Hardware
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
              Top Deals on Computers, Laptops & Printers
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 self-start md:self-auto overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Featured' },
              { id: 'second-hand', label: 'Refurbished Tech' },
              { id: 'printers', label: 'Printers' },
              { id: 'accessories', label: 'Accessories' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFeaturedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/computers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold text-sm hover:bg-blue-100 transition border border-blue-200 dark:border-blue-900"
          >
            <span>View All Hardware Inventory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. Interactive Repair Cost Estimator */}
      <RepairCostEstimator />

      {/* 5. Repair Services Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Expert Lab Diagnostics
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
              Professional Computer & Printer Repairs
            </h2>
          </div>
          <button
            onClick={() => openRepairModal()}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md self-start md:self-auto transition"
          >
            Book Free Inspection
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 6. Why Choose Us: 40-Point Inspection & Guarantee */}
      <section className="bg-slate-900 text-white py-14 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Quality First Pledge
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Why Buy Second-Hand Tech From {siteConfig.name}?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Buying used or refurbished tech doesn't have to be a gamble. Every laptop, PC, and printer undergoes rigorous component stress testing before being made available for sale.
              </p>
              <div className="pt-2">
                <button
                  onClick={openSellModal}
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Sell or Trade-in Your Device</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  01
                </div>
                <h4 className="font-bold text-white text-base">40-Point Hardware Audit</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Motherboard, battery capacity, thermal paste, display pixels, Wi-Fi, ports, keyboard keys, and audio are rigorously tested.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  02
                </div>
                <h4 className="font-bold text-white text-base">90 to 180 Days Warranty</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every certified second-hand laptop or printer includes hassle-free store replacement warranty for peace of mind.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  03
                </div>
                <h4 className="font-bold text-white text-base">Genuine OS & Clean Disks</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  All storage drives undergo DoD-standard wipe. Ships with fresh, legally genuine Windows 11 Pro activated and optimized.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  04
                </div>
                <h4 className="font-bold text-white text-base">Lifetime Tech Support</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Have questions about drivers, upgrades, or printer setups? Our in-house tech team is always just a WhatsApp message away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Customer Reviews & Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Real Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
            Trusted by Thousands of Local Customers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex flex-col justify-between shadow-xs space-y-4"
            >
              <div>
                <div className="flex text-amber-400 mb-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1.5">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 text-xs">
                <div className="font-bold text-gray-900 dark:text-white">{rev.author}</div>
                <div className="text-[11px] text-gray-400 flex items-center justify-between mt-0.5">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">{rev.serviceOrProduct}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Direct Contact & Store Visit Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 px-3 py-1 rounded-full">
                Fast Response Guarantee
              </span>
              <h2 className="text-2xl sm:text-4xl font-black">
                Have a Broken Device or Looking for Custom Pricing?
              </h2>
              <p className="text-sm sm:text-base text-blue-100 max-w-xl">
                Chat with our hardware engineers on WhatsApp or call us directly. We provide instant estimates, part availability, and doorstep pickup service.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm flex items-center gap-2 shadow-lg transition"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Instant WhatsApp Chat</span>
                </a>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="px-6 py-3.5 rounded-xl bg-white text-gray-900 hover:bg-gray-100 font-bold text-sm flex items-center gap-2 shadow-lg transition"
                >
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span>Call {siteConfig.phone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-xs space-y-3">
              <h4 className="font-bold text-base text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-300" /> Walk-In Service Center
              </h4>
              <p className="text-blue-100 leading-relaxed">
                {siteConfig.address}, {siteConfig.city}, {siteConfig.state}
              </p>
              <div className="pt-2 border-t border-white/10 text-blue-100 space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-300" /> Hours:
                </div>
                <p>{siteConfig.workingHours}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
