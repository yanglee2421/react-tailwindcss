export class GetRandom {
  constructor(private readonly min: number, private readonly max: number) {}
  get() {
    return Math.random() * (this.max - this.min) + this.min;
  }
}
