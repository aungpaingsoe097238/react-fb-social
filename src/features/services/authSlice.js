import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
  },
  reducers: {
    addUser: (state, actions) => {
        state.user = actions.payload.user
    },
  },
});

export const { addUser } = authSlice.actions;
export default authSlice.reducer;