'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { useToast } from '@/context/ToastContext';
import {
  Wrench,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  Phone,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';

interface MockJob {
  ticketId: string;
  customerName: string;
  device: string;
  reportedIssue: string;
  technicianNotes: string;
  status: 'Received' | 'Diagnosing' | 'Repairing' | 'Testing' | 'Ready for Pickup';
  stepIndex: number;
  estDelivery: string;
  costEstimate: number;
}

const MOCK_JOBS: Record<string, MockJob> = {
  'REP-4092': {
    ticketId: 'REP-4092',
    customerName: 'Vikram M.',
    device: 'Dell Latitude 7490 Laptop',
    reportedIssue: 'Short-circuit power IC failure, laptop not turning on',
    technicianNotes: 'Blown charging Mosfet replaced on 19V rail. Currently under 24-hour thermal run-in test.',
    status: 'Testing',
    stepIndex: 3,
    estDelivery: 'Tomorrow, by 4:00 PM',
    costEstimate: 1450,
  },
  'REP-1042': {
    ticketId: 'REP-1042',
    customerName: 'Priya S.',
    device: 'HP LaserJet Pro MFP M126a',
    reportedIssue: 'Continuous paper jam & torn heating Teflon sleeve',
    technicianNotes: 'New Teflon sleeve and rubber pickup roller assembly installed. Ready for customer pickup.',
    status: 'Ready for Pickup',
    stepIndex: 4,
    estDelivery: 'Ready Now for Store Collection',
    costEstimate: 850,
  },
};

export default function TrackRepairPage() {
  const { showToast } = useToast();
  const [ticketInput, setTicketInput] = useState('REP-4092');
  const [activeJob, setActiveJob] = useState<MockJob | null>(MOCK_JOBS['REP-4092']);
  const [searched, setSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = ticketInput.trim().toUpperCase();
    if (!clean) {
      showToast('Please enter your repair ticket number', 'error');
      return;
    }

    if (MOCK_JOBS[clean]) {
      setActiveJob(MOCK_JOBS[clean]);
      setSearched(true);
      showToast(`Found Ticket #${clean}`, 'success');
    } else {
      // Generate dynamic realistic job for any ticket number entered
      const dynamicJob: MockJob = {
        ticketId: clean,
        customerName: 'Valued Client',
        device: 'Laptop / PC / Printer Hardware',
        reportedIssue: 'Hardware diagnostic & chip-level inspection in progress',
        technicianNotes: 'Device received at service center. Senior technician assigned to microscope diagnostic station.',
        status: 'Diagnosing',
        stepIndex: 1,
        estDelivery: 'Within 24 Hours',
        costEstimate: 1200,
      };
      setActiveJob(dynamicJob);
      setSearched(true);
      showToast(`Showing live status for #${clean}`, 'info');
    }
  };

  const steps = [
    { title: 'Device Received', desc: 'Logged into ESD safe inventory' },
    { title: 'Diagnostics Audit', desc: 'Fault isolated & quote approved' },
    { title: 'Micro-Soldering', desc: 'Parts replaced & repaired' },
    { title: 'Stability Test', desc: 'Thermal stress & load testing' },
    { title: 'Ready for Delivery', desc: 'Disinfected & warranty certified' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold">
          <Wrench className="w-3.5 h-3.5" />
          <span>Real-Time Service Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
          Track Your Repair Status
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Enter your repair ticket number (e.g. <code>REP-4092</code> or <code>REP-1042</code>) to view live progress from our laboratory.
        </p>
      </div>

      {/* Ticket Lookup Form */}
      <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={ticketInput}
            onChange={(e) => setTicketInput(e.target.value)}
            placeholder="Enter Job / Ticket ID (e.g. REP-4092)"
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-mono uppercase text-sm outline-none focus:border-blue-500 shadow-xs"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition"
        >
          Track Job
        </button>
      </form>

      {/* Quick sample chips */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <span>Try sample tickets:</span>
        <button
          onClick={() => {
            setTicketInput('REP-4092');
            setActiveJob(MOCK_JOBS['REP-4092']);
          }}
          className="text-blue-600 dark:text-blue-400 font-mono font-bold hover:underline"
        >
          #REP-4092
        </button>
        <span>•</span>
        <button
          onClick={() => {
            setTicketInput('REP-1042');
            setActiveJob(MOCK_JOBS['REP-1042']);
          }}
          className="text-blue-600 dark:text-blue-400 font-mono font-bold hover:underline"
        >
          #REP-1042
        </button>
      </div>

      {/* Active Job Status Card */}
      {activeJob && (
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-10 shadow-xl space-y-8 animate-in fade-in duration-300">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {activeJob.ticketId}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md">
                  Status: {activeJob.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                {activeJob.device}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Client: {activeJob.customerName} • Reported: {activeJob.reportedIssue}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-gray-400 block">Est. Completion</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center sm:justify-end gap-1 mt-0.5">
                <Clock className="w-4 h-4 text-blue-500" /> {activeJob.estDelivery}
              </span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="relative">
            <div className="grid grid-cols-5 gap-2 text-center">
              {steps.map((st, i) => {
                const isPassed = i <= activeJob.stepIndex;
                const isCurrent = i === activeJob.stepIndex;

                return (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition shadow-sm ${
                        isCurrent
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                      }`}
                    >
                      {isPassed && !isCurrent ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span className="text-[11px] font-bold text-gray-900 dark:text-white mt-2 line-clamp-1">
                      {st.title}
                    </span>
                    <span className="text-[10px] text-gray-400 hidden sm:block mt-0.5">
                      {st.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technician Log Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-xs sm:text-sm space-y-2">
            <div className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-blue-600" />
              <span>Lab Engineer Daily Log</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              "{activeJob.technicianNotes}"
            </p>
          </div>

          {/* Contact Assistance */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-gray-500">
              Have questions regarding this job? Quote ticket <strong>{activeJob.ticketId}</strong>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hello, I am inquiring about my Repair Ticket #${activeJob.ticketId}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 transition"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Engineer</span>
              </a>

              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-semibold flex items-center gap-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Call Desk</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

