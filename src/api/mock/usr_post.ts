// Axios Imports
import { axiosMock } from "./axios-mock";
import { AxiosRequestConfig } from "axios";

export function usr_post(req: Req) {
  return axiosMock<unknown, Params>({
    url: "/usr",
    ...req,
  });
}

export interface Req extends AxiosRequestConfig {
  params: Params;
}

export interface Params {
  email: string;
  passwd: string;
}
