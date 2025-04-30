import { useQueries } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import BrandCard from '../BrandCard';
import ProductCard from '../ProductCard';
import Loader from '../Loader';
import { motion } from 'framer-motion'; // Correct import from framer-motion

const fetchProducts = async (term) => {
  const response = await api.get('products/search', { params: { term, limit: 10, offset: 0 } });
  return response.data;
};

const ProductsPage = () => {
  const navigate = useNavigate();

  const handleBrandClick = (path) => {
    navigate(path);
  };

  const slideRight = {
    hidden: { opacity: 0, x: -50},
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.5 },
    },
  };

  const brands = [
    {
      id: 'luzi',
      title: 'LUZI',
      image: '/images/logos/luzi-logo.png',
    },
    {
      id: 'givaudan',
      title: 'Givaudan',
      image: '/images/logos/givaudan-logo.png',
    },
    {
      id: 'symrise',
      title: 'Symrise',
      image: '/images/logos/symrise-logo.png',
    },
    {
      id: 'seluz',
      title: 'Seluz',
      image: '/images/logos/seluz-logo.png',
    },
    {
      id: 'iberchem',
      title: 'Iberchem',
      image: '/images/logos/iberchem-logo.png',
    },
  ];
  
  // Use useQueries to run multiple queries in parallel
  const brandQueries = useQueries({
    queries: brands.map((brand) => ({
      queryKey: ['prodPageProducts', brand.id],
      queryFn: () => fetchProducts(brand.id),
      enabled: !!brand.id, // Only run the query if brand exists
    })),
  });

  return (
    <div className='products-page'>
      <div className='products-page-main-container'>
        <div className='products-page-title'>
          <span className="material-icons">inventory_2</span>
          <h1>Наши Производители</h1>
          <p>Ведущие Производители Парфюмерных Композиций</p>
        </div>

        {brands.map((brand, index) => {
          const { data, isLoading, error } = brandQueries[index];

          if (isLoading) return <Loader key={brand.id} />;
          if (error) return <div key={brand.id}>Error loading {brand.title} products</div>;

          return (
            <motion.section
              key={brand.id}
              className='brand-section-wrapper'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              variants={slideRight}
            >
              <div className='brand-introduction'>
                <div onClick={() => handleBrandClick(`/${brand.id}`)} style={{ cursor: 'pointer' }}>
                  <BrandCard title={brand.title} image={brand.image} />
                </div>
                <div className='brand-items'>
                  {data?.products?.map((product) => (
                    <div key={product.id} className='brand-item'>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
