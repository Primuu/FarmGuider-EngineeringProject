import List from "@mui/material/List";
import {Box, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher.tsx";
import LogoutIcon from '@mui/icons-material/Logout';

import logo from "@/assets/farmguider-logo.svg";
import {useTranslation} from "react-i18next";

const SidebarLeftDrawer = () => {
    const {t} = useTranslation('sidebar');

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

                {/*Example: */}
                {/*<ListItemButton>*/}
                {/*    <ListItemIcon>*/}
                {/*        <HomeIcon/>*/}
                {/*    </ListItemIcon>*/}
                {/*    <ListItemText primary="Home"/>*/}
                {/*</ListItemButton>*/}

                <Box className="sidebar-footer">
                    <ListItemButton>
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