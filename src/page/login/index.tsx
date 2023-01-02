import style from "./login.module.scss";
import { useClass } from "@/hook";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Particle } from "@/component";
import CardLogin from "./component/card-login";
import CardRegister from "./component/card-register";
const cn = useClass(style);

export default () => {
  const isLogined = useSelector<any, boolean>((state) => state.auth.isLogined);
  // prettier-ignore
  if (isLogined) return <Navigate to="/" replace />;
  const [isRegister, setIsRegister] = useState(false);
  return (
    <Particle className={cn("login-root")}>
      <div className={cn("card-box")}>
        <CardLogin
          {...{ isRegister }}
          onRegisterClick={() => setIsRegister((prev) => !prev)}
        />
        <CardRegister
          {...{ isRegister }}
          onLoginClick={() => setIsRegister((prev) => !prev)}
        />
      </div>
    </Particle>
  );
};
