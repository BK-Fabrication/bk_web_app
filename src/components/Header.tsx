import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  FileText, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronRight, 
  Search, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { COMPANY_DETAILS, MEDICAL_PRODUCTS } from '../data/products';
import { MedicalProduct } from '../types';
import { BKLogo } from './BKLogo';

interface HeaderProps {
  quoteCount: number;
  onOpenQuote: () => void;
  activeNav: string;
  onNavigate: (section: string) => void;
  compareCount: number;
  onOpenCompare: () => void;
  onSelectProduct?: (product: MedicalProduct) => void;
}

export const Header: React.FC<HeaderProps> = ({
  quoteCount,
  onOpenQuote,
  activeNav,
  onNavigate,
  compareCount,
  onOpenCompare,
  onSelectProduct,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileSearchExpanded, setMobileSearchExpanded] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close search results on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Quick keyboard shortcut (Cmd/Ctrl + K) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setMobileSearchExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter products live
  const searchResults = searchQuery.trim()
    ? MEDICAL_PRODUCTS.filter((p) => {
        const q = searchQuery.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(q) ||
          p.modelCode.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.specs.material.toLowerCase().includes(q)
        );
      }).slice(0, 5)
    : [];

  const handleProductClick = (product: MedicalProduct) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setMobileSearchExpanded(false);
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      onNavigate('catalog');
    }
  };

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

        {/* Primary Top Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3 sm:gap-6">
          {/* Zone 1: Authentic BK Logo */}
          <button
            onClick={() => onNavigate('hero')}
            className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-sm shrink-0"
            title="BK Fabrication Home"
          >
            <BKLogo variant="icon" size="md" />
          </button>

          {/* Zone 2: Modern Responsive Search Bar */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-lg hidden md:block">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search hospital beds, crash carts, SS 304, model code..."
                className="w-full pl-9 pr-14 py-2 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 border border-slate-200 focus:border-orange-500 rounded-xl outline-none transition-all shadow-2xs focus:ring-2 focus:ring-orange-500/15"
              />
              <div className="absolute right-2.5 flex items-center gap-1">
                {searchQuery ? (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-white border border-slate-200 rounded shadow-2xs">
                    ⌘K
                  </kbd>
                )}
              </div>
            </div>

            {/* Live Search Results Dropdown */}
            {isSearchOpen && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="p-2 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500 bg-slate-50">
                  <span className="font-semibold text-slate-700">Products ({searchResults.length})</span>
                  <span>Press Esc to close</span>
                </div>

                {searchResults.length > 0 ? (
                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="w-full p-3 text-left hover:bg-orange-50/70 transition-colors flex items-center justify-between gap-3 group cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-9 h-9 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors truncate">
                              {product.name}
                            </p>
                            <p className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
                              <span className="font-semibold text-orange-600">{product.modelCode}</span>
                              <span>·</span>
                              <span>{product.categoryLabel}</span>
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 shrink-0" />
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        onNavigate('catalog');
                      }}
                      className="w-full p-2.5 text-center text-xs font-semibold text-orange-600 bg-orange-50/50 hover:bg-orange-100/70 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore all matching products in Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="p-6 text-center text-slate-500">
                    <p className="text-xs font-medium text-slate-700">No hospital equipment matching "{searchQuery}"</p>
                    <p className="text-[11px] text-slate-400 mt-1">Try searching bed, cart, SS 304, or trolley</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Zone 3: Primary Actions (Mobile Search Toggle + Compare + RFQ Basket + Menu Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Search Button Toggle */}
            <button
              onClick={() => setMobileSearchExpanded(!mobileSearchExpanded)}
              className="md:hidden p-2 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors border border-slate-200 cursor-pointer"
              title="Search Products"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

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

            {/* Right Sidebar Menu Toggle Button */}
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

        {/* Mobile Search Input Drawer (Visible when expanded on mobile) */}
        {mobileSearchExpanded && (
          <div className="md:hidden px-4 pb-3 pt-1 border-t border-slate-100 bg-white">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bed, trolley, crash cart, SS 304..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-100 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600 absolute right-2"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Search Results */}
            {searchQuery.trim().length > 0 && (
              <div className="mt-2 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden max-h-64 overflow-y-auto divide-y divide-slate-100">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="w-full p-2.5 text-left flex items-center justify-between text-xs hover:bg-orange-50 transition-colors"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-semibold text-slate-800 truncate">{product.name}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{product.modelCode} · {product.categoryLabel}</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No results for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        )}
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
