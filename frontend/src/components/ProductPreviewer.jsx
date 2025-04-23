import React, { useState } from 'react'
import AddToCartButton from './AddToCartButton'
import BuyNowButton from './BuyNowButton'
import Accordion from './Accordion'
import { useSelector, useDispatch } from 'react-redux'
import LikeButton from './LikeButton'


const ProductPreviewer = ({ product }) => {
    const imgUrl = 'https://media.istockphoto.com/id/1214012618/vector/spray-bottle-with-transparent-cap-mockup-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=mTcNdKvFukD9WPEkoKGfrnBqHhHNDkgoC0i-QZGHqho=';
    const mainImg = 'https://etiket.ca/cdn/shop/files/Encelade-EDP-30ml-Marc-AntoineBarrois-Etiket.jpg?v=1694706918&width=1080'
    const [selectedImage, setSelectedImage] = useState(mainImg);
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.data);
    const [quantity, setQuantity] = useState(1);

    // Calculate the average rating from productComments
    const rating = product.productComments.length > 0 ? (product.productComments.reduce((acc, rating) => acc + rating.rating, 0) / product.productComments.length).toString().slice(0, 3) : '0';
    
    const productImages = [
        mainImg, 
        imgUrl, 
        imgUrl
    ];

    const productDescription = [
        {
            title: 'Description',
            content: product.description
        },
        {
            title: 'Category',
            content: product.category
        },
        {
            title: 'Shipping Information',
            content: 'Standard shipping: 3-5 business days'
        },
        {
            title: 'Return Policy',
            content: '30-day return policy for unworn items'
        }
    ];

    const handleImageClick = (image) => {
        setSelectedImage(image);
    }

    // Fake sizes since API doesn't provide them
    const sizes = [
        
    ];

    return (
        <div className='product-previewer'>
            <div className='product-previewer-main-container'>
                <div className='product-previewer-images'>
                    <div className='product-previewer-image-left-block'>
                        {productImages.map((image, index) => (
                            <div key={index} onClick={() => handleImageClick(image)}>
                                <img src={image} alt={`Product view ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                    <div className='product-previewer-image-right-block'>
                        <div>
                            <img src={selectedImage} alt={product.name} />
                        </div>
                    </div>
                </div>
                <div className='product-previewer-interaction-container'>
                    <div className='interaction-container-upper'>
                        <div><h1>{product.name}</h1></div>
                        <div><span style={{color: '#DAAC61'}}>{product.salePrices[0].value} ₽</span></div>
                        <div><strong>Customer Rating</strong></div>
                        <div><p>{ `${rating} ⭐` || 'No rating'}  ({product.productComments.length || 0} reviews)</p></div>
                    </div>
                    <div className='interaction-container-lower'>
                        <div className='size-select'>
                            {product.salePrices.map((size, index) => {
                                return (
                                    <div className='hollow-button' key={index}>
                                            <button>
                                                <span className='price-type-text'>{size.name}</span>
                                                <span>{size?.value}/гр</span>
                                            </button>
                                        </div>
                                )
                                            
                                
                            })} 
                        </div>
                        <div className='product-previewer-interaction'>
                            <div className='pr-pr-row'>

                                <div className='counter'>
                                    <button onClick={() => {if(quantity > 1) {setQuantity(quantity - 1)}}}>
                                        <span>-</span>
                                    </button>
                                    <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                    <button onClick={() => setQuantity(quantity + 1)}>
                                        <span>+</span>
                                    </button>
                                </div>

                                <AddToCartButton productId={product.id} quantity={quantity}/>
                            </div>
                            <div className='pr-pr-row'>
                                <LikeButton productId={product.id}/>
                                <BuyNowButton product={product}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPreviewer
