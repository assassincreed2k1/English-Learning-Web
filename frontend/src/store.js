import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./api/userSlice";
import examReducer from "./api/examSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    exam: examReducer,
  },
});

export default store;
