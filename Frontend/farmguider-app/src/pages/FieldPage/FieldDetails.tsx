import FieldResponseDTO from "@/entities/FieldResponseDTO.ts";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent.tsx";
import {Typography} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import FieldDetailsForm from "@/pages/FieldPage/FieldDetailsForm.tsx";
import '@/pages/FieldPage/fieldDetails.css';

type FieldDetailsProps = {
    field: FieldResponseDTO | null;
    loading: boolean;
    setField: (fieldResponseDTO: FieldResponseDTO) => void;
}

const FieldDetails: React.FC<FieldDetailsProps> = ({field, loading, setField}) => {
    const {t} = useTranslation('fieldPage');

    return (
        <div>
            <Typography className="edit-field-details">
                {t('editField.details')}
            </Typography>
            <div className="edit-field-container">
                {loading ? (
                    <LoadingComponent/>
                ) : (
                    field &&
                    <FieldDetailsForm
                        field={field}
                        setField={setField}
                    />)
                }
            </div>
        </div>
    )
}

export default FieldDetails;