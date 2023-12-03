import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import {LANGUAGE_ITEM} from "@/constants/CONFIG_CONSTS.ts";

import enNotLoggedPage from '@/locales/english/notLoggedPage.json';
import enLanguageSwitcher from '@/locales/english/languageSwitcher.json';
import enAuthForms from '@/locales/english/authForms.json';
import enSidebar from '@/locales/english/sidebar.json';
import enTitles from '@/locales/english/titles.json';
import enNotFoundPage from '@/locales/english/notFoundPage.json';
import enProfilePage from '@/locales/english/profilePage.json';
import enBreedingPage from '@/locales/english/breedingPage.json';
import enConfirmationDialog from '@/locales/english/confirmationDialog.json'

import plNotLoggedPage from '@/locales/polish/notLoggedPage.json';
import plLanguageSwitcher from '@/locales/polish/languageSwitcher.json';
import plAuthForms from '@/locales/polish/authForms.json';
import plSidebar from '@/locales/polish/sidebar.json';
import plTitles from '@/locales/polish/titles.json';
import plNotFoundPage from '@/locales/polish/notFoundPage.json';
import plProfilePage from '@/locales/polish/profilePage.json';
import plBreedingPage from '@/locales/polish/breedingPage.json';
import plConfirmationDialog from '@/locales/polish/confirmationDialog.json'

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
                titles: enTitles,
                notFoundPage: enNotFoundPage,
                profilePage: enProfilePage,
                breedingPage: enBreedingPage,
                confirmationDialog: enConfirmationDialog,
            },
            pl: {
                notLoggedPage: plNotLoggedPage,
                languageSwitcher: plLanguageSwitcher,
                authForms: plAuthForms,
                sidebar: plSidebar,
                titles: plTitles,
                notFoundPage: plNotFoundPage,
                profilePage: plProfilePage,
                breedingPage: plBreedingPage,
                confirmationDialog: plConfirmationDialog,
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