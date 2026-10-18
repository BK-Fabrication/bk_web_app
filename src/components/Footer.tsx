import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowUp, 
  MessageSquare,
  Award
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
      `Hello BK Fabrication team,\nI am looking for hospital furniture pricing, specifications, and factory wholesale rates.`
    );
    window.open(`https://wa.me/919591244345?text=${text}`, '_blank');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs">
      {/* 1. Sleek Compact Call-to-Action Bar */}
      <div className="border-b border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Direct Factory Manufacturer Rates</p>
              <p className="text-slate-400 text-xs">Hospital ward setups, custom sizes & ready stock delivery across India</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`tel:${COMPANY_DETAILS.phones[0]}`}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span>+91 95912 44345</span>
            </a>
            <button
              onClick={handleWhatsApp}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Streamlined Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {/* Brand Info & Identity */}
          <div className="lg:col-span-5 space-y-3.5">
            <button
              onClick={() => onNavigate('hero')}
              className="text-left cursor-pointer focus:outline-none"
              title="BK Fabrication - Go to Home"
            >
              <BKLogo variant="full" size="md" lightText={true} />
            </button>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Manufacturer of hospital beds, stainless steel dressing trolleys, emergency crash carts, and medical ward furniture built with SS 304 and heavy gauge steel.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                ISO 9001:2015 & CE Certified
              </span>
              <span>·</span>
              <span>Bangalore Factory</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Categories & Models
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('beds');
                    onNavigate('catalog');
                  }}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  ICU & Hospital Beds
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('trolleys');
                    onNavigate('catalog');
                  }}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  Emergency Crash Carts & Trolleys
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('examination');
                    onNavigate('catalog');
                  }}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  Examination & OT Equipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('ward');
                    onNavigate('catalog');
                  }}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  Ward Care & Bedside Lockers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('custom')}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  Custom Size Fabrication
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Factory Contact & Hours */}
          <div className="lg:col-span-4 space-y-2.5">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Factory Location & Contacts
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <span>Industrial Area, Bangalore, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.phones[0]}`} className="hover:text-orange-400 transition-colors">
                  +91 95912 44345 / +91 78922 53940
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-orange-400 transition-colors">
                  {COMPANY_DETAILS.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>Mon – Sat: 9:00 AM – 7:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Copyright & Back to Top */}
      <div className="border-t border-slate-800 bg-slate-950/70 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} {COMPANY_DETAILS.legalName}. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Made in India 🇮🇳</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="hover:text-orange-400 transition-colors flex items-center gap-1 cursor-pointer font-medium"
              title="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 text-orange-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

