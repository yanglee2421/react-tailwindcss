export abstract class BaseBg {
  constructor(private canvas: HTMLCanvasElement) {}

  #animationId = 0;
  abortAnimate() {
    cancelAnimationFrame(this.#animationId);
  }
}
