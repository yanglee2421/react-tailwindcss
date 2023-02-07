import style from "./style.module.scss";
import React, {
  useCallback,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
} from "react";
import { useClass, useObject } from "@/hook";
import { Card, Switch } from "antd";
import { RestOutlined } from "@ant-design/icons";

export function PageDemo() {
  const cx = useClass(style);

  const cvsRef = useRef<HTMLCanvasElement>(null);
  const moveHandler = useCallback(
    (e: React.MouseEvent) => {
      const canvas = cvsRef.current;
      if (!canvas) return;
      const { offsetX, offsetY } = e.nativeEvent;
      const ctx = canvas.getContext("2d")!;
      ctx.beginPath();
      ctx.fillStyle = "#f00";
      ctx.arc(offsetX, offsetY, 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    },
    [cvsRef]
  );
  const clearBtnHandler = useCallback(() => {
    const canvas = cvsRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [cvsRef]);
  const [isShow, setIsShow] = useState(false);
  const is = useDeferredValue(isShow);
  const cvs = useMemo(() => {
    if (!is) return;
    return (
      <Card actions={[<RestOutlined onClick={clearBtnHandler} />]}>
        <canvas
          ref={cvsRef}
          width={300}
          height={300}
          onMouseMove={moveHandler}
        ></canvas>
      </Card>
    );
  }, [moveHandler, clearBtnHandler, isShow]);

  const [obj, setObj] = useObject({ height: 0, isTrans: false });
  return (
    <div className={cx("box")}>
      <div className={cx("demo")}>
        <Switch
          onChange={(e) => {
            setIsShow(e);
            setObj((prev) => {
              prev.isTrans = true;
              prev.height = e ? 405 : 0;
            });
          }}
        />
      </div>
      <div
        onTransitionEnd={() => setObj((prev) => (prev.isTrans = false))}
        style={{ height: obj.height }}
        className={cx([
          "flex center-center overflow-hidden",
          obj.isTrans ? "trans" : "",
        ])}
      >
        {cvs}
      </div>
    </div>
  );
}
export default React.memo(PageDemo);
