// Axios Imports
import { axiosMock } from "./axios-mock";
import { AxiosRequestConfig } from "axios";

export function login_post(req: Req) {
  return axiosMock<unknown, Data, Data>({
    ...req,
    url: "/login",
    method: "POST",
  });
}

export type Req = AxiosRequestConfig<Data>;

export interface Data {
  email: string;
  pwd: string;
}
