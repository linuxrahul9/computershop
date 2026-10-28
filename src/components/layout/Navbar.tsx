'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { useCart } from '@/context/CartContext';
import { useModals } from '@/context/ModalContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import {
  Laptop,
  Printer,
  Wrench,
  ShoppingBag,
  Phone,
  Search,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  HardDrive,
  MessageCircle,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { openRepairModal, openSellModal } = useModals();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Computers & Laptops', href: '/computers', badge: 'New & Used' },
    { name: 'Printers & Scanners', href: '/printers' },
    { name: 'Second-Hand Hub', href: '/second-hand', badge: 'Certified' },
    { name: 'Repair Services', href: '/services', icon: Wrench },
    { name: 'Accessories', href: '/accessories' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/computers?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 hidden md:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-blue-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Free Diagnostics on All Laptops & Printers
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">
              ⚡ 90-Day Replacement Warranty on Certified Second-Hand Tech
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={openSellModal}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sell / Exchange Old Device</span>
            </button>
            <span className="text-slate-500">•</span>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="hover:text-blue-400 flex items-center gap-1 text-slate-300 transition"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Helpline: {siteConfig.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition transform">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-xl tracking-tight text-gray-900 dark:text-white block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                {siteConfig.name}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 block -mt-0.5">
                Computers • Printers • Repairs
              </span>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center flex-1 max-w-md relative"
          >
            <input
              type="text"
              placeholder="Search laptops, desktops, laser printers, SSDs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
          </form>

          {/* Action Tools (Right) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Repair Booking Button */}
            <button
              onClick={() => openRepairModal()}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 font-semibold text-xs border border-blue-200 dark:border-blue-800/60 transition"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Book Repair</span>
            </button>

            {/* Dark Mode Toggle */}
            <ThemeToggle />

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-in zoom-in-50">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Secondary Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 pb-3 pt-1 border-t border-gray-100 dark:border-gray-800/60 text-xs font-semibold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {link.icon && <link.icon className="w-3.5 h-3.5" />}
                <span>{link.name}</span>
                {link.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase ${
                      isActive
                        ? 'bg-blue-700 text-white'
                        : 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/track-repair"
              className="text-xs text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
            >
              <span>Track Repair Status</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer (Constrained width with backdrop, NEVER takes full width) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Dimmed backdrop - click outside to dismiss */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer container - strictly constrained width: 300px (max 85vw on small screens) */}
          <div className="relative w-[300px] max-w-[85vw] bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col z-10 border-l border-gray-200 dark:border-gray-800 animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/70 dark:bg-gray-800/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-sm text-gray-900 dark:text-white block line-clamp-1">
                    {siteConfig.name}
                  </span>
                  <span className="text-[10px] text-gray-500">Navigation Menu</span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search laptops, printers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 border border-transparent focus:border-blue-500 outline-none"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
              </form>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {link.icon && <link.icon className="w-4 h-4" />}
                        {link.name}
                      </span>
                      {link.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                            isActive
                              ? 'bg-blue-700 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Quick Action CTAs */}
              <div className="pt-2 space-y-2 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openRepairModal();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Book Repair Inspection</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openSellModal();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sell / Exchange Device</span>
                </button>
              </div>
            </div>

            {/* Drawer Footer with Helpline & WhatsApp */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-800/50 space-y-2 text-xs">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Helpline: {siteConfig.phone}</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-600 font-bold"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
                <span>WhatsApp: {siteConfig.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

