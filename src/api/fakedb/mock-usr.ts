// Mock Imports
import { mock } from "./mock";

const BASE_URI = "/usr";
const usrList = [
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
];

// ** Endpoints
mock.onPut(BASE_URI).reply((config) => {
  return [200, {}];
});
mock.onDelete(BASE_URI).reply((config) => {
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
mock.onPatch(BASE_URI).reply((config) => {
  return [200, {}];
});
mock.onPost(BASE_URI).reply((config) => {
  // ** Config
  const { params } = config;
  if (!params) return [400, {}];

  const usr = usrList.find((item) => item.email === params.email);
  if (!usr) return [400, {}];

  const isVali = usr.passwd === params.passwd;
  if (!isVali) return [400, {}];

  return [200, usr];
});
