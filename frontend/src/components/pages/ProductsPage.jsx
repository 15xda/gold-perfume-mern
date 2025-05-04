import { useQueries, useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../api/axiosInstance';
import BrandCard from '../BrandCard';
import ProductCard from '../ProductCard';
import Loader from '../Loader';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const fetchProducts = async (term, limit = 10, offset = 0) => {
  console.log('Загрузка продуктов с параметрами:', { term, limit, offset });
  const response = await api.get('products/search', { params: { term, limit, offset } });
  console.log('Получен ответ о продуктах:', response.data);
  return response.data;
};

const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('by-manufacturers');
  const [allProductsOffset, setAllProductsOffset] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    sortBy: 'name-asc'
  });
  const ALL_PRODUCTS_LIMIT = 100;

  // Reset products when tab changes
  useEffect(() => {
    if (activeTab === 'all-products') {
      setAllProducts([]);
      setAllProductsOffset(0);
      setFilters({
        brand: '',
        sortBy: 'name-asc'
      });
    }
  }, [activeTab]);

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
      enabled: !!brand.id && activeTab === 'by-manufacturers',
    })),
  });

  // Query for all products
  const { data: allProductsData, isLoading: isLoadingAllProducts, error: allProductsError, refetch: refetchAllProducts } = useQuery({
    queryKey: ['allProducts', allProductsOffset],
    queryFn: () => fetchProducts('', ALL_PRODUCTS_LIMIT, allProductsOffset),
    enabled: activeTab === 'all-products',
    retry: 3,
    retryDelay: 1000,
  });

  // Update allProducts when new data arrives
  useEffect(() => {
    console.log('Данные о продуктах изменились:', allProductsData);
    if (allProductsData?.products) {
      if (allProductsOffset === 0) {
        console.log('Установка начальных продуктов');
        setAllProducts(allProductsData.products);
      } else {
        console.log('Добавление дополнительных продуктов');
        setAllProducts(prev => [...prev, ...allProductsData.products]);
      }
    }
  }, [allProductsData, allProductsOffset]);

  // Apply filters whenever allProducts or filters change
  useEffect(() => {
    let filtered = [...allProducts];

    // Apply brand filter
    if (filters.brand) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    // Apply sorting
    const [sortField, sortOrder] = filters.sortBy.split('-');
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.salePrices - b.salePrices;
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredProducts(filtered);
  }, [allProducts, filters]);

  const handleFilterChange = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('filter', e.target.name);
    setSearchParams(params);
    setActiveTab(params.get('filter'));
  };

  const handleLoadMore = () => {
    setAllProductsOffset(prev => prev + ALL_PRODUCTS_LIMIT);
  };

  const handleBrandFilterChange = (e) => {
    setFilters(prev => ({
      ...prev,
      brand: e.target.value
    }));
  };

  const handleSortChange = (e) => {
    setFilters(prev => ({
      ...prev,
      sortBy: e.target.value
    }));
  };

  // Force refetch when switching to all products tab
  useEffect(() => {
    if (activeTab === 'all-products' && allProducts.length === 0) {
      console.log('Принудительная перезагрузка всех продуктов');
      refetchAllProducts();
    }
  }, [activeTab, allProducts.length, refetchAllProducts]);

  return (
    <div className='products-page'>
      <div className='products-page-main-container'>
        <div className='products-page-title'>
          <h1>Наши товары</h1>
          <p>Ведущие производители парфюмерных композиций — лучшее от лучших.</p>
        </div>

        <div className='products-page-filter'>
          <div className='ppf-main'>
            <button name='by-manufacturers' 
              onClick={handleFilterChange} 
              className={activeTab === 'by-manufacturers' ? 'active' : ''}>
              По производителям
            </button>
            <button name='all-products' 
              onClick={handleFilterChange} 
              className={activeTab === 'all-products' ? 'active' : ''}>
              Все товары
            </button>
          </div>
        </div>

        {activeTab === 'by-manufacturers' ? (
          brands.map((brand, index) => {
            const { data, isLoading, error } = brandQueries[index];

            if (isLoading) return <Loader key={brand.id} />;
            if (error) return <div key={brand.id}>Ошибка загрузки товаров {brand.title}</div>;

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
                    {data?.products?.slice(0, 10).map((product) => (
                      <div key={product.id} className='brand-item'>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                  {data?.products?.length > 10 && (
                    <div className='view-more-container'>
                      <button 
                        className='view-more-button'
                        onClick={() => navigate(`/search?term=${brand.id}`)}
                      >
                        Смотреть все товары {brand.title}
                      </button>
                    </div>
                  )}
                </div>
              </motion.section>
            );
          })
        ) : (
          <div className='all-products-section'>
            {isLoadingAllProducts && allProducts.length === 0 && <Loader />}
            {allProductsError && <div className='error-message'>Ошибка загрузки товаров</div>}
            
            <div className='filters-container'>
              <div className='filter-group'>
                <label>Производитель:</label>
                <select value={filters.brand} onChange={handleBrandFilterChange}>
                  <option value="">Все</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.title}>{brand.title}</option>
                  ))}
                </select>
              </div>

              <div className='filter-group'>
                <label>Сортировка:</label>
                <select value={filters.sortBy} onChange={handleSortChange}>
                  <option value="name-asc">По названию (А-Я)</option>
                  <option value="name-desc">По названию (Я-А)</option>
                  <option value="price-asc">По цене (возрастание)</option>
                  <option value="price-desc">По цене (убывание)</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 && (
              <div className='all-products-grid'>
                {filteredProducts.map((product) => (
                  <div key={product.id} className='product-item'>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
            
            {allProductsData?.total > allProductsOffset + ALL_PRODUCTS_LIMIT && (
              <div className='load-more-container'>
                <button 
                  className='load-more-button'
                  onClick={handleLoadMore}
                  disabled={isLoadingAllProducts}
                >
                  {isLoadingAllProducts ? 'Загрузка...' : 'Показать еще'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
