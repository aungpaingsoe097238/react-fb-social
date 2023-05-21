import { createSlice } from "@reduxjs/toolkit";
import app from "../../firebase";
import { getDatabase, set, ref } from "firebase/database";

const database = getDatabase(app);
export const firebaseSlice = createSlice({
  name: "firbase",
  initialState: {
    data: "",
    status: "",
  },
  reducers: {
    addFirebase: (state, actions) => {
      state.data = "",
      state.status = 0,
      state.data = actions.payload.data;
      try {
        set(ref(database, actions.payload.path), state.data)
        state.status = 1
      } catch (error) {
        state.status = 2
      }
    },
  },
});

export const { addFirebase } = firebaseSlice.actions;
export default firebaseSlice.reducer;
