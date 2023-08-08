// Axios Imports
import { axiosMock } from "./axios-mock";
import { AxiosRequestConfig } from "axios";

export function table_get(config: AxiosRequestConfig = {}) {
  return axiosMock<unknown, []>({
    ...config,
    url: "/table",
  });
}
