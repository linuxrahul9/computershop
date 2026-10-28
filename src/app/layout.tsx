import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/config/site';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import { ModalProvider } from '@/context/ModalContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import CartDrawer from '@/components/modals/CartDrawer';
import RepairBookingModal from '@/components/modals/RepairBookingModal';
import SellDeviceModal from '@/components/modals/SellDeviceModal';
import QuickViewModal from '@/components/modals/QuickViewModal';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - Computers, Laptops, Printers & Repair Services`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.shortDescription,
  keywords: [
    'refurbished laptops',
    'used computers',
    'laptop repair',
    'printer repair',
    'motherboard repair',
    'computer shop',
    'toner cartridge refill',
    'buy second hand laptops',
    'desktop repair',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#090d16] text-[#0f172a] dark:text-[#f1f5f9] transition-colors duration-200">
        <ThemeProvider>
          <ToastProvider>
            <CartProvider>
              <ModalProvider>
                {/* Header Navbar */}
                <Navbar />

                {/* Main Content Area */}
                <main className="flex-1 pb-16 lg:pb-0">{children}</main>

                {/* Footer */}
                <Footer />

                {/* Mobile Sticky Bottom Nav */}
                <MobileBottomNav />

                {/* Global Modals & Drawers */}
                <CartDrawer />
                <RepairBookingModal />
                <SellDeviceModal />
                <QuickViewModal />
              </ModalProvider>
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
