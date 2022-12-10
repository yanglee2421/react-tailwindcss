import { createSlice } from "@reduxjs/toolkit";
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDark: false,
  },
  reducers: {
    setIsDark(state, { payload }) {
      state.isDark = payload;
    },
  },
});
export const { setIsDark } = themeSlice.actions;
export default themeSlice.reducer;
