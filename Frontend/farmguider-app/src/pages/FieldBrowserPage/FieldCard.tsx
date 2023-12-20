import FieldResponseDTO from "@/entities/FieldResponseDTO.ts";
import {useTranslation} from "react-i18next";
import React from "react";
import {Paper, Tooltip, Typography} from "@mui/material";
import SoilClass, {getSoilClassValue} from "@/entities/SoilClass.ts";
import {Link} from "react-router-dom";
import {FIELD_PAGE_WITH_ID} from "@/constants/ROUTER_URLS.ts";

type FieldCardProps = {
    field: FieldResponseDTO;
}

const FieldCard: React.FC<FieldCardProps> = ({field}) => {
    const {t} = useTranslation('fieldBrowserPage');

    const soilClassValue = getSoilClassValue(field.soilClass);

    return (
        <Tooltip title={t('fieldResults.tooltip')} followCursor placement={"right-start"}>
            <Link to={FIELD_PAGE_WITH_ID(field.fieldId)} className="field-link-style">
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
                        <Typography
                            className={soilClassValue === SoilClass.Unknown ? "soil-class-value-unknown" : "soil-class-value"}>
                            {soilClassValue === SoilClass.Unknown ? t('fieldResults.unknownSoilClass') : soilClassValue}
                        </Typography>
                    </div>
                </Paper>
            </Link>
        </Tooltip>
    );
}

export default FieldCard;