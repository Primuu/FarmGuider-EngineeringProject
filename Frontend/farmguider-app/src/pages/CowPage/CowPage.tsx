import '@/pages/CowPage/cowPage.css';
import {useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";

const CowPage = () => {
    const {cowId} = useParams();
    const {t} = useTranslation('cowPage');

    return (
        <div>
            <Typography className="layout-header">
                {t('header')}
            </Typography>
            <div className="layout-container">

            </div>
        </div>
    )
}

export default CowPage;