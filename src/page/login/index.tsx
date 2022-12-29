import style from "./login.module.scss";
import { useClass } from "@/hook";
import { useGetBingQuery } from "@/api/rtkq/bingApi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CardLogin from "./component/card-login";
import CardRegister from "./component/card-register";
const cn = useClass(style);

export default () => {
  const isLogined = useSelector<any, boolean>((state) => state.auth.isLogined);
  // prettier-ignore
  if (isLogined) return <Navigate to="/" replace />;
  const divRef = useRef<HTMLDivElement>(null);
  const bingRes = useGetBingQuery();
  useEffect(() => {
    if (!divRef.current) return;
    if (!bingRes.isSuccess) return;
    divRef.current.style.backgroundImage = `url(${bingRes.data})`;
  }, [bingRes]);

  const [isRegister, setIsRegister] = useState(false);
  return (
    <div
      ref={divRef}
      className={cn("login-root")}
    >
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
    </div>
  );
};
