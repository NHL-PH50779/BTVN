import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { CartItem, Product } from "../Ts/products";

// 1. Định nghĩa action type
type Action =
    | { type: "ADD"; payload: Product }
    | { type: "DECREASE"; payload: Product }
    | { type: "REMOVE"; payload: number }
    | { type: "SET_CART"; payload: CartItem[] }; // dùng khi load từ localStorage

// 2. Định nghĩa state type
interface CartState {
    cart: CartItem[];
}

// 3. Reducer
const cartReducer = (state: CartState, action: Action): CartState => {
    switch (action.type) {
        case "ADD": {
            const product = action.payload;
            const exist = state.cart.find((item) => item.id === product.id);
            if (exist) {
                return {
                    cart: state.cart.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: Math.min(item.quantity + 1, 99) } // max 99
                            : item
                    ),
                };
            } else {
                return { cart: [...state.cart, { ...product, quantity: 1 }] };
            }
        }

        case "DECREASE": {
            const product = action.payload;
            const exist = state.cart.find((item) => item.id === product.id);
            if (!exist) return state;

            if (exist.quantity > 1) {
                return {
                    cart: state.cart.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ),
                };
            } else {
                // remove if quantity = 1
                return {
                    cart: state.cart.filter((item) => item.id !== product.id),
                };
            }
        }

        case "REMOVE": {
            return {
                cart: state.cart.filter((item) => item.id !== action.payload),
            };
        }

        case "SET_CART": {
            return { cart: action.payload };
        }

        default:
            return state;
    }
};

// 4. Định nghĩa context type
interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    giamQuantity: (product: Product) => void;
    removeCart: (id: number) => void;
}

// 5. Tạo context
export const CartContext = createContext<CartContextType | undefined>(undefined);

// 6. Hook tiện lợi
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("CartContext must be used within a CartContextProvider");
    return context;
};

// 7. Provider
export const CartContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cart: [] });

    // Load cart từ localStorage khi mount
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            dispatch({ type: "SET_CART", payload: JSON.parse(storedCart) });
        }
    }, []);

    // Lưu cart vào localStorage mỗi khi state.cart thay đổi
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.cart));
    }, [state.cart]);

    // Các hàm gửi action
    const addToCart = (product: Product) => dispatch({ type: "ADD", payload: product });
    const giamQuantity = (product: Product) => dispatch({ type: "DECREASE", payload: product });
    const removeCart = (id: number) => dispatch({ type: "REMOVE", payload: id });

    return (
        <CartContext.Provider value={{ cart: state.cart, addToCart, giamQuantity, removeCart }}>
            {children}
        </CartContext.Provider>
    );
};
