import GetRandom from "@/util/class-getRandom";
const getRGB = new GetRandom(0, 255);
const getSize = new GetRandom(0.5, 4.5);
const getSpeed = new GetRandom(-5, 5);
class Firework {
  radius = getSize.get();
  xSpeed = getSpeed.get();
  ySpeed = getSpeed.get();
  color = `rgb(${getRGB.get()},${getRGB.get()},${getRGB.get()})`;
  x: number;
  y: number;
  constructor(public canvas: HTMLCanvasElement) {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
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
  }
  isShow() {
    if (this.x < 0 || this.x > this.canvas.width) return false;
    if (this.y < 0 || this.y > this.canvas.height) return false;
    return true;
  }
}
class Fireworks {}
export default Firework;
