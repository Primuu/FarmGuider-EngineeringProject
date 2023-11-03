import React from 'react';
import {Parallax} from 'react-parallax';
import '@/components/notLoggedPage.css';
import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import GitHubIcon from '@mui/icons-material/GitHub';
import GrassIcon from '@mui/icons-material/Grass';
import TimelineIcon from '@mui/icons-material/Timeline';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

import tractorImage from '@/assets/tractor-image.jpg';
import cowsImage from '@/assets/cows-image.jpg';
import cropsImage from '@/assets/crops-image.jpg';
import wheatImage from '@/assets/wheat-image.jpg';
import logo from '@/assets/farm-guider.svg'

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

const NotLoggedPage = () => {
    const dynamicBlur = {min: -1, max: 3};
    const blur = 5;
    const strength = 500;

    return (
        <Box>
            <HideOnScroll>
                <AppBar className="app-bar">
                    <Toolbar className="toolbar">
                        <img src={logo} alt="farm guider logo" className='logo'/>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar/>

            <Box className="main-text-box">
                <Typography className="header">
                    Welcome to FarmGuider
                </Typography>
                <Typography className="text">
                    This is a farm management application designed for owners and workers agricultural farms<br/>
                    that deal with land cultivation or cattle breeding - beef or dairy.<br/>
                    The main goal of the application is to facilitate the work associated with managing a farm by
                    efficiently<br/>
                    collecting and monitoring data related to breeding and crops.<br/>
                </Typography>
                <Button variant="outlined" color="primary" className="start-button">
                    GET STARTED
                </Button>
            </Box>

            <Parallax
                blur={dynamicBlur}
                bgImage={cropsImage}
                bgImageAlt="crops image"
                strength={strength}
                className="parallax-section"
            >
                <Typography className="parallax-text">
                    CROPS
                </Typography>
            </Parallax>
            <Box className="section-text-box">
                <GrassIcon color="secondary" className="icon"/>
                <Typography className="text">
                    The part of the application responsible for monitoring crop data,<br/>
                    enables the accumulation of data regarding the fields and crops managed on the farm.<br/>
                    People managing the farm can record data related to seeding, harvesting, fertilizers used<br/>
                    and plant protection products, or other treatments.<br/>
                    The application also allows for the generation of reports and charts that aid in evaluating
                    crop efficiency and identifying areas requiring optimization.<br/>
                    The application also offers the option of generating sowing calendars
                    that facilitate planning of seasonal work related to crops.<br/>
                    Based on the data about crop types and soil conditions, the application will generate optimal sowing
                    schedules, considering
                    optimal sowing dates and crop rotation.
                </Typography>
            </Box>

            <Parallax
                blur={dynamicBlur}
                bgImage={cowsImage}
                bgImageAlt="cows image"
                strength={strength}
                className="parallax-section"
            >
                <Typography className="parallax-text">
                    ANIMALS
                </Typography>
            </Parallax>
            <Box className="section-text-box">
                <TimelineIcon color="secondary" className="icon"/>
                <Typography className="text">
                    The part of the application responsible for monitoring breeding data<br/>
                    provides detailed information about the animals on the farm.<br/>
                    The user of the application can register and track data on dairy and beef cattle,<br/>
                    such as milk yield or weight gain. The application also allows for the analysis of data and creation
                    of reports<br/>
                    related to animal performance, based on which the user will be able to make appropriate decisions
                    concerning breeding.
                </Typography>
            </Box>

            <Parallax
                blur={dynamicBlur}
                bgImage={tractorImage}
                bgImageAlt="tractor image"
                strength={strength}
                className="parallax-section"
            >
                <Typography className="parallax-text">
                    EFFICIENCY
                </Typography>
            </Parallax>
            <Box className="section-text-box">
                <SignalCellularAltIcon color="secondary" className="icon"/>
                <Typography className="text">
                    Thanks to this application, you have the ability to monitor and analyze<br/>
                    key data related to breeding and crops, which enables you to optimize processes in<br/>
                    the agricultural farm, and thereby, increase efficiency.
                </Typography>
            </Box>

            <Parallax
                blur={blur}
                bgImage={wheatImage}
                bgImageAlt="wheat image"
                strength={strength}
                className="parallax-section"
            >
                <Typography className="parallax-text">
                    FarmGuider
                </Typography>
            </Parallax>

            <Box className="footer">
                <Typography className="footer-text">
                    <a href="https://github.com/Primuu" className="link" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon className="icon"/>
                        Primuu
                    </a>
                </Typography>
            </Box>
        </Box>
    );
}

export default NotLoggedPage;