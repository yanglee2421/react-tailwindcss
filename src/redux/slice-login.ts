// Redux Toolkit Imports
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const sliceLogin = createSlice({
  name: "login",
  initialState,
  reducers: {
    usr(state, { payload }: PayloadAction<Usr | null>) {
      state.usr = payload;
    },
  },
});

function initialState(): State {
  return {
    usr: null,
  };
}

interface State {
  usr: Usr | null;
}

export interface Usr {
  role: string;
  email: string;
}
