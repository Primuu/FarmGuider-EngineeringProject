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

import logo from "@/assets/farmguider-logo.svg";

const SidebarLeftDrawer = () => {
    const {t} = useTranslation('sidebar');
    const {removeSessionCookie} = useAuth();
    const {enqueueSnackbar} = useSnackbar();

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

    return (
        <div className="container">
            <List className="list">
                <Box className="logo-box">
                    <img src={logo} alt="Farm guider logo" className='logo'/>
                    <Typography className="logo-text">
                        FarmGuider
                    </Typography>
                </Box>

                <LanguageSwitcher/>

                <Box className="items">
                    <ListItemButton>
                        <ListItemIcon>
                            <PersonOutlineIcon/>
                        </ListItemIcon>
                        <ListItemText primary={t('profile')}/>
                    </ListItemButton>
                </Box>

                <Box className="sidebar-footer">
                    <ListItemButton onClick={() => void handleLogout()}>
                        <ListItemIcon>
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