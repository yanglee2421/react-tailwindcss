import { useAppDispatch, sliceLogin } from "@/redux";

// Style Imports
import style from "./home.module.scss";

// Hooks Imports
import { useStyle } from "@/hooks";
// import { useLoginQuery } from "./hooks";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export function Component() {
  const cx = useStyle(style);

  const disPatch = useAppDispatch();
  const handleLogout = () => {
    disPatch(sliceLogin.actions.actSetState(false));
  };

  // const { data } = useLoginQuery();

  // useEffect(() => {
  //   if (!data) return;
  //   localStorage.setItem("token", data.token);
  // }, [data]);

  const [list, setList] = useState<string[]>([]);

  const listEl = useMemo(() => {
    return list.map((item) => <li key={item}>{item}</li>);
  }, [list]);

  const { data } = useQuery({
    queryKey: ["refresh"],
    async queryFn() {
      const time = new Date().toLocaleTimeString();
      console.log(time);
      return { time };
    },

    // ** Initial
    initialData() {
      const time = new Date().toLocaleTimeString();
      console.log(time);
      return { time };
    },
    initialDataUpdatedAt() {
      return Date.now();
    },

    // ** Refetch
    refetchInterval: 1000 * 60 * 30,
    refetchIntervalInBackground: true,

    // Stale Time
    staleTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    setList((prev) => {
      const isExist = prev.includes(data.time);
      if (isExist) return prev;
      return [...prev, data.time];
    });
  }, [data]);

  return (
    <div className={cx("home b h-100")}>
      <ul> {listEl} </ul>
      <button onClick={handleLogout}>log out</button>
    </div>
  );
}
