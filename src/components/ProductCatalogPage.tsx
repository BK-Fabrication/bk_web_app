import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  LayoutGrid, 
  Table, 
  Check, 
  Plus, 
  ArrowLeft, 
  X, 
  FileText, 
  ArrowRight,
  Filter,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { MedicalProduct, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogPageProps {
  products: MedicalProduct[];
  onSelectProductSpecs: (product: MedicalProduct) => void;
  onQuickView: (product: MedicalProduct) => void;
  onAddToQuote: (product: MedicalProduct) => void;
  quoteIds: Set<string>;
  onToggleCompare: (product: MedicalProduct) => void;
  comparedIds: Set<string>;
  onBackToHome: () => void;
  onOpenQuote: () => void;
}

export const ProductCatalogPage: React.FC<ProductCatalogPageProps> = ({
  products,
  onSelectProductSpecs,
  onAddToQuote,
  quoteIds,
  onToggleCompare,
  comparedIds,
  onBackToHome,
  onOpenQuote,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<'all' | 'ss304' | 'powder'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'model' | 'name'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const categories: { id: ProductCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Products', count: products.length },
    { id: 'beds', label: 'ICU & Hospital Beds', count: products.filter(p => p.category === 'beds').length },
    { id: 'trolleys', label: 'Crash Carts & Trolleys', count: products.filter(p => p.category === 'trolleys').length },
    { id: 'examination', label: 'Examination & OT', count: products.filter(p => p.category === 'examination').length },
    { id: 'ward', label: 'Ward & Patient Care', count: products.filter(p => p.category === 'ward').length },
  ];

  const quickSearchTags = [
    'ICU Bed',
    'Crash Cart',
    'Dressing Trolley',
    'Examination Couch',
    'Baby Crib',
    'Bedside Locker',
    'SS 304',
    'Oxygen Trolley'
  ];

  // Filtering products by name, category, model code, or material
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (activeCategory !== 'all' && p.category !== activeCategory) {
          return false;
        }

        // Material filter
        if (selectedMaterial === 'ss304') {
          if (!p.specs.material.toLowerCase().includes('304') && !p.name.toLowerCase().includes('ss')) {
            return false;
          }
        } else if (selectedMaterial === 'powder') {
          if (!p.specs.material.toLowerCase().includes('crca') && !p.specs.material.toLowerCase().includes('powder') && !p.specs.material.toLowerCase().includes('steel')) {
            return false;
          }
        }

        // Search query filter (matches name, category label, category id, model code, description, material, or key features)
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCategory = p.categoryLabel.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
          const matchCode = p.modelCode.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchMat = p.specs.material.toLowerCase().includes(q);
          const matchFeat = p.keyFeatures.some((f) => f.toLowerCase().includes(q));
          return matchName || matchCategory || matchCode || matchDesc || matchMat || matchFeat;
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

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSelectedMaterial('all');
    setSortBy('featured');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBackToHome}
            className="text-xs font-semibold text-slate-600 hover:text-orange-600 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="text-xs text-slate-500 font-mono">
            Direct Manufacturer Catalog · ISO 9001:2015 & CE
          </div>
        </div>

        {/* Page Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-6 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
                Complete Manufacturer Inventory
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Hospital Equipment & Furniture Catalog
              </h1>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                Browse our complete manufacturing inventory of medical ICU motorized beds, emergency resuscitation carts,
                surgical stainless steel trolleys, examination couches, and ward equipment. Filter by name or category below.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={onOpenQuote}
                className="px-5 py-3 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-md"
              >
                <FileText className="w-4 h-4" />
                <span>Open Quotation Basket</span>
                {quoteIds.size > 0 && (
                  <span className="w-5 h-5 rounded-full bg-white text-orange-700 text-xs font-black flex items-center justify-center">
                    {quoteIds.size}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* Dedicated Responsive Search & Filter Command Center */}
        {/* ========================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 mb-8 shadow-sm space-y-5">
          {/* Main Search Input & Category Dropdown Bar */}
          <div className="flex flex-col md:flex-row items-stretch gap-3">
            {/* Search Input with Integrated Clear Button */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-orange-600" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name (e.g. ICU Bed, Crash Cart) or category (Beds, Trolleys, Ward)..."
                className="w-full pl-11 pr-10 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-2xs font-medium"
                aria-label="Search products by name or category"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  title="Clear search input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Dropdown (Integrated alongside search) */}
            <div className="w-full md:w-64 shrink-0">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value as ProductCategory)}
                className="w-full py-3 px-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-2xs cursor-pointer"
                aria-label="Filter by product category"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label} ({cat.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Search Suggestion Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Popular searches:</span>
            </span>
            {quickSearchTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer border ${
                  searchQuery.toLowerCase() === tag.toLowerCase()
                    ? 'bg-orange-600 text-white border-orange-600 font-bold'
                    : 'bg-slate-50 hover:bg-orange-50 text-slate-600 hover:text-orange-700 border-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
            {(searchQuery || activeCategory !== 'all' || selectedMaterial !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="ml-auto text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>

          {/* Category Tabs & Secondary Controls */}
          <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Segmented Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-orange-600 text-white shadow-2xs'
                        : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50 bg-slate-50'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isActive ? 'bg-orange-700 text-orange-100' : 'bg-slate-200 text-slate-600'}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Metallurgy, Sort, and View Switcher */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {/* Metallurgy Filter */}
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value as any)}
                className="py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Filter by material"
              >
                <option value="all">All Metallurgy</option>
                <option value="ss304">SS 304 Only</option>
                <option value="powder">Epoxy Powder Coated</option>
              </select>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="model">Model Code</option>
                <option value="name">Name (A-Z)</option>
              </select>

              {/* Grid / Table View Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white text-orange-600 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Card Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="text-[11px] hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-white text-orange-600 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Technical Specifications Table View"
                >
                  <Table className="w-3.5 h-3.5" />
                  <span className="text-[11px] hidden sm:inline">Table</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Search / Filter Status Banner */}
          {(searchQuery || activeCategory !== 'all' || selectedMaterial !== 'all') && (
            <div className="p-3 bg-orange-50/70 border border-orange-200 rounded-xl text-xs text-orange-950 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-orange-600 shrink-0" />
                <span>
                  Found <strong className="font-bold text-orange-700">{filteredProducts.length}</strong> matching products
                  {searchQuery && (
                    <> for "<span className="font-semibold text-slate-900">{searchQuery}</span>"</>
                  )}
                  {activeCategory !== 'all' && (
                    <> in category <span className="font-semibold text-slate-900">{categories.find(c => c.id === activeCategory)?.label}</span></>
                  )}
                  {selectedMaterial !== 'all' && (
                    <> with material <span className="font-semibold text-slate-900">{selectedMaterial === 'ss304' ? 'SS 304' : 'Powder Coated Steel'}</span></>
                  )}
                </span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-orange-700 hover:text-orange-900 hover:underline cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 font-mono">
          <span>Showing <strong className="text-orange-600 font-bold">{filteredProducts.length}</strong> of {products.length} models</span>
          <span className="hidden sm:inline">Click any product to view its individual engineering specification sheet</span>
        </div>

        {/* Product Listing */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-2xs">
            <SlidersHorizontal className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No medical equipment matching your search</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
              We couldn't find any products matching "{searchQuery}". Try searching for terms like "Bed", "Trolley", "Crash Cart", "Stool", or "SS 304".
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProductSpecs}
                onViewSpecsPage={onSelectProductSpecs}
                onAddToQuote={onAddToQuote}
                isInQuote={quoteIds.has(product.id)}
                onToggleCompare={onToggleCompare}
                isCompared={comparedIds.has(product.id)}
              />
            ))}
          </div>
        ) : (
          /* Technical Specification Table View */
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Model & Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Primary Metallurgy</th>
                    <th className="py-3 px-4">Dimensions</th>
                    <th className="py-3 px-4">Load Capacity</th>
                    <th className="py-3 px-4">Lead Time</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => {
                    const inQuote = quoteIds.has(p.id);
                    return (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-10 h-10 object-contain rounded bg-slate-50 p-1 border border-slate-200 shrink-0 cursor-pointer"
                              referrerPolicy="no-referrer"
                              onClick={() => onSelectProductSpecs(p)}
                            />
                            <div>
                              <span className="font-mono text-orange-600 font-bold block">
                                {p.modelCode}
                              </span>
                              <button
                                onClick={() => onSelectProductSpecs(p)}
                                className="font-bold text-slate-900 hover:text-orange-600 text-left transition-colors cursor-pointer"
                              >
                                {p.name}
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{p.categoryLabel}</td>
                        <td className="py-3 px-4 text-slate-700 font-medium max-w-xs truncate">
                          {p.specs.material}
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-mono tabular-nums">
                          {p.specs.dimensions}
                        </td>
                        <td className="py-3 px-4 text-slate-700 font-mono tabular-nums">
                          {p.specs.loadCapacity || 'Standard'}
                        </td>
                        <td className="py-3 px-4 text-emerald-700 font-medium">
                          {p.leadTime}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => onSelectProductSpecs(p)}
                              className="px-2.5 py-1.5 text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                              title="Open Specification Page"
                            >
                              <span>Specs</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onAddToQuote(p)}
                              className={`px-2.5 py-1.5 rounded font-bold transition-colors flex items-center gap-1 ${
                                inQuote
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-orange-600 text-white hover:bg-orange-700'
                              }`}
                            >
                              {inQuote ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                              <span className="text-[11px]">{inQuote ? 'Added' : 'Quote'}</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
