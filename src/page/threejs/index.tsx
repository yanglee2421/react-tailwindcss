import style from "./threejs.module.scss";
import {
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
} from "three";
// antd
import { useClass } from "@/hook";
import React, { useEffect, useId } from "react";
const cn = useClass(style);
/**
 * threejs 页面
 * @returns JSX
 */
export function PageThreejs() {
  const uid = useId();
  useEffect(() => {
    // 场景
    const scence = new Scene();
    // 摄像机
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);
    scence.add(camera);
    // 几何形状
    const cubeG = new BoxGeometry(1, 1, 1);
    // 材质
    const mater = new MeshBasicMaterial({ color: 0xffff00 });
    // 物体
    const cube = new Mesh(cubeG, mater);
    scence.add(cube);
    // 生成渲染器
    const render = new WebGLRenderer();
    render.setSize(window.innerWidth, window.innerHeight);
    // 挂载到 dom
    const root = document.getElementById(uid)!;
    root.hasChildNodes() || root.appendChild(render.domElement);
    render.render(scence, camera);
  }, []);
  return (
    <div
      id={uid}
      className={cn("")}
    ></div>
  );
}

export default React.memo(PageThreejs);
