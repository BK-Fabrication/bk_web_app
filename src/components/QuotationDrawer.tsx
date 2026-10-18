import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, FileText, Send, CheckCircle2, Printer, MessageSquare, Phone, Building2 } from 'lucide-react';
import { QuoteItem, QuoteFormData } from '../types';
import { COMPANY_DETAILS } from '../data/products';

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

  if (!isOpen) return null;

  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const generateReferenceNumber = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `BK-RFQ-2026-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hospitalName || !formData.phone) {
      alert('Please provide your Hospital/Clinic Name and Contact Phone Number.');
      return;
    }
    const ref = generateReferenceNumber();
    setSubmittedRef(ref);
  };

  const handleWhatsAppDispatch = () => {
    if (!formData.hospitalName || !formData.phone) {
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
      `*Delivery Location:* ${formData.city || 'Standard'}, ${formData.state}\n` +
      `*Target Timeline:* ${formData.timeline}\n` +
      `*Requirement Type:* ${formData.projectType}\n\n` +
      `*Requested Equipment List (${totalItemCount} Units Total):*\n${itemsSummary}\n\n` +
      (formData.customRequirements ? `*Special Fabrication Notes:*\n${formData.customRequirements}\n\n` : '') +
      `Please provide formal company quotation with GST, freight, and delivery lead times.`
    );

    window.open(`https://wa.me/919591244345?text=${message}`, '_blank');
  };

  const handlePrintQuotation = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="bg-white w-full max-w-2xl h-full flex flex-col shadow-2xl relative">
        {/* Drawer Header with Brand Styling */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Hospital Quotation Request (RFQ)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Direct factory procurement for clinics, nursing homes & hospitals
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Confirmation View */}
        {submittedRef ? (
          <div className="p-8 flex-1 overflow-y-auto flex flex-col items-center justify-center text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
                RFQ Submitted Successfully
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Reference Code: <span className="font-mono text-orange-600">{submittedRef}</span>
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto pt-1 leading-relaxed">
                Thank you, <strong className="text-slate-800">{formData.hospitalName}</strong>.
                Our biomedical fabrication engineers have received your inquiry. A formal proforma
                estimate with technical drawings will be dispatched within 4 working hours.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full max-w-sm">
              <button
                onClick={handleWhatsAppDispatch}
                className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Track on WhatsApp</span>
              </button>

              <button
                onClick={handlePrintQuotation}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer border border-slate-300"
              >
                <Printer className="w-4 h-4" />
                <span>Print RFQ Sheet</span>
              </button>
            </div>

            <div className="pt-6 border-t border-slate-200 w-full text-xs text-slate-500">
              Direct Contact: <strong>+91 95912 44345</strong> / <strong>+91 78922 53940</strong>
              <br />Email: <strong>{COMPANY_DETAILS.email}</strong>
            </div>

            <button
              onClick={() => {
                setSubmittedRef(null);
                onClearQuote();
                onClose();
              }}
              className="text-xs text-orange-600 hover:underline pt-2 cursor-pointer font-semibold"
            >
              Start New Inquiry
            </button>
          </div>
        ) : (
          /* Main Form & Basket View */
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Selected Items Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Selected Equipment ({totalItemCount} Units)
                </h3>
                {items.length > 0 && (
                  <button
                    onClick={onClearQuote}
                    className="text-xs text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="border border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50">
                  <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-600 font-medium">Your quotation basket is empty</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Click "Add Quote" on any hospital bed, cart, or equipment in the catalog to
                    request bulk factory pricing.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center justify-between gap-4 shadow-2xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-14 object-contain rounded-lg bg-slate-50 p-1 border border-slate-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <span className="font-mono text-[11px] font-bold text-orange-600 block">
                            {item.product.modelCode}
                          </span>
                          <span className="text-xs font-bold text-slate-900 block truncate">
                            {item.product.name}
                          </span>
                          <span className="text-[11px] text-slate-500 block truncate">
                            {item.product.specs.material.split('+')[0]}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-slate-600 hover:text-slate-900 cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold font-mono text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-slate-600 hover:text-slate-900 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
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

            {/* Institution / Hospital Procurement Form */}
            {items.length > 0 && (
              <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-orange-600" />
                  <span>Institutional Procurement Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Hospital / Clinic Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.hospitalName}
                      onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                      placeholder="e.g. Apollo Super Specialty Hospital"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Contact Person & Designation
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="e.g. Dr. Rajesh Kumar (Medical Director)"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. procurement@hospital.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Delivery City & State
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Bangalore, Karnataka"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Target Delivery Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Immediate">Immediate Supply (48-72 Hours)</option>
                      <option value="Within 30 Days">Within 30 Days</option>
                      <option value="Within 60 Days">Within 60 Days (Ward Setup)</option>
                      <option value="Tender / Planning">Tender / Budget Planning</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1 text-xs">
                    Custom Dimensions or Special Fabrication Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.customRequirements}
                    onChange={(e) => setFormData({ ...formData, customRequirements: e.target.value })}
                    placeholder="Specify custom powder coat colors, stainless steel grade 304/316, custom bed heights, or specific castor wheel locks..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Submit and WhatsApp CTAs in Brand Colors */}
                <div className="space-y-2.5 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Formal RFQ to Factory</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleWhatsAppDispatch}
                      className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Instant WhatsApp Quote</span>
                    </button>

                    <button
                      type="button"
                      onClick={handlePrintQuotation}
                      className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Proforma Estimate</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Drawer Sticky Footer with Factory Hotline */}
        <div className="p-4 bg-slate-900 text-white text-xs flex items-center justify-between border-t border-slate-800">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-orange-400" />
            <span>Procurement Hotline: <strong>+91 95912 44345</strong></span>
          </div>
          <span className="text-slate-400 hidden sm:inline">{COMPANY_DETAILS.email}</span>
        </div>
      </div>
    </div>
  );
};
