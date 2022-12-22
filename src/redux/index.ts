import { configureStore } from "@reduxjs/toolkit";
import * as reducer from "./slice";
import rtkq from "@/api/rtkq";
export default configureStore({
  reducer: {
    ...reducer,
    [rtkq.reducerPath]: rtkq.reducer,
  },
  middleware: (getMiddleWare) => getMiddleWare().concat(rtkq.middleware),
});
