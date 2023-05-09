import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface ItemParams {
  id?: string;
  name: string;
  age: number;
}

interface Item {
  id: string;
  name: string;
  age: number;
}

export const rtkq = createApi({
  reducerPath: "rtkq",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    timeout: 1000 * 60,
    prepareHeaders(headers) {
      const token = localStorage.getItem("token") || "";
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["pwd", "joke"],
  endpoints(build) {
    return {
      // Get all
      pwdAll: build.query<Item[], Partial<ItemParams>>({
        query(params) {
          return {
            url: "/pwd/query",
            params,
          };
        },
        providesTags: [{ type: "pwd", id: "all" }],
        transformResponse(res: Item[]) {
          return res;
        },
        keepUnusedDataFor: 60 * 60,
      }),
      // Get one
      pwdOne: build.query({
        query(id) {
          return `/pwd/query/${id}`;
        },
        providesTags(res, err, id) {
          return [{ type: "pwd", id }];
        },
      }),
      // Delete one
      pwdDel: build.mutation<unknown, string>({
        query(id) {
          return {
            url: `/pwd/delete/${id}`,
            method: "delete",
          };
        },
        invalidatesTags(res, err, id) {
          return [
            { type: "pwd", id: "all" },
            { type: "pwd", id },
          ];
        },
      }),
      // Save one
      pwdSave: build.mutation<Item, ItemParams>({
        query(body) {
          return {
            url: "/pwd/save",
            method: "post",
            body,
          };
        },
        invalidatesTags(res, err, body) {
          return [
            { type: "pwd", id: "all" },
            { type: "pwd", id: body.id },
          ];
        },
      }),
    };
  },
});
