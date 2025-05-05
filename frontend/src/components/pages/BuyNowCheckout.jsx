import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axiosInstance";
import { toast } from "react-toastify";
import ProductImage from "../ProductImage";
import { replaceUserData } from "../../storage/userSlice";

export default function BuyNowCheckout() {
    const user = useSelector(state => state.user?.data);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isVerified = user && useSelector(state => state.user?.isVerified);
    const [mainLoading, setMainLoading] = useState(false);

    // Get the product passed via state (from the Buy Now button)
    const product = location.state?.product;
    const quantityFromState = location.state?.quantity || 1;

    const [productCount, setProductCount] = useState(quantityFromState);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phoneNumber: user?.telephone || "",
        address: "",
        noteToSeller: ""
    });

    // For address selection if user has saved addresses
    const [selectedAddress, setSelectedAddress] = useState("");
    const [isCustomAddress, setIsCustomAddress] = useState(false);

    // If no product is passed, redirect to home
    if (!product) {
        return navigate('/', { replace: true });
    }

    // Handle quantity change
    const decreaseQuantity = () => {
        if (productCount > 1) {
            setProductCount(productCount - 1);
        }
    };

    const increaseQuantity = () => {
        setProductCount(productCount + 1);
    };
    
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setProductCount(value);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle address selection
    const handleAddressChange = (e) => {
        const value = e.target.value;
        setSelectedAddress(value);
        
        if (value === "another") {
            setIsCustomAddress(true);
            setFormData({
                ...formData,
                address: ""
            });
        } else {
            setIsCustomAddress(false);
            setFormData({
                ...formData,
                address: value
            });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMainLoading(true);
        // Create order object
        const orderData = {
            date: new Date().toLocaleDateString(),
            orderId: 'GPBN-' + Math.random().toString(36).substr(2, 15).toUpperCase(),
            orderTotal: product.salePrices * productCount,
            totalItems: 1,
            products: [{
                itemId: product.id,
                quantity: productCount,
                uom: product.uom?.description || '',
                name: product.name,
                price: product.salePrices,
            }],
            userInfo: {
                name: formData.name,
                email: formData.email,
                telephone: formData.phoneNumber,
                address: formData.address,
                comment: formData.noteToSeller,
            }
        };
        
        try {
            const response = await api.post('/cart/checkout', { orderForm: orderData });
            dispatch(replaceUserData(response.data?.user))
            navigate('/order-success', {state: {orderForm: orderData}});
            toast.success(response.data.message || 'Заказ успешно оформлен');
            setMainLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Ошибка при оформлении заказа');
            setMainLoading(false);
        }
    };

    return (
        <div className="checkout-page">
            <div className="checkout-main-container">
                <div className="checkout-left">
                    <h2>Ваш заказ</h2>
                    <div className="order-summary-container">
                        <div className="order-details">
                            <h3>Детали заказа</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><b>Дата заказа:</b></td>
                                        <td>{new Date().toLocaleDateString()}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Всего товаров:</b></td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td><b>Сумма заказа:</b></td>
                                        <td>{product.salePrices * productCount} ₽</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="order-summary-items">
                            <h3>Товары в корзине</h3>
                            {/* Display the single product */}
                            <div className="cart-item">
                                <div className="cart-item-image">
                                    <ProductImage product={product}/>
                                </div>
                                <div className="cart-item-details">
                                    <h3>{product.name}</h3>
                                    <p className="cart-item-price">{product.salePrices}₽ / {product.uom?.description || 'шт'}</p>
                                </div>
                                <div className="cart-item-quantity">
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input 
                                        type="number" 
                                        value={productCount}
                                        onChange={handleQuantityChange}
                                        min="1"
                                    />
                                    <button onClick={increaseQuantity}>+</button>
                                </div>
                                <div className="cart-item-total">
                                    {product.salePrices * productCount} ₽
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="checkout-right">
                    <h2>Данные для доставки</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Имя:</label>
                            <input 
                                placeholder="Имя" 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={formData.name}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Электронная почта:</label>
                            <input 
                                placeholder="Электронная почта" 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Номер телефона:</label>
                            <input 
                                placeholder="Номер телефона" 
                                type="text" 
                                id="phoneNumber" 
                                name="phoneNumber" 
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="address">Адрес:</label>
                            {user?.addresses && user.addresses.length > 0 ? (
                                <>
                                    <select
                                        value={selectedAddress}
                                        onChange={handleAddressChange}
                                        required
                                    >
                                        <option value="" disabled>Выберите адрес</option>
                                        {user.addresses.map(address => (
                                            <option key={address} value={address}>{address}</option>
                                        ))}
                                        <option value="another">Другой адрес</option>
                                    </select>
                                    
                                    {isCustomAddress && (
                                        <textarea
                                            placeholder="Введите ваш адрес"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    )}
                                </>
                            ) : (
                                <textarea
                                    placeholder="Адрес"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            )}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="noteToSeller">Комментарий продавцу:</label>
                            <textarea
                                placeholder="Комментарий продавцу"
                                id="noteToSeller"
                                name="noteToSeller"
                                value={formData.noteToSeller}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        {!isVerified && <div className='checkout-notice-box'>
                            <span className='material-icons'>info</span>
                            <p>Пожалуйста, подтвердите свой Email для заказа</p>
                        </div>}
                        
                        <button className="auth-submit" type="submit" disabled={!isVerified || mainLoading}>
                            {mainLoading ? <div className="loader-small"></div> : 'Оформить заказ'} 
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}