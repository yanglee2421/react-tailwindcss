class GetRandom {
  #min: number;
  #max: number;
  constructor(min: number, max: number) {
    this.#min = min;
    this.#max = max;
  }
  get() {
    return Math.random() * (this.#max - this.#min) + this.#min;
  }
}
export default GetRandom;
