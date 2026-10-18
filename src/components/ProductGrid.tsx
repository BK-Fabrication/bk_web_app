import React, { useState, useEffect, useMemo } from 'react';
import { PackageOpen, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const INITIAL_COUNT = 8;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // Products in descending insertion order (newest inserted first)
  const filteredProducts = useMemo(() => {
    let result = [...products].reverse();
    if (activeCategory && activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }
    return result;
  }, [products, activeCategory]);

  // Reset visible count when active category changes
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [activeCategory]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  return (
    <section id="products-section" className="max-w-7xl mx-auto px-6 py-16">
      {/* Section Header with View All Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="max-w-2xl">
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

        <Link
          to="/catalog"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-600 hover:text-white rounded-xl transition-all border border-orange-200 hover:border-orange-600 shadow-2xs shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <span>View All Products</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
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
        <>
          {/* Responsive 3-to-4 column product cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
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

          {/* Load More Button */}
          {visibleCount < filteredProducts.length ? (
            <div className="mt-10 flex flex-col items-center justify-center gap-2">
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="px-6 py-3 bg-white border border-slate-300 hover:border-orange-500 hover:bg-orange-50 text-slate-800 hover:text-orange-600 font-bold text-xs sm:text-sm rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer hover:shadow-sm"
              >
                <span>Load More Products</span>
                <span className="text-xs text-orange-600 font-medium">({filteredProducts.length - visibleCount} remaining)</span>
                <ChevronDown className="w-4 h-4 text-orange-600" />
              </button>
              <span className="text-[11px] text-slate-500 font-mono">
                Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length} models
              </span>
            </div>
          ) : filteredProducts.length > INITIAL_COUNT ? (
            <div className="mt-8 text-center text-xs text-slate-400 font-mono">
              All {filteredProducts.length} models displayed
            </div>
          ) : null}
        </>
      )}
    </section>
  );
};
