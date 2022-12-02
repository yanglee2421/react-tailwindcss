import style from "./App.module.scss";
import useClass from "./hook/useClass";
import { BrowserRouter } from "react-router-dom";
import RouterGuard from "@/route";
const cN = useClass(style);
function App() {
  return (
    <div className={cN("App")}>
      <BrowserRouter>
        <RouterGuard />
      </BrowserRouter>
    </div>
  );
}

export default App;
