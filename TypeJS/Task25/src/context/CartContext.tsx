import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { TCart, TProducts } from '../components/ListProducts';

type CartContextType = {
    cart: TCart[];
    handleAddToCart: (item: TProducts | TCart) => void;
    total: number;
    removeToCart: (item: TProducts ) => void;
};
export const CartContext = createContext<CartContextType>({
    cart: [],
    handleAddToCart: () => {},
    total: 0,
    removeToCart: () => {},
});
export const CartContextProvider = ({ children }: {children: ReactNode}) => {
    const [cart, setCart] = useState<TCart[]>([]);

    const handleAddToCart = (item: TCart | TProducts) => {
        console.log(item)
        const newCart = cart.find((c) => c.id === item.id);
        
        if (!newCart) {
            const payload = [...cart, { ...item, quantity: 1 }]
            setCart(payload);
            localStorage.setItem('cart', JSON.stringify([...cart, { ...item, quantity: 1 }]))
        }

        if (newCart) {
            const payload =cart.map((cart) => (cart.id == item.id ? { ...cart, quantity: cart.quantity + 1 } : cart))
            console.log(payload)
            setCart(payload);
            localStorage.setItem('cart', JSON.stringify(payload))
        }
    };

    const removeToCart = (products: TProducts) => {
        const newCart = cart.find((c) => c.id === products.id);
        if (!newCart) return;
        if (newCart.quantity > 1) {
            const payload = cart.map((item) => (item.id == products.id ? { ...item, quantity: item.quantity - 1 } : item))
            setCart(payload);
            localStorage.setItem('cart', JSON.stringify(payload))
        }
        if (newCart.quantity == 1) {
            const payload = cart.filter((item) => item.id !== products.id) 
            setCart(payload);
            localStorage.setItem('cart', JSON.stringify(payload))
        }
    };

    //Tính tổng
    const total = cart.reduce((acc, cur) => {
        return (acc = acc + cur.quantity * cur.price);
    }, 0);

    useEffect(() => {
        const cartStorage = localStorage.getItem('cart')
        const cartData = cartStorage ? JSON.parse(cartStorage) : [];
        console.log(cartData)
        if (cartData.length) {
            setCart(cartData);
        }
    }, []);

    const value = {
        cart,
        handleAddToCart,
        total,
        removeToCart,
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
