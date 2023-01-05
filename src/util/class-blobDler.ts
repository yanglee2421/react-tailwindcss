export class BlobDler {
  #blob: Blob;
  #fileName: string;
  constructor(file: BlobPart, fileName: string) {
    this.#blob = new Blob([file]);
    this.#fileName = fileName;
  }
  download() {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(this.#blob);
    a.download = this.#fileName;
    a.click();
    URL.revokeObjectURL(a.href);
  }
}
