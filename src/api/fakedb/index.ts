import { mock } from "./mock";
import "./mock-table";
import "./mock-usr";
import "./mock-hello";

mock.onAny().passThrough();
