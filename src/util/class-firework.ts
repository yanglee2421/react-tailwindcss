import { GetRandom } from "./class-getRandom";
const getRGB = new GetRandom(0, 255);
const getSize = new GetRandom(1, 4.5);
const getSpeed = new GetRandom(-5, 5);
const getFire = new GetRandom(30, 70);
class Firework {
  radius = new GetRandom(0.1, 0.9).get() * 5;
  // xSpeed = getSpeed.get();
  xSpeed = (Math.random() - 0.5) * 10;
  ySpeed = (Math.random() - 0.5) * 10;
  color = `rgb(${getRGB.get()},${getRGB.get()},${getRGB.get()})`;
  constructor(
    public canvas: HTMLCanvasElement,
    public x: number,
    public y: number
  ) {
    const vy = Math.sqrt(25 - this.xSpeed ** 2);
    if (Math.abs(this.ySpeed) > vy) {
      this.ySpeed = this.ySpeed > 0 ? vy : -vy;
    }
  }
  draw() {
    const { x, y, radius, color } = this;
    const ctx = this.canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();
  }
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.ySpeed += 0.05;
    this.draw();
  }
  isShow() {
    if (this.x < 0 || this.x > this.canvas.width) return false;
    if (this.y < 0 || this.y > this.canvas.height) return false;
    return true;
  }
}
export class Fireworks {
  #arr: Firework[] = [];
  constructor(private canvas: HTMLCanvasElement) {}
  /**
   * 事件
   */
  #controller = new AbortController();
  bindEvent() {
    this.#controller = new AbortController();
    const { signal } = this.#controller;
    this.canvas.addEventListener(
      "click",
      (event) => {
        this.abortAnimate();
        const { clientX, clientY } = event;
        for (let i = 0; i < getFire.get(); i++) {
          this.#arr.push(new Firework(this.canvas, clientX, clientY));
        }
        this.animate();
      },
      { signal }
    );
  }
  abortEvent() {}
  /**
   * 动画
   */
  #animateId = 0;
  animate() {
    if (this.#arr.length) {
      this.#animateId = requestAnimationFrame(this.animate.bind(this));
    }
    const ctx = this.canvas.getContext("2d")!;
    const { width, height } = this.canvas;
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);
    this.#arr = this.#arr.filter((f) => {
      f.update();
      return f.isShow();
    });
  }
  abortAnimate() {
    cancelAnimationFrame(this.#animateId);
  }
}
