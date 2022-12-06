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
      state.age = 19;
    },
  },
});
const { setName } = stuSlice.actions;
const nameAction = setName("李四");
