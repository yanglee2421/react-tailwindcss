import style from "./login.module.scss";
import { useClass } from "@/hook";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { BgParticle } from "@/component";
import { useAppSelector } from "@/redux";
import CardLogin from "./component/card-login";
import CardRegister from "./component/card-register";
const cn = useClass(style);

export default () => {
  const isLogined = useAppSelector((state) => state.auth.isLogined);
  // prettier-ignore
  if (isLogined) return <Navigate to="/" replace />;
  const [isRegister, setIsRegister] = useState(false);
  return (
    <BgParticle className={cn("login-root")}>
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
    </BgParticle>
  );
};
