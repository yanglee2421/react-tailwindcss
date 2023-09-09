// Redux Toolkit Imports
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const sliceDemo = createSlice({
  name: "demo",
  initialState,
  reducers: {
    data(s, { payload }: PayloadAction<Data>) {
      s.data = payload;
    },
    ageAdd(s) {
      s.data.age += 1;
    },
  },
});

function initialState(): State {
  return {
    data: {
      name: "",
      age: 0,
    },
  };
}

interface State {
  data: Data;
}

interface Data {
  name: string;
  age: number;
}
