// Login Imports
import { useLogin } from "./use-login";

// API Imports
import { usr_get } from "@/api/mock";
import { useQuery } from "@tanstack/react-query";

// React Imports
import { useEffect } from "react";

export function useLoginMe() {
  // Redux Hooks
  const { usr, signIn, signOut } = useLogin();

  // API Hooks
  const { isError, data } = useQuery({
    enabled: Boolean(usr),
    queryKey: ["usr_get"],
    queryFn({ signal }) {
      return usr_get({ signal });
    },

    initialData() {
      return usr;
    },
    initialDataUpdatedAt() {
      return usr?.loginAt;
    },

    refetchInterval: 1000 * 30,
  });

  // Update user information when authentication is successful
  useEffect(() => {
    if (!data) return;
    signIn(data);
  }, [signIn, data]);

  // Log out if authentication fails
  useEffect(() => {
    if (!isError) return;
    signOut();
  }, [signOut, isError]);
}
