import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../components/Cart/cartSlice';

export const store = configureStore({
	reducer: {
		cart: cartReducer,
	}
});
