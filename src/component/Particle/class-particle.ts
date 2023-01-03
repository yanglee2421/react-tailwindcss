const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;
// 粒子类
class Particle {
  x: number;
  y: number;
  xSpeed: number;
  ySpeed: number;
  radius: number;
  color: string;
  constructor(public canvas: HTMLCanvasElement, color: string) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.xSpeed = getRandom(-1, 1);
    this.ySpeed = getRandom(-1, 1);
    this.radius = getRandom(2, 4);
    this.color = `rgba(${color}, ${1 - 1 / this.radius})`;
  }
  /**
   * 实例方法
   * 绘制粒子
   * 更新粒子位置
   */
  draw() {
    const ctx = this.canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
  update() {
    const { width, height } = this.canvas;
    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.draw();
  }
}
// 粒子集合类
class Particles {
  #canvas: HTMLCanvasElement;
  #arr: Particle[] = [];
  #lineMax: number;
  #color: string;
  constructor(
    canvas: HTMLCanvasElement,
    { number = 100, lineMax = 100, color = `254, 250, 244` } = {}
  ) {
    this.#canvas = canvas;
    this.#lineMax = lineMax;
    this.#color = color;
    for (let i = 0; i < number; i++) {
      this.#arr.push(new Particle(this.#canvas, this.#color));
    }
  }
  /**
   * 处理线条
   * 最大线长
   * 绘线
   */
  drawLine() {
    this.#arr.forEach((p1, index) => {
      this.#arr.slice(index + 1).forEach((p2) => {
        const x = Math.abs(p1.x - p2.x);
        if (x > this.#lineMax) return;
        const y = Math.abs(p1.y - p2.y);
        if (y > this.#lineMax) return;
        const line = Math.sqrt(x ** 2 + y ** 2);
        if (line > this.#lineMax) return;
        const ctx = this.#canvas.getContext("2d")!;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(${this.#color}, ${1 - line / this.#lineMax})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
    });
  }
  /**
   * 动画
   * 开启动画
   * 停止动画
   */
  #animateId = 0;
  animate() {
    this.#animateId = requestAnimationFrame(this.animate.bind(this));
    const ctx = this.#canvas.getContext("2d")!;
    ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#arr.forEach((particle) => particle.update());
    this.drawLine();
  }
  abortAnimate() {
    cancelAnimationFrame(this.#animateId);
  }
  /**
   * 处理鼠标事件
   * 事件粒子
   * 控制器
   * 绑定事件
   * 解绑事件
   */
  #one: null | Particle = null;
  #controller = new AbortController();
  bindEvent() {
    this.#controller = new AbortController();
    const { signal } = this.#controller;
    this.#canvas.addEventListener(
      "mouseover",
      (e) => {
        if (this.#one) return;
        const { clientX, clientY } = e;
        this.#one = new Particle(this.#canvas, this.#color);
        this.#one.x = clientX;
        this.#one.y = clientY;
        this.#one.xSpeed = 0;
        this.#one.ySpeed = 0;
        this.#arr.push(this.#one);
      },
      { signal }
    );
    this.#canvas.addEventListener(
      "mousemove",
      (e) => {
        if (!this.#one) return;
        const { clientX, clientY } = e;
        this.#one.x = clientX;
        this.#one.y = clientY;
      },
      { signal }
    );
    this.#canvas.addEventListener(
      "mouseout",
      () => {
        if (!this.#one) return;
        if (this.#arr.includes(this.#one)) {
          this.#arr.splice(this.#arr.indexOf(this.#one), 1);
          this.#one = null;
        }
      },
      { signal }
    );
  }
  abortEvent() {
    this.#controller.abort();
  }
}
export default Particles;
