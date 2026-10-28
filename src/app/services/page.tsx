'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { services } from '@/data/services';
import ServiceCard from '@/components/ui/ServiceCard';
import { siteConfig } from '@/config/site';
import { useModals } from '@/context/ModalContext';
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PhoneCall,
  Search,
  Check,
  HelpCircle,
  Cpu,
  Printer,
  HardDrive,
  MessageCircle,
} from 'lucide-react';

export default function ServicesPage() {
  const { openRepairModal } = useModals();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = services.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
            <Wrench className="w-3.5 h-3.5" />
            <span>Master Service Center & Repair Lab</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            Chip-Level Hardware Repairs & Transparent Pricing
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            From BGA micro-soldering motherboard dead fixes to laser printer roller replacements and broken screen hinge restoration. 100% free diagnostics with no fix = no fee guarantee.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={() => openRepairModal()}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition"
            >
              <Wrench className="w-4 h-4" />
              <span>Book A Repair Appointment</span>
            </button>
            <Link
              href="/track-repair"
              className="px-4 py-3 rounded-xl border border-white/20 hover:bg-white/10 text-white font-semibold text-xs transition"
            >
              Track Existing Repair Job
            </Link>
          </div>
        </div>
      </div>

      {/* Repair Process Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-black text-sm flex items-center justify-center">
            01
          </div>
          <h4 className="font-bold text-sm text-gray-900 dark:text-white">Free Diagnostic Audit</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Drop in or request doorstep pickup. We inspect your device and pinpoint exact faults without any inspection fees.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-black text-sm flex items-center justify-center">
            02
          </div>
          <h4 className="font-bold text-sm text-gray-900 dark:text-white">Upfront Price Approval</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            We provide a written quote and estimated completion time via WhatsApp or phone before starting any repair work.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-black text-sm flex items-center justify-center">
            03
          </div>
          <h4 className="font-bold text-sm text-gray-900 dark:text-white">Lab Micro-Soldering</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Our certified technicians replace faulty ICs, MOSFETs, screen panels, or clean jammed printer heads in an ESD-safe cleanroom.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-black text-sm flex items-center justify-center">
            04
          </div>
          <h4 className="font-bold text-sm text-gray-900 dark:text-white">Stress Test & Warranty</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Full quality benchmarking check before delivery, backed by a 90-day warranty certificate on all replaced components.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              All Specialized Repair Solutions
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Select a category to view specific repair services and capabilities.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'chip-level', label: 'Chip-Level & Motherboard' },
              { id: 'laptop', label: 'Screens & Hinges' },
              { id: 'printer', label: 'Printers' },
              { id: 'computer', label: 'Desktops & Gaming' },
              { id: 'data-recovery', label: 'Data Recovery' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  activeCategory === tab.id
                    ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Transparent Service Pricing Guide Table */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-xs space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Transparent Repair Pricing Guide
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Standard labor and typical component replacement rates. Accurate estimates confirmed upon free diagnostic inspection.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="py-3 px-4 font-bold">Service & Fault</th>
                <th className="py-3 px-4 font-bold">Typical Device</th>
                <th className="py-3 px-4 font-bold">Est. Cost</th>
                <th className="py-3 px-4 font-bold">Turnaround</th>
                <th className="py-3 px-4 font-bold">Warranty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Motherboard Power IC / Mosfet Replacement</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">All Laptops</td>
                <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">{siteConfig.currencySymbol}1,200 - {siteConfig.currencySymbol}2,500</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">24-48 Hours</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">90 Days</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">15.6" Full HD IPS Screen Replacement</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Dell, HP, Lenovo, ASUS</td>
                <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">{siteConfig.currencySymbol}2,800 - {siteConfig.currencySymbol}4,500</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Same Day (2 Hours)</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">6 Months</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Broken Hinge & Base Body Reconstruction</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">All Laptops</td>
                <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">{siteConfig.currencySymbol}800 - {siteConfig.currencySymbol}1,500</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Same Day</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">6 Months</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Laser Printer Roller / Teflon / Jam Fix</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">HP, Canon, Brother</td>
                <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">{siteConfig.currencySymbol}450 - {siteConfig.currencySymbol}950</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Same Day</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">90 Days</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Laser Toner High-Yield Refill</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">HP 88A, 12A, Canon</td>
                <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">{siteConfig.currencySymbol}250 - {siteConfig.currencySymbol}350</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">30 Minutes</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">100% Page Yield</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

