// Mock Imports
import { mock } from "./mock";

const usrSet = new Set([
  {
    email: "admin@demo.com",
    passwd: "admin123456",
    role: "admin",
  },
  {
    email: "client@demo.com",
    passwd: "client123456",
    role: "client",
  },
]);

void usrSet;

// ** Endpoints
mock.onPost("/usr").reply((config) => {
  const { data } = config;

  try {
    return [200, data];
    // eslint-disable-next-line
  } catch (error: any) {
    const msg = error.message;
    return [403, { msg: msg }];
  }
});
mock.onDelete("/usr").reply((config) => {
  const { data } = config;

  try {
    const { email } = data;

    return [200, { email }];
    // eslint-disable-next-line
  } catch (error: any) {
    const msg = error.message;
    return [500, { msg }];
  }
});
mock.onPatch("/usr");
