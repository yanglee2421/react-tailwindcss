import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDemoPost() {
  const queryClient = useQueryClient();
  return useMutation<number, Error>({
    async mutationFn() {
      return Date.now();
    },
    onSuccess() {
      queryClient.invalidateQueries(["demo"]);
    },
  });
}
