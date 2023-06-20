// Redux Toolkit Imports
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const sliceLogin = createSlice({
  name: "login",
  initialState,
  reducers: {
    actSetState(state, { payload }: PayloadAction<boolean>) {
      state.isLogined = payload;
    },
  },
});

function initialState() {
  return {
    isLogined: false,
  };
}
