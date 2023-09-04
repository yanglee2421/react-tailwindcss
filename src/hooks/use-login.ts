// Redux Imports
import { useAppDispatch, useAppSelector, sliceLogin } from "@/redux";
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
