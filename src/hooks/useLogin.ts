import { useAppDispatch, useAppSelector, sliceAuth } from "@/redux";
import { useCallback } from "react";
import { LoginData } from "@/redux/slice-auth";

export function useSignOut() {
  const dispatch = useAppDispatch();
  const timer = useAppSelector((state) => state.auth.timer);

  return useCallback(() => {
    clearTimeout(timer);
    dispatch(sliceAuth.actions.actSignOut());
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  }, [timer]);
}

export function useSignIn() {
  const timer = useAppSelector((state) => state.auth.timer);
  const dispatch = useAppDispatch();
  const signOut = useSignOut();

  return useCallback(
    (login: LoginData, isRemember = false) => {
      const { user, token, expiration } = login;
      clearTimeout(timer);
      dispatch(
        sliceAuth.actions.actTimer(setTimeout(signOut, expiration - Date.now()))
      );
      const nextAuth = { user, token, expiration };
      dispatch(sliceAuth.actions.actSignIn(nextAuth));
      if (isRemember) {
        localStorage.setItem("auth", JSON.stringify(nextAuth));
        localStorage.setItem("token", token);
      }
    },
    [timer]
  );
}
