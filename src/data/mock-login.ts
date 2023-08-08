// Mock Imports
import { mock } from "./mock";

// Utils Imports
import { getUsrMap } from "@/utils";

// Mock Login
mock.onPost("/dev/login").reply((config) => {
  const { data } = config;

  try {
    const { email, pwd } = data;
    const msg = "Email Or Password Error";

    // Not Usr
    const usrMap = getUsrMap();
    const usrPwd = usrMap.get(email);
    if (!usrPwd) throw new Error(msg);

    // Error Pwd
    const isNotPass = pwd !== usrPwd;
    if (isNotPass) throw new Error(msg);

    return [200, data];
    // eslint-disable-next-line
  } catch (error: any) {
    const msg = error.message;
    return [403, { msg: msg }];
  }
});
mock.onDelete("/dev/login").reply((config) => {
  const { data } = config;

  try {
    const { email } = data;
    const usrMap = getUsrMap();
    const pwd = usrMap.get(email);
    if (!pwd) throw new Error("No Usr");

    return [200, { email, pwd }];
    // eslint-disable-next-line
  } catch (error: any) {
    const msg = error.message;
    return [500, { msg }];
  }
});
