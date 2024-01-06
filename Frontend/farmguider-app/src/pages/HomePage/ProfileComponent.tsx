import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '@/pages/HomePage/profileComponent.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {Button} from "@mui/material";
import React, {useState} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useTranslation} from "react-i18next";
import {revoke} from "@/services/authenticationService.ts";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import {NOT_LOGGED_PAGE_URL, PROFILE_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import {useAuth} from "@/contexts/AuthContext/AuthContext.tsx";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";

const ProfileComponent = () => {
    const {t} = useTranslation('homePage');
    const {removeSessionCookie} = useAuth();
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        revoke()
            .then(() => {
                enqueueSnackbar(t('profile.logoutSuccess'), SnackbarSuccess);
                localStorage.removeItem('lastPath');
                navigate(NOT_LOGGED_PAGE_URL, {replace: true});
                removeSessionCookie();
            })
            .catch(() => {
                enqueueSnackbar(t('profile.logoutFail'), SnackbarError);
                localStorage.removeItem('lastPath');
                navigate(NOT_LOGGED_PAGE_URL, {replace: true});
                removeSessionCookie();
            })
    };

    const handleClickProfile = () => {
        navigate(PROFILE_PAGE_URL);
    };

    return (
        <div className="profile-component-container">
            <AccountCircleIcon className="home-profile-icon" onClick={handleClickProfile}/>
            <Button onClick={handleClick}>
                {anchorEl ? (
                    <ExpandLessIcon className="home-menu-icon"/>
                ) : (
                    <ExpandMoreIcon className="home-menu-icon"/>
                )}
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
                <MenuItem onClick={handleClickProfile}>
                    {t('profile.profile')}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <div className="logout-button">
                        {t('profile.logout')}
                    </div>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default ProfileComponent;