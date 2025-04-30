import React, { useEffect, useState } from 'react';
import AddToCartButton from './AddToCartButton';
import BuyNowButton from './BuyNowButton';
import { useSelector, useDispatch } from 'react-redux';
import LikeButton from './LikeButton';
import ProductImage from './ProductImage';

const ProductPreviewer = ({ product }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.data);
    const [quantity, setQuantity] = useState(0);
    const [minQuant, setMinQuant] = useState(0);
    const [noticeText, setNoticeText] = useState('');
    const [prodOper, setProdOper] = useState(0);

    // Calculate the average rating from productComments
    const rating = product.productComments.length > 0 ? (product.productComments.reduce((acc, rating) => acc + rating.rating, 0) / product.productComments.length).toString().slice(0, 3) : '0';

    useEffect(() => {
        const productUOM = product.uom?.name || '';
        if (productUOM === 'шт') {
            setQuantity(6);
            setMinQuant(6);
            setProdOper(1);
            setNoticeText(`Минимальный заказ для ${product.name} составляет 6 штук.`);
        } else if (productUOM === 'г') {
            setQuantity(30);
            setMinQuant(30);
            setProdOper(10);
            setNoticeText(`Минимальный заказ для ${product.name} составляет 30 грамм.`);
        } else {
            setNoticeText('Минимальный заказ неизвестен.');
        }
    }, [product]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleQuantityChange = (e) => {
        
        const newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= minQuant) {
            setQuantity(newQuantity);
        }
    };

    return (
        <div className='product-previewer'>
            <div className='product-previewer-main-container'>
                <div className='product-previewer-images'>
                    <ProductImage product={product}/>
                </div>
                <div className='product-previewer-interaction-container'>
                    <div className='interaction-container-upper'>
                        <div><h1>{product.name}</h1></div>
                        <div><span className='prp-price-text'>{product.salePrices}₽ / {product.uom?.description}</span></div>
                        <div><strong>Customer Rating</strong></div>
                        <div><p>{ `${rating} ⭐` || 'No rating'}  ({product.productComments.length || 0} reviews)</p></div>
                    </div>
                    <div className='interaction-container-lower'>
                        <div className='price-notice-box'>
                            <span className='material-icons'>info</span>
                            <p>{noticeText}</p>
                        </div>
                        <div className='product-previewer-interaction'>
                            <div className='pr-pr-row'>
                                <div className='counter'>
                                    <button 
                                        onClick={() => {if (quantity > minQuant) setQuantity(quantity - prodOper)}}
                                    >
                                        <span>-</span>
                                    </button>
                                    <input 
                                        type="number" 
                                        min={minQuant} 
                                        value={quantity} 
                                        onChange={handleQuantityChange} 
                                    />
                                    <button 
                                        onClick={() => {setQuantity(quantity + prodOper)}}
                                    >
                                        <span>+</span>
                                    </button>
                                </div>

                                <AddToCartButton product={product} addAmount={quantity}/>
                            </div>
                            <div className='pr-pr-row'>
                                <LikeButton productId={product.id}/>
                                <BuyNowButton product={product} quantity={quantity}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPreviewer;
