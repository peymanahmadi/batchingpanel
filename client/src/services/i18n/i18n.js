import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./english/english.json";
import translationPE from "./persian/persian.json";

// "Inline" English and Persian translations.
// We can localize to any language and any number of languages.

const resources = {
  en: {
    translation: translationEN,
  },
  fa: {
    translation: translationPE,
  },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    // lng: "fa",
    resources,
    interpolation: { escapeValue: false }, // not needed for react as it escapes by default
  });

export default i18n;
