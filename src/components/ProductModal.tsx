import React, { useEffect, useState, useMemo } from 'react';
import { X, Check, Plus, ShieldCheck, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { MedicalProduct } from '../types';
import { COMPANY_DETAILS } from '../data/products';

interface ProductModalProps {
  product: MedicalProduct | null;
  onClose: () => void;
  onAddToQuote: (product: MedicalProduct) => void;
  isInQuote: boolean;
  onToggleCompare: (product: MedicalProduct) => void;
  isCompared: boolean;
  onViewSpecsPage?: (product: MedicalProduct) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToQuote,
  isInQuote,
  onToggleCompare,
  isCompared,
  onViewSpecsPage,
}) => {
  // Lock background scroll when modal is open
  useEffect(() => {
    if (product) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [product]);

  // Close on Escape key press
  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    setFailedImages(new Set());
    setActiveImageIndex(0);
  }, [product?.id]);

  const productImages = useMemo(() => {
    if (!product) return [];
    const code = product.modelCode.toLowerCase();
    const folderWithUnderscore = code.replace(/^([a-z]+)(\d+)/, '$1_$2');

    const folders = Array.from(new Set([
      folderWithUnderscore,
      code
    ]));

    const dynamicCandidates: string[] = [];
    for (const folder of folders) {
      for (let i = 1; i <= 6; i++) {
        dynamicCandidates.push(`/assets/images/${folder}/${i}.png`);
        dynamicCandidates.push(`/assets/images/${folder}/${i}.jpg`);
      }
    }

    const uniqueCandidates = Array.from(new Set(dynamicCandidates.filter(Boolean)));
    const filtered = uniqueCandidates.filter((img) => !failedImages.has(img));
    return filtered.length > 0 ? filtered : [`/assets/images/bk_logo.png`];
  }, [product, failedImages]);

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello BK Fabrication, I am interested in getting a price quotation and delivery lead time for:\n\n*Product:* ${product.name}\n*Model Code:* ${product.modelCode}\n*Category:* ${product.categoryLabel}\n\nPlease share institutional/hospital pricing and bulk supply details.`
    );
    window.open(`https://wa.me/919591244345?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded border border-orange-200">
              {product.modelCode}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {product.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(product)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-orange-600 text-white'
                  : 'text-slate-700 hover:text-orange-600 bg-slate-100 hover:bg-orange-50'
              }`}
            >
              {isCompared ? 'Added to Compare' : 'Compare Model'}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Top Split: Image & Primary Buy/Quote Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* High-res Image Showcase with Multi-Image Slider */}
            <div className="md:col-span-6 bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col items-center justify-between relative min-h-[300px]">
              {productImages.length > 1 && (
                <div className="absolute top-3 right-3 z-10 bg-slate-900/70 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  {activeImageIndex + 1} / {productImages.length}
                </div>
              )}

              <div className="relative w-full h-64 flex items-center justify-center p-2">
                {productImages.length > 1 && (
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))}
                    className="absolute left-1 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md border border-slate-200 transition-colors cursor-pointer"
                    title="Previous Image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}

                <img
                  src={productImages[activeImageIndex]}
                  alt={`${product.name} - View ${activeImageIndex + 1}`}
                  className="max-h-full max-w-full w-auto h-auto object-contain mx-auto transition-all duration-300"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    const currentImg = productImages[activeImageIndex];
                    if (currentImg) {
                      setFailedImages((prev) => new Set(prev).add(currentImg));
                      setActiveImageIndex(0);
                    }
                  }}
                />

                {productImages.length > 1 && (
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-1 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md border border-slate-200 transition-colors cursor-pointer"
                    title="Next Image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {productImages.length > 1 && (
                <div className="w-full pt-3 mt-3 border-t border-slate-200 flex items-center justify-center gap-2 overflow-x-auto">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-12 h-12 rounded-lg bg-white border-2 overflow-hidden flex items-center justify-center p-1 transition-all cursor-pointer shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-orange-600 shadow-md scale-105 ring-2 ring-orange-600/20'
                          : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300'
                      }`}
                      title={`Switch to image ${idx + 1}`}
                    >
                      <img
                        src={img}
                        alt={`Thumb ${idx + 1}`}
                        className="w-full h-full object-contain"
                        onError={() => {
                          setFailedImages((prev) => new Set(prev).add(img));
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Purchase/Quote Module */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {product.subtitle}
                </p>
              </div>

              {/* Manufacturing Assurance Badges (Unboxed text) */}
              <div className="py-2.5 border-y border-slate-100 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                <span className="flex items-center gap-1.5 text-orange-700 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span>{product.specs.warranty}</span>
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-emerald-700 font-medium">
                  Dispatch: {product.leadTime}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-slate-600">Direct Factory Supply</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* CTAs */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => onAddToQuote(product)}
                  className={`w-full py-3 px-4 text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isInQuote
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white'
                  }`}
                >
                  {isInQuote ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Item Added to RFQ List (View Basket)</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Quotation Request Basket</span>
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleWhatsAppInquiry}
                    className="py-2.5 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp RFQ</span>
                  </button>

                  <a
                    href={`tel:${COMPANY_DETAILS.phones[0]}`}
                    className="py-2.5 px-3 text-xs font-semibold text-slate-800 bg-orange-50/80 hover:bg-orange-100 border border-orange-200/60 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-4 h-4 text-orange-600" />
                    <span>Call Factory</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-orange-600">
              Technical Specifications & Engineering Data
            </h3>
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-xs text-left">
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-100/60">
                    <td className="py-2.5 px-4 font-medium text-slate-500 w-1/3">Raw Material / Metallurgy</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">{product.specs.material}</td>
                  </tr>
                  <tr className="hover:bg-slate-100/60">
                    <td className="py-2.5 px-4 font-medium text-slate-500">Metric Dimensions (L × W × H)</td>
                    <td className="py-2.5 px-4 font-mono tabular-nums text-slate-800">{product.specs.dimensions}</td>
                  </tr>
                  {product.specs.loadCapacity && (
                    <tr className="hover:bg-slate-100/60">
                      <td className="py-2.5 px-4 font-medium text-slate-500">Safe Working Load Capacity</td>
                      <td className="py-2.5 px-4 font-mono tabular-nums text-slate-800 font-semibold">{product.specs.loadCapacity}</td>
                    </tr>
                  )}
                  <tr className="hover:bg-slate-100/60">
                    <td className="py-2.5 px-4 font-medium text-slate-500">Surface Finish & Pre-Treatment</td>
                    <td className="py-2.5 px-4 text-slate-800">{product.specs.finish}</td>
                  </tr>
                  {product.specs.castors && (
                    <tr className="hover:bg-slate-100/60">
                      <td className="py-2.5 px-4 font-medium text-slate-500">Castor Wheels & Mobility</td>
                      <td className="py-2.5 px-4 text-slate-800">{product.specs.castors}</td>
                    </tr>
                  )}
                  {product.specs.adjustments && (
                    <tr className="hover:bg-slate-100/60">
                      <td className="py-2.5 px-4 font-medium text-slate-500">Mechanical / Electric Articulations</td>
                      <td className="py-2.5 px-4 text-slate-800">{product.specs.adjustments}</td>
                    </tr>
                  )}
                  <tr className="hover:bg-slate-100/60">
                    <td className="py-2.5 px-4 font-medium text-slate-500">Manufacturing Warranty</td>
                    <td className="py-2.5 px-4 text-slate-800 font-bold text-orange-600">{product.specs.warranty}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Features & Hospital Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-700 mb-3">
                Key Clinical Design Features
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {product.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-700 mb-3">
                Target Hospital Applications
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((app, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-md border border-slate-200"
                  >
                    {app}
                  </span>
                ))}
              </div>

              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-700 mt-5 mb-2">
                Compliance Standards
              </h4>
              <div className="space-y-1 text-xs text-slate-600">
                {product.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-slate-800 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span>Factory Inquiry Code: <strong className="text-orange-600 font-mono">{product.modelCode}</strong></span>
          <div className="flex items-center gap-2">
            {onViewSpecsPage && (
              <button
                onClick={() => {
                  onClose();
                  onViewSpecsPage(product);
                }}
                className="px-3.5 py-2 bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 font-bold rounded-lg transition-colors cursor-pointer"
              >
                Open Full Specification Page →
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg font-medium text-slate-700 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
