import style from "./login.module.scss";
import { useClass } from "@/hook";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { BgParticle as Particle } from "@/component";
import { useAppSelector } from "@/redux";
import { CardLogin, CardRegister } from "./component";
import React from "react";
const cn = useClass(style);
const BgParticle = React.memo(Particle);
/**
 * 登录页面
 * @returns JSX
 */
export function PageLogin() {
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
}

export default React.memo(PageLogin);
