import React from 'react';
import { ShieldCheck, Award, Flame, Droplets, CheckCircle2, Factory } from 'lucide-react';

export const QualitySection: React.FC = () => {
  const qualityPillars = [
    {
      icon: ShieldCheck,
      title: '100% Pure SS 304 Stainless Steel',
      desc: 'We use genuine non-magnetic Grade 304 stainless steel for all trolleys, trays, bowls, and bed railings. Completely rust-proof even with daily cleaning using hospital spirit, Dettol, Savlon, and phenyl.'
    },
    {
      icon: Factory,
      title: '7-Tank Chemical Rust Treatment',
      desc: 'Before powder coating, every steel frame undergoes a 7-stage hot chemical dip process (degreasing, derusting, phosphating, and passivation). This ensures the paint never chips, bubbles, or rusts.'
    },
    {
      icon: Flame,
      title: 'Heavy Gauge Pipe & Argon Arc Welding',
      desc: 'We use thick-walled heavy gauge steel pipes with continuous argon arc welding. Joints are smooth, crack-free, and ground flush so no sharp edges or rust-prone crevices remain.'
    },
    {
      icon: Droplets,
      title: 'Heavy Load Tested (Tested up to 250+ kg)',
      desc: 'Every ICU bed, ward cot, and stretcher trolley is tested under heavy patient loads. Reinforced steel framework guarantees zero wobbling, zero bend, and completely silent wheel movement.'
    }
  ];

  return (
    <section id="quality-standards" className="max-w-7xl mx-auto px-6 py-16">
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
          <Award className="w-4 h-4 text-orange-600" />
          <span>Metallurgy & Quality Assurance</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Built for 15+ Years of Rough Hospital Use — No Rust, No Breaking
        </h2>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Hospital and nursing home furniture undergoes 24/7 rough patient use, daily washing, and strong chemical cleaning.
          Here is how BK Fabrication ensures maximum durability, patient safety, and long working life:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {qualityPillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs hover:border-orange-500 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-orange-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
                <span>100% Quality Tested</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Certifications strip */}
      <div className="mt-12 p-6 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border-l-4 border-orange-500">
        <div>
          <div className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-1">
            Certified Quality Assurance
          </div>
          <div className="text-base font-bold text-white">
            ISO 9001:2015 & CE Compliant Manufacturing Facility
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>Heavy Load Tested (250+ kg)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>Rust-Proof SS 304 Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>24 Months Factory Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};
