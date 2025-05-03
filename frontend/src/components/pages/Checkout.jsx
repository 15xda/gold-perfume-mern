import { useSelector } from "react-redux";
import { CartItem } from '../CartItem';
import { fetchCart } from "./Cart";
import { useQuery } from '@tanstack/react-query';
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { useDispatch } from "react-redux";
import { setCart } from "../../storage/userSlice";
import {toast} from "react-toastify";

export default function Checkout() {
    const navigate = useNavigate();
    const user = useSelector(state => state.user?.data);
    const userCartItems = user?.cart || [];
    const ids = userCartItems.map(item => item.itemId);
    const currDate = new Date();
    const formattedDate = currDate.toLocaleDateString();
    const totalItems = userCartItems.length;
    const dispatch = useDispatch();
    
    // Moved useState hook to top level before conditional returns
    const [orderForm, setOrderForm] = useState({
        date: formattedDate,
        orderId: 'GP-' + Math.random().toString(36).substr(2, 15).toUpperCase(),
        orderTotal: 0,
        totalItems: totalItems,
        products: [],
        userInfo: {
            name: user?.name || "",
            email: user?.email || "",
            telephone: user?.telephone || "",
            address: "",
            customAddress: "",
            comment: "",
        }
    });

    const { data, error, isLoading } = useQuery({
        queryKey: ['userCart', ids],
        queryFn: () => fetchCart(ids),
        enabled: !!ids.length,
    });

    // Handle loading and error states first
    if (isLoading) return <Loader />;
    if (error) return <p>Ошибка при загрузке корзины: {error.message}</p>;

    const products = data || [];

    // Check for empty cart
    if (products.length === 0 || !userCartItems.length) return (
        <div className='cart-page'>
            <div className="cart-container">
                <div className='cart-empty'>
                    <span className="material-icons">shopping_cart</span>
                    <p>Корзина пуста. Добавьте товары для оформления заказа.</p>
                    <button className="continue-shopping" onClick={() => navigate('/')}>
                        Перейти к покупкам
                    </button>
                </div>
            </div>
        </div>
    );

    // Calculate cart total after we're sure products exist
    const cartTotal = userCartItems.reduce((total, cartItem) => {
        const product = products.find(p => p.id === cartItem.itemId);
        if (product) {
            return total + product.salePrices * cartItem.quantity;
        }
        return total;
    }, 0);

    const handleFDUserInfoChange = (e) => {
        const { name, value } = e.target;
        setOrderForm(prev => ({
            ...prev,
            userInfo: {
                ...prev.userInfo,
                [name]: value,
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedForm = {
            ...orderForm,
            orderTotal: cartTotal,
            products: user.cart.map(item => {
                const details = products.find(product => product.id === item.itemId);
                return {
                    ...item,
                     uom: details.uom.description,
                     name: details.name,
                     price: details.salePrices,
                } 
            }),
        }

        try {
            const response = await api.post('/cart/checkout', {orderForm: updatedForm});
            dispatch(setCart(response.data.cart));
            navigate('/order-success', {state: {orderForm: updatedForm}})
            toast.success(response.data.message)
        } catch (error) {
            console.error(error.response.data.message)
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
                                        <td>{formattedDate}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Всего товаров:</b></td>
                                        <td>{totalItems}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Сумма заказа:</b></td>
                                        <td>{cartTotal} ₽</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="order-summary-items">
                            <h3>Товары в корзине</h3>
                            {products.map((item) => (
                                <CartItem key={item.id} product={item} />
                            ))}
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
                                value={orderForm.userInfo.name}
                                onChange={handleFDUserInfoChange}
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
                                value={orderForm.userInfo.email}
                                onChange={handleFDUserInfoChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telephone">Номер телефона:</label>
                            <input
                                placeholder="Номер телефона"
                                type="text"
                                id="telephone"
                                name="telephone"
                                value={orderForm.userInfo.telephone}
                                onChange={handleFDUserInfoChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Адрес:</label>
                            {user.addresses && user.addresses.length > 0 ? (
                                <>
                                    <select
                                        name="address"
                                        id="address"
                                        value={orderForm.userInfo.address}
                                        onChange={handleFDUserInfoChange}
                                        required
                                    >
                                        <option value="" disabled>Выберите адрес</option>
                                        {user.addresses.map(address => (
                                            <option key={address} value={address}>{address}</option>
                                        ))}
                                        <option value="another">Другой адрес</option>
                                    </select>
                                    {orderForm.userInfo.address === 'another' && (
                                        <textarea
                                            placeholder="Введите ваш адрес"
                                            name="customAddress"
                                            value={orderForm.userInfo.customAddress}
                                            onChange={handleFDUserInfoChange}
                                            required
                                        ></textarea>
                                    )}
                                </>
                            ) : (
                                <textarea
                                    placeholder="Введите адрес доставки"
                                    id="address"
                                    name="address"
                                    value={orderForm.userInfo.address}
                                    onChange={handleFDUserInfoChange}
                                    required
                                ></textarea>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="comment">Комментарий продавцу:</label>
                            <textarea
                                placeholder="Комментарий продавцу"
                                id="comment"
                                name="comment"
                                value={orderForm.userInfo.comment}
                                onChange={handleFDUserInfoChange}
                            ></textarea>
                        </div>

                        <button className="auth-submit" type="submit">
                            Оформить заказ
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}