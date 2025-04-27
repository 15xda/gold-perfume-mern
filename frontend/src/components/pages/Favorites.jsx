import React, { useEffect } from 'react'
import Product from '../ProductCard'
import api from '../../api/axiosInstance'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader';


const fetchFavourites = async (ids) => {
  if (!ids) return [];
  const response = await api.post('/products/batch', {productIds: ids});
  return response.data;
}

const Favorites = () => {
  const user = useSelector(state => state.user?.data);
  const ids = user?.favourites || [];

  console.log(user?.favourites);

  const {data, error, isLoading} = useQuery({
    queryKey: ['userFavourites', ids],
    queryFn: () => fetchFavourites(ids),
    enabled: Array.isArray(ids) && ids.length > 0,
  })

  if (isLoading) return <Loader/>;
  if (error) return <p>Error fetching favourites</p>;
  if (!user) return  <div className='loader-main'><h3>Please <a className='gold-link' href="/login">login</a> to view favourites</h3></div>;
  
  const products = data || [];

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        <div className="favorites-header">
          <h1>My Favorites</h1>
          <p className="favorites-count">{products.length} items</p>
        </div>
        
        {products.length > 0 ? (
          <div className="favorites-grid">
            {products.map((product) => (
              <Product key={product.id} product={product}/>
            ))}
          </div>
        ) : (
          <div className="favorites-empty">
            <span className="material-icons">favorite_border</span>
            <p>No favorites yet</p>
            <p>Products you like will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites 