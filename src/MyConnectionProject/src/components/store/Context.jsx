import { createContext } from "react";

export const EmailContext = createContext({
  name: "",
  email: "",
  street: "",
  postalCode: "",
  city: "",
});

export const MyMealContext = createContext({ array: [], sum: 0, num: 0 });
