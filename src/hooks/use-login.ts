// Redux Imports
import {
  useAppDispatch,
  useAppSelector,
  sliceLogin,
  sliceLoginSession,
} from "@/redux";
import { Usr } from "@/redux/slice-login";

// API Imports
import { useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  // Redux Hooks
  const dispatch = useAppDispatch();
  const usr = useAppSelector((s) => s.login.usr);

  // API Hooks
  const queryClient = useQueryClient();

  // Sign In
  const signIn = (usr: Usr, rememberMe?: boolean) => {
    // Save To Local
    if (rememberMe) {
      const action = sliceLogin.actions.usr(usr);
      dispatch(action);
      return;
    }

    // Save To Session
    const action = sliceLoginSession.actions.usr(usr);
    dispatch(action);
  };

  // Sign Out
  const signOut = () => {
    // Clear Local
    const action = sliceLogin.actions.usr(null);
    dispatch(action);

    // Clear Session
    const actionSession = sliceLoginSession.actions.usr(null);
    dispatch(actionSession);

    // Clear Query
    queryClient.clear();
  };

  return { signIn, signOut, usr };
}
