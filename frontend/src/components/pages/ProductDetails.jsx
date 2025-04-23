import React, { useContext } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ProductsPreviewer from '../ProductPreviewer';
import Loader from '../Loader';
import RatingAndComments from '../RatingAndComments';
import { AllRatingsAndComments } from '../RatingAndComments';
import FourBlockContent from '../FourBlockContent';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, },
  visible: { opacity: 1, transition: { duration: 0.8 } },
}

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

  const product = data.product;

  return (
    <>
        <motion.section variants={fadeUp} initial='hidden' whileInView='visible' viewport={{once: true}}>
            <ProductsPreviewer product={product} />
        </motion.section>
        <motion.section variants={fadeUp} initial='hidden' whileInView='visible' viewport={{once: true}}>
          <FourBlockContent />
        </motion.section>
        <motion.section variants={fadeUp} initial='hidden' whileInView='visible' viewport={{once: true}}>
          <AllRatingsAndComments product={product}/>
        </motion.section>
        <motion.section variants={fadeUp} initial='hidden' whileInView='visible' viewport={{once: true}}>
          <RatingAndComments product={product}/>
        </motion.section>

        
    </>
  )
}

export default ProductDetails