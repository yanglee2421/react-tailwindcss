// Mock Imports
import { mock } from "./mock";

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
