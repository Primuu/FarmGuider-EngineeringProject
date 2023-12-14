import '@/pages/CowPage/cowPage.css';
import {useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {NOT_FOUND_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import {getCow} from "@/services/cowService.ts";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen.tsx";
import CowDetails from "@/pages/CowPage/CowDetails.tsx";
import enLocale from "date-fns/locale/en-US";
import i18n from "i18next";
import plLocale from "date-fns/locale/pl";

const CowPage = () => {
    const {cowId} = useParams();
    const {t} = useTranslation('cowPage');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [locale, setLocale] = useState(enLocale);
    const [cow, setCow] = useState<CowResponseDTO>();

    useEffect(() => {
        fetchAndSetCow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cowId]);

    useEffect(() => {
        if (i18n.language === 'pl') setLocale(plLocale);
        if (i18n.language === 'en') setLocale(enLocale);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    const fetchAndSetCow = () => {
        if (cowId) {
            getCow(parseInt(cowId))
                .then(data => {
                    setCow(data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    navigate(NOT_FOUND_PAGE_URL, {replace: true});
                })
        }
    }

    if (loading) return <LoadingScreen />;
    if (!cow) return null;

    return (
        <div>
            <Typography className="layout-header">
                {t('header')}
            </Typography>
            <div className="layout-container">
                <div className="cows-data-container">
                    <CowDetails
                        cow={cow}
                        setCow={setCow}
                        locale={locale}
                    />
                </div>
                <div className="cows-charts-data-container">

                </div>
            </div>
        </div>
    )
}

export default CowPage;