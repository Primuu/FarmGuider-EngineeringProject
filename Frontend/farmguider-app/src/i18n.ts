import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import {LANGUAGE_ITEM} from "@/constants/CONFIG_CONSTS.ts";

import enNotLoggedPage from '@/locales/english/notLoggedPage.json';
import enLanguageSwitcher from '@/locales/english/languageSwitcher.json';
import enAuthForms from '@/locales/english/authForms.json';
import enSidebar from '@/locales/english/sidebar.json';

import plNotLoggedPage from '@/locales/polish/notLoggedPage.json';
import plLanguageSwitcher from '@/locales/polish/languageSwitcher.json';
import plAuthForms from '@/locales/polish/authForms.json';
import plSidebar from '@/locales/polish/sidebar.json';

const savedLanguage = localStorage.getItem(LANGUAGE_ITEM) || 'en';

void i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                notLoggedPage: enNotLoggedPage,
                languageSwitcher: enLanguageSwitcher,
                authForms: enAuthForms,
                sidebar: enSidebar,
            },
            pl: {
                notLoggedPage: plNotLoggedPage,
                languageSwitcher: plLanguageSwitcher,
                authForms: plAuthForms,
                sidebar: plSidebar,
            },
        },
        lng: savedLanguage,
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;