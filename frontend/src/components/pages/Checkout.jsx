import { useSelector } from "react-redux";
import { CartItem } from '../CartItem';
import { fetchCart } from "./Cart";
import { useQuery } from '@tanstack/react-query';
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const user = useSelector(state => state.user?.data);
    const userCartItems = user?.cart || [];
    const ids = userCartItems.map(item => item.itemId);
    const navigate = useNavigate();

    const { data, error, isLoading } = useQuery({
        queryKey: ['userCart', ids],
        queryFn: () => fetchCart(ids),
        enabled: !!ids.length,
    });

    if (isLoading) return <Loader />;
    if (error) return <p>Ошибка при загрузке корзины</p>;
    if (!user) return <p>Пожалуйста, войдите в аккаунт для оформления заказа</p>;

    const products = data || [];
    console.log(products);

    if (products.length === 0) return (
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

    return (
        <div className="checkout-page">
            <div className="checkout-main-container">
                <div className="checkout-left">
                    <h2>Сводка заказа</h2>
                    <div className="order-summary-container">
                        <div className="order-details">
                            <h3>Детали заказа</h3>
                            <table>
                                <tr>
                                    <td><b>ID заказа:</b></td>
                                    <td>dummyid</td>
                                </tr>
                                <tr>
                                    <td><b>Дата заказа:</b></td>
                                    <td>dummydate</td>
                                </tr>
                                <tr>
                                    <td><b>Статус заказа:</b></td>
                                    <td>dummystatus</td>
                                </tr>
                                <tr>
                                    <td><b>Всего товаров:</b></td>
                                    <td>dummytotalitems</td>
                                </tr>
                                <tr>
                                    <td><b>Сумма заказа:</b></td>
                                    <td>dummytotal</td>
                                </tr>
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
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Имя:</label>
                            <input placeholder="Имя" type="text" id="name" name="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Электронная почта:</label>
                            <input placeholder="Электронная почта" type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Номер телефона:</label>
                            <input placeholder="Номер телефона" type="text" id="phoneNumber" name="phoneNumber" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Адрес:</label>
                            <textarea placeholder="Адрес" id="address" name="address" required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="noteToSeller">Комментарий продавцу:</label>
                            <textarea placeholder="Комментарий продавцу" id="noteToSeller" name="noteToSeller"></textarea>
                        </div>
                        <button className="auth-submit" type="submit" disabled>Оформить заказ</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
