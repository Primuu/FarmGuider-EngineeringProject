import {Parallax} from 'react-parallax';
import '@/pages/NotLoggedPage/notLoggedPage.css';
import {Box, Button, Typography} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import GrassIcon from '@mui/icons-material/Grass';
import TimelineIcon from '@mui/icons-material/Timeline';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import {Trans, useTranslation} from 'react-i18next';
import NavbarTop from "@/components/NavbarTop/NavbarTop.tsx";

import tractorImage from '@/assets/tractor-image.jpg';
import cowsImage from '@/assets/cows-image.jpg';
import cropsImage from '@/assets/crops-image.jpg';
import wheatImage from '@/assets/wheat-image.jpg';

const NotLoggedPage = () => {
    const dynamicBlur = {min: -1, max: 3};
    const blur = 5;
    const strength = 500;

    const {t} = useTranslation('notLoggedPage');

    return (
        <Box>
            <NavbarTop/>
            <Box className="main-text-box">
                <Typography className="header">
                    {t('mainTextBox.header')}
                </Typography>
                <Typography className="text">
                    <Trans i18nKey='mainTextBox.text' ns='notLoggedPage' components={{br: <br/>}}/>
                </Typography>
                <Button variant="outlined" color="primary" className="start-button">
                    {t('mainTextBox.button')}
                </Button>
            </Box>

            <Parallax
                blur={dynamicBlur}
                bgImage={cropsImage}
                bgImageAlt={t('crops.bgImageAlt')}
                strength={strength}
                className="parallax-section"
            >
                <Typography className="parallax-text">
                    {t('crops.typography')}
                </Typography>
            </Parallax>
            <Box className="section-text-box">
                <GrassIcon color="secondary" className="icon"/>
                <Typography className="text">
                    <Trans i18nKey='crops.text' ns='notLoggedPage' components={{br: <br/>}}/>
                </Typography>
            </Box>

            <Parallax
                blur={dynamicBlur}
                bgImage={cowsImage}
                bgImageAlt={t('animals.bgImageAlt')}
                strength={strength}
                className="parallax-section"
            >
                <Typography className="parallax-text">
                    {t('animals.typography')}
                </Typography>
            </Parallax>
            <Box className="section-text-box">
                <TimelineIcon color="secondary" className="icon"/>
                <Typography className="text">
                    <Trans i18nKey='animals.text' ns='notLoggedPage' components={{br: <br/>}}/>
                </Typography>
            </Box>

            <Parallax
                blur={dynamicBlur}
                bgImage={tractorImage}
                bgImageAlt={t('efficiency.bgImageAlt')}
                strength={strength}
                className="parallax-section"
            >
                <Typography className="parallax-text">
                    {t('efficiency.typography')}
                </Typography>
            </Parallax>
            <Box className="section-text-box">
                <SignalCellularAltIcon color="secondary" className="icon"/>
                <Typography className="text">
                    <Trans i18nKey='efficiency.text' ns='notLoggedPage' components={{br: <br/>}}/>
                </Typography>
            </Box>

            <Parallax
                blur={blur}
                bgImage={wheatImage}
                bgImageAlt={t('farmGuider.bgImageAlt')}
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