import React from 'react';

const ProductImage = ({ product }) => {
  const defaultImage = 'https://media.istockphoto.com/id/1214012618/vector/spray-bottle-with-transparent-cap-mockup-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=mTcNdKvFukD9WPEkoKGfrnBqHhHNDkgoC0i-QZGHqho=';

  const getImageSrc = () => {
    const name = product.name.toLowerCase();

    if (name.includes('luzi')) {
      return '/src/images/products/luzi.png';
    } else if (name.includes('givaudan')) {
      return '/src/images/products/givaudan.png';
    } else if (name.includes('seluz')) {
        return '/src/images/products/seluz.png';
    } else if (name.includes('iberchem')) {
      return '/src/images/products/iberchem.png';
  }

    // Add more brand checks here as needed...

    return defaultImage;
  };

  return <img src={getImageSrc()} alt={product.name} />;
};

export default ProductImage;
