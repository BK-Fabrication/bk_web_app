import React, { useState } from 'react';
import { Wrench, CheckCircle2, Settings2, FileCheck } from 'lucide-react';
import { MedicalProduct } from '../types';

interface CustomFabricationProps {
  onAddCustomProduct: (customProduct: MedicalProduct) => void;
}

export const CustomFabrication: React.FC<CustomFabricationProps> = ({
  onAddCustomProduct,
}) => {
  const [equipmentType, setEquipmentType] = useState('ICU / Ward Hospital Bed');
  const [metallurgy, setMetallurgy] = useState('AISI 304 Stainless Steel (Argon Arc Welded)');
  const [colorScheme, setColorScheme] = useState('Hospital Pure White & Brand Orange Accents');
  const [wheelType, setWheelType] = useState('125 mm Central Foot-Brake Castors');
  const [customDimensions, setCustomDimensions] = useState('');
  const [accessories, setAccessories] = useState<string[]>([
    'Telescopic SS IV Pole',
    'Corner Wall Bumper Rollers'
  ]);
  const [customSuccess, setCustomSuccess] = useState(false);

  const accessoryOptions = [
    'Telescopic SS IV Pole',
    'Oxygen Cylinder Bracket',
    'CPR Cardiac Board',
    'Urine Bag Hooks',
    'Corner Wall Bumper Rollers',
    'Stainless Steel Overbed Tray'
  ];

  const toggleAccessory = (acc: string) => {
    setAccessories((prev) =>
      prev.includes(acc) ? prev.filter((a) => a !== acc) : [...prev, acc]
    );
  };

  const handleCreateCustomOrder = () => {
    const customCode = `BK-CUSTOM-${Math.floor(100 + Math.random() * 900)}`;
    const customItem: MedicalProduct = {
      id: `custom-${Date.now()}`,
      modelCode: customCode,
      name: `Custom Fabricated ${equipmentType}`,
      category: 'beds',
      categoryLabel: 'Custom Fabrication',
      subtitle: `${metallurgy} · ${colorScheme}`,
      description: `Bespoke hospital equipment fabricated to custom clinical specifications. Includes ${accessories.join(', ')}. Wheel setup: ${wheelType}.${customDimensions ? ` Dimensions: ${customDimensions}` : ''}`,
      image: '/src/assets/images/product_icu_bed_1792303339395.jpg',
      specs: {
        material: metallurgy,
        dimensions: customDimensions || 'Custom Client Dimensions',
        loadCapacity: '250 kg reinforced',
        finish: `${colorScheme} (7-tank pre-treatment)`,
        castors: wheelType,
        warranty: '36 Months Structural Guarantee'
      },
      keyFeatures: accessories,
      applications: ['Hospital Ward Custom Fit', 'Specialty OT Suites'],
      certifications: ['BK Precision Custom Engineered', 'ISO 9001:2015 Standards'],
      inStock: false,
      leadTime: '5 - 7 business days'
    };

    onAddCustomProduct(customItem);
    setCustomSuccess(true);
    setTimeout(() => setCustomSuccess(false), 4000);
  };

  return (
    <section id="custom-fabrication" className="bg-slate-100/70 border-y border-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
            <Wrench className="w-4 h-4 text-orange-600" />
            <span>Custom Sizes & Bulk Hospital Orders</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Custom Hospital Furniture Made Exactly as per Your Room Size & Doctor's Need
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Every clinic, nursing home, and hospital ward has different room layouts and space constraints. 
            At BK Fabrication, we don't just sell standard sizes — our in-house workshop custom fabricates 
            hospital beds, surgical trolleys, examination tables, and bedside lockers as per your required length, 
            width, height, and hospital color theme. Just choose your options below to get an instant factory estimate.
          </p>
        </div>

        {/* Interactive Configurator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-orange-600" />
                <span>Custom Furniture Order Builder</span>
              </h3>
              <span className="text-xs text-slate-500 font-mono">Direct Factory Pricing</span>
            </div>

            {/* Step 1: Equipment Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                1. Select Furniture Item to Manufacture
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'ICU / Ward Hospital Bed',
                  'Surgical Dressing / OT Trolley',
                  'Emergency Crash Cart Trolley',
                  'Patient Bedside Locker & Table',
                  'Patient Transfer Stretcher Trolley'
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setEquipmentType(type)}
                    className={`p-2.5 text-xs text-left rounded-lg border transition-all cursor-pointer ${
                      equipmentType === type
                        ? 'bg-orange-50 border-orange-600 text-orange-900 font-bold shadow-2xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Metallurgy Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                2. Select Steel Grade & Material
              </label>
              <div className="space-y-2">
                {[
                  'AISI 304 Stainless Steel (100% Rust-Proof with Argon Arc Welding)',
                  'Heavy Gauge CRCA Steel Pipe + 7-Tank Epoxy Powder Coating',
                  'Hybrid Setup (Pure SS 304 Top Working Surface + Powder Coated Base)'
                ].map((mat) => (
                  <label
                    key={mat}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                      metallurgy === mat
                        ? 'bg-orange-50/70 border-orange-600 text-slate-900 font-medium'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="metallurgy"
                      checked={metallurgy === mat}
                      onChange={() => setMetallurgy(mat)}
                      className="text-orange-600 focus:ring-orange-500"
                    />
                    <span>{mat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Color Finish & Wheels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  3. Select Hospital Color Finish
                </label>
                <select
                  value={colorScheme}
                  onChange={(e) => setColorScheme(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Hospital Pure White & Brand Orange Accents">Pure White with Orange Accents</option>
                  <option value="Clinical Hospital Blue & White">Hospital Blue & White (Most Popular in India)</option>
                  <option value="Hospital Mint Green & Off-White">Medical Mint Green & Off-White</option>
                  <option value="Slate Grey & Polished Steel">Modern Slate Grey & Steel Finish</option>
                  <option value="Classic Sterile White">Classic All-White Finish</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  4. Select Wheel / Castor Type
                </label>
                <select
                  value={wheelType}
                  onChange={(e) => setWheelType(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="125 mm Central Foot-Brake Castors">125 mm Heavy Duty Central Brake Wheels</option>
                  <option value="100 mm Diagonal Brake Silent Polyurethane Wheels">100 mm Diagonal Brake Silent Wheels</option>
                  <option value="75 mm Anti-Static Stainless Swivel Castors">75 mm Anti-Static Swivel Castors</option>
                  <option value="Stationary Anti-Skid Rubber Shoes">Fixed Heavy-Duty Rubber Shoes (No Wheels)</option>
                </select>
              </div>
            </div>

            {/* Step 4: Custom Dimensions & Accessories */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                5. Enter Custom Dimensions (Optional — in mm, feet, or inches)
              </label>
              <input
                type="text"
                value={customDimensions}
                onChange={(e) => setCustomDimensions(e.target.value)}
                placeholder="e.g. 6.5 ft Length × 3 ft Width × 2 ft Height (or as per your hospital room space)"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                6. Select Extra Attachments & Accessories
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {accessoryOptions.map((acc) => {
                  const selected = accessories.includes(acc);
                  return (
                    <button
                      key={acc}
                      type="button"
                      onClick={() => toggleAccessory(acc)}
                      className={`p-2 rounded-lg text-xs font-medium border text-left transition-colors cursor-pointer flex items-center justify-between ${
                        selected
                          ? 'bg-orange-50 border-orange-600 text-orange-900 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{acc}</span>
                      {selected && <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Spec Sheet Preview & Direct Add to RFQ */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                  Live Custom Order Summary
                </span>
                <span className="text-xs text-slate-400 font-mono">BK Fabrication Workshop</span>
              </div>

              <div>
                <span className="text-xs text-slate-400">Target Item to Fabricate:</span>
                <h4 className="text-lg font-bold text-white mt-0.5">
                  Custom {equipmentType}
                </h4>
              </div>

              <div className="space-y-2 text-xs border-y border-slate-800 py-3 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Steel Material:</span>
                  <span className="font-medium text-right text-white max-w-[220px] truncate">{metallurgy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Color Finish:</span>
                  <span className="text-white">{colorScheme}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Wheel Setup:</span>
                  <span className="text-white text-right max-w-[200px] truncate">{wheelType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Custom Size:</span>
                  <span className="text-white font-mono">{customDimensions || 'As per hospital room layout'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dispatch Time:</span>
                  <span className="text-orange-400 font-mono font-bold">5 to 7 Working Days</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-1">Selected Attachments:</span>
                <div className="flex flex-wrap gap-1.5">
                  {accessories.map((acc, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-slate-800 text-slate-200 px-2 py-0.5 rounded border border-slate-700"
                    >
                      {acc}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCreateCustomOrder}
                className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-md"
              >
                <FileCheck className="w-4 h-4" />
                <span>Add Custom Spec to Quotation List</span>
              </button>

              {customSuccess && (
                <div className="p-3 bg-orange-950/80 border border-orange-500/60 rounded-lg text-orange-200 text-xs text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                  <span>Custom furniture added to your Quotation List!</span>
                </div>
              )}
            </div>

            {/* Direct Engineering Consultation card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-900 text-sm">
                Need Help with Hospital Layout or Room Drawing?
              </div>
              <p>
                Send your hospital floor plan, rough sketch, or requirement list directly to our
                senior fabrication engineer at{' '}
                <a
                  href="mailto:bkfabrication21@gmail.com"
                  className="text-orange-600 font-semibold underline"
                >
                  bkfabrication21@gmail.com
                </a>{' '}
                or call us directly at <strong>+91 95912 44345</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
