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
import { useCallback } from "react";

export function useLogin() {
  // Redux Hooks
  const dispatch = useAppDispatch();
  const usrLocal = useAppSelector((s) => s.loginLocal.usr);
  const usrSession = useAppSelector((s) => s.loginSession.usr);

  const usr = usrLocal || usrSession;

  // API Hooks
  const queryClient = useQueryClient();

  // Sign In
  const signIn = useCallback(
    (usr: Usr, rememberMe?: boolean) => {
      // Save To Local
      if (rememberMe) {
        const action = sliceLoginLocal.actions.usr(usr);
        dispatch(action);
        return;
      }

      // Save To Session
      const action = sliceLoginSession.actions.usr(usr);
      dispatch(action);
    },
    [dispatch]
  );

  // Sign Out
  const signOut = useCallback(() => {
    // Clear Local
    const action = sliceLoginLocal.actions.usr(null);
    dispatch(action);

    // Clear Session
    const actionSession = sliceLoginSession.actions.usr(null);
    dispatch(actionSession);

    // Clear Query
    queryClient.clear();
  }, [dispatch, queryClient]);

  // Update User
  const updateUsr = useCallback(
    (usr: Partial<Usr>) => {
      // Update Local
      const actionLocal = sliceLoginLocal.actions.usrPatch(usr);
      dispatch(actionLocal);

      // Update Session
      const actionSession = sliceLoginSession.actions.usrPatch(usr);
      dispatch(actionSession);
    },
    [dispatch]
  );

  return { signIn, signOut, updateUsr, usr };
}
