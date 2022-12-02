import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { message as Message } from "antd";
/**
 * 配置
 * 请求域名
 * 最长等待时间
 */
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 6000,
});
// 请求
request.interceptors.request.use((config: AxiosRequestConfig) => {
  if (!config.headers) {
    return config;
  }
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  config.headers["Content-Type"] = "application/json;charset=utf-8";
  return config;
});
// 响应
request.interceptors.response.use(
  (res: AxiosResponse) => {
    const { status, statusText, data } = res;
    if (status === 200) {
      return data;
    }
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
export default async <T = unknown>({
  method,
  url,
  data = {},
  params = {},
}: {
  method?: string;
  url: string;
  data?: unknown;
  params?: unknown;
}) => {
  return (await request({
    method,
    url,
    data,
    params,
  })) as unknown as T;
};
