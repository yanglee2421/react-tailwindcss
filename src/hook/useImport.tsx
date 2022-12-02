import { useState, useEffect } from "react";
export default (importComp: () => Promise<any>) => {
  const [Comp, setComp] = useState<any>(null);
  useEffect(() => {
    (async () => {
      try {
        const { default: ImportComponent } = await importComp();
        setComp(() => <ImportComponent />);
      } catch (e) {
        throw new Error("加载组件出错");
      }
    })();
  }, []);
  return Comp || <div>加载中...</div>;
};
