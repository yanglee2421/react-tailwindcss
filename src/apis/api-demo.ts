import { request } from "./api-axios";

interface getJoke {
  isOk: boolean;
  rows: string[];
}
export function getJoke(param: any) {
  console.log(param);

  return request<any, getJoke>({
    url: "/joke",
  });
}
