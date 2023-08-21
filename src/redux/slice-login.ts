// Redux Toolkit Imports
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const sliceLogin = createSlice({
  name: "login",
  initialState,
  reducers: {
    islogged(state, { payload }: PayloadAction<boolean>) {
      state.islogged = payload;
    },
  },
});

function initialState() {
  return {
    islogged: false,
  };
}
