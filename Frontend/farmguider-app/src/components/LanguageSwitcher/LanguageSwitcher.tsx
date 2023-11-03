import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import '@/components/LanguageSwitcher/languageSwitcher.css';

import gbFlag from "@/assets/gb.svg"
import plFlag from "@/assets/pl.svg"

type LangType = 'en' | 'pl';

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

    const changeLanguage = (lang: LangType) => {
        void i18n.changeLanguage(lang);
        handleClose();
    };

    const getFlagForLanguage = (lang: LangType) => {
        switch (lang) {
            case 'en':
                return gbFlag;
            case 'pl':
                return plFlag;
            default:
                return gbFlag;
        }
    };

    return (
        <>
            <Button onClick={handleClick}>
                <img src={getFlagForLanguage(i18n.language as LangType)} alt={t('altLanguage')} className="flag" />
                {t('language')}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => changeLanguage('en')}>
                    <img src={gbFlag} alt={t('altEnglishFlag')} className="flag" />
                    English
                </MenuItem>
                <MenuItem onClick={() => changeLanguage('pl')}>
                    <img src={plFlag} alt={t('altPolishFlag')} className="flag" />
                    Polski
                </MenuItem>
            </Menu>
        </>
    );
};

export default LanguageSwitcher;