import axios, { RawAxiosRequestConfig } from "axios";
import { message as Message } from "antd";
const request = axios.create({
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
    Message.warning(statusText);
    return new Promise(() => {});
  },
  ({ message }) => {
    console.error(message);
    Message.error(message);
    return new Promise(() => {});
  }
);
export default async <T = unknown>(params: RawAxiosRequestConfig) =>
  request(params) as unknown as T;
