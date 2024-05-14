import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload);
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter(
                (item) => item._id !== action.payload
            );
        },
        increaseQuantity(state, action) {
            const item = state.cart.find((item) => item._id === action.payload);
            item.quantity++;
            item.totalPrice += item.price;
        },
        decreaseQuantity(state, action) {
            const item = state.cart.find((item) => item._id === action.payload);
            item.quantity--;
            item.totalPrice -= item.price;
            if (item.quantity == 0)
                cartSlice.caseReducers.deleteItem(state, action);
        },
        clearCart(state) {
            state.cart = [];
        },
    },
});

export const {
    addItem,
    deleteItem,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
