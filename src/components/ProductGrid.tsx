import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
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
  activeCategory: ProductCategory;
  onCategoryChange: (cat: ProductCategory) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  onViewSpecsPage,
  onAddToQuote,
  quoteIds,
  onToggleCompare,
  comparedIds,
  activeCategory,
  onCategoryChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<'all' | 'ss304' | 'powder'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'model' | 'name'>('featured');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Hospital Furniture' },
    { id: 'beds', label: 'ICU & Hospital Beds' },
    { id: 'trolleys', label: 'Crash Carts & Trolleys' },
    { id: 'examination', label: 'Examination & OT' },
    { id: 'ward', label: 'Ward & Patient Care' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (activeCategory !== 'all' && p.category !== activeCategory) {
          return false;
        }

        if (selectedMaterial === 'ss304') {
          if (!p.specs.material.toLowerCase().includes('304') && !p.name.toLowerCase().includes('ss')) {
            return false;
          }
        } else if (selectedMaterial === 'powder') {
          if (!p.specs.material.toLowerCase().includes('crca') && !p.specs.material.toLowerCase().includes('powder') && !p.specs.material.toLowerCase().includes('steel')) {
            return false;
          }
        }

        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCode = p.modelCode.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchMat = p.specs.material.toLowerCase().includes(q);
          const matchFeat = p.keyFeatures.some((f) => f.toLowerCase().includes(q));
          return matchName || matchCode || matchDesc || matchMat || matchFeat;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'model') {
          return a.modelCode.localeCompare(b.modelCode);
        }
        return a.name.localeCompare(b.name);
      });
  }, [products, activeCategory, selectedMaterial, searchQuery, sortBy]);

  return (
    <section id="products-section" className="max-w-7xl mx-auto px-6 py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
            Direct Factory Catalogue & Ready Stock
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Hospital Furniture & Medical Ward Equipment
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Manufactured using heavy-gauge steel pipe and rust-proof SS 304 stainless steel for 15+ years of rough hospital use.
            Click any product below to check dimensions, full technical specifications, or get direct factory rate quotation.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-mono tabular-nums shrink-0">
          Ready Stock Available: <span className="font-bold text-orange-600">{filteredProducts.length}</span> models
        </div>
      </div>

      {/* Filter and Search Bar Controls (Segmented functional buttons) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-8 shadow-2xs space-y-4">
        {/* Row 1: Category Tabs (Segmented Controls with Brand Orange Active State) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-2xs'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Row 2: Search, Material Filter & Sorting */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-100 items-center">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hospital bed, trolley, model code, SS 304..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Material Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">All Materials (SS & Steel)</option>
              <option value="ss304">SS 304 Stainless Steel Only</option>
              <option value="powder">Epoxy Powder Coated Steel</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="sm:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="featured">Best Sellers</option>
              <option value="model">Model Number</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <SlidersHorizontal className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No matching hospital equipment found</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Try searching with another model code or word, or call our factory directly at 95912 44345 for custom sizes.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedMaterial('all');
              onCategoryChange('all');
            }}
            className="px-4 py-2 text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors cursor-pointer"
          >
            Show All Products
          </button>
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
