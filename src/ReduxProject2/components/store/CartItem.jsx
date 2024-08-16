import { createSlice } from "@reduxjs/toolkit";

const initialItem = { items: [], changed: false };

const ItemSlice = createSlice({
  name: "cartItem",
  initialState: initialItem,
  reducers: {
    increment(state, action) {
      const item = action.payload;
      const existingIdx = state.items.findIndex(
        (currentItem) => currentItem.name === item.name
      );
      if (existingIdx > -1) {
        const existingItem = {
          ...state.items[existingIdx],
          quantity: state.items[existingIdx].quantity + 1,
        };
        state.items[existingIdx] = existingItem;
      } else {
        const Id = Math.random() * 1000;
        state.items = [
          ...state.items,
          {
            id: Id,
            name: item.name,
            price: item.price,
            quantity: 1,
          },
        ];
      }
      state.changed = true;
    },
    decrement(state, action) {
      const item = action.payload;
      const existingIdx = state.items.findIndex(
        (currentItem) => currentItem.name === item.name
      );
      if (state.items[existingIdx].quantity >= 1) {
        const existingItem = {
          ...state.items[existingIdx],
          quantity: state.items[existingIdx].quantity - 1,
        };
        state.items[existingIdx] = existingItem;
      }
      state.items = state.items.filter((item) => item.quantity !== 0);
      state.changed = true;
    },
    setting(state, action){
      if(action.payload === null)
        state.cartItem.items = [];
      state.items = action.payload;
    }
  },
});



const ItemReducer = ItemSlice.reducer;
export const ItemActions = ItemSlice.actions;

export default ItemReducer;
