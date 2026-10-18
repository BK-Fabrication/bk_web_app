import React from 'react';
import { HomeImageSlider } from './HomeImageSlider';
import { ProductGrid } from './ProductGrid';
import { CustomFabrication } from './CustomFabrication';
import { QualitySection } from './QualitySection';
import { ContactSection } from './ContactSection';
import { SEO } from './SEO';
import { MedicalProduct, ProductCategory } from '../types';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HomePageViewProps {
  products: MedicalProduct[];
  activeCategory: ProductCategory;
  setActiveCategory: (cat: ProductCategory) => void;
  quoteIds: Set<string>;
  comparedIds: Set<string>;
  onSelectProduct: (product: MedicalProduct) => void;
  onAddToQuote: (product: MedicalProduct) => void;
  onToggleCompare: (product: MedicalProduct) => void;
  onOpenQuote: () => void;
  onAddCustomProduct: (product: MedicalProduct) => void;
}

export const HomePageView: React.FC<HomePageViewProps> = ({
  products,
  activeCategory,
  setActiveCategory,
  quoteIds,
  comparedIds,
  onSelectProduct,
  onAddToQuote,
  onToggleCompare,
  onOpenQuote,
  onAddCustomProduct,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Homepage Master SEO & LocalBusiness / Manufacturer Structured Data */}
      <SEO
        title="BK Fabrication - Hospital Furniture & Medical Equipment Manufacturer"
        description="Leading direct manufacturer of ICU hospital beds, emergency crash carts, SS 304 medical trolleys, surgical couches, and ward furniture with factory wholesale pricing in India."
        canonical={typeof window !== 'undefined' ? window.location.origin : undefined}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'MedicalBusiness',
          name: 'BK Fabrication',
          alternateName: 'BK Fabrication Medical Equipment',
          url: typeof window !== 'undefined' ? window.location.origin : 'https://bkfabrication.com',
          telephone: '+919591244345',
          email: 'bkfabrication786@gmail.com',
          description: 'Manufacturer of ICU hospital beds, stainless steel dressing trolleys, emergency crash carts, and hospital ward furniture in Bangalore, India.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Bangalore',
            addressRegion: 'Karnataka',
            addressCountry: 'IN'
          },
          priceRange: '₹₹',
          openingHours: 'Mo-Sa 09:00-19:30'
        }}
      />

      {/* Professional 4-Image Showcase Slider */}
      <HomeImageSlider
        onExploreClick={() => navigate('/catalog')}
        onOpenQuote={onOpenQuote}
        onSelectProduct={(productId) => {
          const p = products.find((prod) => prod.id === productId);
          if (p) onSelectProduct(p);
          else navigate('/catalog');
        }}
      />

      {/* Featured Product Catalog Section */}
      <div className="relative">
        <ProductGrid
          products={products}
          onSelectProduct={onSelectProduct}
          onViewSpecsPage={onSelectProduct}
          onAddToQuote={onAddToQuote}
          quoteIds={quoteIds}
          onToggleCompare={onToggleCompare}
          comparedIds={comparedIds}
          activeCategory={activeCategory}
          onCategoryChange={(cat) => setActiveCategory(cat)}
        />

        {/* Direct Full Catalog Banner Callout */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-slate-700">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                Need Complete Factory Price List or Full Catalog?
              </div>
              <h3 className="text-xl font-bold text-white">
                Explore All {products.length} Hospital Furniture Models & Custom Accessories
              </h3>
              <p className="text-xs text-slate-400 max-w-xl">
                Check complete technical specifications, exact dimensions, trolley models, and get instant direct factory wholesale quotation.
              </p>
            </div>

            <button
              onClick={() => navigate('/catalog')}
              className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer hover:shadow-md shrink-0"
            >
              <span>View Full Product Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Hospital Equipment Fabrication */}
      <CustomFabrication onAddCustomProduct={onAddCustomProduct} />

      {/* Quality, Metallurgy & ISO Standards */}
      <QualitySection />

      {/* Contact & Direct Factory Inquiry */}
      <ContactSection />
    </>
  );
};

