import React from 'react'
import Product from './ProductCard'
import ButtonJumpAnimation from './ButtonJumpAnimation'
import { useNavigate } from 'react-router-dom'

const ProductRecommender = () => {
  const navigate = useNavigate();
  // Replace context with dummy data
  const dummyProducts = [
    { id: 1, name: "Sample Product 1", salePrices: [{value: 12}], ratingsFromDatabase: [{rating: 4}] },
    { id: 2, name: "Sample Product 2", salePrices: [{value: 14}], ratingsFromDatabase: [{rating: 5}] },   
    { id: 2, name: "Sample Product 2", salePrices: [{value: 14}], ratingsFromDatabase: [{rating: 5}]},
    { id: 3, name: "Sample Product 1", salePrices: [{value: 12}], ratingsFromDatabase: [{rating: 5}] },
    { id: 4, name: "Sample Product 2", salePrices: [{value: 14}], ratingsFromDatabase: [{rating: 5}]},
    { id: 5, name: "Sample Product 2", salePrices: [{value: 14}], ratingsFromDatabase: [{rating: 5}]},
    { id: 2, name: "Sample Product 2", salePrices: [{value: 14}], ratingsFromDatabase: [{rating: 5}]},
    { id: 3, name: "Sample Product 1", salePrices: [{value: 12}], ratingsFromDatabase: [{rating: 5}] },
    { id: 4, name: "Sample Product 2", salePrices: [{value: 14}], ratingsFromDatabase: [{rating: 5}]},
    { id: 5, name: "Sample Product 2", salePrices: [{value: 14}], ratingsFromDatabase: [{rating: 5}]},
  ];

 

  return (
      <div className='recommended-products-container'>
          <div className='recommended-products-main-container'>
            <div className='recommended-products-title'>
              <span>Рекомендуемые ароматы</span>
            </div>
            <div className='recommended-products-products'>
            {dummyProducts.map((product, index) => (
              <Product key={index} productId={product.id} product={product}/>
            ))}
               
                  
            </div>
            <div className='recommended-products-button'>
                <ButtonJumpAnimation text='Get More' onClick={() => navigate('/search?term=luzi')}/>
            </div>
          </div>
        </div>
    
  );
}

export default ProductRecommender
       