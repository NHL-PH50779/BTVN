import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

type Props = {
    openCart: boolean;
    setOpenCart: (value: boolean) => void;
};

// Helper function to format currency
const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

const SidebarCart = ({ openCart, setOpenCart }: Props) => {
    const cartContext = useContext(CartContext);
    
    // Nếu context không tồn tại, tránh lỗi runtime
    if (!cartContext) {
        return null;
    }

    const { cart, total, AddToCart, removeToCart } = cartContext;
    
    // --- STYLE DEFINITIONS ---
    
    const backdropStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1040,
        transition: 'opacity 0.3s ease-in-out',
        opacity: openCart ? 1 : 0,
        pointerEvents: openCart ? 'auto' : 'none', // Vô hiệu hóa click khi đóng
    };

    const sidebarStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        right: 0,
        width: '380px', // Chiều rộng cố định
        height: '100vh',
        backgroundColor: '#f8f9fa', // Light gray background
        boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.15)',
        zIndex: 1050,
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out',
        // Hiệu ứng trượt ra/vào
        transform: openCart ? 'translateX(0)' : 'translateX(100%)',
    };

    const headerStyle: React.CSSProperties = {
        padding: '20px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    };

    const contentStyle: React.CSSProperties = {
        flexGrow: 1,
        overflowY: 'auto', // Cho phép cuộn nếu danh sách dài
        padding: '20px',
    };

    const itemRowStyle: React.CSSProperties = {
        display: 'flex',
        marginBottom: '15px',
        paddingBottom: '15px',
        borderBottom: '1px dotted #ccc',
        alignItems: 'center',
    };

    const qtyButtonStyle: React.CSSProperties = {
        width: '30px',
        height: '30px',
        borderRadius: '50%', // Hình tròn
        border: '1px solid #ccc',
        backgroundColor: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1em',
        lineHeight: '1',
        transition: 'background-color 0.1s',
    };
    
    const priceStyle: React.CSSProperties = {
        color: '#e91e63', // Màu nổi bật cho giá
        fontWeight: 'bold',
        marginLeft: 'auto', 
        whiteSpace: 'nowrap',
        textAlign: 'right',
    }

    const footerStyle: React.CSSProperties = {
        padding: '20px',
        borderTop: '1px solid #ddd',
        backgroundColor: 'white',
        position: 'sticky', // Cố định ở dưới
        bottom: 0,
    };

    const checkoutButtonStyle: React.CSSProperties = {
        padding: '12px',
        backgroundColor: '#4CAF50', // Màu xanh lá cây
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        width: '100%',
        cursor: 'pointer',
        fontSize: '1.1em',
        fontWeight: 'bold',
        transition: 'background-color 0.2s',
    };
    
    // --- RENDER LOGIC ---

    return (
        <div>
            {/* Lớp phủ nền mờ */}
            <div style={backdropStyle} onClick={() => setOpenCart(false)} />

            {/* Sidebar chính */}
            <div style={sidebarStyle}>
                
                {/* Header */}
                <div style={headerStyle}>
                    <h4 style={{ margin: 0, color: '#333' }}> Giỏ hàng ({cart.length})</h4>
                    <button 
                        style={{ background: 'none', border: 'none', fontSize: '1.5em', cursor: 'pointer', color: '#666' }}
                        onClick={() => setOpenCart(false)}
                    >
                        &times; {/* Dùng ký tự X đơn giản và lớn hơn */}
                    </button>
                </div>

                {/* Nội dung (Danh sách sản phẩm) */}
                <div style={contentStyle}>
                    {cart.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#666', marginTop: '50px' }}>Giỏ hàng của bạn đang trống.</p>
                    ) : (
                        cart.map((item) => (
                            <div style={itemRowStyle} key={item.id}>
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #eee' }}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null; 
                                        target.src = 'https://placehold.co/70x70/E0E0E0/333?text=N/A';
                                    }}
                                />
                                
                                <div style={{ flexGrow: 1, marginLeft: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <div style={{ fontWeight: '600', fontSize: '0.95em' }}>{item.title}</div>
                                    
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        {/* Giảm số lượng */}
                                        <button
                                            style={qtyButtonStyle}
                                            onClick={() => removeToCart(item)}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                                        >
                                            −
                                        </button>
                                        <span style={{ fontWeight: 'bold', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                        {/* Tăng số lượng */}
                                        <button
                                            style={qtyButtonStyle}
                                            onClick={() => AddToCart(item)}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                
                                <span style={priceStyle}>
                                    {formatCurrency(item.price * item.quantity)}
                                </span>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer (Tổng tiền và Thanh toán) */}
                {cart.length > 0 && (
                    <div style={footerStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2em', marginBottom: '15px', color: '#333' }}>
                            <span>Tổng tiền:</span>
                            <span style={{ color: '#e91e63' }}>{formatCurrency(total)}</span>
                        </div>
                        <button 
                            style={checkoutButtonStyle}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#43A047'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#4CAF50'}
                        >
                            TIẾN HÀNH THANH TOÁN
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SidebarCart;