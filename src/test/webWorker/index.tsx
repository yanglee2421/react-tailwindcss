import { Button } from "antd";
import workerJs from "./worker?url";
export default () => {
  const fun = () => {
    const worker = new Worker(workerJs);
    worker.addEventListener("message", (event) => {
      console.log("eventListener", event);
    });
    worker.onmessage = (event) => {
      console.log("onmessage", event);
    };
    const arrayBuffer = new ArrayBuffer(1010);
    worker.postMessage(arrayBuffer, [arrayBuffer]);
  };
  return (
    <div>
      <p>webWorker</p>
      <Button
        onClick={fun}
        className="mt-1"
      ></Button>
    </div>
  );
};
