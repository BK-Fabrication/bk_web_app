import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePageView } from './components/HomePageView';
import { ProductCatalogPage } from './components/ProductCatalogPage';
import { ProductSpecificationRouteWrapper } from './components/ProductSpecificationRouteWrapper';
import { ProductModal } from './components/ProductModal';
import { QuotationDrawer } from './components/QuotationDrawer';
import { ComparisonModal } from './components/ComparisonModal';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { MEDICAL_PRODUCTS } from './data/products';
import { MedicalProduct, ProductCategory, QuoteItem } from './types';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState<MedicalProduct[]>(MEDICAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');

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

  // Direct router navigation handler for header & footer
  const handleNavigate = (section: string) => {
    if (section === 'hero' || section === 'home') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'catalog') {
      navigate('/catalog');
    } else if (section === 'beds') {
      navigate('/catalog?category=beds');
    } else if (section === 'custom') {
      if (location.pathname !== '/') {
        navigate('/#custom-fabrication');
      } else {
        document.getElementById('custom-fabrication')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (section === 'quality') {
      if (location.pathname !== '/') {
        navigate('/#quality-standards');
      } else {
        document.getElementById('quality-standards')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (section === 'contact') {
      if (location.pathname !== '/') {
        navigate('/#contact-section');
      } else {
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectProduct = (product: MedicalProduct) => {
    navigate(`/products/${product.id}`);
  };

  const comparedProducts = products.filter((p) => comparedIds.has(p.id));

  // Determine activeNav from path
  const currentNav = location.pathname.startsWith('/catalog')
    ? 'catalog'
    : location.pathname.startsWith('/products')
    ? 'catalog'
    : 'hero';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <ScrollToTop />

      {/* Top Header */}
      <Header
        quoteCount={quoteItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenQuote={() => setIsQuoteOpen(true)}
        activeNav={currentNav}
        onNavigate={handleNavigate}
        compareCount={comparedIds.size}
        onOpenCompare={() => setIsCompareOpen(true)}
        onSelectProduct={handleSelectProduct}
      />

      <main className="flex-1">
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <HomePageView
                products={products}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                quoteIds={quoteIds}
                comparedIds={comparedIds}
                onSelectProduct={handleSelectProduct}
                onAddToQuote={handleAddToQuote}
                onToggleCompare={handleToggleCompare}
                onOpenQuote={() => setIsQuoteOpen(true)}
                onAddCustomProduct={handleAddCustomProduct}
              />
            }
          />

          {/* Full Product Catalog Route with Category & Search Query Support */}
          <Route
            path="/catalog"
            element={
              <ProductCatalogPage
                products={products}
                onSelectProductSpecs={handleSelectProduct}
                onQuickView={(p) => setQuickViewProduct(p)}
                onAddToQuote={handleAddToQuote}
                quoteIds={quoteIds}
                onToggleCompare={handleToggleCompare}
                comparedIds={comparedIds}
                onBackToHome={() => navigate('/')}
                onOpenQuote={() => setIsQuoteOpen(true)}
              />
            }
          />

          {/* Individual Product Specification Route with SEO & Rich JSON-LD */}
          <Route
            path="/products/:id"
            element={
              <ProductSpecificationRouteWrapper
                onAddToQuote={handleAddToQuote}
                quoteIds={quoteIds}
                onOpenQuote={() => setIsQuoteOpen(true)}
              />
            }
          />

          {/* Fallback to Home */}
          <Route
            path="*"
            element={
              <HomePageView
                products={products}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                quoteIds={quoteIds}
                comparedIds={comparedIds}
                onSelectProduct={handleSelectProduct}
                onAddToQuote={handleAddToQuote}
                onToggleCompare={handleToggleCompare}
                onOpenQuote={() => setIsQuoteOpen(true)}
                onAddCustomProduct={handleAddCustomProduct}
              />
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={(cat) => {
          navigate(`/catalog?category=${cat}`);
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
        onViewSpecsPage={handleSelectProduct}
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
