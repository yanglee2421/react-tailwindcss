import style from "./style.module.scss";
import { Navigate } from "react-router-dom";
import { useClass, useResize } from "@/hook";
import { useAppSelector } from "@/redux";
import { Particles } from "@/util";
import { CardLogin, CardRegister } from "./component";
import React, { useCallback, useMemo, useRef, useState } from "react";
const cn = useClass(style);
/**
 * 登录页面
 * @returns JSX
 */
export function PageLogin() {
  const isLogined = useAppSelector((state) => state.auth.isLogined);
  if (isLogined) return <Navigate to="/" replace />;

  // 登录&注册卡片
  const [isRegister, setIsRegister] = useState(false);
  const switchHandler = useCallback(() => setIsRegister((prev) => !prev), []);
  const cardLogin = useMemo(
    () => <CardLogin {...{ isRegister }} onRegisterClick={switchHandler} />,
    [isRegister, switchHandler]
  );
  const cardRegister = useMemo(
    () => <CardRegister {...{ isRegister }} onLoginClick={switchHandler} />,
    [isRegister, switchHandler]
  );

  const cvsRef = useRef<HTMLCanvasElement>(null);
  const resizeRef = useResize<HTMLDivElement>(
    (box) => {
      const cvs = cvsRef.current;
      if (!cvs) return;
      Object.assign(cvs, box);

      let particle: null | Particles = null;
      const timer = setTimeout(() => {
        particle = new Particles(cvs, (box.width / 1920) * 120);
        particle.animate();
        particle.bindEvent();
      }, 500);

      return () => {
        clearTimeout(timer);
        particle?.abortAnimate();
        particle?.abortEvent();
      };
    },
    [cvsRef]
  );

  return (
    <div ref={resizeRef} className={cn("login-root")}>
      <canvas ref={cvsRef} className={cn("login-cvs")}></canvas>
      <div className={cn("card-box")}>
        {cardLogin}
        {cardRegister}
      </div>
    </div>
  );
}

export default React.memo(PageLogin);
