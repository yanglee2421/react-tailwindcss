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
  void config;

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
  void config;

  return [200, {}];
});
mock.onPost(BASE_URI).reply((config) => {
  // ** Config
  const { data } = config;
  if (!data) throw new Error("Bad request!");

  const { email, passwd } = JSON.parse(data);
  const usr = usrList.find((item) => item.email === email);
  if (!usr) throw new Error("Email or password is incorrect!");

  const isVali = usr.passwd === passwd;
  if (!isVali) throw new Error("Email or password is incorrect!");

  return [200, usr];
});
mock.onGet(BASE_URI).reply((config) => {
  void config;

  return [200, { loginAt: Date.now(), role: "admin", email: "" }];
});
