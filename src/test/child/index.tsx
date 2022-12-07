import style from "./child.module.scss";
import { useClass } from "@/hook";
import { useSelector, useDispatch } from "react-redux";
import { setAge, setName } from "@/redux/slice/student";

const cN = useClass(style);
export default () => {
  const student = useSelector<{ student: { name: string } }, { name: string }>(
    (state) => state.student
  );
  const dispatch = useDispatch();
  dispatch(setAge(88));
  dispatch(setName("李四"));
  return (
    <div className="mt-1">
      <p>这是子组件</p>
    </div>
  );
};
