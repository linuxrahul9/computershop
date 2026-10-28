'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/config/site';
import { useModals } from '@/context/ModalContext';
import { Calculator, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

interface EstimateRule {
  device: string;
  issue: string;
  minPrice: number;
  maxPrice: number;
  time: string;
}

const ESTIMATES: EstimateRule[] = [
  { device: 'Laptop', issue: 'Dead / No Power / Chip Issue', minPrice: 1200, maxPrice: 2800, time: '24 - 48 Hours' },
  { device: 'Laptop', issue: 'Cracked Screen / Display Flicker', minPrice: 2800, maxPrice: 5500, time: 'Same Day (2-4 Hrs)' },
  { device: 'Laptop', issue: 'Broken Hinge / Body Crack', minPrice: 800, maxPrice: 1800, time: 'Same Day' },
  { device: 'Laptop', issue: 'Slow Speed / RAM & SSD Upgrade', minPrice: 1500, maxPrice: 3800, time: '1 - 2 Hours' },
  { device: 'Laptop', issue: 'Liquid / Water / Coffee Spill', minPrice: 1499, maxPrice: 3200, time: '24 - 48 Hours' },

  { device: 'Desktop PC', issue: 'Dead / No Power / Chip Issue', minPrice: 600, maxPrice: 1800, time: 'Same Day' },
  { device: 'Desktop PC', issue: 'Blue Screen of Death / Freezing', minPrice: 500, maxPrice: 1200, time: 'Same Day' },
  { device: 'Desktop PC', issue: 'Overheating / Loud Fans / Repaste', minPrice: 400, maxPrice: 900, time: '1 - 2 Hours' },
  { device: 'Desktop PC', issue: 'Custom PC Assembly / Cleaning', minPrice: 700, maxPrice: 1800, time: 'Same Day' },

  { device: 'Printer', issue: 'Paper Jam / Pickup Roller Error', minPrice: 450, maxPrice: 950, time: 'Same Day' },
  { device: 'Printer', issue: 'Blank / Faded / Smudged Output', minPrice: 500, maxPrice: 1100, time: 'Same Day' },
  { device: 'Printer', issue: 'Toner / Ink Tank Refill & Cleaning', minPrice: 250, maxPrice: 600, time: '1 Hour' },
  { device: 'Printer', issue: 'Printhead Clogged / 5B00 Reset', minPrice: 700, maxPrice: 1800, time: '24 Hours' },

  { device: 'MacBook', issue: 'Dead / No Power / Chip Issue', minPrice: 2800, maxPrice: 6500, time: '24 - 48 Hours' },
  { device: 'MacBook', issue: 'Cracked Screen / Display Flicker', minPrice: 8500, maxPrice: 18000, time: 'Same Day' },
  { device: 'MacBook', issue: 'Liquid / Water / Coffee Spill', minPrice: 2500, maxPrice: 7000, time: '24 - 48 Hours' },
];

export default function RepairCostEstimator() {
  const { openRepairModal } = useModals();

  const [device, setDevice] = useState('Laptop');
  const [issue, setIssue] = useState('Cracked Screen / Display Flicker');

  // Filter issues available for selected device
  const availableIssues = Array.from(
    new Set(ESTIMATES.filter((e) => e.device === device).map((e) => e.issue))
  );

  const currentMatch =
    ESTIMATES.find((e) => e.device === device && e.issue === issue) || {
      minPrice: 1200,
      maxPrice: 2800,
      time: 'Same Day',
    };

  return (
    <section className="py-12 bg-gray-50/60 dark:bg-gray-900/40 border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden p-6 sm:p-10">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
              Interactive Tool
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-3">
              Instant Repair Cost & Time Estimator
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Select your device and fault to see transparent market rates before visiting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Input selectors */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                  Select Your Device
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Laptop', 'Desktop PC', 'Printer', 'MacBook'].map((d) => (
                    <button
                      key={d}
                      onClick={() => {
                        setDevice(d);
                        const firstIssue = ESTIMATES.find((e) => e.device === d)?.issue;
                        if (firstIssue) setIssue(firstIssue);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition text-center ${
                        device === d
                          ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                  Select Issue / Problem
                </label>
                <div className="space-y-2">
                  {availableIssues.map((iss) => (
                    <button
                      key={iss}
                      onClick={() => setIssue(iss)}
                      className={`w-full p-3 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition ${
                        issue === iss
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span>{iss}</span>
                      {issue === iss && <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Calculation Card */}
            <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
                  Estimated Repair Cost
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                  {siteConfig.currencySymbol}{currentMatch.minPrice} - {siteConfig.currencySymbol}{currentMatch.maxPrice}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-200 mt-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Turnaround Time: <strong>{currentMatch.time}</strong></span>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-blue-900 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Free Diagnostics Check</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>90-Day Warranty on Replaced Circuits & Parts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>No Fix = No Diagnostic Fee</span>
                </div>
              </div>

              <button
                onClick={() => openRepairModal(`${device} - ${issue}`)}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/30"
              >
                <span>Book This Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

