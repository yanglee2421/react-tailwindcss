// Redux Toolkit Imports
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const sliceLogin = createSlice({
  name: "login",
  initialState,
  reducers: {
    islogged(state, { payload }: PayloadAction<boolean>) {
      state.islogged = payload;
      if (payload) return;
      state.usr = null;
    },
    usr(state, { payload }: PayloadAction<Usr | null>) {
      state.usr = payload;
    },
  },
});

function initialState(): State {
  return {
    islogged: false,
    usr: null,
  };
}

interface State {
  islogged: boolean;
  usr: Usr | null;
}

interface Usr {
  role: string;
}
