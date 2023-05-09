import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SetState = (state: State) => void;
type Payload = PayloadAction<SetState>;

export const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    actSetState(state, { payload }: Payload) {
      return payload(state);
    },
  },
});

interface State {
  isLogined: boolean;
}

function initialState(): State {
  return {
    isLogined: false,
  };
}
