import {Box, Button, FormControl, InputLabel, Select, SelectChangeEvent, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import SoilClass from "@/entities/SoilClass.ts";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import FieldResponseDTO from "@/entities/FieldResponseDTO.ts";
import FieldCreateDTO from "@/entities/FieldCreateDTO.ts";
import {updateField} from "@/services/fieldService.ts";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import useValidation from "@/hooks/useValidation.ts";
import {FieldValues, validateAddField} from "@/utils/fieldValidators.ts";
import {useSnackbar} from "notistack";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditIcon from "@mui/icons-material/Edit";

type FieldDetailsFormProps = {
    field: FieldResponseDTO;
    setField: (fieldResponseDTO: FieldResponseDTO) => void;
}

const FieldDetailsForm: React.FC<FieldDetailsFormProps> = ({field, setField}) => {
    const {t} = useTranslation('fieldPage');
    const [fieldState, setFieldState] = useState<FieldResponseDTO>(field);
    const {errors, validate, setErrors} = useValidation<FieldValues>(validateAddField);
    const {enqueueSnackbar} = useSnackbar();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        setFieldState(field);
    }, [field]);

    const handleFieldNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldState(prevState => ({
            ...prevState,
            fieldName: e.target.value
        }));
    }

    const handleFieldAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldState(prevState => ({
            ...prevState,
            fieldArea: parseFloat(e.target.value)
        }));
    }

    const handleSoilClassChange = (event: SelectChangeEvent) => {
        setFieldState(prevState => ({
            ...prevState,
            soilClass: event.target.value
        }))
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate({
            fieldName: fieldState.fieldName,
            fieldArea: fieldState.fieldArea
        }, t)) {
            return;
        }

        const fieldCreateDTO: FieldCreateDTO = {
            fieldName: fieldState.fieldName,
            fieldArea: fieldState.fieldArea,
            soilClass: fieldState.soilClass
        }

        if (fieldState.fieldId) {
            updateField(fieldState.fieldId, fieldCreateDTO)
                .then(data => {
                    setIsEditing(false);
                    setField(data);
                    enqueueSnackbar(t('editField.successSnackbar'), SnackbarSuccess);
                })
                .catch(() => {
                    enqueueSnackbar(t('editField.errorSnackbar'), SnackbarError);
                })
        }
    }

    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setErrors({});
        setFieldState(field);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="edit-field-form"
        >
            <TextField
                className="edit-field-input"
                margin="normal"
                required
                label={t('editField.fieldName')}
                type={"text"}
                value={fieldState.fieldName || ''}
                onChange={handleFieldNameChange}
                error={!!errors.fieldName}
                helperText={errors.fieldName}
                disabled={!isEditing}
            />

            <div className="edit-field-inputs-row">
                <TextField
                    className="edit-field-input-area"
                    margin="normal"
                    required
                    label={t('editField.fieldArea')}
                    type="number"
                    inputProps={{
                        step: "0.01",
                        min: "0.00",
                        max: "999.99"
                    }}
                    value={fieldState.fieldArea !== null && fieldState.fieldArea !== undefined ? fieldState.fieldArea.toString() : ''}
                    placeholder={"0,00"}
                    onChange={handleFieldAreaChange}
                    error={!!errors.fieldArea}
                    helperText={errors.fieldArea}
                    disabled={!isEditing}
                />

                <div className="edit-field-selector">
                    <FormControl fullWidth margin="normal">
                        <InputLabel>
                            {t('editField.soilClass')}
                        </InputLabel>
                        <Select
                            value={fieldState.soilClass}
                            required
                            label={t('editField.soilClass')}
                            onChange={handleSoilClassChange}
                            disabled={!isEditing}
                        >
                            {Object.entries(SoilClass).map(([key, value]) => (
                                <MenuItem key={key} value={key}>
                                    {value === SoilClass.Unknown ? t('editField.unknownSoilClass') : value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

            </div>

            {isEditing ? (
                <div className="field-details-button-group">
                    <Button
                        className="field-edit-button"
                        variant="contained"
                        type="submit"
                        color="primary"
                    >
                        <DoneOutlinedIcon className="field-edit-button-icon"/>
                        {t('editField.saveButton')}
                    </Button>
                    <Button
                        className="field-edit-button"
                        variant="outlined"
                        onClick={handleCancel}
                        color="primary"
                    >
                        <CloseOutlinedIcon className="field-edit-button-icon"/>
                        {t('editField.cancelButton')}
                    </Button>
                </div>
            ) : (
                <div className="field-details-button-group">
                    <Button
                        className="field-edit-button"
                        variant="contained"
                        onClick={handleEdit}
                        color="primary"
                    >
                        <EditIcon className="field-edit-button-icon"/>
                        {t('editField.editButton')}
                    </Button>
                </div>
            )}
        </Box>
    )
}

export default FieldDetailsForm;