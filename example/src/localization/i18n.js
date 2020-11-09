import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { fa, en } from './index';

i18next
  .use(initReactI18next)
  .init({
    interpolation: {
      escapeValue: false
    },
    fallbackLng: 'fa',
    resources: {
      fa: {
        translation: fa,
      },
      en: {
        translation: en
      }
    },
  });

export default i18next;
