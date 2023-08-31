// API Imports
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usr_post } from "@/api/mock";
import { Req, Params } from "@/api/mock/usr_post";

// Toast Imports
import { message } from "antd";

export function useUsrPost() {
  const queryClient = useQueryClient();
  return useMutation<Params, Error, Req>({
    async mutationFn(req) {
      return usr_post(req);
    },
    onSuccess(data) {
      queryClient.setQueryData<Params>(["usr-refresh"], (prev) => {
        if (!prev) return data;
        return { ...prev, ...data };
      });
      message.success("Welcome back!");
    },
    onError(err) {
      message.error(err.message);
    },
  });
}
