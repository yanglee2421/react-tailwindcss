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

// Add User
mock.onPut(BASE_URI).reply((config) => {
  void config;

  return [200, {}];
});

// Delete User
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

// Update User
mock.onPatch(BASE_URI).reply((config) => {
  void config;

  return [200, {}];
});

// Sign In
mock.onPost(BASE_URI).reply((config) => {
  // ** Config
  const { data } = config;
  if (!data) throw new Error("Bad request!");

  const { email, passwd } = JSON.parse(data);
  const usr = usrList.find((item) => item.email === email);
  if (!usr) throw new Error("Email or password is incorrect!");

  const isVali = usr.passwd === passwd;
  if (!isVali) throw new Error("Email or password is incorrect!");

  return [200, { email: usr.email, role: usr.role, loginAt: Date.now() }];
});

// Refresh Token
mock.onGet(BASE_URI).reply((config) => {
  const { loginAt } = config.params;

  const time = Date.now() - Number(loginAt);
  const expiredTime = import.meta.env.DEV ? 1000 * 20 : 1000 * 60 * 60;
  if (time > expiredTime) throw new Error("Token Has Expired!");

  return [200, { loginAt: Date.now() }];
});
