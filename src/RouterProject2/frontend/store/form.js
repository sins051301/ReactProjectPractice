import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialForm = { id: "", title: "", image: "", date: "", description: "" };

const FormSlice = createSlice({
  name: "FormItem",
  initialState: initialForm,
  reducers: {
    setForm(state, action) {
      const Id = Math.random() * 1000;
      state.id = Id;
      state.title = action.payload.title;
      state.image = action.payload.image;
      state.date = action.payload.date;
      state.description = action.payload.description;
    },
  },
});

export const FormAction = FormSlice.actions;

const Formstore = configureStore({
  reducer: { FormItem: FormSlice.reducer },
});
export default Formstore;
