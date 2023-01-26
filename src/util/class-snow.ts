import { GetRandom } from "./class-getRandom";
const getXV = new GetRandom(-0.5, 0.5);
const getYV = new GetRandom(2, 3);
const getRadius = new GetRandom(1, 4);
class Snowflake {
  x = 0;
  y = 0;
  xv = 0;
  yv = 2;
  r = 0;
  color = "";
  constructor(private readonly canvas: HTMLCanvasElement) {
    this.reset();
    this.y = Math.random() * this.canvas.height;
  }
  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = 0;
    this.xv = getXV.get();
    this.yv = getYV.get();
    this.r = getRadius.get();
    this.color = `rgba(255,255,255,${0.5 + this.r / 4})`;
  }

  draw() {
    const ctx = this.canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 10;
    ctx.fill();
  }
  get #isShow() {
    const isX = this.x > 0 && this.x < this.canvas.width;
    const isY = this.y > 0 && this.y < this.canvas.height;
    return isX && isY;
  }
  update() {
    this.#isShow || this.reset();
    this.x += this.xv;
    this.y += this.yv;
    this.draw();
  }
}

export class Snow {
  #snowflake: Snowflake[] = [];
  constructor(private readonly canvas: HTMLCanvasElement, number = 100) {
    for (let i = 0; i < number; i++) {
      this.#snowflake.push(new Snowflake(canvas));
    }
  }

  #animationId = 0;
  animation() {
    this.#animationId = requestAnimationFrame(this.animation.bind(this));
    const ctx = this.canvas.getContext("2d")!;
    const { width, height } = this.canvas;
    ctx.clearRect(0, 0, width, height);
    this.#snowflake.forEach((item) => item.update());
  }
  abortAnimation() {
    cancelAnimationFrame(this.#animationId);
  }
}
