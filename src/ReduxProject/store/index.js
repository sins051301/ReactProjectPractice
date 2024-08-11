import { createStore } from "redux";

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increament") {
    return {
      counter: state.counter + 1,
    };
  }
  if(action.type === "decreament"){
    return {
        counter: state.counter -1,
    }
  }
  return state;
};
const store = createStore(counterReducer);

export default store;
