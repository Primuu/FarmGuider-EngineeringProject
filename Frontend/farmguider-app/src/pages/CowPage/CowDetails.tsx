import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Box, Button, FormControl, FormHelperText, InputLabel, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import useValidation from "@/hooks/useValidation.ts";
import {CowValues, validateAddCow} from "@/utils/cowValidators.ts";
import CowCreateDTO from "@/entities/CowCreateDTO.ts";
import {updateCow} from "@/services/cowService.ts";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import {useSnackbar} from "notistack";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditIcon from "@mui/icons-material/Edit";
import {NAME_REGEX} from "@/utils/profileValidators.ts";
import ErrorResponse from "@/entities/ErrorResponse.ts";
import {AxiosError} from "axios";
import '@/pages/CowPage/cowDetails.css';

type CowDetailsProps = {
    cow: CowResponseDTO;
    setCow: (cowResponseDTO: CowResponseDTO) => void;
    locale: Locale;
}

const CowDetails: React.FC<CowDetailsProps> = ({cow, setCow, locale}) => {
    const {t} = useTranslation('cowPage');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [cowState, setCowState] = useState<CowResponseDTO>(cow);
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(new Date(cowState.dateOfBirth));
    const {errors, validate, setErrors} = useValidation<CowValues>(validateAddCow);
    const {enqueueSnackbar} = useSnackbar();

    const handleEarTagNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCowState(prevState => ({
            ...prevState,
            earTagNumber: e.target.value.toUpperCase()
        }));
    };

    const handleCowNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = e.target.value.replace(NAME_REGEX, '');
        setCowState(prevState => ({
            ...prevState,
            cowName: sanitizedValue
        }));
    };

    const handleDateChange = (date: Date | null) => {
        setDateOfBirth(date);
    };

    const handleGenderChange = (event: SelectChangeEvent) => {
        setCowState(prevState => ({
            ...prevState,
            gender: event.target.value
        }))
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate({
            earTagNumber: cowState.earTagNumber,
            cowName: cowState.cowName,
            dateOfBirth: dateOfBirth
        }, t)) {
            return;
        }

        const cowCreateDTO: CowCreateDTO = {
            cowName: cowState.cowName === '' ? null : cowState.cowName,
            earTagNumber: cowState.earTagNumber,
            dateOfBirth: dateOfBirth!,
            gender: cowState.gender
        };

        if (cowState.cowId) {
            updateCow(cowState.cowId, cowCreateDTO)
                .then(data => {
                    setIsEditing(false);
                    setCow(data);
                    enqueueSnackbar(t('editCow.successSnackbar'), SnackbarSuccess);
                })
                .catch((error: AxiosError) => {
                        if (error.response) {
                            const responseData = error.response.data as ErrorResponse;
                            const key = Object.keys(responseData.errors)[0];

                            switch (key) {
                                case 'WeightGain':
                                    setErrors({dateOfBirth: t('editCow.weightConflict')});
                                    break;
                                case 'LactationPeriod':
                                    setErrors({dateOfBirth: t('editCow.lactationPeriodConflict')});
                                    break;
                                case 'Milking':
                                    setErrors({dateOfBirth: t('editCow.milkingConflict')});
                                    break;
                                case 'Gender':
                                    setErrors({gender: t('editCow.genderConflict')});
                                    break;
                                default:
                                    enqueueSnackbar(t('editCow.errorSnackbar'), SnackbarError);
                            }
                        } else {
                            enqueueSnackbar(t('editCow.errorSnackbar'), SnackbarError);
                        }
                    }
                )
        }
    };

    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setErrors({});
        setCowState(cow);
    };

    return (
        <div>
            <Typography className="edit-cow-details">
                {t('editCow.details')}
            </Typography>
            <div className="edit-cow-container">
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    className="edit-cow-form"
                >
                    <div className="edit-cow-inputs">
                        <TextField
                            className="edit-cow-text-field"
                            margin="normal"
                            required
                            size={"small"}
                            label={t('editCow.earTagNumber')}
                            placeholder={"XX000123456789"}
                            type={"text"}
                            value={cowState.earTagNumber || ''}
                            onChange={handleEarTagNumberChange}
                            error={!!errors.earTagNumber}
                            helperText={errors.earTagNumber}
                            disabled={!isEditing}
                            inputProps={{
                                maxLength: 14
                            }}
                        />

                        <div className="edit-cow-selector">
                            <FormControl
                                size={"small"}
                                fullWidth
                                margin="normal"
                                error={!!errors.gender}
                            >
                                <InputLabel>
                                    {t('editCow.selectGender')}
                                </InputLabel>
                                <Select
                                    value={cowState.gender}
                                    label={t('editCow.selectGender')}
                                    onChange={handleGenderChange}
                                    disabled={!isEditing}
                                    error={!!errors.gender}
                                >
                                    <MenuItem value="FEMALE">
                                        <FemaleIcon className="edit-cow-gender-icon"/>
                                        {t('editCow.female')}
                                    </MenuItem>
                                    <MenuItem value="MALE">
                                        <MaleIcon className="edit-cow-gender-icon"/>
                                        {t('editCow.male')}
                                    </MenuItem>
                                </Select>
                                {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                            </FormControl>
                        </div>
                    </div>

                    <div className="edit-cow-inputs">
                        <TextField
                            className="edit-cow-text-field"
                            margin="normal"
                            size={"small"}
                            label={t('editCow.cowName')}
                            type={"text"}
                            disabled={!isEditing}
                            value={cowState.cowName || ''}
                            onChange={handleCowNameChange}
                            error={!!errors.cowName}
                            helperText={errors.cowName}
                        />

                        <div className="edit-cow-calendar">
                            <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                                adapterLocale={locale}
                            >
                                <DatePicker
                                    label={t('editCow.calendarLabel')}

                                    value={dateOfBirth}
                                    onChange={handleDateChange}
                                    maxDate={new Date()}
                                    disableFuture
                                    disabled={!isEditing}
                                    openTo="year"
                                    views={['year', 'month', 'day']}
                                    desktopModeMediaQuery="@media (min-width:600px)"
                                    slotProps={{
                                        textField: {
                                            error: !!errors.dateOfBirth,
                                            helperText: errors.dateOfBirth,
                                            size: 'small',
                                            margin: 'normal',
                                            fullWidth: true
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>

                    {isEditing ? (
                        <div className="cow-details-button-group">
                            <Button
                                className="cow-edit-button"
                                variant="contained"
                                type="submit"
                                color="primary"
                            >
                                <DoneOutlinedIcon className="cow-edit-button-icon"/>
                                {t('editCow.saveButton')}
                            </Button>
                            <Button
                                className="cow-edit-button"
                                variant="outlined"
                                onClick={handleCancel}
                                color="primary"
                            >
                                <CloseOutlinedIcon className="cow-edit-button-icon"/>
                                {t('editCow.cancelButton')}
                            </Button>
                        </div>
                    ) : (
                        <div className="cow-details-button-group">
                            <Button
                                className="cow-edit-button"
                                variant="contained"
                                onClick={handleEdit}
                                color="primary"
                            >
                                <EditIcon className="cow-edit-button-icon"/>
                                {t('editCow.editButton')}
                            </Button>
                        </div>
                    )}
                </Box>
            </div>
        </div>
    )
}

export default CowDetails;