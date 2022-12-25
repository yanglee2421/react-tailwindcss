import { Scene } from "three";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// antd
import { Button } from "antd";
import { useEffect } from "react";
import { useClass } from "@/hook";
import style from "./web3d.module.scss";
import { loginFn } from "@/redux/slice/auth";
const cn = useClass(style);
export default () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginFn({ username: "admin", maxtime: Date.now() + 10000 }));
  }, []);
  return (
    <div>
      <h1>web3d</h1>
      <Button
        onClick={() => navigate("/show")}
        danger
      >
        注销登录
      </Button>
    </div>
  );
};
