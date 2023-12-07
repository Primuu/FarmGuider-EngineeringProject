import {useTranslation} from "react-i18next";
import {Box, Button, Fade, FormControl, InputLabel, Modal, Select, SelectChangeEvent, Slide, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import '@/pages/BreedingPage/modals/addCowModal.css';
import useValidation from "@/hooks/useValidation.ts";
import {CowValues, validateAddCow} from "@/utils/cowValidators.ts";
import CowCreateDTO from "@/entities/CowCreateDTO.ts";
import {createCow} from "@/services/cowService.ts";
import MenuItem from "@mui/material/MenuItem";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import plLocale from 'date-fns/locale/pl';
import enLocale from 'date-fns/locale/en-US';
import i18n from "i18next";
import {NAME_REGEX} from "@/utils/profileValidators.ts";

type AddCowModalProps = {
    open: boolean;
    onClose: () => void;
    breedingId: number;
    onCowAdded: () => void;
}

const AddCowModal: React.FC<AddCowModalProps> = ({open, onClose, breedingId, onCowAdded}) => {
    const [earTagNumber, setEarTagNumber] = useState<string>('');
    const [gender, setGender] = useState<string>('FEMALE');
    const [cowName, setCowName] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(new Date());
    const {t} = useTranslation('breedingPage');
    const {errors, validate, setErrors} = useValidation<CowValues>(validateAddCow);
    const {enqueueSnackbar} = useSnackbar();
    const [locale, setLocale] = useState(enLocale);

    useEffect(() => {
        if (i18n.language === 'pl') setLocale(plLocale);
        if (i18n.language === 'en') setLocale(enLocale);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    const handleEarTagNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEarTagNumber(e.target.value.toUpperCase());
    };

    const handleGenderChange = (event: SelectChangeEvent) => {
        setGender(event.target.value);
    };

    const handleCowNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = e.target.value.replace(NAME_REGEX, '');
        setCowName(sanitizedValue);
    };

    const handleDateChange = (date: Date | null) => {
        setDateOfBirth(date);
    };

    const cancel = () => {
        setEarTagNumber("");
        setGender('FEMALE');
        setCowName("");
        setDateOfBirth(new Date());
        setErrors({});
        onClose();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate({earTagNumber, cowName, dateOfBirth}, t)) return;

        const cowCreateDTO: CowCreateDTO = {
            cowName: cowName === '' ? null : cowName,
            earTagNumber: earTagNumber,
            dateOfBirth: dateOfBirth!,
            gender: gender
        };

        if (breedingId) {
            createCow(breedingId, cowCreateDTO)
                .then(() => {
                    cancel();
                    onCowAdded();
                    enqueueSnackbar(t('addCowModal.successSnackbar'), SnackbarSuccess);
                })
                .catch(() => {
                    enqueueSnackbar(t('addCowModal.errorSnackbar'), SnackbarError);
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
                <Box className="add-cow-modal-box">
                    <Slide
                        direction="right"
                        in={open}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Box component="form" onSubmit={handleSubmit} className="add-cow-form">
                            <Typography className="add-cow-header">
                                {t('addCowModal.header')}
                            </Typography>

                            <Typography className="add-cow-sub-header">
                                {t('addCowModal.subHeader')}
                            </Typography>

                            <div className="add-cow-form-container">
                                <div className="add-cow-row-inputs">
                                    <TextField
                                        className="add-cow-text-field"
                                        margin="normal"
                                        required
                                        label={t('addCowModal.earTagNumber')}
                                        placeholder={"XX000123456789"}
                                        type={"text"}
                                        value={earTagNumber || ''}
                                        onChange={handleEarTagNumberChange}
                                        error={!!errors.earTagNumber}
                                        helperText={errors.earTagNumber}
                                        inputProps={{
                                            maxLength: 14
                                        }}
                                    />

                                    <div className="selector">
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel>
                                                {t('addCowModal.selectGender')}
                                            </InputLabel>
                                            <Select
                                                value={gender}
                                                label={t('addCowModal.selectGender')}
                                                onChange={handleGenderChange}
                                            >
                                                <MenuItem value="FEMALE">
                                                    <FemaleIcon className="gender-icon"/>
                                                    {t('addCowModal.female')}
                                                </MenuItem>
                                                <MenuItem value="MALE">
                                                    <MaleIcon className="gender-icon"/>
                                                    {t('addCowModal.male')}
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="add-cow-row-inputs">
                                    <TextField
                                        className="add-cow-text-field"
                                        margin="normal"
                                        label={t('addCowModal.cowName')}
                                        type={"text"}
                                        value={cowName || ''}
                                        onChange={handleCowNameChange}
                                        error={!!errors.cowName}
                                        helperText={errors.cowName}
                                    />

                                    <div className="calendar">
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                            adapterLocale={locale}
                                        >
                                            <DatePicker
                                                label={t('addCowModal.calendarLabel')}
                                                value={dateOfBirth}
                                                onChange={handleDateChange}
                                                maxDate={new Date()}
                                                disableFuture
                                                openTo="day"
                                                views={['year', 'month', 'day']}
                                                desktopModeMediaQuery="@media (min-width:600px)"
                                                slotProps={{
                                                    textField: {
                                                        error: !!errors.dateOfBirth,
                                                        helperText: errors.dateOfBirth
                                                    }
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>

                            <Typography className="add-cow-req">
                                {t('addCowModal.requirements')}
                            </Typography>

                            <Box className="add-cow-button-group">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="confirm-add-cow-button"
                                >
                                    <DoneOutlinedIcon className="add-cow-button-icon"/>
                                    {t('addCowModal.confirmButton')}
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={cancel}
                                    className="cancel-add-cow-button"
                                >
                                    <CloseOutlinedIcon className="add-cow-button-icon"/>
                                    {t('addCowModal.cancelButton')}
                                </Button>
                            </Box>
                        </Box>
                    </Slide>
                </Box>
            </Fade>
        </Modal>
    );
}

export default AddCowModal;