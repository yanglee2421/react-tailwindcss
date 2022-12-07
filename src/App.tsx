import { BrowserRouter } from "react-router-dom";
import RouterGuard from "@/route";

function App() {
  return (
    <BrowserRouter>
      <RouterGuard />
    </BrowserRouter>
  );
}
export default App;
