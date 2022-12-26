import { Scene } from "three";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// antd
import { Button } from "antd";
import { useEffect } from "react";
import { useClass } from "@/hook";
import style from "./web3d.module.scss";
import { loginFn } from "@/redux/slice/auth";
import { setAge } from "@/redux/slice/student";
const cn = useClass(style);
export default () => {
  const navigate = useNavigate();
  const age = useSelector<any, number>((state) => state.student.age);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      loginFn({
        username: "admin",
        maxtime: Date.now() + 1000 * 60 * 2,
        token: "",
      })
    );
  }, []);
  return (
    <div>
      <h1>web3d:{age}</h1>
      <Button
        onClick={() => navigate("/show")}
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
