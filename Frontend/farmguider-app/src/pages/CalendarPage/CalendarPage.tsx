import '@/pages/CalendarPage/calendarPage.css';
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {NOT_FOUND_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import {useEffect, useState} from "react";
import {CropTypeResponseDTO} from "@/entities/CropTypeResponseDTO.ts";
import {getCropTypes} from "@/services/cropTypeService.ts";
import {useNavigate} from "react-router-dom";
import CropTypeRow from "@/pages/CalendarPage/CropTypeRow.tsx";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent.tsx";
import {PiPlantFill} from "react-icons/pi";
import {FaSun} from "react-icons/fa";
import {GiFallingLeaf} from "react-icons/gi";
import {FaRegSnowflake} from "react-icons/fa";
import SquareIcon from '@mui/icons-material/Square';

const CalendarPage = () => {
    const {t} = useTranslation('calendarPage');
    const [cropTypeList, setCropTypeList] = useState<CropTypeResponseDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAndSetCropTypes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAndSetCropTypes = () => {
        setLoading(true);
        getCropTypes()
            .then(data => {
                setCropTypeList(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                navigate(NOT_FOUND_PAGE_URL, {replace: true});
            })
    }

    return (
        <div>
            <Typography className="layout-header">
                {t('header')}
            </Typography>
            <div className="layout-container crop-layout">
                {loading ? (
                    <LoadingComponent/>
                ) : (
                    <div>
                        <div className="seasons">
                            <PiPlantFill className="season-icon"/>
                            <FaSun className="season-icon"/>
                            <GiFallingLeaf className="season-icon"/>
                            <FaRegSnowflake className="season-icon"/>
                        </div>

                        <div className="months">
                            <div className="month">{t('march')}</div>
                            <div className="month">{t('april')}</div>
                            <div className="month">{t('may')}</div>
                            <div className="month">{t('june')}</div>
                            <div className="month">{t('july')}</div>
                            <div className="month">{t('august')}</div>
                            <div className="month">{t('september')}</div>
                            <div className="month">{t('october')}</div>
                            <div className="month">{t('november')}</div>
                            <div className="month">{t('december')}</div>
                            <div className="month">{t('january')}</div>
                            <div className="month">{t('february')}</div>
                        </div>

                        <div className="crop-types">
                            {cropTypeList.map((cropType, index) => (
                                <CropTypeRow
                                    key={cropType.cropType}
                                    cropType={cropType}
                                    isEven={index % 2 === 0}
                                />
                            ))}
                        </div>

                        <div className="legend">
                            <div className="legend-text">
                                {t('plantingSeason')}
                                <SquareIcon className="planting-legend"/>
                            </div>

                            <div className="legend-text">
                                {t('harvestSeason')}
                                <SquareIcon className="harvest-legend"/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CalendarPage;