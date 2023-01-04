import { useClass } from "@/hook";
import style from "./firework.module.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux";
import { setIsShow } from "@/redux/slice-gallery";

const cn = useClass(style);
function Firework() {
  const dispatch = useAppDispatch();
  const isShow = useAppSelector((state) => state.gallery.isShow);
  useEffect(() => {
    dispatch(setIsShow(false));
  }, []);
  return (
    <div className={cn("")}>
      <canvas></canvas>
    </div>
  );
}

export default Firework;
