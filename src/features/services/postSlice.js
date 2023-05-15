import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: "",
    commentCount: 0,
    postCount: 0
  },
  reducers: {
    addPost: (state, actions) => {
      state.post = actions.payload.post;
    },
    addCommentCount: (state, actions) => {
      state.commentCount = actions.payload.commentCount;
    },
    addPostCount: (state, actions) => { 
      state.postCount = actions.payload.postCount;
    } 
  }
});

export const { addPost, addCommentCount, addPostCount } = postSlice.actions;
export default postSlice.reducer;
