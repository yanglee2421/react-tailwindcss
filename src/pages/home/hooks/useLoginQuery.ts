import { auth_login, Res } from "@/api/auth_login";

// Query Imports
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useLoginQuery() {
  const queryClient = useQueryClient();

  const [enabled, setEnabled] = useState(true);

  return useQuery<Res, Error>({
    enabled,
    refetchInterval: 1000 * 10,
    retry(failureCount) {
      if (failureCount < 2) return true;
      setEnabled(false);
      return false;
    },
    queryKey: ["auth_login"],
    queryFn() {
      return auth_login({
        username: "admin",
        password: "admin",
      });
    },
    initialData() {
      return getInitData();
    },
    initialDataUpdatedAt: Date.now(),
    placeholderData() {
      const prevData = queryClient.getQueryData(["auth_login"]) as Res;
      const initData = getInitData();
      return prevData || initData;
    },
  });
}

// Get Initial Data
function getInitData() {
  return {
    isOk: false,
    token: "",
    username: "",
    invalidTime: 0,
  };
}
