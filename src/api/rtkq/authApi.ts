import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URl + "/auth",
    timeout: 2000,
  }),
  endpoints(build) {
    return {
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
export const { useLoginMutation } = authApi;
export default authApi;
