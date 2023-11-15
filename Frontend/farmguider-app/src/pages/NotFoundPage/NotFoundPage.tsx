import Navbar from "@/components/Navbar/Navbar.tsx";
import {useNavigate} from 'react-router-dom';
import {HOME_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import '@/pages/NotFoundPage/notFoundPage.css';

import brokenTractor from "@/assets/broken-tractor.png";
import {useTranslation} from "react-i18next";

const NotFoundPage = () => {
    const navigate = useNavigate();
    const {t} = useTranslation('notFoundPage');

    const handleBackHome = () => {
        navigate(HOME_PAGE_URL, {replace: true});
    }

    return (
        <div>
            <Navbar/>
            <div className="not-found-container">
                <img src={brokenTractor} alt={t('imageAlt')} className='tractor'/>
                <Typography className="not-found-header">
                    404 {t('header')}
                </Typography>
                <Typography className="not-found-text">
                    {t('text')}
                </Typography>
                <Button onClick={handleBackHome} variant="contained" className="back-home-button">
                    {t('button')}
                </Button>
            </div>
        </div>
    );
};

export default NotFoundPage;