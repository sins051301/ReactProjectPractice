import { createContext, useReducer, useState } from "react";

export const EmailContext = createContext({
  name: "",
  email: "",
  street: "",
  postalCode: "",
  city: "",
  resetForm: () => {},
  setForm: () => {},
});

export const MyMealContext = createContext({
  array: [],
  sum: 0,
  num: 0,
  addItem: () => {},
  deleteItem: () => {},
});

function myMealReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const target = state.array.findIndex(
      (element) => action.meal.id === element.id
    );
    const updatedItems = [...state.array];
    if (target > -1) {
      const existingItem = state.array[target];
      const updatedItem = { ...existingItem, mine: existingItem.mine + 1 };
      updatedItems[target] = updatedItem;
    } else {
      updatedItems.push({ ...action.meal, mine: 1 });
    }
    return { ...state, array: updatedItems };
  }
  if (action.type === "DELETE_ITEM") {
    const target = state.array.findIndex(
      (element) => action.meal.id === element.id
    );
    const existingCartItem = state.array[target];
    const updatedItems = [...state.array];
    if (existingCartItem.mine === 1) {
      updatedItems.splice(target, 1);
    } else {
      updatedItems[target] = {
        ...existingCartItem,
        mine: existingCartItem.mine - 1,
      };
    }
    return { ...state, array: updatedItems };
  }
  return state;
}

export function MyMealContextProvider({ children }) {
  const [myMealState, setMyMealDispatch] = useReducer(myMealReducer, {
    array: [],
    sum: 0,
    num: 0,
  });
  function handleAddMeal(meal) {
    setMyMealDispatch({
      type: "ADD_ITEM",
      meal,
    });
  }
  function handleDeleteMeal(meal) {
    setMyMealDispatch({
      type: "DELETE_ITEM",
      meal,
    });
  }
  const ctxValue = {
    myMeal: myMealState,
    addItem: handleAddMeal,
    deleteItem: handleDeleteMeal,
  };
  return (
    <MyMealContext.Provider value={ctxValue}>{children}</MyMealContext.Provider>
  );
}

export function EmailContextProvider({ children }) {
  const [email, setEmail] = useState({
    name: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
  });
  function resetForm() {
    setEmail({
      name: "",
      email: "",
      postalCode: "",
      street: "",
      city: "",
    });
  }
  function setForm({ name, email, postalCode, city, street }) {
    setEmail({
      name: name,
      email: email,
      postalCode: postalCode,
      street: street,
      city: city,
    });
  }

  const emailCtx = {
    form: email,
    setForm,
    resetForm,
  };

  return (
    <EmailContext.Provider value={emailCtx}>{children}</EmailContext.Provider>
  );
}
