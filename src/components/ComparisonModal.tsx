import React from 'react';
import { X, Check, Trash2, Plus } from 'lucide-react';
import { MedicalProduct } from '../types';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: MedicalProduct[];
  onRemoveFromCompare: (productId: string) => void;
  onAddToQuote: (product: MedicalProduct) => void;
  quoteIds: Set<string>;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  comparedProducts,
  onRemoveFromCompare,
  onAddToQuote,
  quoteIds,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Technical Product Comparison ({comparedProducts.length} Models)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Side-by-side metallurgical, dimensional, and mechanical engineering analysis
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-x-auto">
          {comparedProducts.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No products selected for comparison. Click "Compare" on any product card.
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr>
                  <th className="p-3 bg-slate-100 font-semibold text-slate-700 w-1/4 border-b border-slate-200">
                    Specification
                  </th>
                  {comparedProducts.map((p) => (
                    <th
                      key={p.id}
                      className="p-3 bg-slate-50 border-b border-slate-200 align-top min-w-[220px]"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-mono text-orange-600 font-bold">{p.modelCode}</span>
                        <button
                          onClick={() => onRemoveFromCompare(p.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Remove from comparison"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-24 h-24 object-contain mx-auto bg-white p-1 rounded-md border border-slate-200 mb-2"
                        referrerPolicy="no-referrer"
                      />
                      <div className="font-bold text-slate-900 text-sm line-clamp-1">{p.name}</div>
                      <div className="text-[11px] text-slate-500">{p.categoryLabel}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Primary Metallurgy</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 font-medium">
                      {p.specs.material}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Metric Dimensions</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 font-mono tabular-nums">
                      {p.specs.dimensions}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Safe Working Load</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 font-mono tabular-nums font-semibold text-slate-800">
                      {p.specs.loadCapacity || 'Standard'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Surface Pre-Treatment</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3">
                      {p.specs.finish}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Mobility & Castors</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3">
                      {p.specs.castors || 'Stationary / Rubber Glides'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Warranty Support</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-orange-600 font-bold">
                      {p.specs.warranty}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Direct RFQ Action</td>
                  {comparedProducts.map((p) => {
                    const inQuote = quoteIds.has(p.id);
                    return (
                      <td key={p.id} className="p-3">
                        <button
                          onClick={() => onAddToQuote(p)}
                          className={`w-full py-2 px-3 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                            inQuote
                              ? 'bg-emerald-600 text-white'
                              : 'bg-orange-600 hover:bg-orange-700 text-white'
                          }`}
                        >
                          {inQuote ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to RFQ</span>
                            </>
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-slate-700 cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
