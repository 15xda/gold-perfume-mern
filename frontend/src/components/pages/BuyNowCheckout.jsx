import { useSelector } from "react-redux";
import { CartItem } from '../CartItem'; // Assuming CartItem is the component that displays the product
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function BuyNowCheckout() {
    const user = useSelector(state => state.user?.data);
    const navigate = useNavigate();
    const location = useLocation();

    // Get the product passed via state (from the Buy Now button)
    const product = location.state?.product;

    // If no product is passed, return an error message
    if (!product) {
        return navigate('/', { replace: true });
    }

    // Check if the user is logged in
    if (!user) {
        return <p>Пожалуйста, войдите в аккаунт для оформления заказа</p>;
    }

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
                                    <td>{product.id}</td>
                                </tr>
                                <tr>
                                    <td><b>Дата заказа:</b></td>
                                    <td>{new Date().toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <td><b>Статус заказа:</b></td>
                                    <td>Новый заказ</td>
                                </tr>
                                <tr>
                                    <td><b>Всего товаров:</b></td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td><b>Сумма заказа:</b></td>
                                    <td>{product.price}</td>
                                </tr>
                            </table>
                        </div>
                        <div className="order-summary-items">
                            <h3>Товары в корзине</h3>
                            {/* Display the single product */}
                            <CartItem key={product.id} product={product} />
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
    );
}
