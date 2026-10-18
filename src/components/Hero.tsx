import React from 'react';
import { ArrowRight, CheckCircle2, PhoneCall } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';
import { BKLogo } from './BKLogo';

interface HeroProps {
  onExploreClick: () => void;
  onCustomClick: () => void;
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onCustomClick,
  onOpenQuote,
}) => {
  return (
    <section className="relative bg-gradient-to-b from-orange-50/60 via-white to-slate-50 border-b border-slate-200 overflow-hidden">
      {/* Background Subtle Industrial & Clinical Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Decorative Warm Ambient Glow */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Clear Indian English Business Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Subtle editorial kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-widest">
              <span>Direct Factory Manufacturer · Bangalore · Supply All Over India</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="text-slate-700 font-semibold">All Types of Hospital Furniture</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18] text-balance">
              Heavy-Duty Hospital Furniture & ICU Beds at Direct Factory Wholesale Rates.
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
              Welcome to <strong className="text-slate-900">BK Fabrication</strong>. We are a premier manufacturer 
              of high-quality hospital furniture based in Bangalore, Karnataka. We supply Electric ICU Beds, 
              Semi-Fowler Beds, Emergency Crash Carts, SS 304 Surgical Dressing Trolleys, Patient Lockers, and 
              Examination Tables directly to Hospitals, Nursing Homes, and Clinics across India at genuine wholesale rates — 
              with 100% pure raw materials and zero middleman commission.
            </p>

            {/* Value checklist in simple, direct Indian business English */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-800 font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                <span>100% Pure Non-Magnetic SS 304 Stainless Steel (Rust-Free)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Thick CRCA Steel with 7-Tank Chemical Rust Treatment</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Custom Size, Height & Color Made as per Doctor's Need</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Direct Factory Wholesale Price — No Middlemen / Broker</span>
              </div>
            </div>

            {/* Action Buttons in Brand Orange & Slate */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View Full Product Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onCustomClick}
                className="px-6 py-3.5 text-sm font-semibold text-slate-800 hover:text-orange-600 bg-white border border-slate-300 hover:border-orange-400 rounded-lg transition-all shadow-2xs cursor-pointer"
              >
                Custom Hospital Furniture
              </button>

              <a
                href={`tel:${COMPANY_DETAILS.phones[0]}`}
                className="px-4 py-3.5 text-sm font-bold text-orange-700 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors flex items-center gap-2 border border-orange-200"
              >
                <PhoneCall className="w-4 h-4 text-orange-600" />
                <span>Call Factory: 95912 44345</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Showcase Frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-orange-500/30 bg-white shadow-xl group">
              <img
                src="/src/assets/images/hero_medical_facility_1792303314930.jpg"
                alt="State-of-the-art hospital room with BK Fabrication clinical beds and ward furniture"
                className="w-full h-80 sm:h-96 object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />

              {/* Floating Brand Badge */}
              <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur-md p-2 rounded-lg border border-orange-500/40">
                <BKLogo variant="icon" size="sm" />
              </div>

              <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <div className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <span>Direct Factory Supply & Fitting</span>
                </div>
                <div className="text-base font-bold leading-tight mb-1">
                  Complete Hospital Ward, ICU & OT Furniture Setup
                </div>
                <div className="text-xs text-slate-300">
                  Supplying to Govt Hospitals, Private Nursing Homes & Medical Colleges
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Proof metrics strip in Indian terms */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200/80">
          <div className="bg-white/90 backdrop-blur-xs p-4 rounded-xl border border-slate-200/70 shadow-2xs hover:border-orange-300 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-orange-600 font-mono tabular-nums tracking-tight">
              750+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
              Hospitals & Nursing Homes Supplied
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-4 rounded-xl border border-slate-200/70 shadow-2xs hover:border-orange-300 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-orange-600 font-mono tabular-nums tracking-tight">
              45+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
              Hospital Furniture Models in Ready Stock
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-4 rounded-xl border border-slate-200/70 shadow-2xs hover:border-orange-300 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-orange-600 font-mono tabular-nums tracking-tight">
              100%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
              Pure Non-Magnetic SS 304 Guarantee
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-4 rounded-xl border border-slate-200/70 shadow-2xs hover:border-orange-300 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-orange-600 font-mono tabular-nums tracking-tight">
              3 to 5 Days
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
              Quick Transport Dispatch All Over India
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
