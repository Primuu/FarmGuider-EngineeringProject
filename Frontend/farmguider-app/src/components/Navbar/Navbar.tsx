import React from 'react';
import {AppBar, Slide, Toolbar} from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import '@/components/Navbar/navbar.css';

import logo from '@/assets/farm-guider.svg';

type HideOnScrollProps = {
    children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
    const {children} = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Navbar = () => {
    return (
        <>
            <HideOnScroll>
                <AppBar className="app-bar">
                    <Toolbar className="toolbar">
                        <img src={logo} alt="Farm guider logo" className='logo'/>
                        <LanguageSwitcher/>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar/>
        </>
    );
};

export default Navbar;
