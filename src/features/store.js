import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./services/authSlice";
import photoSlice from "./services/photoSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    photo: photoSlice
  },
});