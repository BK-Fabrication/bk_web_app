import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowUp, 
  MessageSquare, 
  Truck, 
  Award, 
  Wrench, 
  CheckCircle2
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';
import { BKLogo } from './BKLogo';

interface FooterProps {
  onNavigate: (section: string) => void;
  onSelectCategory: (cat: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello BK Fabrication team,\nI am looking for hospital furniture pricing, specifications, and factory wholesale rates for our facility.`
    );
    window.open(`https://wa.me/919591244345?text=${text}`, '_blank');
  };

  return (
    <footer className="bg-slate-50 text-slate-700 border-t border-slate-200 text-xs">
      {/* 1. Pre-Footer Action & Assistance Ribbon */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Direct Manufacturer Wholesale Supply</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Need Direct Factory Rates or Complete Hospital Ward Setup?
            </h3>
            <p className="text-xs sm:text-sm text-orange-100 max-w-2xl">
              Talk directly with our fabrication engineers. Instant quotation on WhatsApp or Call with official GST bill & fast transport across India.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`tel:${COMPANY_DETAILS.phones[0]}`}
              className="px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              <span>Call: 95912 44345</span>
            </a>

            <button
              onClick={handleWhatsApp}
              className="px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Trust Pillars Strip (Light Theme) */}
      <div className="border-b border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">100% Pure SS 304</div>
                <div className="text-[11px] text-slate-500">Non-magnetic & rust-proof guarantee</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">All-India Safe Transport</div>
                <div className="text-[11px] text-slate-500">Heavy wooden & corrugated packing</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">Custom Size Fabrication</div>
                <div className="text-[11px] text-slate-500">Made as per hospital room space</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">Direct Factory Warranty</div>
                <div className="text-[11px] text-slate-500">24 months comprehensive guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Footer Links & Company Details Grid (Light Theme) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Brand Info & Manufacturing Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => onNavigate('hero')}
              className="text-left cursor-pointer focus:outline-none"
              title="BK Fabrication - Go to Top"
            >
              <BKLogo variant="full" size="md" lightText={false} />
            </button>

            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              <strong className="text-slate-900 font-semibold">BK Fabrication</strong> is a premier manufacturer and supplier of heavy-duty hospital beds, ICU motorized units, stainless steel dressing trolleys, emergency crash carts, and patient ward furniture.
            </p>

            {/* Credential Tags */}
            <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
              <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
                Direct Manufacturer
              </span>
              <span className="px-2.5 py-1 rounded bg-orange-50 border border-orange-200 text-orange-700 font-semibold shadow-2xs">
                Bangalore Factory
              </span>
              <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
                GST Registered
              </span>
            </div>

            {/* Quick Live Contact Box */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2 mt-4 max-w-sm shadow-2xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-600 font-medium">Factory Sales Desk:</span>
                <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available Now
                </span>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={`tel:${COMPANY_DETAILS.phones[0]}`}
                  className="font-bold text-slate-900 hover:text-orange-600 transition-colors flex items-center gap-1.5 text-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-600" />
                  <span>+91 95912 44345</span>
                </a>
                <span className="text-slate-300">|</span>
                <button
                  onClick={handleWhatsApp}
                  className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 text-xs cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Hospital Furniture Models (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="border-b border-slate-200 pb-2">
              <h4 className="text-slate-900 font-bold uppercase tracking-wider text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                <span>Hospital Furniture</span>
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('beds');
                    onNavigate('catalog');
                  }}
                  className="hover:text-orange-600 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-slate-400">›</span>
                  <span>Electric Motorized ICU Beds</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('beds');
                    onNavigate('catalog');
                  }}
                  className="hover:text-orange-600 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-slate-400">›</span>
                  <span>Fowler & Semi-Fowler Ward Beds</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('trolleys');
                    onNavigate('catalog');
                  }}
                  className="hover:text-orange-600 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-slate-400">›</span>
                  <span>Emergency Crash Cart Trolleys</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('trolleys');
                    onNavigate('catalog');
                  }}
                  className="hover:text-orange-600 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-slate-400">›</span>
                  <span>SS 304 Surgical Dressing Trolleys</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('examination');
                    onNavigate('catalog');
                  }}
                  className="hover:text-orange-600 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-slate-400">›</span>
                  <span>Patient Examination Couches</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('ward');
                    onNavigate('catalog');
                  }}
                  className="hover:text-orange-600 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-slate-400">›</span>
                  <span>Hospital Bedside Lockers & Tables</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('ward');
                    onNavigate('catalog');
                  }}
                  className="hover:text-orange-600 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-slate-400">›</span>
                  <span>Patient Transfer Stretcher Trolleys</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Factory Services & Metallurgy (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="border-b border-slate-200 pb-2">
              <h4 className="text-slate-900 font-bold uppercase tracking-wider text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                <span>Factory Services</span>
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('custom')}
                  className="hover:text-orange-600 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-slate-400">›</span>
                  <span>Custom Size Fabrication</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quality')}
                  className="hover:text-orange-600 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-slate-400">›</span>
                  <span>Quality & SS 304 Metallurgy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quality')}
                  className="hover:text-orange-600 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-slate-400">›</span>
                  <span>7-Tank Chemical Rust Process</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-orange-600 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-slate-400">›</span>
                  <span>Hospital Tender Quotations</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-orange-600 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-slate-400">›</span>
                  <span>Direct Factory Inspection</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-orange-600 transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-slate-400">›</span>
                  <span>Complete Product Catalog</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Factory Contacts & Workshop Location (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="border-b border-slate-200 pb-2">
              <h4 className="text-slate-900 font-bold uppercase tracking-wider text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                <span>Factory Location & Hours</span>
              </h4>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-900 font-semibold">Manufacturing Workshop:</div>
                  <div>Industrial Area, Bangalore, Karnataka, India</div>
                  <div className="text-[11px] text-slate-500">Fast transport dispatches all over India</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-900 font-semibold">Factory Calling Numbers:</div>
                  <div className="text-slate-800 font-medium">+91 95912 44345</div>
                  <div className="text-slate-800 font-medium">+91 78922 53940</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-900 font-semibold">Official Quotation Email:</div>
                  <a
                    href={`mailto:${COMPANY_DETAILS.email}`}
                    className="text-orange-600 hover:underline font-medium break-all"
                  >
                    {COMPANY_DETAILS.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-900 font-semibold">Workshop Timings:</div>
                  <div>Mon – Sat: 9:00 AM – 7:30 PM</div>
                  <div className="text-orange-700 text-[11px] font-medium">Sunday available on urgent hospital calls</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Certifications Bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-slate-600 text-[11px]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              Certified Standards:
            </span>
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>ISO 9001:2015 Quality Management</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>ISO 13485:2016 Compliant</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>CE Certified Equipment</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Authentic Non-Magnetic SS 304</span>
            </span>
          </div>

          {/* Smooth Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors flex items-center gap-1.5 font-semibold text-xs cursor-pointer shadow-2xs"
            title="Scroll to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-orange-600" />
          </button>
        </div>
      </div>

      {/* 5. Bottom Copyright & Indian Manufacturing Pride Bar (Light Theme) */}
      <div className="border-t border-slate-200 bg-white py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} {COMPANY_DETAILS.legalName}. All Rights Reserved.
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <span className="text-orange-600 font-semibold">Direct Manufacturer Pricing</span>
            <span>·</span>
            <span>All Types of Hospital Furniture</span>
            <span>·</span>
            <span className="text-slate-700 font-medium">Made in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
