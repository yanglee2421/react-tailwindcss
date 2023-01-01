import {
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
} from "three";
// antd
import { useEffect, useId } from "react";
import { useClass } from "@/hook";
import style from "./web3d.module.scss";
const cn = useClass(style);
export default () => {
  const uid = useId();
  useEffect(() => {
    const root = document.getElementById(uid)!;
    const scence = new Scene();
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);
    scence.add(camera);
    const cubeG = new BoxGeometry(1, 1, 1);
    const mater = new MeshBasicMaterial({ color: 0xffff00 });
    const cube = new Mesh(cubeG, mater);
    scence.add(cube);
    const render = new WebGLRenderer();
    render.setSize(window.innerWidth, window.innerHeight);
    root.hasChildNodes() || root.appendChild(render.domElement);
    render.render(scence, camera);
  }, []);
  useEffect(() => {}, []);
  return <div id={uid}></div>;
};
