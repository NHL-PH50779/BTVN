import React, { useContext, useEffect, useState } from 'react';
import { getProducts } from '../api/apiProduct';
import { CartContext } from '../context/CartContext';

export type TProducts = {
    id: string | number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
};

export type TCart = {
    id: string | number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    quantity: number;
};

const ListProducts = () => {
    const [products, setProducts] = useState<TProducts[]>([]);
    const context = useContext(CartContext);

    const loadData = async () => {
        const res = await getProducts();
        setProducts(res.products);
    };

    useEffect(() => {
        loadData();
    }, []);

    // --- Kiểu dáng cho giao diện ---

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px', 
        padding: '20px',
        justifyContent: 'center', 
    };

    const cardStyle: React.CSSProperties = {
        width: '250px', 
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', 
        backgroundColor: '#fff',
        transition: 'transform 0.2s', 
    };

    const imageStyle: React.CSSProperties = {
        width: '100%',
        height: '150px', 
        objectFit: 'cover', 
        borderRadius: '4px',
        marginBottom: '10px',
    };

    const titleStyle: React.CSSProperties = {
        fontSize: '1.1em',
        fontWeight: 'bold',
        marginBottom: '5px',
        color: '#333',
    };

    const priceStyle: React.CSSProperties = {
        fontSize: '1.2em',
        color: '#e91e63', 
        fontWeight: 'bold',
        marginBottom: '10px',
    };

    // ✨ THAY ĐỔI MÀU NÚT BẤM TẠI ĐÂY (Màu xanh lá cây) ✨
    const buttonStyle: React.CSSProperties = {
        padding: '10px 15px',
        backgroundColor: '#4CAF50', // MÀU NỀN MỚI: Xanh lá cây
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '10px',
        transition: 'background-color 0.2s',
    };
    // ----------------------------------------------------

    const handleButtonClick = (item: TProducts) => {
        if (context && context.handleAddToCart) {
            context.handleAddToCart(item);
        }
    }


    return (
        <div style={containerStyle}>
            {products?.map((item) => {
                return (
                    <div key={item.id} style={cardStyle} 
                         onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                         onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                        
                        <div style={{ flexGrow: 1 }}> 
                            <img src={item.thumbnail} alt={item.title} style={imageStyle} />
                            
                            <p style={titleStyle}>{item.title}</p>
                            
                            <p style={priceStyle}>${item.price.toFixed(2)}</p>
                        </div>

                        <button 
                            className='btn btn-warning' // Giữ lại className cũ nếu bạn đang dùng Bootstrap
                            style={buttonStyle}
                            onClick={() => handleButtonClick(item)}
                            // MÀU HOVER MỚI: Xanh đậm hơn
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#43A047'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#4CAF50'}
                        >
                            ADD TO CART
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default ListProducts;