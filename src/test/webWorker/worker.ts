import useClass from "@/hook/useClass";
self.addEventListener(
  "message",
  (e) => {
    console.log(useClass);

    self.postMessage(e.data);
    self.close();
  },
  false
);
