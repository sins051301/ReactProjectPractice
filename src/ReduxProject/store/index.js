import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import authReducer from "./auth";
//configureStore은 여러 reducer를 병합한다.
const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer},
});



export default store;
