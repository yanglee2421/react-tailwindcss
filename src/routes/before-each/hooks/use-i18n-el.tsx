// React Imports
import React, { useMemo } from "react";

// I18n Imports
import { useTranslation } from "react-i18next";
import { locales, fallbackLocale } from "@/i18n";

// Router Imports
import { useMatches, Navigate } from "react-router-dom";

export function useI18nEl(outlet: React.ReactNode) {
  // I18n Hooks
  const { i18n } = useTranslation();
  const { language } = i18n;

  // Router Hooks
  const matches = useMatches();
  const root = matches.at(0);
  if (!root) throw new Error("invalid routes");
  const to = matches.at(-1);
  if (!to) throw new Error("invalid routes");

  return useMemo(() => {
    // I18n Vars
    const nextLocale = language.replace("-", "_");
    const allowedLocale = locales.find((item) => item.startsWith(nextLocale));

    // Router Vars
    const { locale = "en_US" } = root.params;
    const rootPath = root.pathname;
    const toPath = to.pathname;

    // Has Matched
    if (locale === allowedLocale) return outlet;

    // No Matched
    const isToFallback = nextLocale === fallbackLocale;
    const replacePath = isToFallback ? "" : `/${allowedLocale || ""}`;
    const nextPath = toPath.replace(rootPath, replacePath);
    return <Navigate to={nextPath} />;
  }, [outlet, language, matches]);
}
