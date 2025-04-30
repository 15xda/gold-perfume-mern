import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import { replace, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader';
import { motion } from 'framer-motion';
import ScrollToTop from '../ScrollToTop';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const fetchProducts = async (term, limit, offset) => {
  if (!term) return [];

  const response = await api.get('/products/search', {
    params: { term, limit, offset }
  });
  return response.data;
};

const SearchResult = () => {
  const [currentFilters, setCurrentFilters] = useState([]);
  const [sortBy, setSortBy] = useState('none');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const term = searchParams.get('term');
  const limitParam = parseInt(searchParams.get('limit')) || 20;
  const offsetParam = parseInt(searchParams.get('offset')) || 0;
  const filtersParam = searchParams.get('filters');
  const currentPage = Math.floor(offsetParam / limitParam);

  useEffect(() => {
    if (filtersParam) {
      setCurrentFilters(filtersParam.split(','));
    } else {
      setCurrentFilters([]);
    }
  }, [filtersParam]);

  const { data, error, isLoading } = useQuery({
    queryKey: ['searchResults', term, limitParam, offsetParam],
    queryFn: () => fetchProducts(term, limitParam, offsetParam),
    enabled: !!term,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Ошибка: {error.message}</div>;
  if (!term) return navigate('/404', { replace: true });

  const handleFilterChange = (e) => {
    const filterName = e.target.name;
    let updatedFilters = [...currentFilters];

    if (updatedFilters.includes(filterName)) {
      updatedFilters = updatedFilters.filter(filter => filter !== filterName);
    } else {
      updatedFilters.push(filterName);
    }

    setCurrentFilters(updatedFilters);

    const params = new URLSearchParams(searchParams);
    if (updatedFilters.length > 0) {
      params.set('filters', updatedFilters.join(','));
    } else {
      params.delete('filters');
    }
    params.set('offset', 0); // Reset to first page when filter changes
    setSearchParams(params);
  };

  const handleSortingChange = (e) => {
    setSortBy(e.target.value);
  };

  let filteredProducts = [...data.products];

  // Apply sorting
  if (sortBy !== 'none') {
    filteredProducts = filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.salePrices - b.salePrices;
        default:
          return 0;
      }
    });
  }

  // Apply filters
  if (currentFilters.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      currentFilters.some(filter =>
        product.name.split(' ').some(word => word.toLowerCase().includes(filter.toLowerCase()))
      )
    );
  }

  return (
    <div className="search-result-container">
      <ScrollToTop />
      <div className="search-result-main">
        <div className="search-result-left">
          <div className="search-filters-container">
            <div className="search-filters-main-container">
              <div className="search-filters-title">
                <span>Производители</span>
              </div>
              <div className="search-filters-options">
                {['luzi', 'givaudan', 'seluz', 'firmenich', 'symrise', 'iberchem'].map((brand) => (
                  <label key={brand}>
                    <input
                      type="checkbox"
                      name={brand}
                      onChange={handleFilterChange}
                      checked={currentFilters.includes(brand)}
                    /> {brand.charAt(0).toUpperCase() + brand.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="search-result-right">
          <div className="search-result-title">
            <span>Результаты Поиска</span>
            <p>Найдено товаров: {data.total || 0}</p>
          </div>

          <div className="search-resul-topbar">
            <div className="search-result-topbar-left">
              <div className="search-sortby">
                <span><i className="material-icons">filter_list</i> Сортировать по</span>
                <select onChange={handleSortingChange} value={sortBy}>
                  <option value="none">Нет</option>
                  <option value="price">Цене</option>
                  <option value="name">Названию</option>
                </select>
              </div>
            </div>
          </div>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="search-result-products"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} id={product.id} product={product} />
              ))
            ) : (
              'Товары не найдены'
            )}
          </motion.section>

          <div className="pagination-container">
            {data.total > limitParam && Array.from({ length: data.totalPages }).map((_, index) => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set('offset', limitParam * index);
              const isActive = index === currentPage;

              return (
                <div key={index} className="pagination-button">
                  <button
                    disabled={isActive}
                    className={isActive ? 'active' : ''}
                    onClick={() => navigate(`/search?${newParams.toString()}`, { replace: true })}
                  >
                    {index + 1}
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchResult;
