import { useSelector } from "react-redux";
import {CartItem} from '../CartItem';
import { fetchCart } from "./Cart";
import { useQuery } from '@tanstack/react-query';
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

export default function Checkout() {    
    
    const user = useSelector(state => state.user?.data)
    const userCartItems = user?.cart || []
    const ids = userCartItems.map(item => item.itemId)
    const navigate = useNavigate();

    const {data, error, isLoading} = useQuery({
        queryKey: ['userCart', ids],
        queryFn: () => fetchCart(ids),
        enabled: !!ids.length,
    })

    // if loading || error || no user
    if (isLoading) return <Loader/>;
    if (error) return <p>Error fetching Cart</p>;
    if (!user) return <p>Please login to checkout</p>;

    const products = data || [];
    console.log(products)

    
    // if cart is empty
    if (products.length === 0) return (
        <div className='cart-page'>
            <div className="cart-container">
                <div className='cart-empty'>
                    <span className="material-icons">shopping_cart</span>
                    <p>Your cart is empty. Add Items to Cart to Checkout.</p>
                    <button className="continue-shopping" onClick={() => navigate('/')}>
                        Start Shopping
                    </button>
                </div>
            </div>
        </div>
    );

    // if cart is not empty
    return (
        <div className="checkout-page">
            <div className="checkout-main-container">
                <div className="checkout-left">
                    <h2>Order Summary</h2>
                    <div className="order-summary-container">
                        <div className="order-details">
                            <h3>Order Details</h3>
                            <table>
                                <tr>
                                    <td><b>Order ID:</b></td>
                                    <td>dummyid</td>
                                </tr>
                                <tr>
                                    <td><b>Order Date:</b></td>
                                    <td>dummydate</td>
                                </tr>
                                <tr>
                                    <td><b>Order Status:</b></td>
                                    <td>dummystatus</td>
                                </tr>
                                <tr>
                                    <td><b>Total Items:</b></td>
                                    <td>dummytotalitems</td>
                                </tr>
                                <tr>
                                    <td><b>Order Total:</b></td>
                                    <td>dummytotal</td>
                                </tr>
                            </table>
                        </div>
                        <div className="order-summary-items">
                            <h3>Items in Cart</h3>
                            {products.map((item) => (
                                <CartItem key={item.id} product={item} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="checkout-right">
                    <h2>Shipping Details</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input placeholder="Name" type="text" id="name" name="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input placeholder="Email" type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <input placeholder="Phone Number" type="text" id="phoneNumber" name="phoneNumber" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
                            <textarea placeholder="Address" id="address" name="address" required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="noteToSeller">Note to Seller:</label>
                            <textarea placeholder="Note to Seller" id="noteToSeller" name="noteToSeller"></textarea>
                        </div>
                        <button className="auth-submit" type="submit" disabled>Place Order</button>
                    </form>
                </div>
            </div>
        </div>
    )
}