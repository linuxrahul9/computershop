import { Review } from '@/types';

export const reviews: Review[] = [
  {
    id: 'rev-01',
    author: 'Rajesh Sharma',
    rating: 5,
    date: '3 days ago',
    title: 'Saved my MacBook Pro motherboard! Fantastic service',
    comment: 'The official authorized center quoted me ₹45,000 for a full board replacement after a chai spill. Brought it here, and their chip-level engineer fixed the shorted charging capacitor in 24 hours for just ₹2,200! Laptop runs like brand new. Highest recommendation.',
    verifiedPurchase: true,
    serviceOrProduct: 'Laptop Chip-Level Repair',
  },
  {
    id: 'rev-02',
    author: 'Pooja Verma',
    rating: 5,
    date: '1 week ago',
    title: 'Great refurbished ThinkPad T14 - looks untouched',
    comment: 'Bought a second-hand Lenovo ThinkPad for my office work. The condition is pristine with zero blemishes, 94% battery health, and Windows 11 already activated. Fast delivery and nice packaging. Thank you!',
    verifiedPurchase: true,
    serviceOrProduct: 'Lenovo ThinkPad T14 Refurbished',
  },
  {
    id: 'rev-03',
    author: 'Amit Singhal',
    rating: 5,
    date: '2 weeks ago',
    title: 'Fixed our clinic HP LaserJet in 2 hours',
    comment: 'Our clinic printer had repeated paper jams right in the middle of morning patient check-in. The technician showed up with replacement pickup rollers and a fresh 88A cartridge within an hour. Smooth and courteous.',
    verifiedPurchase: true,
    serviceOrProduct: 'Printer Maintenance & Refill',
  },
  {
    id: 'rev-04',
    author: 'Kavita Sundaram',
    rating: 5,
    date: '3 weeks ago',
    title: 'Smooth WhatsApp ordering process & quick answer',
    comment: 'I messaged them on WhatsApp regarding SSD and RAM upgrades for my aging Dell desktop. They verified compatibility right away, ordered it, and cloned my old drive with all Tally data intact in less than 40 minutes.',
    verifiedPurchase: true,
    serviceOrProduct: 'SSD Upgrade & Data Migration',
  },
];
