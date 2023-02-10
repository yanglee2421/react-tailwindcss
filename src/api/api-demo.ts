import { request } from "./api-axios";

interface getJoke {
  isOk: boolean;
  rows: string[];
}
export function getJoke() {
  return request<any, getJoke>({
    url: "/joke",
  });
}
