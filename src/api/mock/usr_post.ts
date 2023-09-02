// Axios Imports
import { axiosMock } from "./axios-mock";
import { AxiosRequestConfig } from "axios";

export function usr_post(req: Req) {
  return axiosMock<unknown, Res, Data>({
    method: "POST",
    url: "/usr",
    ...req,
  });
}

export interface Req extends AxiosRequestConfig<Data> {}

export interface Data {
  email: string;
  passwd: string;
}

export interface Res {
  email: string;
  role: string;
}
