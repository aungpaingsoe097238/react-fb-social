import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./services/authSlice";
import photoSlice from "./services/photoSlice";
import postSlice from "./services/postSlice";
import firebaseSlice from "./services/firebaseSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    photo: photoSlice,
    post: postSlice,
    firebase: firebaseSlice
  },
});