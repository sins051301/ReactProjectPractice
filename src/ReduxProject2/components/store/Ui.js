import { createSlice } from "@reduxjs/toolkit";

const initialShow = { show: false, notification: null };

const displaySlice = createSlice({
  name: "visible",
  initialState: initialShow,
  reducers: {
    toggleDisplay(state) {
      state.show = !state.show;
    },
    offDisplay(state) {
      state.show = false;
    },
    setNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

const displayReducer = displaySlice.reducer;
export const displayAction = displaySlice.actions;

export default displayReducer;
