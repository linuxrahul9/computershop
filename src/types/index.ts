export type ProductCategory = 
  | 'laptops'
  | 'computers'
  | 'printers'
  | 'accessories'
  | 'second-hand';

export type ProductCondition = 
  | 'Brand New' 
  | 'Refurbished - Grade A+' 
  | 'Refurbished - Grade A' 
  | 'Pre-Owned (Tested)';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory?: string;
  brand: string;
  condition: ProductCondition;
  isSecondHand: boolean;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  image: string;
  gallery?: string[];
  shortSpecs: string[];
  fullSpecs?: Record<string, string>;
  warranty: string;
  featured?: boolean;
  description: string;
  badge?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: 'laptop' | 'computer' | 'printer' | 'chip-level' | 'amc' | 'data-recovery';
  shortDescription: string;
  fullDescription: string;
  startingPrice: number;
  turnaroundTime: string;
  icon: string;
  features: string[];
  popularIssues: string[];
  diagnosticFee: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedVariant?: string;
}

export interface RepairBookingRequest {
  id?: string;
  customerName: string;
  phone: string;
  email: string;
  deviceType: 'Laptop' | 'Desktop PC' | 'MacBook / iMac' | 'Laser Printer' | 'Ink Tank Printer' | 'Gaming Rig' | 'Other';
  brandModel: string;
  issueType: string;
  description: string;
  serviceType: 'Doorstep Pickup' | 'Store Walk-In' | 'Express 2-Hour Repair';
  preferredDate?: string;
  address?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  serviceOrProduct: string;
}

