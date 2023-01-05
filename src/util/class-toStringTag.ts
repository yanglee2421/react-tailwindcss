export class ToStringTag {
  toStringTag: string;
  constructor(target: unknown) {
    this.toStringTag = Object.prototype.toString
      .call(target)
      .replace(/\[object (\w+)\]/, "$1")
      .toLocaleLowerCase();
  }
}
