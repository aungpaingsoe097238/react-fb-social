import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: "",
  },
  reducers: {
    addPost: (state, actions) => {
        state.post = actions.payload.post
    },
  },
});

export const { addPost } = postSlice.actions;
export default postSlice.reducer;