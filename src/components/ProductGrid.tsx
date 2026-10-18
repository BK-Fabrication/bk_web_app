import React, { useMemo } from 'react';
import { PackageOpen } from 'lucide-react';
import { MedicalProduct, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: MedicalProduct[];
  onSelectProduct: (product: MedicalProduct) => void;
  onViewSpecsPage?: (product: MedicalProduct) => void;
  onAddToQuote: (product: MedicalProduct) => void;
  quoteIds: Set<string>;
  onToggleCompare: (product: MedicalProduct) => void;
  comparedIds: Set<string>;
  activeCategory?: ProductCategory;
  onCategoryChange?: (cat: ProductCategory) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  onViewSpecsPage,
  onAddToQuote,
  quoteIds,
  onToggleCompare,
  comparedIds,
  activeCategory = 'all',
  onCategoryChange,
}) => {
  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCategory && activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }
    return [...result].sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [products, activeCategory]);

  return (
    <section id="products-section" className="max-w-7xl mx-auto px-6 py-16">
      {/* Section Header */}
      <div className="mb-8 max-w-3xl">
        <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
          Direct Factory Catalogue & Ready Stock
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Hospital Furniture & Medical Ward Equipment
        </h2>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Manufactured using heavy-gauge steel pipe and rust-proof SS 304 stainless steel for 15+ years of rough hospital use.
          Click any product below to check dimensions, full technical specifications, or get direct factory rate quotation.
        </p>
      </div>

      {/* Main Content Area */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <PackageOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No hospital equipment available</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Currently no products found. Call our factory directly at +91 95912 44345 for custom fabrication or ready stock inquiries.
          </p>
          {onCategoryChange && (
            <button
              onClick={() => onCategoryChange('all')}
              className="px-4 py-2 text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors cursor-pointer"
            >
              Show All Products
            </button>
          )}
        </div>
      ) : (
        /* Responsive 3-to-4 column product cards grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onViewSpecsPage={onViewSpecsPage}
              onAddToQuote={onAddToQuote}
              isInQuote={quoteIds.has(product.id)}
              onToggleCompare={onToggleCompare}
              isCompared={comparedIds.has(product.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
