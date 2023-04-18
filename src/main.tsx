import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "antd/dist/reset.css";
import "@yanglee2421/scss";
import { store, Provider } from "@/redux";
import { queryClient, QueryClientProvider } from "@/api";

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
