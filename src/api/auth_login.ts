import { request } from "./request";

export interface Req {
  username: string;
  password: string;
}

export interface Res {
  isOk: boolean;
  token: string;
  username: string;
  invalidTime: number;
}

export function auth_login(data: Req) {
  return request<unknown, Res, Req>({
    url: "/auth/login",
    method: "POST",
    data,
  });
}
