// Redux Imports
import { usr_get } from "@/api/mock";
import { useAppDispatch, useAppSelector, sliceLogin } from "@/redux";
import { Usr } from "@/redux/slice-login";
import { useQuery } from "@tanstack/react-query";

// Antd Imports
import { message } from "antd";
import { useEffect } from "react";

export function useLogin() {
  // Redux Hooks
  const dispatch = useAppDispatch();
  const usr = useAppSelector((s) => s.login.usr);

  // Sign In
  const signIn = (usr: Usr) => {
    const action = sliceLogin.actions.usr(usr);
    dispatch(action);
    message.destroy();
    message.success("Wellcome back!");
  };

  // Sign Out
  const signOut = () => {
    const action = sliceLogin.actions.usr(null);
    dispatch(action);
    message.destroy();
    message.success("Sign out successlly!");
  };

  return { signIn, signOut, usr };
}

export function useLoginMe() {
  // Redux Hooks
  const usr = useAppSelector((s) => s.login.usr);

  // API Hooks
  const { isError } = useQuery({
    enabled: Boolean(usr),
    queryKey: ["usr_get"],
    queryFn({ signal }) {
      return usr_get({ signal });
    },

    refetchInterval: 1000 * 10,
  });

  useEffect(() => {
    if (!isError) return;
  }, [isError]);
}
