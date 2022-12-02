import style from "./App.module.scss";
import useClass from "./hook/useClass";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import BaseRouter from "@/route";
const cN = useClass(style);
function App() {
  return (
    <div className={cN("App")}>
      <BrowserRouter>
        <BaseRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
