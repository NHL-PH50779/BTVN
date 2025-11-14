import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

interface CartSidebarProps {
    openCart: boolean;
    setOpenCart: (value: boolean) => void;
}

const CartPopup: React.FC<CartSidebarProps> = ({ openCart, setOpenCart }) => {
    const { cart, removeCart, addToCart, giamQuantity } = useCart();

    const totalAmount = cart
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2);

    if (!openCart) return null;

    return (
        <>
            {/* CSS gộp vào 1 file */}
            <style>{`
                .cart-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.35);
                    backdrop-filter: blur(2px);
                    z-index: 9998;
                }

                .cart-sidebar {
                    width: 350px;
                    position: fixed;
                    top: 0;
                    right: 0;
                    height: 100vh;
                    background: #fff;
                    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
                    z-index: 9999;
                    overflow-y: auto;
                    transform: translateX(100%);
                    transition: transform 0.35s ease-in-out;
                }

                .cart-sidebar.open {
                    transform: translateX(0);
                }

                .cart-header {
                    padding: 16px;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .cart-item {
                    display: flex;
                    gap: 10px;
                    padding: 12px 16px;
                    border-bottom: 1px solid #f1f1f1;
                }

                .cart-item img {
                    width: 65px;
                    height: 65px;
                    object-fit: cover;
                    border-radius: 6px;
                }

                .cart-item-title {
                    font-size: 14px;
                    font-weight: 600;
                }

                .cart-item-price {
                    font-size: 13px;
                    color: #777;
                }

                .quantity-group button {
                    width: 28px;
                    height: 28px;
                    font-size: 15px;
                }

                .quantity-group span {
                    padding: 0 6px;
                    font-size: 15px;
                }

                .cart-total {
                    padding: 18px 16px;
                    display: flex;
                    justify-content: space-between;
                    border-top: 2px solid #eee;
                    font-size: 16px;
                }

                .checkout-btn {
                    margin: 10px 16px;
                    display: block;
                    width: calc(100% - 32px);
                    padding: 10px 0;
                    text-align: center;
                    background: #0d6efd;
                    color: white !important;
                    border-radius: 6px;
                    text-decoration: none;
                    font-weight: 600;
                }

                .checkout-btn:hover {
                    background: #0b5ed7;
                }
            `}</style>

            {/* Overlay */}
            <div className="cart-overlay" onClick={() => setOpenCart(false)}></div>

            {/* Sidebar */}
            <div className={`cart-sidebar ${openCart ? "open" : ""}`}>
                {/* Header */}
                <div className="cart-header">
                    <h5 className="m-0">Your Cart ({cart.length})</h5>
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setOpenCart(false)}
                    >
                        &times;
                    </button>
                </div>

                {/* Items */}
                <div>
                    {cart.length === 0 ? (
                        <p className="text-center text-muted p-3">Cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <img src={item.thumbnail} alt={item.title} />

                                <div className="flex-grow-1">
                                    <div className="cart-item-title">{item.title}</div>
                                    <div className="cart-item-price">${item.price.toFixed(2)}</div>

                                    <div className="d-flex align-items-center quantity-group mt-1">
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => giamQuantity(item)}
                                        >
                                            -
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => addToCart(item)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="text-end">
                                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                                    <div>
                                        <button
                                            className="btn btn-sm btn-danger mt-1"
                                            onClick={() => removeCart(item.id)}
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Total */}
                <div className="cart-total">
                    <strong>Total:</strong>
                    <span>${totalAmount}</span>
                </div>

                {/* Checkout */}
                <Link to="/cart" className="checkout-btn">
                    Checkout
                </Link>
            </div>
        </>
    );
};

export default CartPopup;
