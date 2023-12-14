import {useTranslation} from "react-i18next";
import {Box, Button, Fade, Modal, Slide, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import '@/pages/CowPage/modals/cowDataModal.css';
import useValidation from "@/hooks/useValidation.ts";
import {MilkingValues, MINUTES_SECONDS_REGEX, validateAddMilking} from "@/utils/cowValidators.ts";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import i18n from "i18next";
import MilkingCreateDTO from "@/entities/MilkingCreateDTO.ts";
import {updateMilking} from "@/services/milkingService.ts";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import {convertToMinuteAndSecondsFormat, convertToSeconds, removeTimezoneAndSeconds} from "@/utils/dateUtils.ts";
import MilkingResponseDTO from "@/entities/MilkingResponseDTO.ts";

type EditMilkingModalProps = {
    open: boolean;
    onClose: () => void;
    milking: MilkingResponseDTO;
    onMilkingUpdated: (milkingResponseDTO: MilkingResponseDTO) => void;
    locale: Locale;
    cow: CowResponseDTO;
}

const EditMilkingModal: React.FC<EditMilkingModalProps> = ({open, onClose, milking, onMilkingUpdated, locale, cow}) => {
    const [dateOfMilking, setDateOfMilking] = useState<Date | null>(new Date(milking.dateOfMilking));
    const [milkQuantity, setMilkQuantity] = useState<number | null>(milking.milkQuantity);
    const [milkingDuration, setMilkingDuration] = useState<string | null>(convertToMinuteAndSecondsFormat(milking.milkingDuration));
    const {t} = useTranslation('cowPage');
    const {errors, validate, setErrors} = useValidation<MilkingValues>(validateAddMilking);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        setMilkingDuration(convertToMinuteAndSecondsFormat(milking.milkingDuration));
        setMilkQuantity(milking.milkQuantity);
        setDateOfMilking(new Date(milking.dateOfMilking));
    }, [milking]);

    const handleDateChange = (date: Date | null) => {
        setDateOfMilking(date);
    };

    const handleMilkQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMilkQuantity(parseFloat(event.target.value));
    };

    const handleMilkingDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        const isValidFormat = MINUTES_SECONDS_REGEX.test(value);
        if (isValidFormat) {
            setMilkingDuration(value);
        }
    };

    const cancel = () => {
        setMilkingDuration(convertToMinuteAndSecondsFormat(milking.milkingDuration));
        setMilkQuantity(milking.milkQuantity);
        setDateOfMilking(new Date(milking.dateOfMilking));
        setErrors({});
        onClose();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate({dateOfMilking, milkQuantity, milkingDuration}, t)) return;

        const milkingDurationInSeconds = milkingDuration ? convertToSeconds(milkingDuration) : null;

        const milkingCreateDTO: MilkingCreateDTO = {
            dateOfMilking: removeTimezoneAndSeconds(dateOfMilking!),
            milkQuantity: milkQuantity!,
            milkingDuration: milkingDurationInSeconds
        };

        if (milking.milkingId) {
            updateMilking(milking.milkingId, milkingCreateDTO)
                .then(data => {
                    cancel();
                    onMilkingUpdated(data);
                    enqueueSnackbar(t('editMilkingModal.successSnackbar'), SnackbarSuccess);
                })
                .catch(() => {
                    enqueueSnackbar(t('editMilkingModal.errorSnackbar'), SnackbarError);
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
                                {t('editMilkingModal.header')}
                            </Typography>

                            <div className="edit-cow-data-form-container">
                                <div className="edit-cow-date-time-picker">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                        adapterLocale={locale}>
                                        <DateTimePicker
                                            label={t('editMilkingModal.dateOfMilking')}
                                            value={dateOfMilking}
                                            onChange={handleDateChange}
                                            minDate={new Date(cow.dateOfBirth)}
                                            maxDate={new Date()}
                                            disableFuture
                                            ampm={i18n.language !== 'pl'}
                                            desktopModeMediaQuery="@media (min-width:600px)"
                                            slotProps={{
                                                textField: {
                                                    error: !!errors.dateOfMilking,
                                                    helperText: errors.dateOfMilking
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>

                                <div className="edit-cow-data-inputs">
                                    <TextField
                                        margin="normal"
                                        required
                                        label={t('editMilkingModal.milkQuantity')}
                                        type="number"
                                        inputProps={{
                                            step: "0.001",
                                            min: "0.000",
                                            max: "999.999"
                                        }}
                                        value={milkQuantity !== null && milkQuantity !== undefined ? milkQuantity : ''}
                                        placeholder={"0,000"}
                                        onChange={handleMilkQuantityChange}
                                        error={!!errors.milkQuantity}
                                        helperText={errors.milkQuantity}
                                    />

                                    <TextField
                                        margin="normal"
                                        label={t('editMilkingModal.milkingDuration')}
                                        type="text"
                                        value={milkingDuration || ''}
                                        onChange={handleMilkingDurationChange}
                                        error={!!errors.milkingDuration}
                                        helperText={errors.milkingDuration}
                                        placeholder="MM:SS"
                                    />
                                </div>
                            </div>

                            <Typography className="edit-cow-data-req">
                                {t('editMilkingModal.requirements')}
                            </Typography>

                            <Box className="edit-cow-data-button-group">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="confirm-edit-cow-data-button"
                                >
                                    <DoneOutlinedIcon className="edit-cow-data-button-icon"/>
                                    {t('editMilkingModal.confirmButton')}
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={cancel}
                                    className="cancel-edit-cow-data-button"
                                >
                                    <CloseOutlinedIcon className="edit-cow-data-button-icon"/>
                                    {t('editMilkingModal.cancelButton')}
                                </Button>
                            </Box>
                        </Box>
                    </Slide>
                </Box>
            </Fade>
        </Modal>
    );
}

export default EditMilkingModal;