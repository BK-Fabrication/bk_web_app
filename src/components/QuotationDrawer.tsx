import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  FileText, 
  Send, 
  CheckCircle2, 
  Phone, 
  Building2,
  Package,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { QuoteItem, QuoteFormData } from '../types';
import { COMPANY_DETAILS } from '../data/products';

// Authentic WhatsApp SVG Icon Component
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="16" 
    height="16" 
    stroke="currentColor" 
    strokeWidth="0" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface QuotationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearQuote: () => void;
}

export const QuotationDrawer: React.FC<QuotationDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearQuote,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    hospitalName: '',
    contactPerson: '',
    phone: '',
    email: '',
    city: '',
    state: 'Karnataka',
    timeline: 'Within 30 Days',
    projectType: 'New Hospital Wing',
    customRequirements: '',
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const generateReferenceNumber = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `BK-RFQ-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hospitalName.trim() || !formData.phone.trim()) {
      alert('Please provide your Hospital/Clinic Name and Contact Phone Number.');
      return;
    }
    const ref = generateReferenceNumber();
    setSubmittedRef(ref);
  };

  const handleWhatsAppDispatch = () => {
    if (!formData.hospitalName.trim() || !formData.phone.trim()) {
      alert('Please fill in Hospital/Institution Name and Phone Number first.');
      return;
    }

    const itemsSummary = items
      .map((it, idx) => `${idx + 1}. *${it.product.name}* (${it.product.modelCode}) × *${it.quantity} units*`)
      .join('\n');

    const message = encodeURIComponent(
      `*FORMAL PRICE INQUIRY / RFQ*\n` +
      `*To:* BK Fabrication Medical Equipment\n` +
      `*From:* ${formData.hospitalName}\n` +
      `*Contact Person:* ${formData.contactPerson || 'Procurement Team'}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email || 'N/A'}\n` +
      `*Location:* ${formData.city || 'Standard'}, ${formData.state}\n` +
      `*Timeline:* ${formData.timeline}\n` +
      `*Type:* ${formData.projectType}\n\n` +
      `*Requested Equipment (${totalItemCount} Units Total):*\n${itemsSummary}\n\n` +
      (formData.customRequirements ? `*Special Notes:*\n${formData.customRequirements}\n\n` : '') +
      `Please provide formal company quotation with GST, freight, and delivery lead times.`
    );

    window.open(`https://wa.me/919591244345?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-fade-in">
      <div 
        className="fixed inset-0 cursor-pointer" 
        onClick={onClose} 
        aria-label="Close drawer backdrop" 
      />

      <div className="bg-white w-full max-w-xl h-full flex flex-col shadow-2xl relative z-10">
        {/* Modern Clean Header */}
        <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Quotation Request
                </h2>
                {totalItemCount > 0 && (
                  <span className="px-2 py-0.5 text-[11px] font-bold bg-orange-100 text-orange-700 rounded-full font-mono">
                    {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Direct factory wholesale rates & GST invoice
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close quotation drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Confirmation View */}
        {submittedRef ? (
          <div className="p-8 flex-1 overflow-y-auto flex flex-col items-center justify-center text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5 max-w-md">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">
                RFQ Submitted Successfully
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Ref: <span className="font-mono text-orange-600">{submittedRef}</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed pt-1">
                Thank you, <strong className="text-slate-800">{formData.hospitalName}</strong>.
                Our medical equipment engineers have received your inquiry. A formal proforma
                estimate will be dispatched within 4 working hours.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="pt-2 w-full max-w-sm">
              <button
                onClick={handleWhatsAppDispatch}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Track on WhatsApp</span>
              </button>
            </div>

            <div className="pt-6 border-t border-slate-100 w-full text-xs text-slate-400">
              Hotline: <strong className="text-slate-600">+91 95912 44345</strong> · Email: <strong className="text-slate-600">{COMPANY_DETAILS.email}</strong>
            </div>

            <button
              onClick={() => {
                setSubmittedRef(null);
                onClearQuote();
                onClose();
              }}
              className="text-xs text-orange-600 hover:text-orange-700 font-semibold cursor-pointer pt-1"
            >
              Start New Inquiry
            </button>
          </div>
        ) : (
          /* Main Form & Basket View */
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Selected Items Section */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Equipment in Basket ({items.length})
                </span>
                {items.length > 0 && (
                  <button
                    onClick={onClearQuote}
                    className="text-xs text-rose-500 hover:text-rose-700 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="border border-dashed border-slate-200 rounded-2xl p-10 text-center bg-slate-50/50">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <Package className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800">Your basket is empty</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Click "Add to Quotation Basket" on any hospital bed, cart, or equipment to request direct factory wholesale pricing.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-white border border-slate-200/80 rounded-xl p-3 flex items-center justify-between gap-3 shadow-2xs hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-contain rounded-lg bg-slate-50 p-1 border border-slate-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {item.product.name}
                          </p>
                          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                            <span className="text-orange-600 font-semibold">{item.product.modelCode}</span>
                            <span className="mx-1.5 text-slate-300">·</span>
                            <span>{item.product.specs.material.split('+')[0]}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50/80 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold font-mono text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Procurement Contact Form */}
            {items.length > 0 && (
              <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-orange-600" />
                    <span>Hospital / Institutional Details</span>
                  </span>
                  <span className="text-[11px] text-slate-400">* Required</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Hospital / Clinic Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.hospitalName}
                      onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                      placeholder="e.g. Apollo Super Specialty"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Contact Person & Designation
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="e.g. Dr. Rajesh (Medical Director)"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Official Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. procurement@hospital.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Delivery Location (City)
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Bangalore, Karnataka"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-xs text-slate-800"
                    >
                      <option value="Immediate">Immediate Supply (48-72 Hours)</option>
                      <option value="Within 30 Days">Within 30 Days</option>
                      <option value="Within 60 Days">Within 60 Days (Ward Setup)</option>
                      <option value="Tender / Planning">Tender / Budget Planning</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1 text-xs">
                    Custom Notes / Dimension Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.customRequirements}
                    onChange={(e) => setFormData({ ...formData, customRequirements: e.target.value })}
                    placeholder="Specify custom powder coat colors, stainless steel grade 304/316, custom bed heights, or specific castor wheel locks..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-800"
                  />
                </div>

                {/* Submit & Secondary Action Buttons (Responsive 2 in a row) */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={handleWhatsAppDispatch}
                    className="flex-1 py-2 px-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs hover:shadow-sm"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-current shrink-0" />
                    <span className="truncate">Instant WhatsApp</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-2 px-3.5 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs hover:shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Submit Formal RFQ</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Drawer Sticky Footer with Factory Hotline */}
        <div className="px-6 py-3 bg-slate-900 text-white text-xs flex items-center justify-between border-t border-slate-800">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-slate-300">Hotline: <strong className="text-white">+91 95912 44345</strong></span>
          </div>
          <span className="text-slate-400 hidden sm:inline text-[11px]">{COMPANY_DETAILS.email}</span>
        </div>
      </div>
    </div>
  );
};
