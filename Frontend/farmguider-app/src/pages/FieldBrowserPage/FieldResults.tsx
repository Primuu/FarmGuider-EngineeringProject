import FieldResponseDTO from "@/entities/FieldResponseDTO.ts";
import React from "react";
import FieldCard from "@/pages/FieldBrowserPage/FieldCard.tsx";
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

type FieldResultsProps = {
    fieldList: FieldResponseDTO[];
}

const FieldResults: React.FC<FieldResultsProps> = ({fieldList}) => {
    const {t} = useTranslation('fieldBrowserPage');

    return (
        <div>
            {
                fieldList.length > 0 ? (
                    fieldList.map(field => (
                        <FieldCard
                            key={field.fieldId}
                            field={field}
                        />
                    ))
                ) : (
                    <div className="field-no-results">
                        <Typography>
                            {t('fieldResults.noResults')}
                        </Typography>
                    </div>
                )
            }
        </div>
    );
}

export default FieldResults;