import {useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {NOT_FOUND_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import FieldResponseDTO from "@/entities/FieldResponseDTO.ts";
import {getField} from "@/services/fieldService.ts";
import FieldDetails from "@/pages/FieldPage/FieldDetails.tsx";
import '@/pages/FieldPage/fieldPage.css';
import {getCrops} from "@/services/cropService.ts";
import CropResponseDTO from "@/entities/CropResponseDTO.ts";
import CropDetails from "@/pages/FieldPage/CropDetails.tsx";

const FieldPage = () => {
    const {fieldId} = useParams();
    const {t} = useTranslation('fieldPage');
    const navigate = useNavigate();
    const [field, setField] = useState<FieldResponseDTO | null>(null);
    const [fieldLoading, setFieldLoading] = useState<boolean>(true);
    const [cropList, setCropList] = useState<CropResponseDTO[]>([]);
    const [cropsLoading, setCropsLoading] = useState<boolean>(true);
    const [selectedCropId, setSelectedCropId] = useState<number | null>(null);

    useEffect(() => {
        fetchAndSetField();
        fetchAndSetCrops();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldId]);

    const fetchAndSetField = () => {
        if (fieldId) {
            getField(parseInt(fieldId))
                .then(data => {
                    setField(data);
                    setFieldLoading(false);
                })
                .catch(() => {
                    setFieldLoading(false);
                    navigate(NOT_FOUND_PAGE_URL, {replace: true});
                })
        }
    }

    const fetchAndSetCrops = () => {
        if (fieldId) {
            getCrops(parseInt(fieldId))
                .then(data => {
                    setCropList(data);
                    setCropsLoading(false);
                })
                .catch(() => {
                    setCropsLoading(false);
                    navigate(NOT_FOUND_PAGE_URL, {replace: true});
                })
        }
    }

    const fetchAndSetCropChart = () => {
        return;
    }

    return (
        <div>
            <Typography className="layout-header">
                {t('header')}
            </Typography>
            <div className="layout-container">
                <div className="field-data-container">
                    <FieldDetails
                        field={field}
                        loading={fieldLoading}
                        setField={setField}
                    />

                    <CropDetails
                        loading={cropsLoading}
                        cropList={cropList}
                        fieldId={fieldId}
                        onSelectCrop={setSelectedCropId}
                        selectedCropId={selectedCropId}
                        onCropAdded={fetchAndSetCrops}
                        setCropList={setCropList}
                        onCropChanged={fetchAndSetCropChart}
                    />

                </div>
                <div className="field-chart-container">

                </div>
            </div>
        </div>
    );
}

export default FieldPage;