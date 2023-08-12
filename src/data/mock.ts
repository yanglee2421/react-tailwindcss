// MockAdapter Imports
import MockAdapter from "axios-mock-adapter";
import { axiosMock } from "@/api/axios-mock";

// ** Mock
export const mock = new MockAdapter(axiosMock, { delayResponse: 200 });
