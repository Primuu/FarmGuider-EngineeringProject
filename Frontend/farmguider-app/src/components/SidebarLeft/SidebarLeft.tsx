import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '@/components/SidebarLeft/sidebarLeft.css';
import SidebarLeftDrawer from "@/components/SidebarLeft/SidebarLeftDrawer.tsx";

const SidebarLeft = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div>
            {!isDesktop && (
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography noWrap>
                            {/* TODO: change*/}
                            Responsive Sidebar
                        </Typography>
                    </Toolbar>
                </AppBar>
            )}
            <Drawer
                variant={isDesktop ? 'permanent' : 'temporary'}
                open={isDesktop || mobileOpen}
                onClose={handleDrawerToggle}
                className="drawer"
                classes={{
                    paper: 'drawerPaper',
                }}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <SidebarLeftDrawer />
            </Drawer>
        </div>
    );
}

export default SidebarLeft;