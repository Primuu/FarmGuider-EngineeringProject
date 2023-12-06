import {useTranslation} from "react-i18next";
import {Box, Button, Fade, Modal, Slide, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import '@/pages/BreedingPage/modals/cowDataModal.css';
import useValidation from "@/hooks/useValidation.ts";
import {MilkingValues, MINUTES_SECONDS_REGEX, validateAddMilking} from "@/utils/cowValidators.ts";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import plLocale from 'date-fns/locale/pl';
import enLocale from 'date-fns/locale/en-US';
import i18n from "i18next";
import MilkingCreateDTO from "@/entities/MilkingCreateDTO.ts";
import {createMilking} from "@/services/milkingService.ts";

type AddMilkingModalProps = {
    open: boolean;
    onClose: () => void;
    cowId: number;
    // onCowEdited: () => void;
}

const AddMilkingModal: React.FC<AddMilkingModalProps> = ({open, onClose, cowId}) => {
    const [dateOfMilking, setDateOfMilking] = useState<Date | null>(new Date());
    const [milkQuantity, setMilkQuantity] = useState<number | null>(null);
    const [milkingDuration, setMilkingDuration] = useState<string | null>(null);
    const {t} = useTranslation('breedingPage');
    const {errors, validate, setErrors} = useValidation<MilkingValues>(validateAddMilking);
    const {enqueueSnackbar} = useSnackbar();
    const [locale, setLocale] = useState(enLocale);

    useEffect(() => {
        if (i18n.language === 'pl') setLocale(plLocale);
        if (i18n.language === 'en') setLocale(enLocale);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

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
        setMilkingDuration(null);
        setMilkQuantity(null);
        setDateOfMilking(new Date());
        setErrors({});
        onClose();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate({dateOfMilking, milkQuantity, milkingDuration}, t)) return;

        const milkingDurationInSeconds = milkingDuration ? convertToSeconds(milkingDuration) : null;

        const milkingCreateDTO: MilkingCreateDTO = {
            dateOfMilking: dateOfMilking!,
            milkQuantity: milkQuantity!,
            milkingDuration: milkingDurationInSeconds
        };

        if (cowId) {
            createMilking(cowId, milkingCreateDTO)
                .then(() => {
                    cancel();
                    // onCowEdited();
                    enqueueSnackbar(t('addMilkingModal.successSnackbar'), SnackbarSuccess);
                })
                .catch(() => {
                    enqueueSnackbar(t('addCowModal.errorSnackbar'), SnackbarError);
                })
        }
    };

    const convertToSeconds = (time: string) => {
        const [minutes, seconds] = time.split(':').map(Number);
        return (minutes * 60) + seconds;
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
                                {t('addMilkingModal.header')}
                            </Typography>

                            <Typography className="add-cow-data-sub-header">
                                {t('addMilkingModal.subHeader')}
                            </Typography>

                            <div className="add-cow-data-form-container">
                                <div className="date-time-picker">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                        adapterLocale={locale}>
                                        <DateTimePicker
                                            label={t('addMilkingModal.dateOfMilking')}
                                            value={dateOfMilking}
                                            onChange={handleDateChange}
                                            maxDate={new Date()}
                                            disableFuture
                                            ampm={i18n.language !== 'pl'}
                                            desktopModeMediaQuery="@media (min-width:600px)"
                                            slotProps={{
                                                textField: {
                                                    error: !!errors.dateOfMilking,
                                                    helperText: errors.dateOfMilking
                                                }}
                                            }
                                        />
                                    </LocalizationProvider>
                                </div>

                                <div className="add-cow-data-inputs">
                                    <TextField
                                        margin="normal"
                                        required
                                        label={t('addMilkingModal.milkQuantity')}
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
                                        label={t('addMilkingModal.milkingDuration')}
                                        type="text"
                                        value={milkingDuration || ''}
                                        onChange={handleMilkingDurationChange}
                                        error={!!errors.milkingDuration}
                                        helperText={errors.milkingDuration}
                                        placeholder="MM:SS"
                                    />
                                </div>
                            </div>

                            <Typography className="add-cow-data-req">
                                {t('addMilkingModal.requirements')}
                            </Typography>

                            <Box className="add-cow-data-button-group">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="confirm-add-cow-data-button"
                                >
                                    <DoneOutlinedIcon className="add-cow-data-button-icon"/>
                                    {t('addMilkingModal.confirmButton')}
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={cancel}
                                    className="cancel-add-cow-data-button"
                                >
                                    <CloseOutlinedIcon className="add-cow-data-button-icon"/>
                                    {t('addMilkingModal.cancelButton')}
                                </Button>
                            </Box>
                        </Box>
                    </Slide>
                </Box>
            </Fade>
        </Modal>
    );
}

export default AddMilkingModal;