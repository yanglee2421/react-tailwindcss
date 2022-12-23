import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { message as Message } from "antd";
/**
 * 创建Axios实例
 * 请求域名
 * 最长等待时间
 */
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 6000,
});
/**
 * 请求拦截器
 */
request.interceptors.request.use((config: AxiosRequestConfig) => {
  if (!config.headers) return config;
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
/**
 * 响应拦截器
 */
request.interceptors.response.use(
  (res: AxiosResponse) => {
    const { status, statusText, data } = res;
    if (status === 200) return data;
    console.warn(statusText);
    Message.warning(statusText);
    return new Promise(() => {});
  },
  (err: AxiosError) => {
    const { message } = err;
    console.error(message);
    Message.error(message);
    return new Promise(() => {});
  }
);
/**
 * 导出实例
 */
export default async <T = unknown>(params: AxiosRequestConfig) => {
  return (await request(params)) as unknown as T;
};
fetch("/bing", {
  headers: {
    responseType: "blob",
  },
});
