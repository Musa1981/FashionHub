import React, { createContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import FashionReducer from '../context/FashionReducer';

export const FashionContext = createContext();

const FashionContextProvider = (props) => {
    const [products, dispatch] = useReducer(FashionReducer, []);
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            setCartItems(cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
        console.log("Adding product to cart:", product);
    };

    const calculateTotalPrice = () => {
        const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        return totalPrice;
    };

    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
        console.log("Removing product with ID:", productId);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/fashionhub/products');
                dispatch({ type: 'FETCH_PRODUCTS', payload: response.data });
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <FashionContext.Provider value={{ products, cartItems, addToCart, removeFromCart, calculateTotalPrice }}>
            {props.children}
        </FashionContext.Provider>
    );
}

export default FashionContextProvider;
