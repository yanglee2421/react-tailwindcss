// Redux Toolkit Imports
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const sliceLogin = createSlice({
  name: "login",
  initialState,
  reducers: {
    islogged(state, { payload }: PayloadAction<boolean>) {
      state.islogged = payload;
    },
    role(state, { payload }: PayloadAction<"admin" | "client">) {
      state.role = payload;
    },
  },
});

function initialState(): State {
  return {
    islogged: false,
    role: "client",
  };
}

interface State {
  islogged: boolean;
  role: "admin" | "client";
}
