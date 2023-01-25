import style from "./demo.module.scss";
import { Button, Card, Input, Layout, Space } from "antd";
import { useClass, useResize } from "@/hook";
import { Snow } from "@/util";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
const cx = useClass(style);
/**
 * Demo 页面
 * @returns JSX
 */
export function PageDemo() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  const handler = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setValue((prev) => e.target.value.trim());
      startTransition(() => {
        setCount((prev) => {
          const begin = Date.now();
          while (true) {
            if (Date.now() - begin > 1000) {
              break;
            }
          }
          return prev + 1;
        });
      });
    },
    [count]
  );
  const cvsRef = useRef<HTMLCanvasElement>(null);
  const resizeRef = useResize(
    (box) => {
      const cvs = cvsRef.current;
      if (!cvs) return;
      Object.assign(cvs, box);
      const snow = new Snow(cvs, (box.width / 1920) * 200);
      snow.animation();
      return () => {
        snow.abortAnimation();
      };
    },
    [cvsRef]
  );
  return (
    <Layout ref={resizeRef} className={cx("h-100 box")}>
      <Card title="useTransition" className={cx("card m-1")}>
        <Space>
          <Button danger>{count}</Button>
          <Input value={value} onChange={handler} />
        </Space>
      </Card>
      <canvas ref={cvsRef} className={cx("cvs")}></canvas>
    </Layout>
  );
}

export default React.memo(PageDemo);
