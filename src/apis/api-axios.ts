import axios from "axios";
import { message } from "antd";

export const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 20000,
  headers: {
    common: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  },
});

request.interceptors.request.use((config) => config);
request.interceptors.response.use(
  (res) => {
    const { status, statusText, data } = res;
    if (status === 200) return data;
    console.warn(statusText);
    message.warning(statusText);
    throw new Error(statusText);
  },
  (err) => {
    console.error(err);
    message.error(err.message);
    throw new Error(err.message, { cause: err.cause });
  }
);
