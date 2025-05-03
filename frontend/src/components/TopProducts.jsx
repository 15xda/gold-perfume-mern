import React from 'react';
import Product from './ProductCard';
import ButtonJumpAnimation from './ButtonJumpAnimation';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axiosInstance';
import Loader from './Loader';



const getRecommends =  async () => {
  
  const res = await api.get('/products/get-top-ten')
  return res.data
}

const TopProducts = () => {
  const navigate = useNavigate();


  const {data, isLoading, error} = useQuery({
    queryKey: ['topProducts'],
    queryFn: getRecommends,
  })

  console.log(data)

  if (isLoading) return <Loader />;
  if (error) return <h1>Error</h1>


  return (
      <div className='recommended-products-container'>
          <div className='recommended-products-main-container'>
            <div className='recommended-products-title'>
              <span>Хит продаж</span>
            </div>
            <div className='recommended-products-products'>
              {data.map((product, index) => (
                <Product key={index} productId={product.id} product={product}/>
              ))}
            </div>
            <div className='recommended-products-button'>
            </div>
          </div>
        </div>
  );
}

export default TopProducts
       