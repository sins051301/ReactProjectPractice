import { configureStore } from "@reduxjs/toolkit";
import ItemReducer from "./CartItem";
import displayReducer from "./Ui";
//configureStore은 여러 reducer를 병합한다.
const store = configureStore({
  reducer: { cartItem: ItemReducer, visible: displayReducer },
});

export default store;
