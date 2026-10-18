import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductSpecificationPage } from './ProductSpecificationPage';
import { MedicalProduct } from '../types';

interface ProductSpecificationRouteWrapperProps {
  onAddToQuote: (product: MedicalProduct) => void;
  quoteIds: Set<string>;
  onOpenQuote: () => void;
}

export const ProductSpecificationRouteWrapper: React.FC<ProductSpecificationRouteWrapperProps> = ({
  onAddToQuote,
  quoteIds,
  onOpenQuote,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <ProductSpecificationPage
      initialProductId={id}
      onAddToQuote={onAddToQuote}
      isInQuote={id ? quoteIds.has(id) : false}
      onOpenQuote={onOpenQuote}
      onBackToCatalog={() => navigate('/catalog')}
    />
  );
};

