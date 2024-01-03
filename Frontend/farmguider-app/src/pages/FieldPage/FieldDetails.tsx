import FieldResponseDTO from "@/entities/FieldResponseDTO.ts";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent.tsx";
import {Button, Typography} from "@mui/material";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import FieldDetailsForm from "@/pages/FieldPage/FieldDetailsForm.tsx";
import '@/pages/FieldPage/fieldDetails.css';
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog.tsx";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import {FIELD_BROWSER_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import {deleteField} from "@/services/fieldService.ts";

type FieldDetailsProps = {
    field: FieldResponseDTO | null;
    loading: boolean;
    setField: (fieldResponseDTO: FieldResponseDTO) => void;
}

const FieldDetails: React.FC<FieldDetailsProps> = ({field, loading, setField}) => {
    const {t} = useTranslation('fieldPage');
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();

    const handleOpenConfirmationDialog = () => setOpenConfirmationDialog(true);
    const handleCloseConfirmationDialog = () => setOpenConfirmationDialog(false);

    const handleDeleteField = () => {
        if (field && field.fieldId) {
            deleteField(field.fieldId)
                .then(() => {
                    enqueueSnackbar(t('editField.deleteFieldSuccessSnackbar'), SnackbarSuccess);
                    navigate(FIELD_BROWSER_PAGE_URL, {replace: true});
                })
                .catch(() => {
                    enqueueSnackbar(t('editField.deleteFieldErrorSnackbar'), SnackbarError);
                });
        }
    };

    return (
        <div className="field-container">
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

            {field &&
                <div className="field-button-container">
                    <Button
                        className="delete-field-button"
                        variant="contained"
                        onClick={handleOpenConfirmationDialog}
                        color="secondary"
                    >
                        <DeleteIcon className="delete-field-button-icon"/>
                        {t('editField.deleteFieldButton')}
                    </Button>
                </div>
            }

            {field &&
                <ConfirmationDialog
                    open={openConfirmationDialog}
                    onClose={handleCloseConfirmationDialog}
                    onConfirm={handleDeleteField}
                    title={t('editField.deleteFieldDialogTitle')}
                    message={t('editField.deleteFieldDialogMessage1') + field.fieldName + t('editField.deleteFieldDialogMessage2')}
                />
            }
        </div>
    )
}

export default FieldDetails;