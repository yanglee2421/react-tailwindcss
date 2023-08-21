import { useQuery } from "@tanstack/react-query";

export function useDemoGet() {
  return useQuery({
    queryKey: ["demo"],
    queryFn() {
      return Date.now();
    },
  });
}
