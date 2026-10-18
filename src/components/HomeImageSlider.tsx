import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  ArrowRight, 
  ShieldCheck
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DETAILS } from '../data/products';

export interface CleanSlideData {
  id: string;
  productId?: string;
  tag: string;
  tagColor: string;
  title: string;
  shortDesc: string;
  image: string;
  ctaText: string;
  tabLabel: string;
}

const SLIDES: CleanSlideData[] = [
  {
    id: 'slide-1',
    tag: 'COMPLETE HOSPITAL WARD SETUP',
    tagColor: 'text-orange-700 bg-orange-50 border-orange-200',
    title: 'Turnkey Ward & ICU Setup',
    shortDesc: 'Heavy-duty hospital beds, patient lockers, and SS 304 furniture supplied at direct factory rates.',
    image: '/assets/images/hero_medical_facility_1792303314930.jpg',
    ctaText: 'Explore Catalog',
    tabLabel: 'Hospital Ward Setup',
  },
  {
    id: 'slide-2',
    productId: 'icu-bed-pro',
    tag: 'MODEL: BK-ICU-900 · ICU BEDS',
    tagColor: 'text-blue-700 bg-blue-50 border-blue-200',
    title: 'Electric Multi-Function ICU Bed',
    shortDesc: '4 silent Linak-grade actuators, dual CPR emergency release, and 260 kg weight capacity.',
    image: '/assets/images/product_icu_bed_1792303339395.jpg',
    ctaText: 'View ICU Bed Specs',
    tabLabel: 'Motorized ICU Bed',
  },
  {
    id: 'slide-3',
    productId: 'surgical-dressing-trolley',
    tag: 'MODEL: BK-DT-304 · SURGICAL OT',
    tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    title: 'SS 304 Surgical Dressing Trolley',
    shortDesc: '100% pure non-magnetic Grade 304 stainless steel with seamless argon-welded joints.',
    image: '/assets/images/product_dressing_trolley_1792303340011.jpg',
    ctaText: 'View Trolley Specs',
    tabLabel: 'SS 304 Trolley',
  },
  {
    id: 'slide-4',
    productId: 'emergency-crash-cart',
    tag: 'MODEL: BK-CC-400 · EMERGENCY',
    tagColor: 'text-rose-700 bg-rose-50 border-rose-200',
    title: 'Emergency Medicine Crash Cart',
    shortDesc: '5 color-coded drawers, breakaway security lock, and 360° rotating defibrillator tray.',
    image: '/assets/images/product_crash_cart_1792303340280.jpg',
    ctaText: 'View Cart Specs',
    tabLabel: 'Crash Cart',
  }
];

const AUTO_PLAY_INTERVAL = 5000; // 5 seconds per slide

interface HomeImageSliderProps {
  onExploreClick: () => void;
  onOpenQuote?: () => void;
  onSelectProduct?: (productId: string) => void;
}

export const HomeImageSlider: React.FC<HomeImageSliderProps> = ({
  onExploreClick,
  onSelectProduct,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const timerRef = useRef<number | null>(null);
  const progressStartTimeRef = useRef<number>(Date.now());
  const [progressPercent, setProgressPercent] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgressPercent(0);
    progressStartTimeRef.current = Date.now();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setProgressPercent(0);
    progressStartTimeRef.current = Date.now();
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgressPercent(0);
    progressStartTimeRef.current = Date.now();
  }, []);

  // Smooth auto-play timer
  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    progressStartTimeRef.current = Date.now();
    const intervalTime = 50;

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - progressStartTimeRef.current;
      const pct = Math.min((elapsed / AUTO_PLAY_INTERVAL) * 100, 100);
      setProgressPercent(pct);

      if (elapsed >= AUTO_PLAY_INTERVAL) {
        nextSlide();
      }
    }, intervalTime);

    timerRef.current = interval;

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, isHovered, nextSlide, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Mobile touch swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const activeSlide = SLIDES[currentIndex];

  const handleCtaClick = () => {
    if (activeSlide.productId && onSelectProduct) {
      onSelectProduct(activeSlide.productId);
    } else {
      onExploreClick();
    }
  };

  return (
    <section 
      aria-label="BK Fabrication Featured Equipment Showcase"
      className="bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200 text-slate-900 relative select-none overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Showcase Hero Canvas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 sm:pt-3 lg:pt-4 pb-6 sm:pb-8 lg:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Clean, Punchy Typography & Fast CTAs */}
          <div className="lg:col-span-5 space-y-4">
            {/* Tag Badge */}
            <div>
              <span className={`inline-block text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md border shadow-2xs ${activeSlide.tagColor}`}>
                {activeSlide.tag}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {activeSlide.title}
            </h2>

            {/* Crisp 1-Line Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
              {activeSlide.shortDesc}
            </p>

            {/* Clean Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleCtaClick}
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer hover:shadow-orange-600/20 hover:scale-[1.02]"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/91${COMPANY_DETAILS.phones[0]}?text=${encodeURIComponent(
                  `Namaste BK Fabrication, I would like direct factory wholesale rate for: ${activeSlide.title}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs sm:text-sm rounded-lg border border-emerald-200 transition-colors flex items-center gap-2 shadow-2xs"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Quote</span>
              </a>
            </div>
          </div>

          {/* Right: Big, High-Impact Image Showcase */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-lg group/img">
              {/* Image Frame */}
              <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[420px] bg-slate-100 flex items-center justify-center overflow-hidden">
                <img
                  key={activeSlide.id}
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />

                {/* Minimalist Floating Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="bg-white/95 backdrop-blur-md text-[11px] font-semibold text-slate-800 px-2.5 py-1 rounded-md border border-slate-200 shadow-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                    <span>Direct Factory Supply</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Left & Right Arrow Buttons */}
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-orange-600 text-slate-700 hover:text-white border border-slate-200 hover:border-orange-600 shadow-md flex items-center justify-center transition-all cursor-pointer z-20 hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-orange-600 text-slate-700 hover:text-white border border-slate-200 hover:border-orange-600 shadow-md flex items-center justify-center transition-all cursor-pointer z-20 hover:scale-105"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Clean Pagination Dots & Subtle Progress Indicator */}
        <div className="mt-6 flex items-center justify-between gap-4">
          {/* Minimal Dot Indicators */}
          <div className="flex items-center gap-2">
            {SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${slide.tabLabel}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive 
                      ? 'w-8 h-2 bg-orange-600' 
                      : 'w-2.5 h-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              );
            })}
          </div>

          {/* Subtle Progress Bar & Play/Pause Toggle */}
          <div className="flex items-center gap-2.5">
            <div className="w-28 sm:w-40 h-1 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-600 transition-all duration-75 ease-linear"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="p-1 rounded-md bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer border border-slate-200 shadow-2xs"
              title={isPlaying ? 'Pause auto-slide' : 'Resume auto-slide'}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
