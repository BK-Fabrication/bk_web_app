import React, { useState } from 'react';
import { Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DETAILS } from '../data/products';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    organization: '',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello BK Fabrication team,\nI would like to inquire about hospital furniture supply and catalog pricing for our facility.\nPlease get in touch.`
    );
    window.open(`https://wa.me/919591244345?text=${text}`, '_blank');
  };

  return (
    <section id="contact-section" className="bg-white border-t border-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
                Talk Directly to Factory Team
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Contact BK Fabrication for Wholesale Rates & Enquiries
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Whether you are setting up a new 50-bed hospital, upgrading your clinic, or ordering single 
                emergency trolleys, contact our factory directly. We provide direct wholesale pricing, GST invoices, 
                and fast transport delivery all over India.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Phone Contacts */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Direct Factory Calling Numbers
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    <a
                      href={`tel:${COMPANY_DETAILS.phones[0]}`}
                      className="text-sm font-bold text-slate-900 hover:text-orange-600 transition-colors"
                    >
                      +91 95912 44345
                    </a>
                    <a
                      href={`tel:${COMPANY_DETAILS.phones[1]}`}
                      className="text-sm font-bold text-slate-900 hover:text-orange-600 transition-colors"
                    >
                      +91 78922 53940
                    </a>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Speak directly with our fabrication manager for best price discount.
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Official Factory Quotation Email
                  </span>
                  <a
                    href={`mailto:${COMPANY_DETAILS.email}`}
                    className="text-sm font-bold text-slate-900 hover:text-orange-600 transition-colors block mt-1"
                  >
                    {COMPANY_DETAILS.email}
                  </a>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Send hospital purchase orders, tenders, or item lists for immediate quote.
                  </span>
                </div>
              </div>

              {/* Working Hours & Facility */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Factory & Workshop Timings
                  </span>
                  <div className="text-xs text-slate-700 mt-1 space-y-0.5">
                    <div>Monday to Saturday: 9:00 AM to 7:30 PM</div>
                    <div className="text-orange-600 font-medium">Sunday: Available on call for urgent hospital emergencies</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <button
              onClick={handleWhatsAppDirect}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Chat Directly on WhatsApp (+91 95912 44345) — Instant Reply</span>
            </button>
          </div>

          {/* Right Direct Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Request Fast Price Quote / Factory Callback
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill this quick form and our sales team will call you back with direct factory prices and product brochures within 2 hours.
            </p>

            {sent ? (
              <div className="p-8 text-center bg-white rounded-xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Enquiry Received Successfully!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you for contacting BK Fabrication. Our team will call you at{' '}
                  <strong>{formData.phone || 'your phone number'}</strong> shortly with factory rates and PDF brochure.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 text-xs text-orange-600 hover:underline font-bold cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Your Name / Doctor Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Rajesh Kumar / Mr. Suresh"
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 98765 43210"
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Hospital / Clinic / Medical Store Name
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. City Life Hospital / Sri Sai Clinic"
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      City & State (For Transport Calculation)
                    </label>
                    <input
                      type="text"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. Bangalore, Karnataka / Hyderabad"
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Required Items & Quantity *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe equipment needed (e.g. 5 ICU Beds, 10 Bedside Lockers, 3 Crash Carts, 2 Stretcher Trolleys) or custom room sizes..."
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry to Factory — Get Best Rate</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
