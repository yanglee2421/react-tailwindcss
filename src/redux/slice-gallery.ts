import { createSlice } from "@reduxjs/toolkit";
const stuSlice = createSlice({
  name: "gallery",
  initialState: () => ({
    isShow: false,
    imgArr: [],
  }),
  reducers: {
    setIsShow(state, action) {
      state.isShow = action.payload;
    },
    setImgArr(state, action) {
      state.imgArr = action.payload;
    },
  },
});
export const { setIsShow, setImgArr } = stuSlice.actions;
export default stuSlice.reducer;
