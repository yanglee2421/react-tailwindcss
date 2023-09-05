// API Imports
import { usr_get } from "@/api/mock";
import { useQuery } from "@tanstack/react-query";
import { Res } from "@/api/mock/usr_get";

// React Imports
import { useEffect } from "react";

// Redux Imports
import { useAppDispatch, sliceLogin, useAppSelector } from "@/redux";

// Toast Imports
import { message } from "antd";

export function useLoginMe() {
  // Redux Hooks
  const dispatch = useAppDispatch();
  const usr = useAppSelector((s) => s.login.usr);

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

    refetchInterval: 1000 * 10,

    retry: 2,
    retryDelay: 1000 * 3,
  });

  // Update user information when authentication is successful
  useEffect(() => {
    if (!data) return;

    const action = sliceLogin.actions.usrPatch(data);
    dispatch(action);
  }, [dispatch, data]);

  // Log out if authentication fails
  useEffect(() => {
    if (!isError) return;

    const action = sliceLogin.actions.usr(null);
    dispatch(action);

    message.error(error.message);
  }, [dispatch, isError]);
}
