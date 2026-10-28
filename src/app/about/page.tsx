'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { useModals } from '@/context/ModalContext';
import {
  ShieldCheck,
  Award,
  Cpu,
  RefreshCw,
  Users,
  CheckCircle2,
  Wrench,
  Laptop,
  Printer,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  const { openRepairModal, openSellModal } = useModals();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          About {siteConfig.name}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          Your Trusted Partner for Hardware Sales & Component-Level Care
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          Founded with a simple mission: make high-performance enterprise computers, reliable printers, and professional micro-soldering repairs affordable, transparent, and hassle-free.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Expert Engineering Lab</h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Unlike standard shops that only swap entire motherboards, our technicians specialize in microscopic BGA rework, replacing shorted capacitors, MOSFETs, and power ICs to save you up to 70%.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Certified 40-Point Audit</h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Every second-hand laptop and refurbished printer undergoes comprehensive thermal, stress, battery health, and display testing before receiving our store warranty seal.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">E-Waste & Sustainability</h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            We give quality hardware a second life. By refurbishing corporate off-lease computers and repairing logic boards, we have prevented over 25 tons of toxic e-waste from entering landfills.
          </p>
        </div>
      </div>

      {/* Stats Counter Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-5xl font-black">15,000+</div>
            <div className="text-xs sm:text-sm text-blue-100 font-semibold mt-1">Laptops & PCs Repaired</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-black">8,500+</div>
            <div className="text-xs sm:text-sm text-blue-100 font-semibold mt-1">Certified Units Sold</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-black">100%</div>
            <div className="text-xs sm:text-sm text-blue-100 font-semibold mt-1">Free Diagnostic Check</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-black">4.9 / 5</div>
            <div className="text-xs sm:text-sm text-blue-100 font-semibold mt-1">Google Rating</div>
          </div>
        </div>
      </div>

      {/* Lab Facilities & Workmanship */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Inside Our Workshop
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            State-of-the-Art ESD-Safe Diagnostic Workstations
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            We invest in industrial-grade tools: thermal imaging cameras to find microscopic short circuits in seconds, Quick SMD rework hot-air guns, ultrasonic chemical cleaning baths for water-damaged boards, and high-precision laser toner testing machines.
          </p>
          <div className="space-y-2 pt-2">
            {[
              'Component-level schematic diagrams for all major brands',
              'Cleanroom environment for dust-free screen & hinge repairs',
              'Direct factory relationships for genuine replacement parts',
              'Non-destructive forensic data recovery for degraded drives',
            ].map((pt, i) => (
              <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 flex gap-3">
            <button
              onClick={() => openRepairModal()}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition"
            >
              Book Device Repair
            </button>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-bold transition flex items-center gap-1.5"
            >
              <span>Visit Our Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 aspect-4/3">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&auto=format&fit=crop&q=80"
              alt="Repair laboratory technician working with electronics"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

