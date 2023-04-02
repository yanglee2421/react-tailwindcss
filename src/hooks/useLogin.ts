import { useAppDispatch, sliceAuth } from "@/redux";
import { useRef } from "react";

interface loginData {
  user: string;
  token: string;
  expiration: number;
}

export function useLogin() {
  const dispatch = useAppDispatch();

  // Auto Logout Timer
  const timer = useRef<number | NodeJS.Timeout>(0);

  // signOut & signIn
  const signOut = () => {
    clearTimeout(timer.current);
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    dispatch(sliceAuth.actions.actSignOut());
  };

  const signIn = (
    { user, token, expiration }: loginData,
    isRemember = false
  ) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(signOut, expiration - Date.now());
    const nextAuth = { user, token, expiration };
    if (isRemember) {
      localStorage.setItem("auth", JSON.stringify(nextAuth));
      localStorage.setItem("token", token);
    }
    dispatch(sliceAuth.actions.actSignIn(nextAuth));
  };

  return { signIn, signOut };
}
