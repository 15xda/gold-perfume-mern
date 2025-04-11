import React, { useContext } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ProductsPreviewer from '../ProductPreviewer';
import Loader from '../Loader';
import RatingAndComments from '../RatingAndComments';
import { AllRatingsAndComments } from '../RatingAndComments';
import FourBlockContent from '../FourBlockContent';


const fetchProduct = async (productId) => {
  if (!productId) return [];
  const response = await axios.get(`http://localhost:4004/product/${productId}`,);
  return response.data;
}

const ProductDetails = () => {

  const [searchParams] = useSearchParams();
  const currentPID = searchParams.get('prId');
  

  const {data, error, isLoading} = useQuery({
    queryKey: ['productDetails', currentPID],
    queryFn: () => fetchProduct(currentPID),
    enabled: !!currentPID
  })

  if (isLoading) return <Loader/>;
  if (error) return <div>Error: {error.message}</div>;

  const product = data.apiData;
  const productComments = data.productComments;

  return (
    <>
        <ProductsPreviewer product={product} productComments={productComments}/>
        <FourBlockContent />
        <AllRatingsAndComments productComments={productComments}/>
        <RatingAndComments product={product} productComments={productComments}/>
        

    </>
  )
}

export default ProductDetails