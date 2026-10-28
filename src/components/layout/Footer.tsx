'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import {
  Laptop,
  Printer,
  Wrench,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Truck,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges: Trust Factors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Certified Tech</h4>
              <p className="text-xs text-slate-400">40-Point Hardware Quality Check</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">90-Day Warranty</h4>
              <p className="text-xs text-slate-400">On all second-hand & repairs</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Free Diagnostics</h4>
              <p className="text-xs text-slate-400">Zero cost inspection quote</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Fast Dispatch</h4>
              <p className="text-xs text-slate-400">Doorstep pickup & shipping</p>
            </div>
          </div>
        </div>

        {/* 4 Column Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          {/* Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Laptop className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {siteConfig.shortDescription}
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/computers" className="hover:text-blue-400 transition">
                  Refurbished Business Laptops
                </Link>
              </li>
              <li>
                <Link href="/computers" className="hover:text-blue-400 transition">
                  Custom Gaming & Workstation PCs
                </Link>
              </li>
              <li>
                <Link href="/printers" className="hover:text-blue-400 transition">
                  LaserJet & Ink Tank Printers
                </Link>
              </li>
              <li>
                <Link href="/second-hand" className="hover:text-blue-400 transition">
                  Second-Hand Tech Marketplace
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="hover:text-blue-400 transition">
                  NVMe SSDs, RAM & Peripherals
                </Link>
              </li>
              <li>
                <Link href="/printers" className="hover:text-blue-400 transition">
                  Toner Cartridges & Refills
                </Link>
              </li>
            </ul>
          </div>

          {/* Repair Services Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Repair & Maintenance
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/services" className="hover:text-blue-400 transition">
                  Laptop Chip-Level Motherboard Repair
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition">
                  Broken Screen & Hinge Replacement
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition">
                  Printer Paper Jam & Head Unclogging
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition">
                  Liquid Spill & Water Damage Revival
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition">
                  Dead Hard Drive Data Recovery
                </Link>
              </li>
              <li>
                <Link href="/track-repair" className="hover:text-blue-400 transition flex items-center gap-1.5 text-blue-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Track Repair Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Hours & Location */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Store & Support
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{siteConfig.address}, {siteConfig.city}, {siteConfig.state}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-white transition">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{siteConfig.email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{siteConfig.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Policy */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-300 transition">About Us</Link>
            <Link href="/services" className="hover:text-slate-300 transition">Repair Policy</Link>
            <Link href="/contact" className="hover:text-slate-300 transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
