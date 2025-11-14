import { useCart } from "../context/CartContext";

const CartProducts = () => {
    const { cart, addToCart, giamQuantity, removeCart } = useCart();

    const totalAmount = cart
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2);

    return (
        <div className="container py-5">
            <h1 className="mb-5 fw-bolder text-dark border-bottom pb-2">🛒 Your Shopping Cart</h1>

            {cart.length === 0 ? (
                <div className="text-center py-5 bg-light rounded-3 shadow-sm">
                    <h4 className="text-secondary mb-3">Your cart is empty.</h4>
                    <p className="text-muted">Explore our products and add some items to get started!</p>
                    {/* Có thể thêm nút quay lại mua sắm */}
                    <button className="btn btn-outline-primary mt-3">Start Shopping</button>
                </div>
            ) : (
                <div className="card shadow-lg border-0">
                    <div className="card-body p-4 p-md-5">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle text-center mb-0">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th scope="col" className="text-start ps-3">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="align-middle border-bottom"
                                            style={{ transition: "background-color 0.3s" }}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.backgroundColor = "#e9ecef")
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.backgroundColor = "transparent")
                                            }
                                        >
                                            <td className="text-start d-flex align-items-center ps-3 py-3">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="img-fluid rounded-3 me-3"
                                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                                />
                                                <span className="fw-semibold text-dark text-truncate" style={{ maxWidth: '250px' }}>
                                                    {item.title}
                                                </span>
                                            </td>
                                            <td className="text-primary fw-bold">${item.price.toFixed(2)}</td>
                                            <td>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary rounded-circle"
                                                        style={{ width: '30px', height: '30px', padding: 0 }}
                                                        onClick={() => giamQuantity(item)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        −
                                                    </button>
                                                    <span className="mx-3 fw-bold">{item.quantity}</span>
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary rounded-circle"
                                                        style={{ width: '30px', height: '30px', padding: 0 }}
                                                        onClick={() => addToCart(item)}
                                                        disabled={item.quantity >= 99}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="fw-bolder text-success">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => removeCart(item.id)}
                                                >
                                                    ❌ Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Tổng tiền và Checkout */}
                        <div className="d-flex justify-content-end align-items-center border-top pt-4 mt-4">
                            <h4 className="me-5 fw-bold text-dark">
                                Total:
                                <span className="text-success ms-3 fs-3">${totalAmount}</span>
                            </h4>
                            <button className="btn btn-primary btn-lg shadow-lg">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartProducts;