// Redux Imports
import { usr_get } from "@/api/mock";
import { useAppDispatch, useAppSelector, sliceLogin } from "@/redux";
import { Usr } from "@/redux/slice-login";

// API Imports
import { useQuery, useQueryClient } from "@tanstack/react-query";

// React Imports
import { useEffect } from "react";

export function useLogin() {
  // Redux Hooks
  const dispatch = useAppDispatch();
  const usr = useAppSelector((s) => s.login.usr);

  // API Hooks
  const queryClient = useQueryClient();

  // Sign In
  const signIn = (usr: Usr) => {
    const action = sliceLogin.actions.usr(usr);
    dispatch(action);
  };

  // Sign Out
  const signOut = () => {
    const action = sliceLogin.actions.usr(null);
    dispatch(action);

    queryClient.clear();
  };

  return { signIn, signOut, usr };
}

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

    refetchInterval: 1000 * 10,
  });

  // Update user information when authentication is successful
  useEffect(() => {
    if (!data) return;
    signIn(data);
  }, [data]);

  // Log out if authentication fails
  useEffect(() => {
    if (!isError) return;
    signOut();
  }, [isError]);
}
