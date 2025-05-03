import React from 'react';
import Product from './ProductCard';
import ButtonJumpAnimation from './ButtonJumpAnimation';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axiosInstance';
import Loader from './Loader';



const getRecommends =  async (term, limit) => {
  if (!term) return [];
  const res = await api.get('/products/search', { params: {term, limit} })
  return res.data
}

const ProductRecommender = ({term, productInspect}) => {
  const navigate = useNavigate();

  const finalTerm = term.split(' ')[0] || 'e';

  const {data, isLoading, error} = useQuery({
    queryKey: ['recommendedTerm', finalTerm],
    queryFn: () => getRecommends(finalTerm, 10),
  })

  if (isLoading) return <Loader />;
  if (error) return <h1>Error</h1>


  return (
      <div className='recommended-products-container'>
          <div className='recommended-products-main-container'>
            <div className='recommended-products-title'>
              {productInspect ? <span style={{fontSize:'35px'}}>Вам также может понравиться:</span> : 
              <span>Рекомендуемые ароматы</span>}
            </div>
            <div className='recommended-products-products'>
              {data.products.map((product, index) => (
                <Product key={index} productId={product.id} product={product}/>
              ))}
            </div>
            {!productInspect && <div className='recommended-products-button'>
              <ButtonJumpAnimation text='Больше' onClick={() => navigate(`/search?term=${finalTerm}`)}/>
            </div>}
          </div>
        </div>
  );
}

export default ProductRecommender
       