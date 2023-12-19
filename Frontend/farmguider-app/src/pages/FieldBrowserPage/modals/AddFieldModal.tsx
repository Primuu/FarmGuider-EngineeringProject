import {useTranslation} from "react-i18next";
import {Box, Button, Fade, FormControl, InputLabel, Modal, Select, SelectChangeEvent, Slide, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {useSnackbar} from "notistack";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import '@/pages/FieldBrowserPage/modals/fieldModal.css';
import useValidation from "@/hooks/useValidation.ts";
import {FieldValues, validateAddField} from "@/utils/fieldValidators.ts";
import FieldCreateDTO from "@/entities/FieldCreateDTO.ts";
import {createField} from "@/services/fieldService.ts";
import MenuItem from "@mui/material/MenuItem";
import SoilClass from "@/entities/SoilClass.ts";

type AddFieldModalProps = {
    open: boolean;
    onClose: () => void;
    farmId: number | undefined;
    onFieldAdded: () => void;
    setInitialLength: (length: number) => void;
}

const AddFieldModal: React.FC<AddFieldModalProps> = ({open, onClose, farmId, onFieldAdded, setInitialLength}) => {
    const [fieldName, setFieldName] = useState<string | null>(null);
    const [fieldArea, setFieldArea] = useState<number | null>(null);
    const [soilClass, setSoilClass] = useState<string>("");
    const {t} = useTranslation('fieldBrowserPage');
    const {errors, validate, setErrors} = useValidation<FieldValues>(validateAddField);
    const {enqueueSnackbar} = useSnackbar();

    const handleFieldAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldArea(parseFloat(event.target.value));
    };

    const handleSoilClassChange = (event: SelectChangeEvent) => {
        setSoilClass(event.target.value);
    };

    const handleFieldNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldName(event.target.value);
    };

    const cancel = () => {
        setFieldArea(null);
        setSoilClass("");
        setFieldName(null);
        setErrors({});
        onClose();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate({fieldName, fieldArea}, t)) return;

        const fieldCreateDTO: FieldCreateDTO = {
            fieldName: fieldName!,
            fieldArea: fieldArea!,
            soilClass: soilClass
        };

        if (farmId) {
            createField(farmId, fieldCreateDTO)
                .then(() => {
                    cancel();
                    onFieldAdded();
                    setInitialLength(1);
                    enqueueSnackbar(t('addFieldModal.successSnackbar'), SnackbarSuccess);
                })
                .catch(() => {
                    enqueueSnackbar(t('addFieldModal.errorSnackbar'), SnackbarError);
                })
        }
    };

    return (
        <Modal
            open={open}
            onClose={cancel}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box className="add-field-modal-box">
                    <Slide
                        direction="right"
                        in={open}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Box component="form" onSubmit={handleSubmit} className="add-field-form">
                            <Typography className="add-field-header">
                                {t('addFieldModal.header')}
                            </Typography>

                            <div className="add-field-input-container">
                                <TextField
                                    className="add-field-input"
                                    margin="normal"
                                    required
                                    label={t('addFieldModal.fieldName')}
                                    type={"text"}
                                    value={fieldName || ''}
                                    onChange={handleFieldNameChange}
                                    error={!!errors.fieldName}
                                    helperText={errors.fieldName}
                                />

                                <div className="add-field-inputs-row">
                                    <TextField
                                        className="add-field-input"
                                        margin="normal"
                                        required
                                        label={t('addFieldModal.fieldArea')}
                                        type="number"
                                        inputProps={{
                                            step: "0.01",
                                            min: "0.00",
                                            max: "999.99"
                                        }}
                                        value={fieldArea !== null && fieldArea !== undefined ? fieldArea.toString() : ''}
                                        placeholder={"0,00"}
                                        onChange={handleFieldAreaChange}
                                        error={!!errors.fieldArea}
                                        helperText={errors.fieldArea}
                                    />

                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>
                                            {t('addFieldModal.soilClass')}
                                        </InputLabel>
                                        <Select
                                            value={soilClass}
                                            required
                                            displayEmpty
                                            label={t('addFieldModal.soilClass')}
                                            onChange={handleSoilClassChange}
                                        >
                                            <MenuItem value="" disabled>
                                            </MenuItem>
                                            {Object.entries(SoilClass).map(([key, value]) => (
                                                <MenuItem key={key} value={key}>
                                                    {value === SoilClass.Unknown ? t('addFieldModal.unknownSoilClass') : value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            <Typography className="add-field-req">
                                {t('addFieldModal.requirements')}
                            </Typography>

                            <Box className="add-field-button-group">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="confirm-add-field-button"
                                >
                                    <DoneOutlinedIcon className="add-field-button-icon"/>
                                    {t('addFieldModal.confirmButton')}
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={cancel}
                                    className="cancel-add-field-button"
                                >
                                    <CloseOutlinedIcon className="add-field-button-icon"/>
                                    {t('addFieldModal.cancelButton')}
                                </Button>
                            </Box>
                        </Box>
                    </Slide>
                </Box>
            </Fade>
        </Modal>
    );
}

export default AddFieldModal;