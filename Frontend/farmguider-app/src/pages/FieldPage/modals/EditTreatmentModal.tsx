import {useTranslation} from "react-i18next";
import {Box, Button, Fade, Modal, Slide, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import '@/pages/FieldPage/modals/treatmentModal.css';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import plLocale from 'date-fns/locale/pl';
import enLocale from 'date-fns/locale/en-US';
import i18n from "i18next";
import useValidation from "@/hooks/useValidation.ts";
import {TreatmentValues, validateAddTreatment} from "@/utils/treatmentValidators.ts";
import {TreatmentCreateDTO} from "@/entities/TreatmentCreateDTO.ts";
import {createTreatment, updateTreatment} from "@/services/treatmentService.ts";
import {TreatmentResponseDTO} from "@/entities/TreatmentResponseDTO.ts";

type EditTreatmentModalProps = {
    open: boolean;
    onClose: () => void;
    treatment: TreatmentResponseDTO;
    onTreatmentUpdated: (updatedTreatment: TreatmentResponseDTO) => void;
}

const EditTreatmentModal: React.FC<EditTreatmentModalProps> = ({open, onClose, treatment, onTreatmentUpdated}) => {
    const [treatmentName, setTreatmentName] = useState<string>(treatment.treatmentName);
    const [treatmentDate, setTreatmentDate] = useState<Date | null>(new Date(treatment.treatmentDate));
    const [quantity, setQuantity] = useState<number | null>(treatment.quantity);
    const [details, setDetails] = useState<string>(treatment.details);
    const {t} = useTranslation('fieldPage');
    const {enqueueSnackbar} = useSnackbar();
    const [locale, setLocale] = useState(enLocale);
    const {errors, validate, setErrors} = useValidation<TreatmentValues>(validateAddTreatment);

    useEffect(() => {
        if (i18n.language === 'pl') setLocale(plLocale);
        if (i18n.language === 'en') setLocale(enLocale);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    const handleTreatmentNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTreatmentName(event.target.value);
    };

    const handleDateChange = (date: Date | null) => {
        setTreatmentDate(date);
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseFloat(event.target.value));
    };

    const handleDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDetails(event.target.value);
    };

    const cancel = () => {
        setTreatmentName(treatment.treatmentName);
        setTreatmentDate(new Date(treatment.treatmentDate));
        setQuantity(treatment.quantity);
        setDetails(treatment.details);
        setErrors({});
        onClose();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate({treatmentName, treatmentDate, quantity, details}, t)) return;

        const treatmentCreateDTO: TreatmentCreateDTO = {
            treatmentName: treatmentName,
            treatmentDate: treatmentDate!,
            quantity: quantity!,
            details: details === '' ? null : details
        };

        if (treatment.treatmentId) {
            updateTreatment(treatment.treatmentId, treatmentCreateDTO)
                .then(data => {
                    cancel();
                    onTreatmentUpdated(data);
                    enqueueSnackbar(t('editTreatmentModal.successSnackbar'), SnackbarSuccess);
                })
                .catch(() => {
                    enqueueSnackbar(t('addTreatmentModal.errorSnackbar'), SnackbarError);
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
                <Box className="treatment-modal-box">
                    <Slide
                        direction="right"
                        in={open}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Box component="form" onSubmit={handleSubmit} className="treatment-form">
                            <Typography className="edit-treatment-header">
                                {t('editTreatmentModal.header')}
                            </Typography>

                            <div className="treatment-form-container">
                                <TextField
                                    className="treatment-text-field"
                                    margin="normal"
                                    required
                                    label={t('editTreatmentModal.treatmentName')}
                                    type={"text"}
                                    value={treatmentName || ''}
                                    onChange={handleTreatmentNameChange}
                                    error={!!errors.treatmentName}
                                    helperText={errors.treatmentName}
                                />

                                <div className="treatment-row-inputs">
                                    <div className="treatment-calendar">
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                            adapterLocale={locale}
                                        >
                                            <DatePicker
                                                label={t('editTreatmentModal.calendarLabel')}
                                                value={treatmentDate}
                                                onChange={handleDateChange}
                                                maxDate={new Date()}
                                                disableFuture
                                                openTo="year"
                                                views={['year', 'month', 'day']}
                                                desktopModeMediaQuery="@media (min-width:600px)"
                                                slotProps={{
                                                    textField: {
                                                        error: !!errors.treatmentDate,
                                                        helperText: errors.treatmentDate
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </div>

                                    <TextField
                                        className="treatment-row-text-field"
                                        required
                                        label={t('editTreatmentModal.quantity')}
                                        type="number"
                                        inputProps={{
                                            step: "0.01",
                                            min: "0.00",
                                            max: "99999999.99"
                                        }}
                                        value={quantity !== null && quantity !== undefined ? quantity.toString() : ''}
                                        placeholder={"0,00"}
                                        onChange={handleQuantityChange}
                                        error={!!errors.quantity}
                                        helperText={errors.quantity}
                                    />
                                </div>

                                <TextField
                                    className="treatment-text-field"
                                    margin="normal"
                                    label={t('editTreatmentModal.details')}
                                    type={"text"}
                                    value={details || ''}
                                    onChange={handleDetailsChange}
                                    error={!!errors.details}
                                    helperText={errors.details}
                                    multiline
                                    rows={3}
                                />
                            </div>

                            <Typography className="treatment-req">
                                {t('editTreatmentModal.requirements')}
                            </Typography>

                            <Box className="treatment-button-group">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="confirm-treatment-button"
                                >
                                    <DoneOutlinedIcon className="treatment-button-icon"/>
                                    {t('editTreatmentModal.confirmButton')}
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={cancel}
                                    className="cancel-treatment-button"
                                >
                                    <CloseOutlinedIcon className="treatment-button-icon"/>
                                    {t('editTreatmentModal.cancelButton')}
                                </Button>
                            </Box>
                        </Box>
                    </Slide>
                </Box>
            </Fade>
        </Modal>
    );
}

export default EditTreatmentModal;