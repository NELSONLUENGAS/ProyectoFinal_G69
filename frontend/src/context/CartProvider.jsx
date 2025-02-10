import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([
		{
			name: 'Producto 1',
			price: 10.99,
			image: 'https://via.placeholder.com/150',
			quantity: 5,
		},
		{
			name: 'Producto 2',
			price: 24.99,
			image: 'https://via.placeholder.com/150',
			quantity: 10,
		},
		{
			name: 'Producto 3',
			price: 7.5,
			image: 'https://via.placeholder.com/150',
			quantity: 3,
		},
		{
			name: 'Producto 4',
			price: 15.75,
			image: 'https://via.placeholder.com/150',
			quantity: 8,
		},
	]);

	return (
		<CartContext.Provider value={{ cart }}>{children}</CartContext.Provider>
	);
};
