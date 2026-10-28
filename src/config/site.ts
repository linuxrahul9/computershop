export interface SiteConfig {
  name: string;
  tagline: string;
  shortDescription: string;
  phone: string;
  phoneRaw: string;
  whatsappNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  workingHours: string;
  currency: string;
  currencySymbol: string;
  emergencyRepairPhone: string;
  socials: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

export const siteConfig: SiteConfig = {
  // Business name is clearly configurable
  name: "Your Business Name",
  tagline: "Computers, Laptops, Printers & Professional Repair Services",
  shortDescription: "Certified refurbished laptops, second-hand computers, laser & ink printers, genuine accessories, and chip-level motherboard repair lab with warranty.",
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  whatsappNumber: "919876543210", // 91 + 10 digits for Indian WhatsApp link
  email: "support@yourbusinessname.com",
  address: "Shop No. 14, Commercial IT Market, Main Road",
  city: "New Delhi",
  state: "Delhi",
  pincode: "110019",
  workingHours: "Mon - Sat: 10:00 AM - 8:30 PM | Sunday: 11:00 AM - 5:00 PM",
  currency: "INR",
  currencySymbol: "₹",
  emergencyRepairPhone: "+91 98765 43210",
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },
};
