'use client';

import React, { useState, useEffect } from 'react';
import { useModals } from '@/context/ModalContext';
import { useToast } from '@/context/ToastContext';
import { siteConfig } from '@/config/site';
import { X, Wrench, ShieldCheck, CheckCircle2, MessageCircle, Phone, Calendar, MapPin } from 'lucide-react';

export default function RepairBookingModal() {
  const { isRepairModalOpen, closeRepairModal, repairInitialDevice } = useModals();
  const { showToast } = useToast();

  const [deviceType, setDeviceType] = useState('Laptop');
  const [brandModel, setBrandModel] = useState('');
  const [issueType, setIssueType] = useState('Power / Motherboard Issue');
  const [description, setDescription] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<'Store Walk-In' | 'Doorstep Pickup'>('Store Walk-In');
  const [address, setAddress] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState('');

  useEffect(() => {
    if (repairInitialDevice) {
      if (repairInitialDevice.toLowerCase().includes('printer')) setDeviceType('Laser / Ink Printer');
      else if (repairInitialDevice.toLowerCase().includes('laptop')) setDeviceType('Laptop');
      else if (repairInitialDevice.toLowerCase().includes('desktop') || repairInitialDevice.toLowerCase().includes('pc')) setDeviceType('Desktop PC');
      else if (repairInitialDevice.toLowerCase().includes('mac')) setDeviceType('MacBook / iMac');
    }
  }, [repairInitialDevice]);

  if (!isRepairModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) {
      showToast('Please provide your name and contact phone number', 'error');
      return;
    }

    const ticketId = `REP-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedTicket(ticketId);
    setIsSubmitted(true);
    showToast(`Repair Ticket #${ticketId} created successfully!`, 'success');
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setGeneratedTicket('');
    closeRepairModal();
  };

  const getWhatsAppBookingUrl = () => {
    let msg = `*NEW REPAIR BOOKING - ${siteConfig.name}*\n`;
    msg += `Ticket: *${generatedTicket || 'INQUIRY'}*\n`;
    msg += `------------------------------------\n`;
    msg += `*Name:* ${customerName}\n`;
    msg += `*Phone:* ${phone}\n`;
    msg += `*Device:* ${deviceType} (${brandModel || 'Not specified'})\n`;
    msg += `*Fault / Issue:* ${issueType}\n`;
    if (description) msg += `*Notes:* ${description}\n`;
    msg += `*Service Mode:* ${serviceType}\n`;
    if (serviceType === 'Doorstep Pickup' && address) msg += `*Pickup Address:* ${address}\n`;
    msg += `------------------------------------\n`;
    msg += `Please confirm appointment slot and free diagnostic inspection schedule.`;

    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={resetForm}
      />

      <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden z-10 border border-gray-200 dark:border-gray-800 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-blue-100" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Book Device Repair & Diagnostics</h3>
              <p className="text-xs text-blue-100 flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Free Diagnostics • 90-Day Warranty On Parts
              </p>
            </div>
          </div>
          <button
            onClick={resetForm}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Booking Confirmed!</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Your repair request has been logged. Our service engineer will call you shortly.
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Service Ticket ID:</span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{generatedTicket}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Device:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{deviceType} - {brandModel || 'Standard'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Issue:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{issueType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Mode:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{serviceType}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={getWhatsAppBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send Ticket via WhatsApp</span>
                </a>
                <button
                  onClick={resetForm}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                    Device Type *
                  </label>
                  <select
                    value={deviceType}
                    onChange={(e) => setDeviceType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Laptop">Laptop (Dell, HP, Lenovo, ASUS, etc.)</option>
                    <option value="Desktop PC">Desktop Computer / Workstation</option>
                    <option value="Laser / Ink Printer">Printer (Laser / Ink Tank / Thermal)</option>
                    <option value="MacBook / iMac">Apple MacBook / iMac</option>
                    <option value="Gaming Rig">Custom Gaming PC</option>
                    <option value="Other">Other Electronic Device</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                    Brand & Model
                  </label>
                  <input
                    type="text"
                    value={brandModel}
                    onChange={(e) => setBrandModel(e.target.value)}
                    placeholder="e.g. Dell Inspiron 15 / HP 1020"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  Main Problem / Fault *
                </label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Power / Motherboard Issue">Dead / Not Turning On / Power IC Fault</option>
                  <option value="Cracked Screen / Broken Hinge">Broken Screen / Damaged Hinges</option>
                  <option value="Liquid Spill / Water Damage">Spilled Liquid / Coffee / Tea</option>
                  <option value="Overheating & Loud Fan">Overheating, Fan Noise & Thermal Shutdown</option>
                  <option value="Slow Performance / SSD Upgrade">Slow Speed / Need SSD & RAM Upgrade</option>
                  <option value="Printer Jam / Blank Prints / Refill">Printer Paper Jam / Faded Print / Toner Refill</option>
                  <option value="Data Recovery / Dead Disk">Lost Files / Dead Hard Drive Recovery</option>
                  <option value="Other Issue">Other Specific Issue</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  Additional Details (Optional)
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what happened or any error messages..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              {/* Service Delivery Option */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  Service Delivery Option
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setServiceType('Store Walk-In')}
                    className={`p-3 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition ${
                      serviceType === 'Store Walk-In'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Store Drop-In</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('Doorstep Pickup')}
                    className={`p-3 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition ${
                      serviceType === 'Doorstep Pickup'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Doorstep Pickup</span>
                  </button>
                </div>
              </div>

              {serviceType === 'Doorstep Pickup' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                    Pickup Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter full flat / office address & landmark"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              )}

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +1 555-0199"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition flex items-center justify-center gap-2"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Generate Free Diagnostic Ticket</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

