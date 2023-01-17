import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { message } from "antd";

namespace Type {
  interface rej {
    isOk: false;
    mes: unknown;
  }
  interface res {
    isOk: true;
  }
  type api<T> = T | rej;
  // Bing 接口
  interface bingRes extends res {
    rows: string[];
  }
  export type Bing = api<bingRes>;
  export interface auth {
    username: string;
    password: string;
  }
  interface pwdRows {
    pwd_id: string;
    pwd_pwd: string;
    pwd_site: string;
    pwd_username: string;
  }
  export interface pwdQuery {
    isOk: boolean;
    rows: pwdRows[];
    total: number;
  }
  export interface pwdReq {
    pwd_site?: string;
    pwd_username?: string;
    page_index?: number;
    page_size?: number;
  }
}

export const authApi = createApi({
  reducerPath: "apiRTKQ",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    timeout: 20000,
    prepareHeaders(headers) {
      const token = localStorage.getItem("token") || "";
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["pwd", "joke"],
  endpoints: (build) => ({
    // 笑话
    Joke: build.query<any, void>({
      query: () => ({ url: "/joke" }),
      providesTags: () => [{ type: "joke", id: "all" }],
      keepUnusedDataFor: 60 * 60,
    }),
    // 必应壁纸
    Bing: build.query<Type.Bing, void>({
      query: () => ({
        url: "/bing",
        params: { idx: 0, n: 8 },
      }),
      transformResponse(res: Type.Bing) {
        if (!res.isOk) message.warning(String(res.mes));
        return res;
      },
      keepUnusedDataFor: 60 * 60,
    }),
    // 注册
    register: build.mutation<any, Type.auth>({
      query: (body) => ({
        url: "/auth/register",
        method: "post",
        body,
      }),
    }),
    // 登录
    login: build.mutation<any, Type.auth>({
      query: (body) => ({
        url: "/auth/login",
        method: "post",
        body,
      }),
    }),
    // pwd 查所有
    pwd: build.query<Type.pwdQuery, Type.pwdReq>({
      query: (params) => ({
        url: "/pwd/query",
        params,
      }),
      providesTags: [{ type: "pwd", id: "all" }],
    }),
    // pwd 查单条
    pwdOne: build.query<any, string>({
      query: (id) => `/pwd/query/${id}`,
      providesTags: (res, err, id) => [{ type: "pwd", id }],
    }),
    // pwd 删除
    pwdDel: build.mutation<any, string>({
      query: (id) => ({
        url: `/pwd/delete/${id}`,
        method: "delete",
      }),
      invalidatesTags: (res, err, id) => [
        { type: "pwd", id: "all" },
        { type: "pwd", id },
      ],
    }),
    // pwd 保存
    pwdSave: build.mutation({
      query: (body) => ({
        url: "/pwd/save",
        method: "post",
        body,
      }),
      invalidatesTags: (res, err, body) => [
        { type: "pwd", id: "all" },
        { type: "pwd", id: body.pwd_id },
      ],
    }),
  }),
});
export const {
  useJokeQuery,
  useBingQuery,
  useRegisterMutation,
  useLoginMutation,
  usePwdQuery,
  usePwdOneQuery,
  usePwdDelMutation,
  usePwdSaveMutation,
} = authApi;
