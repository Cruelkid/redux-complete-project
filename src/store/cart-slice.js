import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false,
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },

        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === newItem.id
            );
            state.totalQuantity++;
            state.changed = true;

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice =
                    existingItem.totalPrice + newItem.price;
            }
        },

        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.totalQuantity--;
            state.changed = true;

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity--;
                existingItem.totalPrice =
                    existingItem.totalPrice - existingItem.price;
            } else {
                state.items = state.items.filter((item) => item.id !== id);
            }
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
