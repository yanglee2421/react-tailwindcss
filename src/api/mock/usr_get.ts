// Axios Imports
import { axiosMock } from "./axios-mock";
import { AxiosRequestConfig } from "axios";

export function usr_get(req: AxiosRequestConfig) {
  return axiosMock<unknown, Res>({
    url: "/usr",
    ...req,
  });
}

export interface Res {
  loginAt: number;
}
