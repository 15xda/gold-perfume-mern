import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard'
import { useSearchParams } from 'react-router-dom'
import api from '../../api/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import Loader from '../Loader'
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const fetchProducts = async (term) => {
  if (!term) return [];

  const response = await api.get('/search', {
    params: { term }
  });
  return response.data;
}

const SearchResult = () => {
  const [currentFilters, setCurrentFilters] = useState([]);
  const [sortBy, setSortBy] = useState('none');
  const [searchParams] = useSearchParams();
  const term = searchParams.get('term');
    
  const { data, error, isLoading } = useQuery({
    queryKey: ['searchResults', term],
    queryFn: () => fetchProducts(term),
    enabled: !!term,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  const handleFilterChange = (e) => {
    const filterName = e.target.name;
    setCurrentFilters((prevFilters) =>
      prevFilters.includes(filterName)
        ? prevFilters.filter(filter => filter !== filterName)
        : [...prevFilters, filterName]
    );
  }

  const handleSortingChange = (e) => {
    setSortBy(e.target.value);
  }

  let filteredProducts = [...data];

  // Apply sorting
  if (sortBy !== 'none') {
    filteredProducts = filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.salePrices[0].value - b.salePrices[0].value;
        default:
          return 0;
      }
    });
  }

  // Apply filters
  if (currentFilters.length > 0) {
    filteredProducts = filteredProducts.filter((product) => 
      currentFilters.some(filter => 
        product.name.split(' ').some(word => word.toLowerCase().includes(filter.toLowerCase()))
      )
    );
  }

  return (
    <div className='search-result-container'>
      <div className='search-result-main'>
        <div className='search-result-left'>
          <div className='search-filters-container'>
            <div className='search-filters-main-container'>
              <div className='search-filters-title'>
                <span>Brand</span>
              </div>
              <div className='search-filters-options'>
                <label>
                  <input type="checkbox" name='luzi' onChange={handleFilterChange}/> Luzi
                </label>
                <label>
                  <input type="checkbox" name='givaudan' onChange={handleFilterChange}/> Givaudan
                </label>
                <label>
                  <input type="checkbox" name='seluz' onChange={handleFilterChange}/> Seluz
                </label>
        
              </div>
            </div>
          </div>
        </div>
        <div className='search-result-right'>
          <div className='search-result-title'>
            <span>Search Results</span>
            <span>Items Found: {filteredProducts.length || 0}</span>
          </div>
          <div className='search-resul-topbar'>
            <div className='search-result-topbar-left'>
              <div className='search-sortby'>
                <span><i className="material-icons">filter_list</i> Sort By</span>
                <select onChange={handleSortingChange}>
                  <option value="none">None</option>
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
            {/* <div className='search-result-topbar-right'>
              <div className='search-view-select'>
                <span title='Module View'><i className="material-icons">view_module</i></span>
                <span title='List View'><i className="material-icons">view_list</i></span>
                <span title='Stream View'><i className="material-icons">view_stream</i></span>
              </div>
            </div> */}
          </div>
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}  className='search-result-products'>
            {filteredProducts.length > 0 ? filteredProducts.map((product) => (
              <ProductCard key={product.id} id={product.id} product={product}/>
            )) : 'No Items Found'}
          </motion.section>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
