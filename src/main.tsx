import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import { store } from "@/redux";
import "@/assets/scss/reset.scss";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/apis/react-query";

const root = document.querySelector("#root")!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
