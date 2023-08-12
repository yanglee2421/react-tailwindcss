import { mock } from "./mock";
import "./mock-table";
import "./mock-login";
import "./mock-hello";

mock.onAny().passThrough();
