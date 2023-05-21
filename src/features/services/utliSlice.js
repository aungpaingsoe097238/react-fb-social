import { createSlice } from "@reduxjs/toolkit";

const now = new Date();

export const utliSlice = createSlice({
  name: "utli",
  initialState: {
    nowInMilliseconds : Date.now(),
    dateTimeString : now.toLocaleString(),
  },
  reducers: {

  },
});

export default utliSlice.reducer;