import FieldResponseDTO from "@/entities/FieldResponseDTO.ts";
import {useTranslation} from "react-i18next";
import React from "react";
import {Paper, Typography} from "@mui/material";
import SoilClass, {getSoilClassValue} from "@/entities/SoilClass.ts";

type FieldCardProps = {
    field: FieldResponseDTO;
}

const FieldCard: React.FC<FieldCardProps> = ({field}) => {
    const {t} = useTranslation('fieldBrowserPage');

    const soilClassValue = getSoilClassValue(field.soilClass);

    return (
        <Paper elevation={3} className="field-card-container">
            <div className="field-basic-info">
                <Typography className="field-name">
                    {t('fieldResults.fieldName')} {field.fieldName}
                </Typography>

                <Typography className="field-area">
                    {t('fieldResults.fieldArea')} {field.fieldArea} {' ha'}
                </Typography>
            </div>

            <div className="field-soil-info">
                <Typography className="soil-class">
                    {t('fieldResults.soilClass')}
                </Typography>
                <Typography className={soilClassValue === SoilClass.Unknown ? "soil-class-value-unknown" : "soil-class-value"}>
                    {soilClassValue === SoilClass.Unknown ? t('fieldResults.unknownSoilClass') : soilClassValue}
                </Typography>
            </div>
        </Paper>
    );
}

export default FieldCard;