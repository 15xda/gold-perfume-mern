import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductImage = ({ product }) => {
  const defaultImage = '/images/products/placeholder.png';

  const getImageSrc = () => {
    const name = product.name.toLowerCase();

    if (name.includes('luzi')) {
      return '/images/products/luzi.png';
    } else if (name.includes('givaudan')) {
      return '/images/products/givaudan.png';
    } else if (name.includes('seluz')) {
        return '/images/products/seluz.png';
    } else if (name.includes('iberchem')) {
      return '/images/products/iberchem.png';
  }

    // Add more brand checks here as needed...

    return defaultImage;
  };

  return <LazyLoadImage src={getImageSrc()} alt={product.name} effect='blur'/>;
};

export default ProductImage;
