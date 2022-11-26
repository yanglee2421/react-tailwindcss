import Home from "@/page/home/home";
import Page404 from "@/page/404/404";
import style from "./App.module.scss";
import useClass from "./hook/useClass";
const cN = useClass(style);
function App() {
  return (
    <div className={cN("App")}>
      {/* <Home></Home> */}
      <Page404></Page404>
    </div>
  );
}

export default App;
