import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

namespace type {
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

const authApi = createApi({
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
  tagTypes: ["pwd"],
  endpoints: (build) => ({
    // 必应壁纸
    Bing: build.query<string[], void>({
      keepUnusedDataFor: 60 * 60,
      query: () => ({
        url: "/bing",
        params: { idx: 0, n: 8 },
      }),
    }),
    // 注册
    register: build.mutation<any, type.auth>({
      query: (body) => ({
        url: "/auth/register",
        method: "post",
        body,
      }),
    }),
    // 登录
    login: build.mutation<any, type.auth>({
      query: (body) => ({
        url: "/auth/login",
        method: "post",
        body,
      }),
    }),
    // pwd 查所有
    pwd: build.query<type.pwdQuery, type.pwdReq>({
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

export default authApi;
export const {
  useBingQuery,
  useRegisterMutation,
  useLoginMutation,
  usePwdQuery,
  usePwdOneQuery,
  usePwdDelMutation,
  usePwdSaveMutation,
} = authApi;
