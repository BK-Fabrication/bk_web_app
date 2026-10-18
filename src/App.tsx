import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HomeImageSlider } from './components/HomeImageSlider';
import { ProductGrid } from './components/ProductGrid';
import { ProductCatalogPage } from './components/ProductCatalogPage';
import { ProductSpecificationPage } from './components/ProductSpecificationPage';
import { ProductModal } from './components/ProductModal';
import { QuotationDrawer } from './components/QuotationDrawer';
import { ComparisonModal } from './components/ComparisonModal';
import { CustomFabrication } from './components/CustomFabrication';
import { QualitySection } from './components/QualitySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MEDICAL_PRODUCTS } from './data/products';
import { MedicalProduct, ProductCategory, QuoteItem } from './types';
import { ArrowRight } from 'lucide-react';

export type CurrentView = 'home' | 'catalog' | 'specification';

export default function App() {
  const [products, setProducts] = useState<MedicalProduct[]>(MEDICAL_PRODUCTS);
  const [currentView, setCurrentView] = useState<CurrentView>('home');
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [activeNav, setActiveNav] = useState<string>('hero');

  // Individual specification page product ID
  const [selectedSpecProductId, setSelectedSpecProductId] = useState<string>(MEDICAL_PRODUCTS[0].id);

  // Quotation RFQ Basket state
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>(() => {
    try {
      const saved = localStorage.getItem('bk_quote_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // Comparison state (up to 4 items)
  const [comparedIds, setComparedIds] = useState<Set<string>>(new Set());
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Quick Modal spec sheet state
  const [quickViewProduct, setQuickViewProduct] = useState<MedicalProduct | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('bk_quote_items', JSON.stringify(quoteItems));
    } catch (err) {
      console.error('Failed to save quote items', err);
    }
  }, [quoteItems]);

  const quoteIds = new Set(quoteItems.map((item) => item.product.id));

  const handleAddToQuote = (product: MedicalProduct) => {
    setQuoteItems((prev) => {
      const existing = prev.find((it) => it.product.id === product.id);
      if (existing) {
        return prev.map((it) =>
          it.product.id === product.id ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveQuoteItem(productId);
      return;
    }
    setQuoteItems((prev) =>
      prev.map((it) => (it.product.id === productId ? { ...it, quantity } : it))
    );
  };

  const handleRemoveQuoteItem = (productId: string) => {
    setQuoteItems((prev) => prev.filter((it) => it.product.id !== productId));
  };

  const handleClearQuote = () => {
    setQuoteItems([]);
  };

  const handleToggleCompare = (product: MedicalProduct) => {
    setComparedIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
      } else {
        if (next.size >= 4) {
          alert('You can compare a maximum of 4 products simultaneously.');
          return prev;
        }
        next.add(product.id);
      }
      return next;
    });
  };

  const handleRemoveFromCompare = (productId: string) => {
    setComparedIds((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  };

  const handleAddCustomProduct = (customProduct: MedicalProduct) => {
    setProducts((prev) => [customProduct, ...prev]);
    handleAddToQuote(customProduct);
    setIsQuoteOpen(true);
  };

  // Navigate directly to individual specification page for a product
  const handleOpenIndividualSpecs = (product: MedicalProduct) => {
    setSelectedSpecProductId(product.id);
    setCurrentView('specification');
    setActiveNav('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (section: string) => {
    setActiveNav(section);

    if (section === 'hero') {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'catalog') {
      setCurrentView('catalog');
      setActiveCategory('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'beds') {
      setCurrentView('catalog');
      setActiveCategory('beds');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'custom') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          document.getElementById('custom-fabrication')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('custom-fabrication')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (section === 'quality') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          document.getElementById('quality-standards')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('quality-standards')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (section === 'contact') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const comparedProducts = products.filter((p) => comparedIds.has(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Header - No Specification Link */}
      <Header
        quoteCount={quoteItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenQuote={() => setIsQuoteOpen(true)}
        activeNav={activeNav}
        onNavigate={handleNavigate}
        compareCount={comparedIds.size}
        onOpenCompare={() => setIsCompareOpen(true)}
        onSelectProduct={handleOpenIndividualSpecs}
      />

      <main className="flex-1">
        {currentView === 'catalog' ? (
          /* Dedicated Full Product Catalog Page */
          <ProductCatalogPage
            products={products}
            onSelectProductSpecs={handleOpenIndividualSpecs}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToQuote={handleAddToQuote}
            quoteIds={quoteIds}
            onToggleCompare={handleToggleCompare}
            comparedIds={comparedIds}
            onBackToHome={() => handleNavigate('hero')}
            onOpenQuote={() => setIsQuoteOpen(true)}
          />
        ) : currentView === 'specification' ? (
          /* Individual Product Specification Page */
          <ProductSpecificationPage
            initialProductId={selectedSpecProductId}
            onBackToCatalog={() => {
              setCurrentView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToQuote={handleAddToQuote}
            isInQuote={quoteIds.has(selectedSpecProductId)}
            onOpenQuote={() => setIsQuoteOpen(true)}
          />
        ) : (
          /* Home Landing View */
          <>
            {/* Hero Section (Commented out) */}
            {/* 
            <Hero
              onExploreClick={() => handleNavigate('catalog')}
              onCustomClick={() => handleNavigate('custom')}
              onOpenQuote={() => setIsQuoteOpen(true)}
            />
            */}

            {/* Professional 4-Image Showcase Slider */}
            <HomeImageSlider
              onExploreClick={() => handleNavigate('catalog')}
              onOpenQuote={() => setIsQuoteOpen(true)}
              onSelectProduct={(productId) => {
                const p = products.find((prod) => prod.id === productId);
                if (p) handleOpenIndividualSpecs(p);
                else handleNavigate('catalog');
              }}
            />

            {/* Featured Product Catalog Section */}
            <div className="relative">
              <ProductGrid
                products={products}
                onSelectProduct={handleOpenIndividualSpecs}
                onViewSpecsPage={handleOpenIndividualSpecs}
                onAddToQuote={handleAddToQuote}
                quoteIds={quoteIds}
                onToggleCompare={handleToggleCompare}
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
                    onClick={() => handleNavigate('catalog')}
                    className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer hover:shadow-md shrink-0"
                  >
                    <span>View Full Product Catalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Custom Hospital Equipment Fabrication */}
            <CustomFabrication onAddCustomProduct={handleAddCustomProduct} />

            {/* Quality, Metallurgy & ISO Standards */}
            <QualitySection />

            {/* Contact & Direct Factory Inquiry */}
            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          handleNavigate('catalog');
        }}
      />

      {/* Quick View Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToQuote={handleAddToQuote}
        isInQuote={quickViewProduct ? quoteIds.has(quickViewProduct.id) : false}
        onToggleCompare={handleToggleCompare}
        isCompared={quickViewProduct ? comparedIds.has(quickViewProduct.id) : false}
        onViewSpecsPage={handleOpenIndividualSpecs}
      />

      {/* Request For Quotation (RFQ) Slide-Over Drawer */}
      <QuotationDrawer
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        items={quoteItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveQuoteItem}
        onClearQuote={handleClearQuote}
      />

      {/* Product Comparison Matrix Modal */}
      <ComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedProducts={comparedProducts}
        onRemoveFromCompare={handleRemoveFromCompare}
        onAddToQuote={handleAddToQuote}
        quoteIds={quoteIds}
      />
    </div>
  );
}
