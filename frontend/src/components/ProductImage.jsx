import React from 'react';


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

  return <img src={getImageSrc()} alt={product.name} />;
};

export default ProductImage;
