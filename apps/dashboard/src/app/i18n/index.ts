import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en,
    },
  });

export const LOCALE_WORKSPACE = {
  LAYOUT: 'layout',
  FUNNY_QUOTES: 'funnyQuotes',
  AUTH: 'auth',
  CHECKOUT: 'checkout',
  PAYMENT: 'payment',
  WEBHOOK: 'webhook',
  WORDING: 'wording',
  API_KEY: 'apiKey',
};

export default i18n;
