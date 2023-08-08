// MockAdapter Imports
import MockAdapter from "axios-mock-adapter";
import { axiosMock } from "@/api/axios-mock";

// ** Mock
export const mock = new MockAdapter(axiosMock, { delayResponse: 200 });

// Mock Table
mock.onGet("/dev/table").reply((config) => {
  return [200, [config]];
});
mock.onPost("/dev/table").reply((config) => {
  const { data } = config;
  return [200, data];
});
mock.onDelete("/dev/table").reply((config) => {
  const { data } = config;
  return [200, data];
});

// Mock Login
mock.onPost("/dev/login").reply((config) => {
  const { data } = config;
  return [200, data];
});
mock.onGet("/dev/login").reply((config) => {
  const { headers } = config;
  return [200, headers];
});
