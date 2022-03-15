import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/Basket";

export interface BasketState {
    basket: Basket | null;
}

const initialState: BasketState = {
    basket: null
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },
        removeItem: (state, action) => {
            const { productId, quantity } = action.payload;
            const itemIndex = state.basket?.items.findIndex(x => x.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity;
            if (state.basket?.items[itemIndex].quantity === 0)
                state.basket.items.splice(itemIndex, 1);
        },
    }
})

export const { setBasket, removeItem } = basketSlice.actions;