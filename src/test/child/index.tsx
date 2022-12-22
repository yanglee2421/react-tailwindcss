import style from "./child.module.scss";
import { useClass } from "@/hook";
import { useSelector, useDispatch } from "react-redux";
import { setAge, setName } from "@/redux/slice/student";
import WebWorker from "../webWorker";
import { useGetStuQuery } from "@/api/rtkq";
const cN = useClass(style);
export default () => {
  const student = useSelector<any, any>((state) => state.student);
  const dispatch = useDispatch();
  const { name } = useGetStuQuery(undefined, {
    pollingInterval: 0,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    skip: true,
    selectFromResult: (res) => ({
      name: res.data?.[0],
    }),
  });
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
