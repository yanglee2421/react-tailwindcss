// Axios Imports
import axios, { AxiosError } from "axios";

// I18n Imports
import i18next from "i18next";

// Axios Instance
export const axiosMock = axios.create({
  timeout: 1000 * 60 * 5,
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Axios Interceptors
axiosMock.interceptors.request.use((config) => {
  // Bearer Token
  const sessionToken = sessionStorage.getItem("token");
  const localToken = localStorage.getItem("token");
  const token = localToken || sessionToken;
  config.headers.setAuthorization(token);

  // Accept Lang
  const locale = i18next.language;
  const shortLocale = locale.slice(0, 2).toLowerCase();
  const acceptLang = `${locale},${shortLocale};q=0.9,en-US;q=0.8,en;q=0.7`;
  config.headers.set("Accept-Language", acceptLang);

  return config;
});
axiosMock.interceptors.response.use(
  (res) => {
    const { data } = res;
    return data;
  },
  (err: AxiosError) => {
    const { message, response } = err;
    console.error(err);

    // No Data
    if (!response?.data) {
      throw new Error(message, { cause: response });
    }

    // Has Data
    const msg = Reflect.get(Object(response.data), "msg");
    throw new Error(msg, { cause: response });
  }
);
