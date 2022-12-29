import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
namespace type {
  export interface query {
    isPassed: boolean;
    data: any[];
  }
}
const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "/auth",
    timeout: 20000,
  }),
  tagTypes: ["auth"],
  endpoints(build) {
    return {
      queryAuth: build.query<type.query, boolean>({
        query(arg) {
          return "/query";
        },
        providesTags: [{ type: "auth", id: "all" }],
      }),
      del: build.mutation<any, string>({
        query(id) {
          return "/del/" + id;
        },
        invalidatesTags: [{ type: "auth", id: "all" }],
      }),
      login: build.mutation({
        query(body) {
          return {
            url: "/login",
            method: "post",
            body,
          };
        },
      }),
    };
  },
});
export const { useLoginMutation, useQueryAuthQuery, useDelMutation } = authApi;
export default authApi;
