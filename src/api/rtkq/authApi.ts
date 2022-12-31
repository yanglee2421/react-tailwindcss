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
  reducerPath: "authApi",
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
  endpoints(build) {
    return {
      register: build.mutation<any, type.auth>({
        query(body) {
          return {
            url: "/auth/register",
            method: "post",
            body,
          };
        },
      }),
      login: build.mutation<any, type.auth>({
        query(body) {
          return {
            url: "/auth/login",
            method: "post",
            body,
          };
        },
      }),
      pwd: build.query<type.pwdQuery, type.pwdReq>({
        query(params) {
          return {
            url: "/pwd/query",
            params,
          };
        },
        providesTags: [{ type: "pwd", id: "all" }],
      }),
      pwdOne: build.query<any, string>({
        query(id) {
          return {
            url: `/pwd/query/${id}`,
          };
        },
        providesTags: (res, err, id) => [{ type: "pwd", id }],
      }),
      pwdDel: build.mutation<any, string>({
        query(id) {
          return {
            url: `/pwd/delete/${id}`,
            method: "delete",
          };
        },
        invalidatesTags: (res, err, id) => [
          { type: "pwd", id: "all" },
          { type: "pwd", id },
        ],
      }),
      pwdSave: build.mutation({
        query(body) {
          return {
            url: "/pwd/save",
            method: "post",
            body,
          };
        },
        invalidatesTags: (res, err, body) => [
          { type: "pwd", id: "all" },
          { type: "pwd", id: body.pwd_id },
        ],
      }),
    };
  },
});
export const {
  useRegisterMutation,
  useLoginMutation,
  usePwdQuery,
  usePwdOneQuery,
  usePwdDelMutation,
  usePwdSaveMutation,
} = authApi;
export default authApi;
