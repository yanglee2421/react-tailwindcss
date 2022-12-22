import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.4",
    timeout: 60000,
  }),
  endpoints(build) {
    return {
      getStu: build.query<string[], void>({
        query() {
          return "bing";
        },
        transformResponse(baseQueryReturnValue: any) {
          return baseQueryReturnValue.data;
        },
        keepUnusedDataFor: 60,
      }),
    };
  },
});
export const { useGetStuQuery } = studentApi;
export default studentApi;
