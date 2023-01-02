const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;
class Particle {
  static canvas = document.createElement("canvas");
  static #rgb = `254, 250, 244`;
  /**
   * 粒子集合
   * 生成粒子并存入集合
   * 清空粒子集合
   */
  static #arr: Particle[] = [];
  static generate(maxNum = 100) {
    if (this.#arr.length) return;
    for (let i = 0; i < maxNum; i++) {
      this.#arr.push(new Particle());
    }
  }
  static clear() {
    this.canvas = document.createElement("canvas");
    this.#arr = [];
  }
  /**
   * 处理线条
   * 最大线长
   * 绘线
   */
  static maxLine = 100;
  static drawLine() {
    this.#arr.forEach((p1) => {
      this.#arr.forEach((p2) => {
        if (p1 === p2) return;
        const x = Math.abs(p1.x - p2.x);
        if (x > this.maxLine) return;
        const y = Math.abs(p1.y - p2.y);
        if (y > this.maxLine) return;
        const line = Math.sqrt(x ** 2 + y ** 2);
        if (line > this.maxLine) return;
        const ctx = this.canvas.getContext("2d")!;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(${this.#rgb}, ${1 - line / this.maxLine})`;
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
  static #animateId = 0;
  static animate() {
    const ctx = this.canvas.getContext("2d")!;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.#arr.forEach((particle) => particle.update());
    this.drawLine();
    this.#animateId = requestAnimationFrame(this.animate.bind(Particle));
  }
  static stopAnimate() {
    cancelAnimationFrame(this.#animateId);
  }
  /**
   * 处理鼠标事件
   * 事件粒子
   * 控制器
   * 绑定事件
   * 解绑事件
   */
  static #one: null | Particle = null;
  static #controller = new AbortController();
  static bindEvent() {
    this.#controller = new AbortController();
    const { signal } = this.#controller;
    this.canvas.addEventListener(
      "mouseover",
      (e) => {
        if (this.#one) return;
        const { clientX, clientY } = e;
        this.#one = new Particle();
        this.#one.x = clientX;
        this.#one.y = clientY;
        this.#one.xSpeed = 0;
        this.#one.ySpeed = 0;
        this.#arr.push(this.#one);
      },
      { signal }
    );
    this.canvas.addEventListener(
      "mousemove",
      (e) => {
        if (!this.#one) return;
        const { clientX, clientY } = e;
        this.#one.x = clientX;
        this.#one.y = clientY;
      },
      { signal }
    );
    this.canvas.addEventListener(
      "mouseout",
      () => {
        if (!this.#one) return;
        if (this.#arr.includes(this.#one)) {
          this.#arr.splice(this.#arr.indexOf(this.#one));
          this.#one = null;
        }
      },
      { signal }
    );
  }
  static abortEvent() {
    this.#controller.abort();
  }
  /**
   * 实例属性
   * x坐标
   * y坐标
   * x速度
   * y速度
   * 粒子半径
   * 粒子边框色
   */
  x = Math.random() * Particle.canvas.width;
  y = Math.random() * Particle.canvas.height;
  xSpeed = getRandom(-1, 1);
  ySpeed = getRandom(-1, 1);
  radius = getRandom(2, 4);
  color = `rgba(${Particle.#rgb}, ${1 - 1 / this.radius})`;
  /**
   * 实例方法
   * 绘制粒子
   * 更新粒子位置
   */
  draw() {
    const ctx = Particle.canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
  update() {
    const { width, height } = Particle.canvas;
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
export default Particle;
