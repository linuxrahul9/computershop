'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/config/site';
import { useToast } from '@/context/ToastContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ShieldCheck,
  Wrench,
  Laptop,
} from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Hardware Purchase Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent successfully!', 'success');
  };

  const getWhatsAppDirectUrl = () => {
    let msg = `*DIRECT INQUIRY - ${siteConfig.name}*\n`;
    msg += `------------------------------------\n`;
    msg += `*Name:* ${name || 'Prospective Customer'}\n`;
    msg += `*Phone:* ${phone || 'N/A'}\n`;
    msg += `*Subject:* ${subject}\n`;
    msg += `*Message:* ${message || 'Hello, I have an inquiry about your services/products.'}\n`;
    msg += `------------------------------------\n`;

    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          We Are Here To Help
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white">
          Contact Our Hardware Team
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          Need a quick repair quote, looking to buy a bulk lot of refurbished laptops, or having printer issues? Reach out directly via WhatsApp, phone, or visit our store.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
              Store & Service Center
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Store Address</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    {siteConfig.address}, {siteConfig.city}, {siteConfig.state} - {siteConfig.pincode}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Call Helpline</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-blue-600 font-semibold">
                      {siteConfig.phone}
                    </a>
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Emergency Repair: {siteConfig.emergencyRepairPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Email Inquiries</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    {siteConfig.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Operating Hours</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">
                    {siteConfig.workingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp Instantly</span>
              </a>
            </div>
          </div>

          {/* Guarantee Pill */}
          <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-300 space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Free Diagnostics Policy</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Bring any computer, laptop, or printer to our physical shop. We inspect it in front of you and provide a written estimate at zero cost.
            </p>
          </div>
        </div>

        {/* Contact & Inquiry Form */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-900 p-6 sm:p-10 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Message Delivered!</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Thank you for reaching out, {name}. Our technical desk will contact you within 30 minutes during working hours.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <a
                  href={getWhatsAppDirectUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 transition"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Forward to WhatsApp</span>
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-semibold"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Fill in your details below and our hardware consultant will get in touch.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contact Number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm outline-none focus:border-blue-500"
                  >
                    <option value="Hardware Purchase Inquiry">Buying Laptop / PC / Printer</option>
                    <option value="Device Repair & Diagnostics">Device Repair & Diagnostics</option>
                    <option value="Sell or Exchange Used Device">Sell or Exchange Used Device</option>
                    <option value="Toner Refill & Printer AMC">Toner Refill & Printer AMC</option>
                    <option value="Corporate IT AMC Support">Corporate IT AMC Support</option>
                    <option value="Other Question">Other Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  Message / Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the device, specs you need, or issues you're experiencing..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm outline-none resize-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message Online</span>
                </button>

                <a
                  href={getWhatsAppDirectUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Message</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

