import { GetRandom } from "./class-getRandom";
const getRadius = new GetRandom(1, 4);
const getXspeed = new GetRandom(-0.5, 0.5);
const getYspeed = new GetRandom(1, 2);
const getColor = new GetRandom(0.5, 1);
class SnowFlake {
  x = 0;
  y = 0;
  xS = 0;
  yS = 2;
  r = 0;
  color = "";
  constructor(private readonly canvas: HTMLCanvasElement) {
    this.reset();
    const getY = new GetRandom(0, this.canvas.height);
    this.y = getY.get();
  }
  reset() {
    const getX = new GetRandom(0, this.canvas.width);
    this.x = getX.get();
    this.y = 0;
    this.xS = getXspeed.get();
    this.yS = getYspeed.get();
    this.r = getRadius.get();
    this.color = `rgba(255,255,255,${getColor.get()})`;
  }

  draw() {
    const ctx = this.canvas.getContext("2d")!;
    ctx.fillStyle = this.color;
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  get #isShow() {
    const isX = this.x > 0 && this.x < this.canvas.width;
    const isY = this.y > 0 && this.y < this.canvas.height;
    return isX && isY;
  }
  update() {
    this.#isShow || this.reset();
    this.x += this.xS;
    this.y += this.yS;
    this.draw();
  }
}

export class Snow {
  #snowflake: SnowFlake[] = [];
  constructor(private readonly canvas: HTMLCanvasElement, number = 100) {
    for (let i = 0; i < number; i++) {
      this.#snowflake.push(new SnowFlake(canvas));
    }
  }

  #animationId = 0;
  animation() {
    this.#animationId = requestAnimationFrame(this.animation.bind(this));
    const ctx = this.canvas.getContext("2d")!;
    const { width, height } = this.canvas;
    ctx.clearRect(0, 0, width, height);
    this.#snowflake.forEach((item) => {
      item.update();
    });
  }
  abortAnimation() {
    cancelAnimationFrame(this.#animationId);
  }
}
