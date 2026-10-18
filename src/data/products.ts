import { MedicalProduct } from '../types';

export const MEDICAL_PRODUCTS: MedicalProduct[] = [
  {
    id: 'emergency-crash-cart',
    modelCode: 'BK-CC-400',
    name: 'Hospital Emergency Medicine Crash Cart',
    category: 'trolleys',
    categoryLabel: 'Emergency & Ward Trolleys',
    subtitle: 'Multi-drawer rapid response resuscitation cart with defibrillator shelf',
    description: 'Comprehensive mobile crash cart for critical emergency response. Equipped with 5 color-coded centralized-locking drawers with modular drug separator trays, 360° rotating defibrillator tray, oxygen cylinder bracket, cardiac CPR board, and disposable sharps container.',
    image: '/assets/images/product_crash_cart_1792303340280.jpg',
    specs: {
      material: 'Grade 304 Stainless Steel working top + aluminum & epoxy-coated steel body',
      dimensions: '850 mm (L) × 520 mm (W) × 1020 mm (H)',
      loadCapacity: '150 kg evenly distributed',
      finish: 'Clinical royal blue & sterile white powder coat with stainless steel rim',
      castors: '100 mm heavy-duty silent polyurethane swivel castors (2 with total brakes)',
      adjustments: 'Telescopic stainless steel IV infusion pole with 2 ram hooks',
      warranty: '24 Months Factory Guarantee'
    },
    keyFeatures: [
      'Centralized break-away seal locking mechanism for emergency drug security',
      'Upper stainless steel top with raised three-sided spill-containment perimeter',
      'Height-adjustable 360° swivel defibrillator/cardiac monitor platform',
      'Side utility mounts: Oxygen tank bracket, power strip mount, and biohazard bin',
      'Smooth ball-bearing telescopic drawer sliders with auto-retract buffering'
    ],
    applications: ['Emergency Rooms (ER)', 'ICU & CCU', 'Operating Theatres', 'Ambulance Bays'],
    certifications: ['Medical Grade ISO 9001:2015', 'Sterile Cleanroom Certified Materials'],
    inStock: true,
    leadTime: '2 - 4 business days',
    isFeatured: true
  },
  {
    id: 'surgical-dressing-trolley',
    modelCode: 'BK-DT-304',
    name: 'SS 304 Surgical Dressing & Instrument Trolley',
    category: 'trolleys',
    categoryLabel: 'Emergency & Ward Trolleys',
    subtitle: 'Double shelf medical grade stainless steel with perimeter guardrails',
    description: 'Fabricated from authentic 304 grade non-magnetic stainless steel, argon TIG welded for zero crevices to prevent bacterial harboring. Features two deep pressed shelves with three-sided protective stainless safety rails, stainless steel bowl attachment, and anti-static swivel wheels.',
    image: '/assets/images/product_dressing_trolley_1792303340011.jpg',
    specs: {
      material: '100% AISI Grade 304 Non-Magnetic Stainless Steel (1.2mm sheet thickness)',
      dimensions: '760 mm (L) × 460 mm (W) × 850 mm (H)',
      loadCapacity: '120 kg',
      finish: 'Mirror/Matt satin surgical polish (easy sanitize & autoclave resistant)',
      castors: '75 mm non-marking, anti-static swivel rubber castors (2 with brakes)',
      adjustments: 'Swiveling stainless steel bowl holder and waste bucket ring',
      warranty: '36 Months Structural Rust-Proof Warranty'
    },
    keyFeatures: [
      'Dual shelves with 3-sided safety guard rails preventing dropped surgical trays',
      'Fully argon arc welded round tubular frame for seamless hygiene sanitation',
      'Includes detachable 304 stainless steel dressing bowl and kidney dish support',
      'Corrosion resistant to harsh chemical sterilizers and surgical detergents'
    ],
    applications: ['Operation Theatres', 'Minor OT', 'Wound Dressing Rooms', 'Surgical Wards'],
    certifications: ['AISI 304 Certified Metallurgy', 'Hospital Cleanroom Standard'],
    inStock: true,
    leadTime: 'Immediate Dispatch / 48 hrs',
    isFeatured: true
  },
  {
    id: 'clinical-examination-couch',
    modelCode: 'BK-EC-200',
    name: 'Multi-Position Clinical Examination Couch Table',
    category: 'examination',
    categoryLabel: 'Examination & OT',
    subtitle: 'Ergonomic diagnostic couch with built-in utility storage & footstep',
    description: 'Heavy-duty doctor consultation and clinical examination couch. Manufactured with welded rectangular steel section, premium anti-microbial blue leatherette upholstery over high-density foam, multi-position ratcheted headrest elevation, three side drawers, and a slide-out step stool.',
    image: '/assets/images/product_exam_couch_1792303341691.jpg',
    specs: {
      material: 'Reinforced tubular steel framework + high-density foam & waterproof vinyl',
      dimensions: '1880 mm (L) × 600 mm (W) × 820 mm (H)',
      loadCapacity: '220 kg patient weight rating',
      finish: 'Clinical powder-coated white frame with antibacterial cobalt blue mattress',
      castors: 'Optional heavy duty leveling rubber pads or locking castors',
      adjustments: 'Ratcheted backrest elevation from 0° to 70° with safety lock',
      warranty: '24 Months Warranty'
    },
    keyFeatures: [
      'Concealed heavy-duty slide-out footstep stool with anti-skid rubber tread',
      'Three smooth gliding storage drawers plus lockable utility cabinet for supplies',
      'Tear-resistant, disinfectant-proof medical grade upholstery with 50mm padding',
      'Integrated paper roll holder at the head section for rapid hygienic changeover'
    ],
    applications: ['Doctor Consulting Rooms', 'OPD Clinics', 'Health Check Centers', 'Nursing Homes'],
    certifications: ['ISO Medical Ergonomics', 'Flame Retardant Foam (BS 5852)'],
    inStock: true,
    leadTime: '3 - 5 business days',
    isFeatured: true
  },
  {
    id: 'bedside-locker-cabinet',
    modelCode: 'BK-BL-150',
    name: 'Hospital Bedside Locker Cabinet',
    category: 'ward',
    categoryLabel: 'Patient Room & Ward',
    subtitle: 'Clinical white & cobalt blue locker with stainless steel top tray',
    description: 'Precision manufactured patient bedside cabinet designed for hospital ward ergonomics. Features a deep-recessed stainless steel top tray preventing spills, smooth-running upper drawer, spacious lower cupboard with magnetic latch, built-in side towel rail, and swivel castors.',
    image: '/assets/images/product_bedside_locker_1792303359577.jpg',
    specs: {
      material: '0.8mm CRCA Steel with 304 Stainless Steel Pressed Top Sheet',
      dimensions: '410 mm (L) × 410 mm (W) × 820 mm (H)',
      loadCapacity: '60 kg top load',
      finish: '7-tank phosphate pre-treatment with antibacterial epoxy powder coating',
      castors: '50 mm twin-wheel swivel castors (2 with brakes)',
      adjustments: 'Internal removable middle shelf',
      warranty: '24 Months Guarantee'
    },
    keyFeatures: [
      'Pressed 304 stainless steel top with raised 3-sided spill barrier',
      'Smooth drawer on telescopic channels for patient personal medications',
      'Lower cabinet door with magnetic catch and rear ventilation louver slots',
      'Foldable stainless steel side towel rack and saline bottle hook',
      'Rust-proof powder coat finish resistant to daily hospital cleaning fluids'
    ],
    applications: ['General Hospital Wards', 'Private Deluxe Rooms', 'ICU Patient Bays', 'Rehabilitation Centers'],
    certifications: ['Hospital Grade Hygiene Coating', 'ISO 9001:2015'],
    inStock: true,
    leadTime: 'Immediate Dispatch / 24 hrs',
    isFeatured: true
  },
  {
    id: 'pediatric-baby-crib',
    modelCode: 'BK-BC-100',
    name: 'Pediatric Neonatal Baby Crib & Bassinet',
    category: 'ward',
    categoryLabel: 'Patient Room & Ward',
    subtitle: 'Clear acrylic tilting cradle bassinet with lower utility wire basket',
    description: 'Specialized neonatal hospital bassinet engineered for infant comfort and nurse visibility. Features a seamless transparent acrylic cradle with rounded safety edges, adjustable Trendelenburg tilt mechanism, waterproof antibacterial baby mattress, and lower stainless steel storage basket.',
    image: '/assets/images/product_baby_crib_1792303357673.jpg',
    specs: {
      material: 'High-grade tubular stainless steel frame + medical grade clear acrylic crib',
      dimensions: '810 mm (L) × 460 mm (W) × 900 mm (H)',
      loadCapacity: '25 kg infant load',
      finish: 'Mirror-polished SS 304 stainless steel tubular frame',
      castors: '75 mm swivel castors with diagonal wheel brake system',
      adjustments: 'Smooth tilt adjustment angle from 0° to ±12° with manual hand-knob',
      warranty: '36 Months Guarantee'
    },
    keyFeatures: [
      'Crystal-clear transparent acrylic tub provides 360° unobstructed infant observation',
      'Quick-action tilt positioning for neonatal reflux prevention and clinical care',
      'Lower wire-mesh storage basket for infant diapers, wipes, and feeding bottles',
      'Includes washable, waterproof, non-toxic infant mattress with blue vinyl cover',
      'Quiet swivel castors for silent nighttime nursery transportation'
    ],
    applications: ['Neonatal Wards (NICU)', 'Maternity Centers', 'Pediatric Departments', 'Post-Natal Care'],
    certifications: ['BPA-Free Medical Acrylic', 'Infant Safety Standard ISO 13485'],
    inStock: true,
    leadTime: '2 - 3 business days',
    isFeatured: true
  },
  {
    id: 'patient-transfer-stretcher',
    modelCode: 'BK-ST-800',
    name: 'Emergency Patient Transfer Stretcher Trolley',
    category: 'ward',
    categoryLabel: 'Patient Room & Ward',
    subtitle: 'Heavy-duty transfer trolley with collapsible side rails & IV stand',
    description: 'Engineered for smooth, rapid patient transfer between casualty, operating rooms, and wards. Built on a heavy tubular steel chassis with swing-down patient protective railings, pneumatic cylinder backrest elevation, high-density blue transfer mattress, and telescopic IV pole.',
    image: '/assets/images/product_patient_stretcher_1792303359194.jpg',
    specs: {
      material: 'High-tensile CRCA tubular steel & Grade 304 Stainless Steel railings',
      dimensions: '1950 mm (L) × 650 mm (W) × 700 mm (H)',
      loadCapacity: '200 kg dynamic patient capacity',
      finish: 'Sterile electropolished stainless finish with epoxy coated lower frame',
      castors: '150 mm heavy-duty diagonal brake rubber wheels for smooth rolling over thresholds',
      adjustments: 'Pneumatic ratchet backrest adjustment (0° to 70°)',
      warranty: '24 Months Warranty'
    },
    keyFeatures: [
      'Twin collapsible stainless steel side guardrails with auto-locking latches',
      'Detachable 2-section 50mm waterproof mattress with safety strap buckles',
      'Telescopic stainless steel IV infusion pole with dedicated mounting sleeve',
      'Lower under-frame rack designed for medical oxygen B-type cylinder storage',
      'Shock-absorbing corner roller bumpers to prevent wall and doorway gouging'
    ],
    applications: ['Casualty & Emergency Departments', 'Operation Theatre Transfers', 'Radiology / CT Transport', 'Trauma Bays'],
    certifications: ['Hospital Heavy Duty Certified', 'CE Mark Standard'],
    inStock: true,
    leadTime: '3 - 5 business days',
    isFeatured: true
  },
  {
    id: 'manual-fowler-bed',
    modelCode: 'BK-FB-350',
    name: 'Semi-Fowler / Fowler Manual Hospital Bed',
    category: 'beds',
    categoryLabel: 'Hospital Beds',
    subtitle: 'Smooth dual-crank mechanism with collapsible stainless safety rails',
    description: 'Versatile general ward hospital bed offering backrest and knee-rest elevation via smooth individual foldable crank handles. Features four-section perforated steel sheet top for optimal mattress ventilation, removable polymer head & foot panels, and 4 corner IV pole sockets.',
    image: '/assets/images/product_icu_bed_1792303339395.jpg',
    specs: {
      material: 'CRCA Rectangular Pipe Frame with Perforated CRCA Steel Deck',
      dimensions: '2060 mm (L) × 900 mm (W) × 600 mm (Fixed H)',
      loadCapacity: '220 kg patient load',
      finish: 'Pure polyester antimicrobial epoxy powder coating in hospital white & blue',
      castors: '100 mm heavy-duty diagonal locking castors',
      adjustments: 'Backrest (0–70°) and knee-rest (0–35°) via stainless folding crank handles',
      warranty: '24 Months Warranty'
    },
    keyFeatures: [
      'Individual stainless steel screw crank handles that tuck beneath bed frame when not in use',
      'Four-section slotted mattress deck promotes ventilation and prevents bedsores',
      'Easily detachable head and foot boards for quick intubation and emergency access',
      'Collapsible aluminum alloy side railings with one-touch latch buttons',
      'Four IV rod sockets and two urine drainage bag holder hooks included'
    ],
    applications: ['General Hospital Wards', 'Semi-Private Rooms', 'Elderly Care & Hospices', 'District Hospitals'],
    certifications: ['ISO 9001:2015 Certified', 'Hospital Furniture Quality Standard'],
    inStock: true,
    leadTime: '2 - 4 business days',
    isFeatured: false
  },
  {
    id: 'mayo-instrument-stand',
    modelCode: 'BK-MS-120',
    name: 'Mayo Surgical Instrument Overbed Stand',
    category: 'examination',
    categoryLabel: 'Examination & OT',
    subtitle: 'Adjustable height cantilever surgical tray for operating rooms',
    description: 'Cantilever surgical instrument stand engineered for surgical ease and sterilization. Fabricated entirely in surgical 304 stainless steel with a removable deep-drawn instrument tray. Low clearance U-shaped base slides under operating tables and hospital beds effortlessly.',
    image: '/assets/images/product_dressing_trolley_1792303340011.jpg',
    specs: {
      material: 'Complete AISI 304 Grade Stainless Steel with Argon TIG Welding',
      dimensions: 'Tray: 560 mm (L) × 410 mm (W) | Base: 600 mm (L) × 450 mm (W)',
      loadCapacity: '35 kg',
      finish: 'High-gloss surgical mirror polish',
      castors: '50 mm twin-wheel antistatic swivel castors',
      adjustments: 'Height variable from 850 mm to 1350 mm via smooth counter-lock knob',
      warranty: '36 Months Rust-Proof Warranty'
    },
    keyFeatures: [
      'Removable seamless pressed stainless steel tray easily autoclaved up to 134°C',
      'Offset upright telescopic pillar allows tray to reach across patient comfortably',
      'Low-profile base rolls under all standard OT tables and hospital beds',
      '100% rust-proof even when repeatedly subjected to hospital sterilization chemicals'
    ],
    applications: ['General Surgery', 'Orthopedic Surgery', 'Dental Operatories', 'Minor Surgical Suites'],
    certifications: ['AISI 304 Surgical Grade Stainless Steel', 'CE Compliant'],
    inStock: true,
    leadTime: 'Immediate Dispatch / 24 hrs',
    isFeatured: false
  },
  {
    id: 'ward-partition-screen',
    modelCode: 'BK-PS-3F',
    name: 'Hospital Ward Privacy Partition Screen (3-Fold / 4-Fold)',
    category: 'ward',
    categoryLabel: 'Patient Room & Ward',
    subtitle: 'Folding privacy screen with flame-retardant antibacterial curtains',
    description: 'Essential hospital ward privacy screen featuring robust tubular steel or stainless steel frame with smooth-rolling swivel castors on every panel. Fitted with hospital-grade, flame-retardant, anti-microbial fabric curtains in clinical green or blue, easily removable for laundering.',
    image: '/assets/images/product_bedside_locker_1792303359577.jpg',
    specs: {
      material: '19 mm dia Heavy Gauge Tubular Steel / SS 304 Frame with Washable Fabric',
      dimensions: '2400 mm (Total Extended W) × 1700 mm (H) — 3 Panels of 800 mm each',
      loadCapacity: 'Self-standing robust weight balance',
      finish: 'Epoxy powder coated white frame with medical green / blue curtain panels',
      castors: '50 mm smooth nylon swivel castors on each leaf for effortless glide',
      adjustments: '360° bi-directional hinges allow zigzag, straight or L-shape positioning',
      warranty: '12 Months Warranty'
    },
    keyFeatures: [
      'Heavy-duty piano-style steel hinges provide rigid positioning at any angle',
      'Easily folds completely flat for compact storage in ward supply closets',
      'Antimicrobial, wipe-clean and autoclavable medical fabric curtain panels',
      'Sturdy tripod base balance eliminates tipping when curtains are agitated'
    ],
    applications: ['Multi-Bed General Wards', 'Triage & Screening Areas', 'Vaccination Booths', 'Emergency OPD'],
    certifications: ['Flame Retardant Fabric Standard (NFPA 701)', 'ISO 9001:2015'],
    inStock: true,
    leadTime: 'Immediate Dispatch / 24 hrs',
    isFeatured: false
  },
  {
    id: 'surgeon-revolving-stool',
    modelCode: 'BK-RS-50',
    name: 'Doctor & Surgeon Revolving Stool',
    category: 'examination',
    categoryLabel: 'Examination & OT',
    subtitle: 'Pneumatic height-adjustable clinical stool with circular foot ring',
    description: 'Heavy duty revolving clinical stool for surgeons, anesthesiologists, and consulting physicians. Features a solid 304 stainless steel circular seat with rolled safety rim, gas-spring pneumatic height lift with foot/hand lever, and a reinforced 5-prong chrome base on smooth castors.',
    image: '/assets/images/product_exam_couch_1792303341691.jpg',
    specs: {
      material: 'Grade 304 Stainless Steel Seat + Chrome Plated Heavy Base',
      dimensions: 'Seat Diameter: 350 mm | Height: 480 mm to 680 mm',
      loadCapacity: '160 kg working load',
      finish: 'Satin finished stainless steel top with mirror chrome base',
      castors: '50 mm heavy-duty polyurethane swivel castors',
      adjustments: '360° rotation with 200 mm pneumatic height stroke range',
      warranty: '24 Months Warranty'
    },
    keyFeatures: [
      'Solid spun stainless steel seat with rolled edge for maximum thigh comfort',
      'Seamless smooth gas-lift elevation operated by under-seat pneumatic lever',
      'Integrated tubular foot rest ring supports surgeon posture during long procedures',
      'Stable 5-legged wide-stance spider base prevents tipping during rapid movement'
    ],
    applications: ['Operating Rooms', 'Minor Procedure Rooms', 'Pathology Laboratories', 'Dental Clinics'],
    certifications: ['Hospital Mechanical Durability Tested', 'ISO 9001:2015'],
    inStock: true,
    leadTime: 'Immediate Dispatch / 24 hrs',
    isFeatured: false
  },
  {
    id: 'double-step-stool',
    modelCode: 'BK-FS-20',
    name: 'Double Step Clinical Foot Stool',
    category: 'examination',
    categoryLabel: 'Examination & OT',
    subtitle: 'Dual-tier medical stepping stool with anti-skid ribbed rubber matting',
    description: 'Engineered for patient safety when mounting high hospital beds, examination couches, and operating tables. Fabricated with heavy gauge square tubular steel or stainless steel, non-slip corrugated rubber step treads, and rubber floor ferrules.',
    image: '/assets/images/product_exam_couch_1792303341691.jpg',
    specs: {
      material: 'Heavy Gauge Square Steel Tube / AISI 304 Stainless Steel + Rubber Mats',
      dimensions: 'Overall: 450 mm (L) × 500 mm (W) × 400 mm (H) | Step Height: 200 mm & 400 mm',
      loadCapacity: '180 kg static load capacity',
      finish: 'Epoxy powder coated medical white / Mirror polished SS 304',
      castors: 'Non-slip synthetic rubber shoe tips (stable zero-wobble floor contact)',
      warranty: '36 Months Structural Guarantee'
    },
    keyFeatures: [
      'Two-tier staggered step configuration with non-slip grooved rubber surfaces',
      'Heavy rubber feet prevent floor scratches and eliminate slipping on wet tiles',
      'Welded joint reinforcement prevents flexing even under heavy bariatric patient loads',
      'Resistant to disinfectant wipe-downs and sanitizing hospital cleaning solutions'
    ],
    applications: ['OPD Examination Rooms', 'X-Ray & Radiology Tables', 'Labour & Delivery Rooms', 'Ward Patient Beds'],
    certifications: ['Bariatric Weight Certified (180kg)', 'ISO 9001:2015'],
    inStock: true,
    leadTime: 'Immediate Dispatch / 24 hrs',
    isFeatured: false
  },
  {
    id: 'oxygen-cylinder-trolley',
    modelCode: 'BK-OCT-10',
    name: 'Heavy-Duty Oxygen Cylinder Transport Trolley',
    category: 'ward',
    categoryLabel: 'Patient Room & Ward',
    subtitle: 'Tubular steel medical gas cylinder carrier with dual solid rubber wheels',
    description: 'Ergonomic cylinder trolley designed for safe transport of high-pressure medical oxygen cylinders. Built with thick tubular steel framework, protective holding safety chain, curved back cradles, and puncture-proof solid rubber wheels.',
    image: '/assets/images/product_crash_cart_1792303340280.jpg',
    specs: {
      material: 'Heavy Duty 25 mm Seamless Steel Pipe with Industrial Powder Coating',
      dimensions: 'Suitable for D-Type (Bulk) & B-Type (Ward) Oxygen Cylinders',
      loadCapacity: '90 kg (accommodates full oxygen cylinder with regulator)',
      finish: 'High-visibility scratch-resistant clinical blue epoxy powder coat',
      castors: '200 mm solid rubber heavy-duty wheels with steel rim & roller bearings',
      warranty: '24 Months Warranty'
    },
    keyFeatures: [
      'Heavy steel safety chain firmly locks cylinder to avoid accidental drops',
      'Curved dual saddle supports hold cylinder snugly in centered upright stance',
      'Large 200mm solid wheels glide effortlessly over ramps, thresholds, and lifts',
      'Ergonomically tilted rubberized push handle for comfortable nurse handling'
    ],
    applications: ['Emergency Casualty', 'General Ward Gas Supply', 'Ambulance & Triage', 'ICU Backup Lines'],
    certifications: ['PESO Gas Handling Safety Standard', 'ISO 9001:2015'],
    inStock: true,
    leadTime: 'Immediate Dispatch / 24 hrs',
    isFeatured: false
  },
  {
    id: 'stainless-double-basin-stand',
    modelCode: 'BK-BS-25',
    name: 'SS 304 Double Basin & Wash Bowl Stand',
    category: 'examination',
    categoryLabel: 'Examination & OT',
    subtitle: 'Mobile dual stainless steel wash basin stand for OT & clean rooms',
    description: 'Designed for sterile scrubbing, surgical hand disinfection, and sponge holding in operation theatres. Constructed entirely in AISI 304 stainless steel with two deep drawn seamless removable basins and rubber sound-dampening ring liners.',
    image: '/assets/images/product_dressing_trolley_1792303340011.jpg',
    specs: {
      material: '100% AISI Grade 304 Stainless Steel Tubular Frame and Pressed Bowls',
      dimensions: '800 mm (W) × 400 mm (D) × 850 mm (H) | Bowl Dia: 350 mm',
      loadCapacity: '40 kg',
      finish: 'Mirror/Satin surgical stainless steel polish',
      castors: '50 mm antistatic swivel castors with diagonal brakes',
      warranty: '36 Months Rust-Proof Warranty'
    },
    keyFeatures: [
      'Includes two 350mm deep drawn sterilizable stainless steel basins',
      'Rubber-cushioned basin holding rings prevent rattling and metal scraping sounds',
      'Welded heavy tubular framework resists tipping when basins are full of solution',
      'Complete surgical grade metallurgy prevents chemical pitting and discoloration'
    ],
    applications: ['Operation Theatres', 'Labour / Maternity Rooms', 'Surgical Scrub Rooms', 'Emergency Trauma'],
    certifications: ['AISI 304 Stainless Steel Metallurgy Verified', 'ISO 13485:2016'],
    inStock: true,
    leadTime: 'Immediate Dispatch / 24 hrs',
    isFeatured: false
  },
  {
    id: 'telescopic-iv-stand',
    modelCode: 'BK-IVS-05',
    name: 'Telescopic Saline & IV Infusion Stand',
    category: 'ward',
    categoryLabel: 'Patient Room & Ward',
    subtitle: '5-Prong weighted base mobile IV drip stand with 4 stainless hooks',
    description: 'Mobile telescopic intravenous infusion stand featuring a heavy cast iron weighted base to prevent tipping, stainless steel telescopic upright pole with ergonomic quick-lock friction knob, 4 ram-horn safety hooks, and smooth-gliding nylon castors.',
    image: '/assets/images/product_patient_stretcher_1792303359194.jpg',
    specs: {
      material: 'Grade 304 Stainless Steel Pole with Heavy Cast Iron / Poly Covered Base',
      dimensions: 'Height Adjustable: 1350 mm to 2400 mm | Base Diameter: 550 mm',
      loadCapacity: '15 kg hook capacity (up to 4 infusion bags / infusion pumps)',
      finish: 'Satin Stainless Steel with Medical Blue Heavy Base',
      castors: '50 mm five-star swivel nylon castors',
      adjustments: 'Smooth friction lock knob allows instant single-handed height setting',
      warranty: '24 Months Warranty'
    },
    keyFeatures: [
      'Heavy low-center-of-gravity 5-prong base prevents tipping even when pushed briskly',
      'Four stainless steel ram-horn curl hooks securely hold IV bottles and blood bags',
      'Optional clamp bracket for mounting electronic syringe and volumetric infusion pumps',
      'Telescopic pole with internal air-cushion drop damper protects equipment'
    ],
    applications: ['ICU & CCU Patient Bays', 'Dialysis Units', 'General Patient Beds', 'Chemotherapy Daycare'],
    certifications: ['Medical Device Class I Standard', 'ISO 9001:2015'],
    inStock: true,
    leadTime: 'Immediate Dispatch / 24 hrs',
    isFeatured: false
  },
    {
    id: 'hospital-semi-fowler-bed',
    modelCode: 'BK001',
    name: 'Hospital Semi-Fowler Bed',
    category: 'beds',
    categoryLabel: 'Hospital Beds',
    subtitle: 'Manual one-function hospital bed with adjustable backrest',
    description: 'Designed for hospitals, nursing homes, and patient care facilities. Features a sturdy mild steel frame with epoxy powder coating, manual backrest adjustment, two-section perforated bed platform, removable moulded head and foot panels, and smooth-rolling castors.',
    image: '/assets/images/product_hospital_semi_fowler_bed.jpg',
    specs: {
      material: 'Mild Steel (M.S.) frame with moulded ABS head & foot panels',
      dimensions: '2060 mm (L) × 900 mm (W) × 600 mm (H)',
      loadCapacity: '180 kg safe working load',
      finish: 'Epoxy powder-coated finish',
      castors: '100 mm smooth-rolling castors',
      adjustments: 'Manual backrest adjustment (One Function)',
      warranty: '12 Months Manufacturing Warranty'
    },
    keyFeatures: [
      'Manual one-function backrest adjustment',
      'Two-section perforated bed platform',
      'High-quality removable moulded head and foot panels',
      'Durable epoxy powder-coated mild steel frame',
      'Smooth-rolling castors for easy mobility'
    ],
    applications: [
      'General Hospital Wards',
      'Nursing Homes',
      'Clinics',
      'Patient Recovery Rooms'
    ],
    certifications: [],
    inStock: true,
    leadTime: '3 - 5 business days',
    isFeatured: false
  },
];

export const COMPANY_DETAILS = {
  name: 'B K FABRICATION',
  legalName: 'BK Fabrication - Medical Equipment & Hospital Furniture Manufacturing Co.',
  tagline: 'A Work of Perfect Design',
  phones: ['9591244345', '7892253940'],
  phoneDisplay: ['+91 95912 44345', '+91 78922 53940'],
  email: 'bkfabrication21@gmail.com',
  address: 'Industrial Area, Bangalore, Karnataka, India',
  established: '2012',
  certifications: ['ISO 9001:2015', 'ISO 13485:2016 Compliant', 'CE Certified Design', 'Grade 304 SS Tested'],
  stats: [
    { label: 'Hospital Installations', value: '750+' },
    { label: 'Standard Catalog Models', value: '45+' },
    { label: 'Grade 304 Steel Assurance', value: '100%' },
    { label: 'Custom Fabrication Lead Time', value: '5-7 Days' }
  ]
};
