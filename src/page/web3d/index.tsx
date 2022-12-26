import { Scene } from "three";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// antd
import { Button } from "antd";
import { useEffect } from "react";
import { useClass } from "@/hook";
import style from "./web3d.module.scss";
import { loginoutFn } from "@/redux/slice/auth";
import { setAge } from "@/redux/slice/student";
const cn = useClass(style);
export default () => {
  const navigate = useNavigate();
  const age = useSelector<any, number>((state) => state.student.age);
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  return (
    <div>
      <h1>web3d:{age}</h1>
      <Button
        onClick={() => dispatch(loginoutFn())}
        danger
      >
        注销登录
      </Button>
      <Button
        onClick={() => dispatch(setAge(age + 1))}
        danger
      >
        age++
      </Button>
    </div>
  );
};
