// I18n Imports
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { resources } from "./resources";

export const locales = ["en_US", "zh_CN"];
export const fallbackLocale = "en_US";

i18next
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .init({
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    resources,
  });
