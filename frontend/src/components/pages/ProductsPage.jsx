import React from 'react'
import BrandCard from '../BrandCard'
import ProductCard from '../ProductCard'

const ProductsPage = () => {
return (
    <div className='products-page'>
        <div className='products-page-main-container'>
            <div className='products-page-title'>
                <h1>Ознакомьтесь С Нашими Товарами</h1>
                <p>Продукция От Мировых Брендов</p>
            </div>

            <div className='brand-introduction'>
                <BrandCard />
                <div className='brand-items'>
                    <div className='brand-item'></div>
                </div>
            </div>
            <div className='brand-introduction'>
                <BrandCard />
                <div className='brand-items'>
                    <div className='brand-item'></div>
                </div>
            </div>
            <div className='brand-introduction'>
                <BrandCard />
                <div className='brand-items'>
                    <div className='brand-item'></div>
                </div>
            </div>
            <div className='brand-introduction'>
                <BrandCard />
                <div className='brand-items'>
                    <div className='brand-item'></div>
                </div>
            </div>
        </div>
    </div>
)
}

export default ProductsPage