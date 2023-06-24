import Worker from "./worker-base64?worker";

export function toBase64(blob: Blob) {
  return new Promise<string>((res, rej) => {
    const worker = new Worker();
    worker.postMessage(blob);
    worker.onmessage = (evt) => {
      // ** Event
      const { data } = evt;
      const { result, error } = data;

      // ** Close
      worker.terminate();

      // ** Reject
      if (error) return rej(error);

      // ** Resolve
      return res(result);
    };
  });
}
