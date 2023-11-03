import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import enNotLoggedPage from '@/locales/english/notLoggedPage.json';
import enLanguageSwitcher from '@/locales/english/languageSwitcher.json';

import plNotLoggedPage from '@/locales/polish/notLoggedPage.json';
import plLanguageSwitcher from '@/locales/polish/languageSwitcher.json';

void i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                notLoggedPage: enNotLoggedPage,
                languageSwitcher: enLanguageSwitcher,
            },
            pl: {
                notLoggedPage: plNotLoggedPage,
                languageSwitcher: plLanguageSwitcher,
            },
        },
        lng: 'en',
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;