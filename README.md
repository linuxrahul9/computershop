# 💻 Tech & Computer Retail & Repair Platform (Next.js + Tailwind CSS)

A full-featured, mobile-friendly, and responsive Next.js website for computer, laptop, and printer retail (new & certified second-hand/refurbished), chip-level repair services, hardware upgrades, and direct online/WhatsApp ordering.

---

## 🚀 Key Highlights & Features

1. **Brand Name Customization ("Your Business Name")**:
   - Easily set or rename your store in a single central file: `src/config/site.ts`.
   - All headers, footers, meta tags, invoices, and WhatsApp message templates automatically reflect your business name, contact info, and currency.

2. **Dark Mode Toggle**:
   - Seamless dark/light mode toggle with theme persistence in `localStorage`.
   - Styled with Tailwind CSS v4 variables with smooth color transitions.

3. **Multiple Dedicated Pages**:
   - **Home (`/`)**: High-impact hero section, department shortcuts, top featured hardware deals, interactive Repair Cost & Time Estimator, customer reviews, and trade-in banner.
   - **Computers & Laptops (`/computers`)**: Filter by category (Laptops, Desktops, Gaming PCs), condition (Brand New vs Refurbished Grade A+), and brand (Dell, HP, Lenovo, Apple, ASUS).
   - **Printers & Scanners (`/printers`)**: LaserJet, InkTank, Thermal POS receipt printers, original compatible toners, and doorstep cartridge refilling.
   - **Second-Hand & Refurbished Hub (`/second-hand`)**: 40-point inspection breakdown, grading explanations (Grade A+, Grade A), warranty pledge, and "Sell/Trade-In Your Device" cash valuation tool.
   - **Repair Services (`/services`)**: Chip-level motherboard BGA rework, screen & hinge repairs, liquid damage revival, data recovery, transparent price guide, and free diagnostic booking.
   - **Hardware Accessories (`/accessories`)**: NVMe Gen4 SSD upgrades, DDR4/DDR5 RAM, mechanical keyboards, ergonomic mice, gaming monitors, and GaN laptop chargers.
   - **Shopping Cart (`/cart`)**: Interactive cart with quantity controls, coupon discount (`WELCOME10`), free shipping calculation, and instant WhatsApp ordering.
   - **Checkout & Direct Purchase (`/checkout`)**: Choose between Doorstep Delivery or Store Pickup, payment preference (WhatsApp Direct Order, Cash on Delivery, or Card/UPI simulation), and printable invoice receipt.
   - **Contact Us (`/contact`)**: Contact form, emergency repair hotline, working hours, and physical store map card.
   - **About Us (`/about`)**: Workshop lab tour, 40-point quality testing standards, and e-waste sustainability commitment.
   - **Repair Job Status Tracker (`/track-repair`)**: Live progress tracker for repair jobs (try sample tickets `#REP-4092` or `#REP-1042`).

4. **Mobile-First Experience**:
   - Sticky bottom navigation bar on smartphones (Home, Shop, Center Repair CTA, Cart with badge, and WhatsApp).
   - Touch-friendly slide-over cart drawer and responsive mobile drawer menu.

5. **Direct Purchase & Inquiry Channels**:
   - Direct WhatsApp order generator that formats products, quantities, prices, and customer notes into a ready-to-send WhatsApp message.
   - Free Diagnostic Ticket generator for walk-in or doorstep repair pickups.

---

## 🛠️ Quick Start

### 1. Install dependencies (already pre-installed)
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## ⚙️ How to Personalize for Your Business

Open `src/config/site.ts` to customize:
```typescript
export const siteConfig = {
  name: "Your Business Name", // Change to your business name
  phone: "+91 98765 43210",
  whatsappNumber: "919876543210", // Digits only with country code (91) for WhatsApp
  email: "support@yourbusinessname.com",
  address: "Shop No. 14, Commercial IT Market, Main Road",
  city: "New Delhi",
  state: "Delhi",
  pincode: "110019",
  currency: "INR",
  currencySymbol: "₹",
  workingHours: "Mon - Sat: 10:00 AM - 8:30 PM | Sun: 11:00 AM - 5:00 PM",
};
```

---

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout with theme, cart, and modal providers
│   ├── page.tsx           # Home page
│   ├── computers/         # Computers & laptops catalog
│   ├── printers/          # Printers, toners & refills
│   ├── second-hand/       # Dedicated certified pre-owned hub
│   ├── services/          # Repair services & transparent price table
│   ├── accessories/       # SSDs, RAM, peripherals & monitors
│   ├── cart/              # Cart with coupons & checkout CTAs
│   ├── checkout/          # Direct WhatsApp order / COD invoice receipt
│   ├── contact/           # Contact form & store location
│   ├── about/             # About company & lab facilities
│   └── track-repair/      # Repair ticket job status tracker
├── components/
│   ├── home/              # HeroSection, RepairCostEstimator
│   ├── layout/            # Navbar, MobileBottomNav, Footer
│   ├── modals/            # CartDrawer, RepairBookingModal, SellDeviceModal, QuickViewModal
│   └── ui/                # ProductCard, ServiceCard, ThemeToggle
├── config/
│   └── site.ts            # Central business name and contact configuration
├── context/
│   ├── CartContext.tsx    # Cart state & WhatsApp formatting
│   ├── ModalContext.tsx   # Global repair & trade-in modal triggers
│   ├── ThemeContext.tsx   # Light/Dark mode state
│   └── ToastContext.tsx   # Alert notifications
├── data/
│   ├── products.ts        # Laptops, desktops, printers, accessories catalog
│   ├── services.ts        # Repair services catalog
│   └── reviews.ts         # Customer reviews & ratings
└── types/
    └── index.ts           # TypeScript interfaces
```
