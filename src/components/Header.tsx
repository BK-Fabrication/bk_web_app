import React, { useState, useEffect } from 'react';
import { Phone, Mail, FileText, ShieldCheck, Menu, X, ChevronRight, MessageSquare, Layers } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';
import { BKLogo } from './BKLogo';

interface HeaderProps {
  quoteCount: number;
  onOpenQuote: () => void;
  activeNav: string;
  onNavigate: (section: string) => void;
  compareCount: number;
  onOpenCompare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  quoteCount,
  onOpenQuote,
  activeNav,
  onNavigate,
  compareCount,
  onOpenCompare,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMobileNav = (section: string) => {
    setMobileMenuOpen(false);
    onNavigate(section);
  };

  const handleMobileWhatsApp = () => {
    setMobileMenuOpen(false);
    const text = encodeURIComponent(
      `Hello BK Fabrication,\nI am looking for hospital furniture and medical equipment specifications and pricing for our healthcare facility.`
    );
    window.open(`https://wa.me/919591244345?text=${text}`, '_blank');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        {/* Top Clinical Contact Strip in Deep Charcoal Slate with Orange Accents */}
        <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="text-slate-400 hidden xs:inline">Direct Factory Hotline:</span>
              <a
                href={`tel:${COMPANY_DETAILS.phones[0]}`}
                className="text-white hover:text-orange-400 font-medium transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <span>+91 95912 44345</span>
              </a>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <a
                href={`tel:${COMPANY_DETAILS.phones[1]}`}
                className="text-white hover:text-orange-400 font-medium transition-colors hidden sm:flex items-center gap-1.5"
              >
                <span>+91 78922 53940</span>
              </a>
              <span className="text-slate-600 hidden md:inline">|</span>
              <a
                href={`mailto:${COMPANY_DETAILS.email}`}
                className="text-slate-300 hover:text-orange-400 transition-colors hidden md:flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <span>{COMPANY_DETAILS.email}</span>
              </a>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-slate-300">ISO 9001:2015 & CE Certified</span>
              </span>
              <span className="text-slate-600 hidden lg:inline">·</span>
              <span
                style={{ fontFamily: 'Georgia, Cambria, serif' }}
                className="text-orange-400 italic hidden lg:inline font-normal text-[13px]"
              >
                A Work of Perfect Design
              </span>
            </div>
          </div>
        </div>

        {/* Primary Top Bar: Zone 1 (Logo Only) — Zone 2 (Desktop Nav links) — Zone 3 (Actions & Menu Toggle) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Authentic BK Logo Only (No text) */}
          <button
            onClick={() => onNavigate('hero')}
            className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-sm shrink-0"
            title="BK Fabrication Home"
          >
            <BKLogo variant="icon" size="md" />
          </button>



          {/* Zone 3: Primary Actions (Compare + RFQ Basket + Right Menu Toggle Button) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {compareCount > 0 && (
              <button
                onClick={onOpenCompare}
                className="hidden sm:inline-flex px-3 py-2 text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors whitespace-nowrap cursor-pointer"
              >
                Compare ({compareCount})
              </button>
            )}

            {/* Request Quotation Button */}
            <button
              onClick={onOpenQuote}
              className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 rounded-lg shadow-sm transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer hover:shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Request Quotation</span>
              <span className="sm:hidden">RFQ</span>
              {quoteCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-orange-700 text-xs font-black flex items-center justify-center">
                  {quoteCount}
                </span>
              )}
            </button>

            {/* Right Sidebar Menu Toggle Button (Visible across viewports for quick sidebar navigation) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer border border-slate-200"
              title="Open Navigation Menu Sidebar"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5 text-slate-800" />
              <span className="text-xs font-bold text-slate-800 hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Right-Side Sliding Menu Sidebar Drawer (Mounted outside sticky header for absolute layout integrity) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu backdrop"
          />

          {/* Right-Side Sliding Panel (Scrolls fully as one unified panel without nested inner scrollers) */}
          <div
            className="relative w-84 max-w-[85vw] h-full max-h-screen bg-white shadow-2xl flex flex-col z-[101] border-l border-slate-200 animate-slide-in-right overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0 sticky top-0 z-10">
              <div className="flex items-center gap-2.5">
                <BKLogo variant="icon" size="sm" />
                <div>
                  <span className="font-extrabold text-xs text-slate-900 block leading-tight">
                    B K FABRICATION
                  </span>
                  <span
                    style={{ fontFamily: 'Georgia, Cambria, serif' }}
                    className="text-[11px] text-orange-600 italic block leading-tight"
                  >
                    A Work of Perfect Design
                  </span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Close sidebar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links - No nested scroller; scrolls with the entire sidebar */}
            <div className="p-4 space-y-1.5 text-sm font-semibold">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 pb-1">
                Navigation
              </div>

              <button
                onClick={() => handleMobileNav('hero')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  activeNav === 'hero' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-slate-700 hover:bg-slate-100 hover:text-orange-600'
                }`}
              >
                <span>Home Page</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleMobileNav('catalog')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  activeNav === 'catalog' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-slate-700 hover:bg-slate-100 hover:text-orange-600'
                }`}
              >
                <span>Product Catalog (All Products)</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleMobileNav('beds')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  activeNav === 'beds' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-slate-700 hover:bg-slate-100 hover:text-orange-600'
                }`}
              >
                <span>ICU & Hospital Beds</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleMobileNav('custom')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  activeNav === 'custom' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-slate-700 hover:bg-slate-100 hover:text-orange-600'
                }`}
              >
                <span>Custom Hospital Fabrication</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleMobileNav('quality')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  activeNav === 'quality' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-slate-700 hover:bg-slate-100 hover:text-orange-600'
                }`}
              >
                <span>Quality & Metallurgy (SS 304)</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleMobileNav('contact')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  activeNav === 'contact' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-slate-700 hover:bg-slate-100 hover:text-orange-600'
                }`}
              >
                <span>Factory Contact & Inquiries</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              {/* Compare Quick Access */}
              {compareCount > 0 && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenCompare();
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-lg bg-orange-50 text-orange-700 font-bold flex items-center justify-between cursor-pointer border border-orange-200"
                  >
                    <span>View Compared Models ({compareCount})</span>
                    <ChevronRight className="w-4 h-4 text-orange-600" />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar Footer Actions & Factory Contact Info */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 mt-auto shrink-0 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-md"
              >
                <FileText className="w-4 h-4" />
                <span>Open Quotation Basket</span>
                {quoteCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-white text-orange-700 text-xs font-black flex items-center justify-center">
                    {quoteCount}
                  </span>
                )}
              </button>

              <button
                onClick={handleMobileWhatsApp}
                className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </button>

              {/* Direct call hotlines */}
              <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">
                  Direct Factory Call:
                </span>
                <a
                  href={`tel:${COMPANY_DETAILS.phones[0]}`}
                  className="font-bold text-slate-900 hover:text-orange-600 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-600" />
                  <span>+91 95912 44345</span>
                </a>
                <a
                  href={`tel:${COMPANY_DETAILS.phones[1]}`}
                  className="font-bold text-slate-900 hover:text-orange-600 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-600" />
                  <span>+91 78922 53940</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
