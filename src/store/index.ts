import { configureStore } from "@reduxjs/toolkit";
import * as reducer from "./slice";
export default configureStore({
  reducer,
});
