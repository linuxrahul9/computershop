'use client';

import React from 'react';
import { ServiceItem } from '@/types';
import { siteConfig } from '@/config/site';
import { useModals } from '@/context/ModalContext';
import {
  Cpu,
  Monitor,
  Printer,
  Wrench,
  ShieldAlert,
  HardDrive,
  Network,
  Clock,
  CheckCircle2,
  CalendarCheck,
  MessageCircle,
} from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { openRepairModal } = useModals();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'Monitor':
        return <Monitor className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'Printer':
        return <Printer className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-rose-600 dark:text-rose-400" />;
      case 'HardDrive':
        return <HardDrive className="w-6 h-6 text-purple-600 dark:text-purple-400" />;
      case 'Network':
        return <Network className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />;
      default:
        return <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getWhatsAppInquiryUrl = () => {
    const msg = `Hello ${siteConfig.name}, I need assistance with your service: *${service.title}*. Can you provide an estimate?`;
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 p-6 shadow-xs hover:shadow-xl transition-all duration-300">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          {getIcon(service.icon)}
        </div>
        <div className="text-right">
          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            {service.diagnosticFee}
          </span>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-end gap-1">
            <Clock className="w-3 h-3" /> {service.turnaroundTime}
          </div>
        </div>
      </div>

      {/* Title & Description */}
      <div className="flex-1">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
          {service.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
          {service.shortDescription}
        </p>

        {/* Feature Highlights */}
        <div className="space-y-2 mb-6">
          {service.features.slice(0, 3).map((feat, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] text-gray-500 uppercase tracking-wider block">Starts from</span>
          <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
            {siteConfig.currencySymbol}{service.startingPrice}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={getWhatsAppInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </a>

          <button
            onClick={() => openRepairModal(service.title)}
            className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Book Repair</span>
          </button>
        </div>
      </div>
    </div>
  );
}

