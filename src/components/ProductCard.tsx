import React, { useState } from 'react';
import { Plus, Check, Eye, Layers } from 'lucide-react';
import { MedicalProduct } from '../types';

interface ProductCardProps {
  product: MedicalProduct;
  onSelect: (product: MedicalProduct) => void;
  onViewSpecsPage?: (product: MedicalProduct) => void;
  onAddToQuote: (product: MedicalProduct) => void;
  isInQuote: boolean;
  onToggleCompare: (product: MedicalProduct) => void;
  isCompared: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onViewSpecsPage,
  onAddToQuote,
  isInQuote,
  onToggleCompare,
  isCompared,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-orange-500 hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden">
      {/* Product Image Stage (65-70% visual focus on clean neutral surface) */}
      <div
        onClick={() => onSelect(product)}
        className="relative h-64 bg-slate-50/80 cursor-pointer overflow-hidden border-b border-slate-100 flex items-center justify-center p-4"
      >
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 p-6 text-center">
            <Layers className="w-12 h-12 text-slate-300 mb-2" />
            <span className="text-xs font-semibold text-slate-600">{product.name}</span>
            <span className="text-[11px] text-slate-400 mt-1">{product.modelCode}</span>
          </div>
        )}

        {/* Quiet compare button in top right */}
        <div className="absolute top-3 right-3 z-10" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onToggleCompare(product)}
            className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              isCompared
                ? 'bg-orange-600 text-white shadow-2xs'
                : 'bg-white/90 text-slate-700 hover:text-orange-600 hover:bg-white border border-slate-200 shadow-2xs'
            }`}
            title="Compare specifications side-by-side"
          >
            <span>{isCompared ? 'Compared' : 'Compare'}</span>
          </button>
        </div>

        {/* Subtle quick view hover overlay */}
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3.5 py-1.5 text-xs font-bold text-slate-900 bg-white/95 rounded-lg shadow-sm flex items-center gap-1.5 border border-slate-200">
            <Eye className="w-3.5 h-3.5 text-orange-600" />
            <span>Quick Specs</span>
          </span>
        </div>
      </div>

      {/* Product Content & Typography */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>

          <h3
            onClick={() => onSelect(product)}
            className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.subtitle}
          </p>

          {/* Quick Technical Highlights (Unboxed) */}
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
            <div className="flex items-start justify-between gap-2">
              <span className="text-slate-400 shrink-0">Material:</span>
              <span className="font-medium text-slate-700 text-right truncate">
                {product.specs.material.split('+')[0]}
              </span>
            </div>
            {product.specs.loadCapacity && (
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-400 shrink-0">Capacity:</span>
                <span className="font-mono text-slate-700 tabular-nums">
                  {product.specs.loadCapacity.split(' ')[0]} {product.specs.loadCapacity.split(' ')[1] || ''}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Action Bar with Brand Colors */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => onViewSpecsPage ? onViewSpecsPage(product) : onSelect(product)}
            className="flex-1 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-orange-600 bg-slate-100 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-orange-200"
          >
            Full Specs
          </button>

          <button
            onClick={() => onAddToQuote(product)}
            className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs ${
              isInQuote
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white'
            }`}
          >
            {isInQuote ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>In Quote</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add Quote</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
