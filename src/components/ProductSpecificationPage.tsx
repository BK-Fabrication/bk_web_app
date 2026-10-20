import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Printer, 
  FileText, 
  Phone, 
  ShieldCheck, 
  Check, 
  Plus, 
  Wrench, 
  Layers, 
  Droplets, 
  Scale, 
  Maximize2, 
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Download
} from 'lucide-react';
import { MedicalProduct } from '../types';
import { COMPANY_DETAILS, MEDICAL_PRODUCTS } from '../data/products';
import { BKLogo } from './BKLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SEO } from './SEO';
import { useParams, useNavigate, Link } from 'react-router-dom';

interface ProductSpecificationPageProps {
  initialProductId?: string;
  onBackToCatalog?: () => void;
  onAddToQuote: (product: MedicalProduct) => void;
  isInQuote: boolean;
  quoteIds?: Set<string>;
  onOpenQuote: () => void;
  onSelectProductForCompare?: (product: MedicalProduct) => void;
}

export const ProductSpecificationPage: React.FC<ProductSpecificationPageProps> = ({
  initialProductId,
  onBackToCatalog,
  onAddToQuote,
  isInQuote,
  quoteIds,
  onOpenQuote,
}) => {
  const { id: routeProductId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const activeId = routeProductId || initialProductId || MEDICAL_PRODUCTS[0].id;
  const currentProduct = MEDICAL_PRODUCTS.find((p) => p.id === activeId) || MEDICAL_PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  React.useEffect(() => {
    setActiveImageIndex(0);
  }, [activeId]);

  const productImages = useMemo(() => {
    return currentProduct.images && currentProduct.images.length > 0
      ? currentProduct.images
      : [currentProduct.image];
  }, [currentProduct]);

  const relatedProducts = useMemo(() => {
    const sameCategory = MEDICAL_PRODUCTS.filter(
      (p) => p.category === currentProduct.category && p.id !== currentProduct.id
    );
    const otherProducts = MEDICAL_PRODUCTS.filter(
      (p) => p.category !== currentProduct.category && p.id !== currentProduct.id
    );
    return [...sameCategory, ...otherProducts].slice(0, 4);
  }, [currentProduct]);

  const handleBack = () => {
    if (onBackToCatalog) {
      onBackToCatalog();
    } else {
      navigate('/catalog');
    }
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `*FORMAL TECHNICAL SPECIFICATION INQUIRY*\n` +
      `*To:* BK Fabrication Engineering Team\n` +
      `*Product:* ${currentProduct.name}\n` +
      `*Model Code:* ${currentProduct.modelCode}\n` +
      `*Material:* ${currentProduct.specs.material}\n` +
      `*Dimensions:* ${currentProduct.specs.dimensions}\n\n` +
      `Please provide institutional pricing, CAD drawings, and technical compliance certificate.`
    );
    window.open(`https://wa.me/919591244345?text=${text}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-4 sm:py-8">
      {/* Dynamic Product SEO Metadata & Schema.org JSON-LD */}
      <SEO
        title={`${currentProduct.name} (${currentProduct.modelCode}) | BK Fabrication`}
        description={`Technical specifications, dimensions, materials, and wholesale factory pricing for ${currentProduct.name} (${currentProduct.modelCode}). Manufactured by BK Fabrication.`}
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/products/${currentProduct.id}` : undefined}
        ogImage={currentProduct.image}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: currentProduct.name,
          image: currentProduct.image ? [currentProduct.image] : [],
          description: currentProduct.description,
          sku: currentProduct.modelCode,
          mpn: currentProduct.modelCode,
          brand: {
            '@type': 'Brand',
            name: 'BK Fabrication'
          },
          category: currentProduct.categoryLabel,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            availability: currentProduct.inStock ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
            seller: {
              '@type': 'Organization',
              name: 'BK Fabrication'
            }
          }
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 print-page">
        {/* Navigation Breadcrumb & Back Link (Hidden in print) */}
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={handleBack}
              className="hover:text-orange-600 transition-colors flex items-center gap-1 cursor-pointer font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Catalog</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <Link to={`/catalog?category=${currentProduct.category}`} className="text-slate-600 hover:text-orange-600 truncate max-w-[140px] sm:max-w-none">
              {currentProduct.categoryLabel}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="font-bold text-orange-600 font-mono">{currentProduct.modelCode}</span>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial justify-center px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-orange-600 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Print or Save as Technical PDF Datasheet"
            >
              <Printer className="w-3.5 h-3.5 text-orange-600" />
              <span className="hidden xs:inline">Print / Save as PDF</span>
              <span className="xs:hidden">PDF</span>
            </button>

            <button
              onClick={handleWhatsAppInquiry}
              className="flex-1 sm:flex-initial justify-center px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp RFQ</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Printable Official Medical Letterhead & Technical Datasheet Header */}
        {/* ========================================================================= */}
        <div className="hidden print:block mb-6 pb-4 border-b-2 border-orange-600 bg-white print-avoid-break">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3.5">
              <BKLogo variant="icon" size="md" />
              <div>
                <div className="text-2xl font-black tracking-tight text-slate-900 leading-none">
                  B K FABRICATION
                </div>
                <div
                  style={{ fontFamily: 'Georgia, Cambria, serif' }}
                  className="text-xs text-orange-600 italic font-semibold mt-0.5"
                >
                  A Work of Perfect Design
                </div>
                <div className="text-[10px] text-slate-500 font-medium tracking-wide uppercase mt-1">
                  Medical Equipment & Clinical Hospital Furniture Manufacturer
                </div>
              </div>
            </div>

            <div className="text-right text-[11px] text-slate-600 space-y-0.5">
              <div className="font-bold text-slate-900">Official Product Technical Datasheet</div>
              <div>Factory: Industrial Area, Bangalore, Karnataka, India</div>
              <div>Tel: +91 95912 44345 / +91 78922 53940 · Email: {COMPANY_DETAILS.email}</div>
              <div className="font-semibold text-orange-700">ISO 9001:2015 · ISO 13485:2016 · CE Certified</div>
            </div>
          </div>
        </div>

        {/* Main Comprehensive Datasheet (Full Width) */}
        <div className="w-full space-y-6 sm:space-y-8 print:space-y-4">
          {/* Top Product Hero Block */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 md:p-8 shadow-2xs print:border-none print:shadow-none print:p-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center print:grid-cols-12 print:gap-5">
              {/* Product Photography & Multi-Image Slider Viewport */}
              <div className="md:col-span-6 bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200 flex flex-col items-center justify-between relative min-h-[280px] sm:min-h-[340px] print:col-span-5 print:min-h-0 print:h-48 print:p-2">
                <div className="absolute top-3 left-3 z-10 print:top-1.5 print:left-1.5">
                  <span className="font-mono text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded border border-orange-200 shadow-2xs">
                    {currentProduct.modelCode}
                  </span>
                </div>

                {productImages.length > 1 && (
                  <div className="absolute top-3 right-3 z-10 bg-slate-900/70 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                    {activeImageIndex + 1} / {productImages.length}
                  </div>
                )}

                {/* Main Slide Image */}
                <div className="relative w-full h-56 sm:h-68 flex items-center justify-center p-2">
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
                    alt={`${currentProduct.name} - View ${activeImageIndex + 1}`}
                    className="max-h-52 sm:max-h-64 w-auto object-contain mx-auto transition-all duration-300 print:max-h-44"
                    referrerPolicy="no-referrer"
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

                {/* Thumbnail Strip (if multiple images) */}
                {productImages.length > 1 && (
                  <div className="w-full pt-3 mt-3 border-t border-slate-200/85 flex items-center justify-center gap-2 overflow-x-auto no-print">
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
                        <img src={img} alt={`Thumb ${idx + 1}`} className="max-h-full max-w-full object-contain" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Core Header Details */}
              <div className="md:col-span-6 space-y-4 print:col-span-7 print:space-y-2">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
                    <span>{currentProduct.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-sans font-semibold">
                      {currentProduct.inStock ? 'In-Stock' : 'Made to Order'}
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {currentProduct.name}
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {currentProduct.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {currentProduct.description}
                </p>

                {/* Highlights Strip */}
                <div className="pt-1 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 inline-flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-medium">Standard Lead Time:</span>
                    <span className="font-bold text-slate-800 font-mono text-xs sm:text-sm">{currentProduct.leadTime}</span>
                  </div>
                </div>

                {/* Primary Buy / RFQ Actions in Brand Orange (Hidden in print) */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2.5 no-print">
                  <button
                    onClick={() => onAddToQuote(currentProduct)}
                    className={`flex-1 py-3 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md ${
                      isInQuote
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white'
                    }`}
                  >
                    {isInQuote ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to RFQ Basket</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add to Quotation Basket</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={onOpenQuote}
                    className="py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:text-orange-600 bg-slate-100 hover:bg-orange-50 border border-slate-200 transition-colors cursor-pointer text-center"
                  >
                    View RFQ List
                  </button>
                </div>
              </div>
            </div>

            {/* Technical Specifications & Clinical Details (Joined with divider line) */}
            <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-slate-200 space-y-6 print:mt-4 print:pt-4 print:space-y-4">
              <div className="print-avoid-break">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2 print:mb-2">
                  <Maximize2 className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Engineering Specifications & Dimensions</span>
                </h3>

                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto print:bg-white print:border-slate-300">
                  <table className="w-full text-xs text-left min-w-[320px]">
                    <tbody className="divide-y divide-slate-200">
                      <tr className="hover:bg-slate-100/60 print:bg-slate-50">
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-semibold text-slate-500 w-2/5 sm:w-1/3 print:py-1.5 print:px-3">Model Identifier</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-mono font-bold text-orange-600 print:py-1.5 print:px-3">{currentProduct.modelCode}</td>
                      </tr>
                      <tr className="hover:bg-slate-100/60">
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-semibold text-slate-500 print:py-1.5 print:px-3">Raw Metallurgy & Material</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-semibold text-slate-800 break-words print:py-1.5 print:px-3">{currentProduct.specs.material}</td>
                      </tr>
                      <tr className="hover:bg-slate-100/60">
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-semibold text-slate-500 print:py-1.5 print:px-3">Metric Dimensions (L × W × H)</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-mono tabular-nums text-slate-900 font-bold break-words print:py-1.5 print:px-3">
                          {currentProduct.specs.dimensions}
                          {currentProduct.specs.size && (
                            <span className="block text-xs text-orange-600 font-sans font-medium mt-0.5">
                              Standard Size: {currentProduct.specs.size}
                            </span>
                          )}
                        </td>
                      </tr>
                      {currentProduct.specs.loadCapacity && (
                        <tr className="hover:bg-slate-100/60">
                          <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-semibold text-slate-500 print:py-1.5 print:px-3">Safe Working Load Capacity</td>
                          <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-mono tabular-nums text-slate-900 font-bold text-xs sm:text-sm text-orange-600 print:py-1.5 print:px-3">
                            {currentProduct.specs.loadCapacity}
                          </td>
                        </tr>
                      )}
                      <tr className="hover:bg-slate-100/60">
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-semibold text-slate-500 print:py-1.5 print:px-3">Surface Finish & Pre-Treatment</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 text-slate-800 break-words print:py-1.5 print:px-3">{currentProduct.specs.finish}</td>
                      </tr>
                      {currentProduct.specs.castors && (
                        <tr className="hover:bg-slate-100/60">
                          <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-semibold text-slate-500 print:py-1.5 print:px-3">Mobility & Castor Wheels</td>
                          <td className="py-2.5 sm:py-3 px-3 sm:px-5 text-slate-800 break-words print:py-1.5 print:px-3">{currentProduct.specs.castors}</td>
                        </tr>
                      )}
                      {currentProduct.specs.adjustments && (
                        <tr className="hover:bg-slate-100/60">
                          <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-semibold text-slate-500 print:py-1.5 print:px-3">Articulations & Positions</td>
                          <td className="py-2.5 sm:py-3 px-3 sm:px-5 text-slate-800 break-words print:py-1.5 print:px-3">{currentProduct.specs.adjustments}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Target Applications & Quality Standards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>Recommended Hospital Departments</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentProduct.applications.map((app, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>Regulatory Standards Compliance</span>
                  </h4>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    {currentProduct.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-800 font-medium">
                        <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Contact / RFQ Strip */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6 border border-slate-800 text-center md:text-left print:bg-white print:text-slate-900 print:border-t-2 print:border-orange-600 print:rounded-none print:p-4 print-avoid-break">
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-white print:text-slate-900">
                Official Manufacturer Quotation & Orders: {currentProduct.modelCode}
              </h3>
              <p className="text-xs text-slate-400 print:text-slate-600">
                BK Fabrication Bangalore Factory · Stamped proforma invoices, custom sizing, and freight delivery all over India.
              </p>
              <div className="hidden print:block text-[10px] text-slate-500 pt-1">
                Generated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · Document Ref: BKF-{currentProduct.modelCode}-SPEC
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0 no-print">
              <button
                onClick={handleWhatsAppInquiry}
                className="justify-center px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>WhatsApp RFQ</span>
              </button>
              <a
                href={`tel:${COMPANY_DETAILS.phones[0]}`}
                className="justify-center px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call: 95912 44345</span>
              </a>
            </div>
          </div>

          {/* Related Hospital Equipment Section (Screen only, hidden in PDF print) */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 no-print border-t border-slate-200 pt-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
                    Complementary Equipment & Models
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Related Hospital Equipment
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Explore matching medical equipment and furniture frequently procured together with {currentProduct.name}.
                  </p>
                </div>

                <Link
                  to={`/catalog?category=${currentProduct.category}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3.5 py-2 rounded-lg transition-colors border border-orange-200 shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  <span>View All {currentProduct.categoryLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* 4-column related products grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {relatedProducts.map((rel) => {
                  const isItemInQuote = quoteIds?.has(rel.id) || false;
                  return (
                    <div
                      key={rel.id}
                      className="group bg-white rounded-xl border border-slate-200 hover:border-orange-500 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden"
                    >
                      <Link
                        to={`/products/${rel.id}`}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="relative h-48 bg-slate-50 flex items-center justify-center p-3 border-b border-slate-100 overflow-hidden cursor-pointer"
                      >
                        <img
                          src={rel.image}
                          alt={rel.name}
                          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/90 text-orange-700 border border-slate-200 shadow-2xs">
                          {rel.modelCode}
                        </span>
                      </Link>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <Link
                            to={`/products/${rel.id}`}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1 block cursor-pointer"
                          >
                            {rel.name}
                          </Link>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {rel.subtitle}
                          </p>

                          <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-slate-400">Model:</span>
                              <span className="font-mono text-orange-600 font-bold">{rel.modelCode}</span>
                            </div>
                            {(rel.specs.size || rel.specs.dimensions) && (
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-400">Size:</span>
                                <span className="font-mono text-slate-700 font-semibold truncate max-w-[130px]" title={rel.specs.size || rel.specs.dimensions}>
                                  {rel.specs.size || rel.specs.dimensions}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="pt-1 flex items-center gap-2">
                          <Link
                            to={`/products/${rel.id}`}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="flex-1 py-1.5 px-2 text-xs font-semibold text-center text-slate-700 bg-slate-100 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors border border-transparent hover:border-orange-200 cursor-pointer"
                          >
                            Specs
                          </Link>
                          <button
                            onClick={() => onAddToQuote(rel)}
                            className={`py-1.5 px-2.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-2xs ${
                              isItemInQuote
                                ? 'bg-emerald-600 text-white'
                                : 'bg-orange-600 hover:bg-orange-700 text-white'
                            }`}
                          >
                            {isItemInQuote ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span className="text-[11px]">Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span className="text-[11px]">Quote</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
