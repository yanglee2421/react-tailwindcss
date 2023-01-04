import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
const bingApi = createApi({
  reducerPath: "apiBing",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    timeout: 20000,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["bing"],
  endpoints(build) {
    return {
      Bing: build.query<string[], void>({
        query() {
          return {
            url: "/bing",
            params: {
              idx: 0,
              n: 8,
            },
          };
        },
        transformResponse(baseQueryReturnValue: any) {
          return baseQueryReturnValue;
        },
        keepUnusedDataFor: 60 * 60,
        providesTags: (res, err, arg) => [{ type: "bing", id: "all" }],
      }),
    };
  },
});
export const { useBingQuery } = bingApi;
export default bingApi;
