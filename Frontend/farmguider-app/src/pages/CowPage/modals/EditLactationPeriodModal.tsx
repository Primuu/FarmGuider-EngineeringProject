import {useTranslation} from "react-i18next";
import {Box, Button, Fade, Modal, Slide, Typography} from "@mui/material";
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
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import LactationPeriodCreateDTO from "@/entities/LactationPeriodCreateDTO.ts";
import {updateLactationPeriod} from "@/services/lactationPeriodService.ts";
import LactationPeriodResponseDTO from "@/entities/LactationPeriodResponseDTO.ts";
import {LactationPeriodValues, validateLactationPeriod} from "@/utils/lactationPeriodValidators.ts";
import {isDateInLactationPeriods, normalizeDate} from "@/utils/dateUtils.ts";
import {AxiosError} from "axios";
import ErrorResponse from "@/entities/ErrorResponse.ts";

type EditLactationPeriodModalProps = {
    open: boolean;
    onClose: () => void;
    cow: CowResponseDTO;
    onLactationPeriodChanged: () => void;
    locale: Locale;
    lactationPeriodList: LactationPeriodResponseDTO[];
    selectedLactationPeriod: LactationPeriodResponseDTO;
}

const EditLactationPeriodModal: React.FC<EditLactationPeriodModalProps> = (
    {open, onClose, cow, onLactationPeriodChanged, locale, lactationPeriodList,
        selectedLactationPeriod}
) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date(selectedLactationPeriod.startDate));
    const [endDate, setEndDate] = useState<Date | null>(
        (selectedLactationPeriod.endDate ? new Date(selectedLactationPeriod.endDate) : null)
    );
    const {t} = useTranslation('cowPage');
    const {enqueueSnackbar} = useSnackbar();
    const {errors, validate, setErrors} = useValidation<LactationPeriodValues>(validateLactationPeriod);

    const lactationPeriodListWithoutCurrentLactation = lactationPeriodList.filter(
        lp => lp.lactationPeriodId !== selectedLactationPeriod.lactationPeriodId
    );

    useEffect(() => {
        setStartDate(new Date(selectedLactationPeriod.startDate));
        setEndDate(selectedLactationPeriod.endDate ? new Date(selectedLactationPeriod.endDate) : null);
    }, [selectedLactationPeriod]);

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(normalizeDate(date));
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(normalizeDate(date));
    };

    const cancel = () => {
        setStartDate(new Date(selectedLactationPeriod.startDate));
        setEndDate(selectedLactationPeriod.endDate ? new Date(selectedLactationPeriod.endDate) : null);
        setErrors({});
        onClose();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate({startDate: startDate, endDate: endDate}, t)) return;

        const lactationPeriodCreateDTO: LactationPeriodCreateDTO = {
            startDate: startDate!,
            endDate: endDate
        };

        if (selectedLactationPeriod.lactationPeriodId) {
            updateLactationPeriod(selectedLactationPeriod.lactationPeriodId, lactationPeriodCreateDTO)
                .then(() => {
                    cancel();
                    onLactationPeriodChanged();
                    enqueueSnackbar(t('updateLactationPeriodModal.successSnackbar'), SnackbarSuccess);
                })
                .catch((error: AxiosError) => {
                    if (error.response) {
                        const responseData = error.response.data as ErrorResponse;
                        const key = Object.keys(responseData.errors)[0];

                        switch (key) {
                            case 'LactationPeriod':
                                setErrors({
                                    startDate: t('addLactationPeriodModal.validation.dateConflict'),
                                    endDate: t('addLactationPeriodModal.validation.dateConflict')
                                });
                                break;
                            case 'Cow':
                                setErrors({startDate: t('addLactationPeriodModal.validation.cowConflict')});
                                break;
                            default:
                                enqueueSnackbar(t('updateLactationPeriodModal.errorSnackbar'), SnackbarError);
                        }
                    } else {
                        enqueueSnackbar(t('updateLactationPeriodModal.errorSnackbar'), SnackbarError);
                    }
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
                                {t('updateLactationPeriodModal.header')}
                            </Typography>

                            <div className="edit-cow-data-form-container">
                                <div className="edit-cow-date-time-picker">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                        adapterLocale={locale}
                                    >
                                        <DatePicker
                                            label={t('updateLactationPeriodModal.startDate')}
                                            value={startDate}
                                            onChange={handleStartDateChange}
                                            minDate={new Date(cow.dateOfBirth)}
                                            maxDate={new Date()}
                                            shouldDisableDate={(date) => isDateInLactationPeriods(date, lactationPeriodListWithoutCurrentLactation)}
                                            disableFuture
                                            openTo="day"
                                            views={['year', 'month', 'day']}
                                            desktopModeMediaQuery="@media (min-width:600px)"
                                            slotProps={{
                                                textField: {
                                                    error: !!errors.startDate,
                                                    helperText: errors.startDate
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>

                                <div className="edit-cow-date-time-picker">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                        adapterLocale={locale}
                                    >
                                        <DatePicker
                                            label={t('updateLactationPeriodModal.endDate')}
                                            value={endDate}
                                            onChange={handleEndDateChange}
                                            minDate={new Date(cow.dateOfBirth)}
                                            shouldDisableDate={(date) => isDateInLactationPeriods(date, lactationPeriodListWithoutCurrentLactation)}
                                            openTo="day"
                                            views={['year', 'month', 'day']}
                                            desktopModeMediaQuery="@media (min-width:600px)"
                                            slotProps={{
                                                textField: {
                                                    error: !!errors.endDate,
                                                    helperText: errors.endDate
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>

                            <Typography className="edit-cow-data-sub-header">
                                {t('updateLactationPeriodModal.endDateRequirements')}
                            </Typography>

                            <Typography className="edit-cow-data-req">
                                {t('updateLactationPeriodModal.requirements')}
                            </Typography>

                            <Box className="edit-cow-data-button-group">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="confirm-edit-cow-data-button"
                                >
                                    <DoneOutlinedIcon className="edit-cow-data-button-icon"/>
                                    {t('updateLactationPeriodModal.confirmButton')}
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={cancel}
                                    className="cancel-edit-cow-data-button"
                                >
                                    <CloseOutlinedIcon className="edit-cow-data-button-icon"/>
                                    {t('updateLactationPeriodModal.cancelButton')}
                                </Button>
                            </Box>
                        </Box>
                    </Slide>
                </Box>
            </Fade>
        </Modal>
    );
}

export default EditLactationPeriodModal;