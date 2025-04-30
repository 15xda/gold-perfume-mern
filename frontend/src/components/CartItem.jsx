import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { setCart } from "../storage/userSlice";
import ProductImage from "./ProductImage";

export const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.data);
  const userCart = user?.cart || [];

  const productFromState = userCart.find(item => item.itemId === product.id);
  const [productCount, setProductCount] = useState(productFromState?.quantity || 1);
  const [isLoading, setIsLoading] = useState(false);
  const [prodOper, setProdOper] = useState(1);
  const [minQuant, setMinQuant] = useState(1);

  useEffect(() => {
    const productUOM = product.uom?.name || '';
    if (productUOM === 'шт') {
      setMinQuant(6);
      setProdOper(1);
    } else if (productUOM === 'г') {
      setMinQuant(30);
      setProdOper(10);
    }
  }, [product]);

  const updateQuantity = async (newQuantity) => {
    setProductCount(newQuantity);
    setIsLoading(true);
    try {
      const response = await api.put('/cart/update-cart', {
        itemId: product.id,
        quantity: newQuantity
      });
      dispatch(setCart(response.data.cart));
    } catch (error) {
      console.error('Ошибка при обновлении корзины:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = async () => {
    try {
      const response = await api.put('/cart/delete-from-cart', { itemId: product.id });
      dispatch(setCart(response.data.cart));
    } catch (error) {
      console.error('Ошибка при удалении из корзины:', error);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && productCount >= minQuant) {
      await updateQuantity(productCount);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <ProductImage product={product}/>
      </div>

      <div className="cart-item-details">
        <h3>{product.name}</h3>
        <p className="cart-item-price">
          {product.salePrices}₽ / {product.uom?.description}
        </p>
      </div>

      <div className="cart-item-quantity">
        <button
          onClick={() => {
            const newQty = productCount - prodOper;
            if (newQty >= minQuant) updateQuantity(newQty);
          }}
        >
          - {prodOper}
        </button>

        {isLoading ? (
          <div className="loader-small" style={{ width: '50px', display: 'flex', justifyContent: 'center' }}></div>
        ) : (
          <input
            type="number"
            value={productCount}
            min={minQuant}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0) setProductCount(value);
            }}
            onKeyDown={handleKeyDown}
          />
        )}

        <button onClick={() => updateQuantity(productCount + prodOper)}>
          + {prodOper}
        </button>
      </div>

      <div className="cart-item-total">
        {product.salePrices * productCount} ₽
      </div>

      <button className="cart-item-remove" onClick={handleRemoveItem}>
        <span className="material-icons">close</span>
      </button>
    </div>
  );
};
