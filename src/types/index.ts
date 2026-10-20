export type ProductCategory = 
  | 'all'
  | 'beds'
  | 'trolleys'
  | 'examination'
  | 'ward';

export interface ProductSpecification {
  material: string;
  dimensions: string;
  size?: string;
  loadCapacity?: string;
  finish: string;
  castors?: string;
  adjustments?: string;
  warranty: string;
}

export interface MedicalProduct {
  id: string;
  modelCode: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  subtitle: string;
  description: string;
  image: string;
  images?: string[];
  specs: ProductSpecification;
  keyFeatures: string[];
  applications: string[];
  certifications: string[];
  inStock: boolean;
  leadTime: string;
  isFeatured?: boolean;
}

export interface QuoteItem {
  product: MedicalProduct;
  quantity: number;
  notes?: string;
}

export interface QuoteFormData {
  hospitalName: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  timeline: 'Immediate' | 'Within 30 Days' | 'Within 60 Days' | 'Tender / Planning';
  projectType: 'New Hospital Wing' | 'Clinic Upgrade' | 'Government Supply' | 'Standard Replacement';
  customRequirements: string;
}
