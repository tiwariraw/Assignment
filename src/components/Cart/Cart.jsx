import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../Cart/cartSlice";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const navigate = useNavigate();

  const handleCheckout = () => {
    const updatedCartItems = cartItems.map((item) => {
      const updatedItem = {
        ...item,
        copies: (item.copies || 1) - 1,
      };

      if (updatedItem.copies <= 0) {
        updatedItem.availability = "Not available";
      }

      return updatedItem;
    });

    toast.success("Successfully bought books");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.id}>
              <img
                src={
                  item.volumeInfo.imageLinks?.thumbnail || "/placeholder.png"
                }
                alt={item.volumeInfo.title}
              />
              <div>
                <h3>{item.volumeInfo.title}</h3>
                <p>Author: {item.volumeInfo.authors?.join(", ")}</p>
              </div>
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button onClick={handleCheckout} className="checkout-button">
          Buy
        </button>
      )}

      <Link to="/" style={{ margin: "1rem" }}>
        &larr; Back to Book List
      </Link>
    </div>
  );
};

export default Cart;
