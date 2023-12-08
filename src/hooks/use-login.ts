// Redux Imports
import {
  useAppDispatch,
  useAppSelector,
  sliceLoginLocal,
  sliceLoginSession,
} from "@/redux";
import { Usr } from "@/redux/slice-login-local";

// API Imports
import { useQueryClient } from "@tanstack/react-query";

// React Imports
import React from "react";

export function useLogin() {
  // Redux Hooks
  const dispatch = useAppDispatch();
  const usr = useAppSelector((s) => {
    return s.loginLocal.usr || s.loginSession.usr;
  });

  // API Hooks
  const queryClient = useQueryClient();

  // Sign In
  const signIn = React.useCallback(
    (usr: Usr, rememberMe?: boolean) => {
      rememberMe
        ? dispatch(sliceLoginLocal.actions.usr(usr))
        : dispatch(sliceLoginSession.actions.usr(usr));
    },
    [dispatch]
  );

  // Sign Out
  const signOut = React.useCallback(() => {
    // Clear Storage
    dispatch(sliceLoginLocal.actions.usr(null));
    dispatch(sliceLoginSession.actions.usr(null));

    // Clear Query Client
    queryClient.clear();
  }, [dispatch, queryClient]);

  // Update User
  const updateUsr = React.useCallback(
    (usr: Partial<Usr>) => {
      // Update User
      dispatch(sliceLoginLocal.actions.usrPatch(usr));
      dispatch(sliceLoginSession.actions.usrPatch(usr));
    },
    [dispatch]
  );

  return { signIn, signOut, updateUsr, usr };
}
