import { createSlice } from "@reduxjs/toolkit";

export const photoSlice = createSlice({
  name: "photo",
  initialState: {
    photoUrls : []
  },
  reducers: {
    addPhotos: (state, actions) => {
        state.photoUrls = actions.payload.photoUrls
    },
  },
});

export const { addPhotos } = photoSlice.actions;
export default photoSlice.reducer;