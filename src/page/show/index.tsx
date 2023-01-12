import Sketch, { SketchProps } from "react-p5";
import React, { useCallback } from "react";
import p5Types, { p5InstanceExtensions } from "p5";
import Typed from "react-typed";
const str = ` 如果你还记得赤色狂雨里你曾听过一首 温馨的歌，你在流泪， 如果你还记得白色病房里有个女孩曾安睡 在你身边，你在沉默， 如果你还记得黑色地铁里你曾背着一个女 孩一步步向前走，你在呼吸， 如果你还记得青色绒帘旁你打开一个女孩 的五斗柜，满目灰尘，你在抚摸， 你在阳光里垂下头，回忆曾亲吻过你脸颊 的那个天使，即使她不再出现。 有些爱稍纵即逝，却铭心刻骨。 它在命运里烧成灰烬，却在记忆力拔节生 根。`;
/**
 * @function PageShow 使用的类型
 */
export namespace Type {
  export type p5 = p5Types;
  export type p5setup = SketchProps["setup"];
  export type Vector = ReturnType<p5InstanceExtensions["createVector"]>;
}
/**
 * Show 页面
 */
export function PageShow() {
  const setup = useCallback<Type.p5setup>((p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    p5.stroke(255);
    p5.strokeWeight(4);
  }, []);
  const draw = useCallback((p5: Type.p5) => {
    p5.background(0);
  }, []);
  return (
    <div className="h-100">
      <p className="w-50 text-danger p-1">
        <Typed strings={[str]} typeSpeed={100} />
      </p>
    </div>
  );
  //  <Sketch setup={setup} draw={draw}></Sketch>;
}
export default React.memo(PageShow);

export class P5f {
  pos: Type.Vector;
  vel: Type.Vector;
  acc: Type.Vector;
  constructor(public p5: Type.p5, x: number, y: number) {
    this.pos = p5.createVector(x, y);
    this.vel = p5.createVector(0, -12);
    this.acc = p5.createVector(0, -4);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  show() {
    this.p5.point(this.pos.x, this.pos.y);
  }
  applyForce(force: number) {
    this.acc.add(force);
  }
}
export class Fw {
  constructor(public p5: Type.p5) {}
}
