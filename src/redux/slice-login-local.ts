// Redux Toolkit Imports
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const sliceLoginLocal = createSlice({
  name: "loginLocal",
  initialState,
  reducers: {
    usr(state, { payload }: PayloadAction<Usr | null>) {
      state.usr = payload;
    },
    usrPatch(s, { payload }: PayloadAction<Partial<Usr>>) {
      if (!s.usr) return;
      Object.assign(s.usr, payload);
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
  loginAt: number;
}
