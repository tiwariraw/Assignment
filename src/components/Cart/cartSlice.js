import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
	},
	reducers: {
		addToCart: (state, action) => {
			state.items.push(action.payload);
		},
		removeItem: (state, action) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
		clearCart: (state, action) => {
			state.items.length = 0;
		}
	}
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;