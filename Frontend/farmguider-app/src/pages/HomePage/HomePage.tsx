import '@/pages/HomePage/homePage.css';
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import ProfileComponent from "@/pages/HomePage/ProfileComponent.tsx";

const HomePage = () => {
    const {t} = useTranslation('homePage');

    return (
        <div>
            <Typography className="layout-header">
                {t('header')}
            </Typography>
            <div className="layout-container">
                <ProfileComponent />
            </div>
        </div>
    )
}

export default HomePage;