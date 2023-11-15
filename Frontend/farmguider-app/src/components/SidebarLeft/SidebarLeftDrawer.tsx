import List from "@mui/material/List";
import {Box, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher.tsx";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {useTranslation} from "react-i18next";
import {useAuth} from "@/contexts/AuthContext/AuthContext.tsx";
import {revoke} from "@/services/authenticationService.ts";
import {LOGGED_OUT_ITEM} from "@/constants/CONFIG_CONSTS.ts";
import {useSnackbar} from "notistack";
import {SnackbarError} from "@/utils/snackbarVariants.ts";
import {GiBarn, GiCow, GiHighGrass} from 'react-icons/gi';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from 'react-router-dom';
import {HOME_PAGE_URL, PROFILE_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import IconButton from "@mui/material/IconButton";
import React from "react";
import {IconType} from "react-icons/lib";

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

    const handleLogout = async () => {
        try {
            await revoke();
            removeSessionCookie();
            localStorage.setItem(LOGGED_OUT_ITEM, 'true');
            window.location.reload();
        } catch (error) {
            enqueueSnackbar(t('logout-failed'), SnackbarError);
        }
    };

    const navigationItems = [
        { icon: HomeOutlinedIcon, text: t('home'), onClick: () => navigate(HOME_PAGE_URL) },
        { icon: PersonOutlineIcon, text: t('profile'), onClick: () => navigate(PROFILE_PAGE_URL) },
        { icon: GiBarn as IconType, text: t('farms'), onClick: () => navigate("/") },
        { icon: GiCow as IconType, text: t('animals'), onClick: () => navigate("/") },
        { icon: GiHighGrass as IconType, text: t('crops'), onClick: () => navigate("/") },
    ];

    return (
        <div>
            <List className="sidebar-list">
                {!isDesktop && (
                    <IconButton onClick={onClose}>
                        <CloseIcon className="close-icon"/>
                    </IconButton>
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
                                <item.icon className="icon" />
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