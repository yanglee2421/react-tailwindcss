import { Button } from "antd";
import workerJs from "./worker?worker";
export default () => {
  const fun = () => {
    const worker = new workerJs();
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
      >
        执行worker
      </Button>
    </div>
  );
};
