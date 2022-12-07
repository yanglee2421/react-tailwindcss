import style from "./child.module.scss";
import { useClass } from "@/hook";
import { useSelector, useDispatch } from "react-redux";
import { setAge, setName } from "@/store/slice/student";

const cN = useClass(style);
export default () => {
  console.log("子组件生成了虚拟DOM");
  const student = useSelector<{ student: { name: string } }, { name: string }>(
    (state) => state.student
  );
  console.log(student.name);
  const dispatch = useDispatch();
  setTimeout(() => {
    dispatch(setAge(88));
    dispatch(setName("李四"));
    console.log(student);
  }, 1000);
  return (
    <div className="mt-1">
      <p>这是子组件</p>
    </div>
  );
};
