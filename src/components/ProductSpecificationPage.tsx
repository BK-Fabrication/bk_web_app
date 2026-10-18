import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Printer, 
  FileText, 
  MessageSquare, 
  Phone, 
  ShieldCheck, 
  Check, 
  Plus, 
  Wrench, 
  Layers, 
  Activity, 
  Droplets, 
  Scale, 
  Maximize2, 
  ChevronRight,
  CheckCircle2,
  Download
} from 'lucide-react';
import { MedicalProduct } from '../types';
import { COMPANY_DETAILS, MEDICAL_PRODUCTS } from '../data/products';
import { BKLogo } from './BKLogo';

interface ProductSpecificationPageProps {
  initialProductId?: string;
  onBackToCatalog: () => void;
  onAddToQuote: (product: MedicalProduct) => void;
  isInQuote: boolean;
  onOpenQuote: () => void;
  onSelectProductForCompare?: (product: MedicalProduct) => void;
}

export const ProductSpecificationPage: React.FC<ProductSpecificationPageProps> = ({
  initialProductId,
  onBackToCatalog,
  onAddToQuote,
  isInQuote,
  onOpenQuote,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProductId || MEDICAL_PRODUCTS[0].id
  );
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'accessories' | 'standards'>('specs');

  React.useEffect(() => {
    if (initialProductId) {
      setSelectedProductId(initialProductId);
    }
  }, [initialProductId]);

  const currentProduct = MEDICAL_PRODUCTS.find((p) => p.id === selectedProductId) || MEDICAL_PRODUCTS[0];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb & Back Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={onBackToCatalog}
              className="hover:text-orange-600 transition-colors flex items-center gap-1 cursor-pointer font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Catalog</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-600 truncate max-w-[140px] sm:max-w-none">{currentProduct.categoryLabel}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="font-bold text-orange-600 font-mono">{currentProduct.modelCode}</span>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial justify-center px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Print or Save as Technical PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden xs:inline">Print Spec Sheet</span>
              <span className="xs:hidden">Print</span>
            </button>

            <button
              onClick={handleWhatsAppInquiry}
              className="flex-1 sm:flex-initial justify-center px-3 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp RFQ</span>
            </button>
          </div>
        </div>

        {/* Printable Letterhead (visible when printing) */}
        <div className="hidden print:block mb-6 p-4 border-b-2 border-orange-600 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-slate-900">B K FABRICATION</h1>
              <p className="text-xs text-orange-600 italic">A Work of Perfect Design</p>
              <p className="text-xs text-slate-600 mt-1">Medical Equipment & Hospital Furniture Manufacturing Co.</p>
            </div>
            <div className="text-right text-xs text-slate-700">
              <p>Hotline: +91 95912 44345 / +91 78922 53940</p>
              <p>Email: {COMPANY_DETAILS.email}</p>
              <p>ISO 9001:2015 & CE Certified</p>
            </div>
          </div>
        </div>

        {/* Main Comprehensive Datasheet (Full Width) */}
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {/* Top Product Hero Block */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 md:p-8 shadow-2xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
              {/* Product Photography Viewport */}
              <div className="md:col-span-6 bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200 flex items-center justify-center relative min-h-[240px] sm:min-h-[320px]">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="max-h-56 sm:max-h-72 w-auto object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3">
                  <span className="font-mono text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded border border-orange-200">
                    {currentProduct.modelCode}
                  </span>
                </div>
              </div>

              {/* Core Header Details */}
              <div className="md:col-span-6 space-y-4">
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
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Lead Time:</span>
                    <span className="font-bold text-slate-800 font-mono text-xs sm:text-sm">{currentProduct.leadTime}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Warranty Support:</span>
                    <span className="font-bold text-orange-600 text-xs sm:text-sm">{currentProduct.specs.warranty}</span>
                  </div>
                </div>

                {/* Primary Buy / RFQ Actions in Brand Orange */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
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
          </div>

          {/* Specification Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto scrollbar-none no-print">
              <button
                onClick={() => setActiveTab('specs')}
                className={`py-3 px-4 sm:px-5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'specs'
                    ? 'border-orange-600 text-orange-600 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Technical Matrix
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`py-3 px-4 sm:px-5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'features'
                    ? 'border-orange-600 text-orange-600 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Clinical Features & Safety
              </button>
              <button
                onClick={() => setActiveTab('accessories')}
                className={`py-3 px-4 sm:px-5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'accessories'
                    ? 'border-orange-600 text-orange-600 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Hospital Applications
              </button>
              <button
                onClick={() => setActiveTab('standards')}
                className={`py-3 px-4 sm:px-5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'standards'
                    ? 'border-orange-600 text-orange-600 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Quality & Compliance
              </button>
            </div>

            {/* Tab Content Body */}
            <div className="p-4 sm:p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Engineering Specifications & Dimensions</span>
                </h3>

                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto">
                  <table className="w-full text-xs text-left min-w-[320px]">
                    <tbody className="divide-y divide-slate-200">
                      <tr className="hover:bg-slate-100/60">
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-semibold text-slate-500 w-2/5 sm:w-1/3">Model Identifier</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-mono font-bold text-orange-600">{currentProduct.modelCode}</td>
                      </tr>
                      <tr className="hover:bg-slate-100/60">
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-semibold text-slate-500">Raw Metallurgy & Material</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-semibold text-slate-800 break-words">{currentProduct.specs.material}</td>
                      </tr>
                      <tr className="hover:bg-slate-100/60">
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-semibold text-slate-500">Metric Dimensions (L × W × H)</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-mono tabular-nums text-slate-900 font-bold break-words">{currentProduct.specs.dimensions}</td>
                      </tr>
                      {currentProduct.specs.loadCapacity && (
                        <tr className="hover:bg-slate-100/60">
                          <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-semibold text-slate-500">Safe Working Load Capacity</td>
                          <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-mono tabular-nums text-slate-900 font-bold text-xs sm:text-sm text-orange-600">
                            {currentProduct.specs.loadCapacity}
                          </td>
                        </tr>
                      )}
                      <tr className="hover:bg-slate-100/60">
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-semibold text-slate-500">Surface Finish & Pre-Treatment</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 text-slate-800 break-words">{currentProduct.specs.finish}</td>
                      </tr>
                      {currentProduct.specs.castors && (
                        <tr className="hover:bg-slate-100/60">
                          <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-semibold text-slate-500">Mobility & Castor Wheels</td>
                          <td className="py-2.5 sm:py-3 px-3 sm:px-5 text-slate-800 break-words">{currentProduct.specs.castors}</td>
                        </tr>
                      )}
                      {currentProduct.specs.adjustments && (
                        <tr className="hover:bg-slate-100/60">
                          <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-semibold text-slate-500">Articulations & Positions</td>
                          <td className="py-2.5 sm:py-3 px-3 sm:px-5 text-slate-800 break-words">{currentProduct.specs.adjustments}</td>
                        </tr>
                      )}
                      <tr className="hover:bg-slate-100/60">
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-semibold text-slate-500">Warranty Coverage</td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-5 font-bold text-orange-600">{currentProduct.specs.warranty}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Clinical Features List */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Clinical Performance Highlights</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                  {currentProduct.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
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
          <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6 border border-slate-800 text-center md:text-left">
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-white">
                Need a Formal Proforma Quotation for {currentProduct.modelCode}?
              </h3>
              <p className="text-xs text-slate-400">
                Our engineering team provides official stamped quotes, GST breakdown, and freight delivery schedules.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={handleWhatsAppInquiry}
                className="justify-center px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
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
        </div>
      </div>
    </div>
  );
};
