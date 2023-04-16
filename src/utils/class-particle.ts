class GetRandom {
  constructor(private readonly min: number, private readonly max: number) {}
  get() {
    return Math.random() * (this.max - this.min) + this.min;
  }
}

const getVelocity = new GetRandom(-1, 1);
const getRadius = new GetRandom(2, 4);

// 粒子类
class Particle {
  xv = getVelocity.get();
  yv = getVelocity.get();
  radius = getRadius.get();
  x: number;
  y: number;
  color: string;
  constructor(private readonly canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.color = `rgba(254,250,255,${1 - 1 / this.radius})`;
  }

  /**
   * 实例方法
   */
  draw() {
    const ctx = this.canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
  update() {
    const { width, height } = this.canvas;
    if (this.x < 0 || this.x > width) {
      this.xv *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.yv *= -1;
    }
    this.x += this.xv;
    this.y += this.yv;
    this.draw();
  }
}

// 粒子集合类
export class Particles {
  #arr: Particle[] = [];
  constructor(
    private readonly canvas: HTMLCanvasElement,
    particleNum = 100,
    private lineMax = 100
  ) {
    for (let i = 0; i < particleNum; i++) {
      this.#arr.push(new Particle(this.canvas));
    }
  }

  // 绘线
  drawLine() {
    this.#arr.forEach((p1, index) => {
      this.#arr.slice(index + 1).forEach((p2) => {
        const x = Math.abs(p1.x - p2.x);
        if (x > this.lineMax) return;
        const y = Math.abs(p1.y - p2.y);
        if (y > this.lineMax) return;
        const line = Math.sqrt(x ** 2 + y ** 2);
        if (line > this.lineMax) return;
        const ctx = this.canvas.getContext("2d")!;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath();
        ctx.strokeStyle = `rgba(254,250,255, ${1 - line / this.lineMax})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
    });
  }

  /**
   * 动画功能
   */
  #animateId = 0;
  animate() {
    this.#animateId = requestAnimationFrame(this.animate.bind(this));
    const ctx = this.canvas.getContext("2d")!;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.#arr.forEach((particle) => particle.update());
    this.drawLine();
  }
  abortAnimate() {
    cancelAnimationFrame(this.#animateId);
  }

  /**
   * 处理鼠标事件
   */
  #one: null | Particle = null;
  #controller = new AbortController();
  bindEvent() {
    this.#controller = new AbortController();
    const { signal } = this.#controller;
    this.canvas.addEventListener(
      "mouseover",
      ({ offsetX, offsetY }) => {
        if (this.#one) return;
        this.#one = new Particle(this.canvas);
        this.#one.x = offsetX;
        this.#one.y = offsetY;
        this.#one.xv = 0;
        this.#one.yv = 0;
        this.#arr.push(this.#one);
      },
      { signal }
    );
    this.canvas.addEventListener(
      "mousemove",
      ({ offsetX, offsetY }) => {
        if (!this.#one) return;
        this.#one.x = offsetX;
        this.#one.y = offsetY;
      },
      { signal }
    );
    this.canvas.addEventListener(
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
