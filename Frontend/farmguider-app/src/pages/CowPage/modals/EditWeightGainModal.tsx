import {useTranslation} from "react-i18next";
import {Box, Button, Fade, Modal, Slide, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import '@/pages/CowPage/modals/cowDataModal.css';
import useValidation from "@/hooks/useValidation.ts";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import WeightGainCreateDTO from "@/entities/WeightGainCreateDTO.ts";
import {updateWeightGain} from "@/services/weightGainService.ts";
import {validateAddWeightGain, WeightGainValues} from "@/utils/cowValidators.ts";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import WeightGainResponseDTO from "@/entities/WeightGainResponseDTO.ts";

type EditWeightGainModalProps = {
    open: boolean;
    onClose: () => void;
    weightGain: WeightGainResponseDTO;
    onWeightGainUpdated: (weightGainResponseDTO: WeightGainResponseDTO) => void;
    locale: Locale;
    cow: CowResponseDTO;
}

const EditWeightGainModal: React.FC<EditWeightGainModalProps> = ({open, onClose, weightGain, onWeightGainUpdated, locale, cow}) => {
    const [measurementDate, setMeasurementDate] = useState<Date | null>(new Date(weightGain.measurementDate));
    const [weight, setWeight] = useState<number | null>(weightGain.weight);
    const {t} = useTranslation('cowPage');
    const {errors, validate, setErrors} = useValidation<WeightGainValues>(validateAddWeightGain);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        setWeight(weightGain.weight);
        setMeasurementDate(new Date(weightGain.measurementDate));
    }, [weightGain]);

    const handleDateChange = (date: Date | null) => {
        setMeasurementDate(date);
    };

    const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(parseFloat(event.target.value));
    };

    const cancel = () => {
        setWeight(weightGain.weight);
        setMeasurementDate(new Date(weightGain.measurementDate));
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

        if (weightGain.weightGainId) {
            updateWeightGain(weightGain.weightGainId, weightGainCreateDTO)
                .then(data => {
                    cancel();
                    onWeightGainUpdated(data);
                    enqueueSnackbar(t('editWeightGainModal.successSnackbar'), SnackbarSuccess);
                })
                .catch(() => {
                    enqueueSnackbar(t('editWeightGainModal.errorSnackbar'), SnackbarError);
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
                <Box className="edit-cow-data-modal-box">
                    <Slide
                        direction="right"
                        in={open}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Box component="form" onSubmit={handleSubmit} className="edit-cow-data-form">
                            <Typography className="edit-cow-data-header">
                                {t('editWeightGainModal.header')}
                            </Typography>

                            <div className="edit-cow-data-form-container">
                                <div className="edit-cow-date-time-picker">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                        adapterLocale={locale}
                                    >
                                        <DatePicker
                                            label={t('editWeightGainModal.measurementDate')}
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

                                <div className="edit-weight-input">
                                    <TextField
                                        margin="normal"
                                        className="edit-weight-text-field"
                                        required
                                        label={t('editWeightGainModal.weight')}
                                        type="number"
                                        inputProps={{
                                            step: "0.001",
                                            min: "0.000",
                                            max: "9999.999"
                                        }}
                                        value={weight !== null && weight !== undefined ? weight.toString() : ''}
                                        placeholder={"0,000"}
                                        onChange={handleWeightChange}
                                        error={!!errors.weight}
                                        helperText={errors.weight}
                                    />
                                </div>
                            </div>

                            <Typography className="edit-cow-data-req">
                                {t('editWeightGainModal.requirements')}
                            </Typography>

                            <Box className="edit-cow-data-button-group">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="confirm-edit-cow-data-button"
                                >
                                    <DoneOutlinedIcon className="edit-cow-data-button-icon"/>
                                    {t('editWeightGainModal.confirmButton')}
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={cancel}
                                    className="cancel-edit-cow-data-button"
                                >
                                    <CloseOutlinedIcon className="edit-cow-data-button-icon"/>
                                    {t('editWeightGainModal.cancelButton')}
                                </Button>
                            </Box>
                        </Box>
                    </Slide>
                </Box>
            </Fade>
        </Modal>
    );
}

export default EditWeightGainModal;