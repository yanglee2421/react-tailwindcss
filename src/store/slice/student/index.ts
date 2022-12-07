import { createSlice } from "@reduxjs/toolkit";
const stuSlice = createSlice({
  name: "stu",
  initialState: {
    name: "张三",
    age: 18,
    gender: "男",
    address: "翻斗花园",
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setAge(state, action) {
      state.age = action.payload;
    },
  },
});
export const { setName, setAge } = stuSlice.actions;
export default stuSlice.reducer;
