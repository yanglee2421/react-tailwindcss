import axios, { AxiosError } from "axios";

export const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000 * 60,
  headers: {
    common: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  },
});

request.interceptors.request.use((config) => config);
request.interceptors.response.use(
  (res) => {
    const { status, statusText, data } = res;
    if (status === 200) return data;
    throw new Error(statusText);
  },
  (err: AxiosError) => {
    const { message, response } = err;
    throw new Error(message, { cause: response });
  }
);
