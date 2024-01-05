import List from "@mui/material/List";
import {Box, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher.tsx";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {useTranslation} from "react-i18next";
import {useAuth} from "@/contexts/AuthContext/AuthContext.tsx";
import {revoke} from "@/services/authenticationService.ts";
import {useSnackbar} from "notistack";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import {GiCow, GiHighGrass} from 'react-icons/gi';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from 'react-router-dom';
import {
    BREEDING_PAGE_URL,
    CALENDAR_PAGE_URL,
    FIELD_BROWSER_PAGE_URL,
    HOME_PAGE_URL,
    NOT_LOGGED_PAGE_URL,
    PROFILE_PAGE_URL
} from "@/constants/ROUTER_URLS.ts";
import IconButton from "@mui/material/IconButton";
import React from "react";
import {IconType} from "react-icons/lib";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import logo from "@/assets/farmguider-logo.svg";

type SidebarLeftDrawerProps = {
    onClose: () => void;
    isDesktop: boolean;
}

const SidebarLeftDrawer: React.FC<SidebarLeftDrawerProps> = ({onClose, isDesktop}) => {
    const {t} = useTranslation('sidebar');
    const {removeSessionCookie} = useAuth();
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();

    const handleLogout = () => {
        revoke()
            .then(() => {
                enqueueSnackbar(t('logoutSuccess'), SnackbarSuccess);
                localStorage.removeItem('lastPath');
                navigate(NOT_LOGGED_PAGE_URL, {replace: true});
                removeSessionCookie();
            })
            .catch(() => {
                enqueueSnackbar(t('logoutFail'), SnackbarError);
                localStorage.removeItem('lastPath');
                navigate(NOT_LOGGED_PAGE_URL, {replace: true});
                removeSessionCookie();
            })
    };

    const handleClick = (url: string) => {
        navigate(url);
        if (!isDesktop) onClose();
    };

    const navigationItems = [
        {icon: HomeOutlinedIcon, text: t('home'), onClick: () => handleClick(HOME_PAGE_URL)},
        {icon: PersonOutlineIcon, text: t('profile'), onClick: () => handleClick(PROFILE_PAGE_URL)},
        {icon: GiCow as IconType, text: t('breeding'), onClick: () => handleClick(BREEDING_PAGE_URL)},
        {icon: GiHighGrass as IconType, text: t('fields'), onClick: () => handleClick(FIELD_BROWSER_PAGE_URL)},
        {icon: CalendarMonthIcon as IconType, text: t('calendar'), onClick: () => handleClick(CALENDAR_PAGE_URL)},
    ];

    return (
        <div>
            <List className="sidebar-list">
                {!isDesktop && (
                    <div className="close-button">
                        <IconButton onClick={onClose}>
                            <CloseIcon className="close-icon"/>
                        </IconButton>
                    </div>
                )}

                <Box className="logo-box">
                    <Box>
                        <Typography className="logo-text">
                            <img src={logo} alt="Farm guider logo" className='logo'/>
                            FarmGuider
                        </Typography>
                    </Box>

                    <LanguageSwitcher/>
                </Box>

                <Box className="items">
                    {navigationItems.map((item, index) => (
                        <ListItemButton key={index} onClick={item.onClick}>
                            <ListItemIcon className="list-item-icon">
                                <item.icon className="icon"/>
                            </ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    ))}
                </Box>

                <Box className="sidebar-footer">
                    <ListItemButton onClick={() => void handleLogout()}>
                        <ListItemIcon className="list-item-icon">
                            <LogoutIcon className="logout-icon"/>
                        </ListItemIcon>
                        <ListItemText primary={t('logout')}/>
                    </ListItemButton>
                </Box>
            </List>
        </div>
    );
};

export default SidebarLeftDrawer;