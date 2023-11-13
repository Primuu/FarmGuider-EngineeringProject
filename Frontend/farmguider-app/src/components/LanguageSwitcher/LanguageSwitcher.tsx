import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import '@/components/LanguageSwitcher/languageSwitcher.css';

import gbFlag from "@/assets/gb.svg"
import plFlag from "@/assets/pl.svg"
import {LANGUAGE_ITEM} from "@/constants/CONFIG_CONSTS.ts";

enum Language {
    English = 'en',
    Polish = 'pl',
}

const LanguageSwitcher = () => {
    const {i18n} = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {t} = useTranslation('languageSwitcher');

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeLanguage = (lang: Language) => {
        localStorage.setItem(LANGUAGE_ITEM, lang);
        void i18n.changeLanguage(lang);
        handleClose();
    };

    const getFlagForLanguage = (lang: Language) => {
        switch (lang) {
            case Language.English:
                return gbFlag;
            case Language.Polish:
                return plFlag;
            default:
                return gbFlag;
        }
    };

    return (
        <>
            <Button onClick={handleClick}>
                <img src={getFlagForLanguage(i18n.language as Language)} alt={t('altLanguage')} className="flag" />
                {t('language')}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MenuItem onClick={() => changeLanguage(Language.English)}>
                    <img src={gbFlag} alt={t('altEnglishFlag')} className="flag" />
                    English
                </MenuItem>
                <MenuItem onClick={() => changeLanguage(Language.Polish)}>
                    <img src={plFlag} alt={t('altPolishFlag')} className="flag" />
                    Polski
                </MenuItem>
            </Menu>
        </>
    );
};

export default LanguageSwitcher;