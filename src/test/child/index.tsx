import { useSelector, useDispatch } from "react-redux";
import { useGetStuQuery } from "@/api/rtkq";
import { useClass } from "@/hook";
import { setAge, setName } from "@/redux/slice/student";
import style from "./child.module.scss";
import WebWorker from "../webWorker";
import { useTransition } from "react";
const cN = useClass(style);
export default () => {
  const student = useSelector<any, any>((state) => state.student);
  const dispatch = useDispatch();
  const { name } = useGetStuQuery(undefined, {
    pollingInterval: 0,
    refetchOnMountOrArgChange: true,
    skip: true,
    selectFromResult: (res) => ({
      name: res.data?.[0],
    }),
    // 需要setupListencers
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [isPending, startTransition] = useTransition();
  console.log("isPending", isPending);

  setTimeout(() => {
    dispatch(setAge(88));
    dispatch(setName("李四"));
  }, 0);
  return (
    <div className="mt-1">
      <p>这是子组件</p>
      <WebWorker></WebWorker>
    </div>
  );
};
