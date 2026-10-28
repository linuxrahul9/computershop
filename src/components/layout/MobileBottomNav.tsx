'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useModals } from '@/context/ModalContext';
import { siteConfig } from '@/config/site';
import { Home, Laptop, Wrench, ShoppingBag, MessageCircle } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { openRepairModal } = useModals();

  const isHome = pathname === '/';
  const isShop = pathname.startsWith('/computers') || pathname.startsWith('/printers');
  const isServices = pathname.startsWith('/services');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 lg:hidden px-3 py-1.5 shadow-lg">
      <div className="grid grid-cols-5 items-center text-center">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center py-1 transition ${
            isHome
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </Link>

        {/* Shop */}
        <Link
          href="/computers"
          className={`flex flex-col items-center py-1 transition ${
            isShop
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <Laptop className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Shop</span>
        </Link>

        {/* Repair CTA in center */}
        <button
          onClick={() => openRepairModal()}
          className="flex flex-col items-center py-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 transition"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center -mt-3 shadow-md shadow-blue-500/30">
            <Wrench className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5 font-semibold text-blue-600 dark:text-blue-400">Repair</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center py-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 transition relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px]">Cart</span>
        </button>

        {/* Direct WhatsApp Contact */}
        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center py-1 text-emerald-600 dark:text-emerald-400 transition"
        >
          <MessageCircle className="w-5 h-5 mb-0.5 fill-current" />
          <span className="text-[10px] font-semibold">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}

