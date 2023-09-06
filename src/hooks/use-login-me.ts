// API Imports
import { usr_get } from "@/api/mock";
import { useQuery } from "@tanstack/react-query";
import { Res } from "@/api/mock/usr_get";

// React Imports
import { useEffect } from "react";

// Login Imports
import { useLogin } from "./use-login";

// Toast Imports
import { message } from "antd";

export function useLoginMe() {
  // Redux Hooks
  const { usr, updateUsr, signOut } = useLogin();
  // API Hooks
  const { isError, error, data } = useQuery<Res, Error>({
    enabled: Boolean(usr),
    queryKey: ["usr_get"],
    queryFn({ signal }) {
      return usr_get({ signal, params: usr });
    },

    initialData() {
      if (!usr) return;
      return usr;
    },
    initialDataUpdatedAt() {
      return usr?.loginAt;
    },

    refetchInterval: import.meta.env.DEV ? 1000 * 10 : 1000 * 60 * 30,

    retry: 2,
    retryDelay: 1000 * 3,
  });

  // Update user information when authentication is successful
  useEffect(() => {
    if (!data) return;

    updateUsr(data);
  }, [updateUsr, data]);

  // Log out if authentication fails
  useEffect(() => {
    if (!isError) return;

    signOut();

    message.error(error.message);
  }, [signOut, isError]);
}
