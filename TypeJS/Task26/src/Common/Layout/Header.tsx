import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import CartPopup from "./CartPopup";

const Header = () => {
    const { cart } = useCart();
    const [openCart, setOpenCart] = useState(false);

    const handleCartClick = () => {
        setOpenCart((prev) => !prev);
    };

    const BLUE_PRIMARY = '#0056b3'; // Xanh dương đậm
    const BLUE_LIGHT = '#007bff'; // Xanh dương sáng (Dùng cho nút)

    return (
        <nav 
            className="navbar navbar-expand-lg px-4 py-3 sticky-top"
            style={{ 
                backgroundColor: BLUE_PRIMARY, 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                zIndex: 1030 
            }}
        >
            <div className="container-fluid d-flex justify-content-between align-items-center">

                {/* Logo */}
                <Link 
                    className="navbar-brand text-white fw-bolder fs-4" 
                    to="/" 
                    style={{ letterSpacing: '1px' }}
                >
                    {/* Icon Logo: Chuyển sang Font Awesome Cube */}
                    <i className="fa-solid fa-cube me-2 text-warning"></i> 
                    BlueMart
                </Link>

                {/* Thanh tìm kiếm */}
                <form className="d-flex mx-4 flex-grow-1" role="search" style={{ maxWidth: '600px' }}>
                    <input
                        className="form-control me-2 border-0 rounded-3 ps-4"
                        style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                            color: '#333',
                            boxShadow: 'none'
                        }}
                        type="search"
                        placeholder="Search products..."
                    />
                    <button 
                        className="btn fw-semibold" 
                        type="submit"
                        style={{ backgroundColor: BLUE_LIGHT, borderColor: BLUE_LIGHT, color: 'white' }}
                    >
                        {/* Icon Search: Chuyển sang Font Awesome Search */}
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>

                {/* Icons bên phải */}
                <div className="d-flex align-items-center">

                    {/* Button Giỏ hàng để mở Cart Popup */}
                    <button 
                        className="btn btn-link text-white position-relative p-0 border-0"
                        onClick={handleCartClick}
                        style={{ textDecoration: 'none' }}
                        aria-expanded={openCart}
                        aria-label="Toggle shopping cart"
                    >
                        {/* Icon Giỏ hàng: Chuyển sang Font Awesome Cart */}
                        <i className="fa-solid fa-cart-shopping fs-4 text-white"></i> 

                        {/* Badge số lượng */}
                        <span
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning" 
                            style={{ 
                                fontSize: "10px", 
                                padding: '5px 7px',
                                border: '2px solid ' + BLUE_PRIMARY 
                            }}
                        >
                            {cart.length > 99 ? '99+' : cart.length}
                            <span className="visually-hidden">items in cart</span>
                        </span>
                    </button>

                </div>
            </div>
            
            <CartPopup openCart={openCart} setOpenCart={setOpenCart} />
        </nav>
    );
};

export default Header;