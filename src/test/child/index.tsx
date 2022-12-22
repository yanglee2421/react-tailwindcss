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
  const { data } = useGetStuQuery();
  setTimeout(() => {
    dispatch(setAge(88));
    dispatch(setName("李四"));
    console.log(data);
  }, 0);
  return (
    <div className="mt-1">
      <p>这是子组件</p>
      <WebWorker></WebWorker>
    </div>
  );
};
