import {useTranslation} from "react-i18next";
import {Box, Button, Fade, Modal, Slide, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import '@/pages/BreedingPage/modals/cowDataModal.css';
import useValidation from "@/hooks/useValidation.ts";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import plLocale from 'date-fns/locale/pl';
import enLocale from 'date-fns/locale/en-US';
import i18n from "i18next";
import WeightGainCreateDTO from "@/entities/WeightGainCreateDTO.ts";
import {createWeightGain} from "@/services/weightGainService.ts";
import {validateAddWeightGain, WeightGainValues} from "@/utils/cowValidators.ts";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";

type AddWeightGainModalProps = {
    open: boolean;
    onClose: () => void;
    cow: CowResponseDTO;
    onWeightGainAdded: (weightGainCreateDTO: WeightGainCreateDTO) => void;
}

const AddWeightGainModal: React.FC<AddWeightGainModalProps> = ({open, onClose, cow, onWeightGainAdded}) => {
    const [measurementDate, setMeasurementDate] = useState<Date | null>(new Date());
    const [weight, setWeight] = useState<number | null>(null);
    const {t} = useTranslation('breedingPage');
    const {errors, validate, setErrors} = useValidation<WeightGainValues>(validateAddWeightGain);
    const {enqueueSnackbar} = useSnackbar();
    const [locale, setLocale] = useState(enLocale);

    useEffect(() => {
        if (i18n.language === 'pl') setLocale(plLocale);
        if (i18n.language === 'en') setLocale(enLocale);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    const handleDateChange = (date: Date | null) => {
        setMeasurementDate(date);
    };

    const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(parseFloat(event.target.value));
    };

    const cancel = () => {
        setWeight(null);
        setMeasurementDate(new Date());
        setErrors({});
        onClose();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate({measurementDate: measurementDate, weight: weight}, t)) return;

        const weightGainCreateDTO: WeightGainCreateDTO = {
            measurementDate: measurementDate!,
            weight: weight!
        };

        if (cow.cowId) {
            createWeightGain(cow.cowId, weightGainCreateDTO)
                .then(() => {
                    cancel();
                    onWeightGainAdded(weightGainCreateDTO);
                    enqueueSnackbar(t('addWeightGainModal.successSnackbar'), SnackbarSuccess);
                })
                .catch(() => {
                    enqueueSnackbar(t('addWeightGainModal.errorSnackbar'), SnackbarError);
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
                <Box className="add-cow-data-modal-box">
                    <Slide
                        direction="right"
                        in={open}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Box component="form" onSubmit={handleSubmit} className="add-cow-data-form">
                            <Typography className="add-cow-data-header">
                                {t('addWeightGainModal.header')}
                            </Typography>

                            <Typography className="add-cow-data-sub-header">
                                {t('addWeightGainModal.subHeader')}
                            </Typography>

                            <div className="add-cow-data-form-container">
                                <div className="date-time-picker">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                        adapterLocale={locale}
                                    >
                                        <DatePicker
                                            label={t('addWeightGainModal.measurementDate')}
                                            value={measurementDate}
                                            onChange={handleDateChange}
                                            minDate={new Date(cow.dateOfBirth)}
                                            maxDate={new Date()}
                                            disableFuture
                                            openTo="day"
                                            views={['year', 'month', 'day']}
                                            desktopModeMediaQuery="@media (min-width:600px)"
                                            slotProps={{
                                                textField: {
                                                    error: !!errors.measurementDate,
                                                    helperText: errors.measurementDate
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>

                                <div className="add-weight-input">
                                    <TextField
                                        margin="normal"
                                        className="add-weight-text-field"
                                        required
                                        label={t('addWeightGainModal.weight')}
                                        type="number"
                                        inputProps={{
                                            step: "0.001",
                                            min: "0.000",
                                            max: "9999.999"
                                        }}
                                        value={weight !== null && weight !== undefined ? weight : ''}
                                        placeholder={"0,000"}
                                        onChange={handleWeightChange}
                                        error={!!errors.weight}
                                        helperText={errors.weight}
                                    />
                                </div>
                            </div>

                            <Typography className="add-cow-data-req">
                                {t('addWeightGainModal.requirements')}
                            </Typography>

                            <Box className="add-cow-data-button-group">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="confirm-add-cow-data-button"
                                >
                                    <DoneOutlinedIcon className="add-cow-data-button-icon"/>
                                    {t('addWeightGainModal.confirmButton')}
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={cancel}
                                    className="cancel-add-cow-data-button"
                                >
                                    <CloseOutlinedIcon className="add-cow-data-button-icon"/>
                                    {t('addWeightGainModal.cancelButton')}
                                </Button>
                            </Box>
                        </Box>
                    </Slide>
                </Box>
            </Fade>
        </Modal>
    );
}

export default AddWeightGainModal;