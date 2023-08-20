// Mock Imports
import { mock } from "./mock";

mock.onGet("/dev/hello").reply(() => {
  const str = "为什么电脑永远不会生病？ 因为它有Windows（窗户）可以通风。";
  return [200, str];
});
