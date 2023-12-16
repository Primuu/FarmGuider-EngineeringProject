import {useTranslation} from "react-i18next";
import {Box, Button, Fade, Modal, Slide, Typography} from "@mui/material";
import React, {useState} from "react";
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
import {createLactationPeriod} from "@/services/lactationPeriodService.ts";
import LactationPeriodResponseDTO from "@/entities/LactationPeriodResponseDTO.ts";
import {LactationPeriodValues, validateLactationPeriod} from "@/utils/lactationPeriodValidators.ts";
import {normalizeDate} from "@/utils/dateUtils.ts";
import {AxiosError} from "axios";
import ErrorResponse from "@/entities/ErrorResponse.ts";

type AddLactationPeriodModalProps = {
    open: boolean;
    onClose: () => void;
    cow: CowResponseDTO;
    onLactationPeriodAdded: () => void;
    locale: Locale;
    lactationPeriodList: LactationPeriodResponseDTO[];
}

const AddLactationPeriodModal: React.FC<AddLactationPeriodModalProps> = ({open, onClose, cow, onLactationPeriodAdded, locale, lactationPeriodList}) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const {t} = useTranslation('cowPage');
    const {enqueueSnackbar} = useSnackbar();
    const {errors, validate, setErrors} = useValidation<LactationPeriodValues>(validateLactationPeriod);

    const MAX_DATE = new Date(8640000000000000);

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(normalizeDate(date));
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(normalizeDate(date));
    };

    const cancel = () => {
        setStartDate(null);
        setEndDate(null);
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

        if (cow.cowId) {
            createLactationPeriod(cow.cowId, lactationPeriodCreateDTO)
                .then(() => {
                    cancel();
                    onLactationPeriodAdded();
                    enqueueSnackbar(t('addLactationPeriodModal.successSnackbar'), SnackbarSuccess);
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
                                enqueueSnackbar(t('addLactationPeriodModal.errorSnackbar'), SnackbarError);
                        }
                    } else {
                        enqueueSnackbar(t('addLactationPeriodModal.errorSnackbar'), SnackbarError);
                    }
                })
        }
    };

    const isDateInLactationPeriods = (date: Date, lactationPeriods: LactationPeriodResponseDTO[]) => {
        return lactationPeriods.some(period => {
            const normalizedDate = normalizeDate(date)!;
            const startDate = new Date(period.startDate);
            const endDate = period.endDate ? new Date(period.endDate).setHours(23, 59, 59, 999) : MAX_DATE;

            return normalizedDate >= startDate && normalizedDate <= endDate;
        });
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
                                {t('addLactationPeriodModal.header')}
                            </Typography>

                            <Typography className="edit-cow-data-sub-header">
                                {t('addLactationPeriodModal.subHeader')}
                            </Typography>

                            <div className="edit-cow-data-form-container">
                                <div className="edit-cow-date-time-picker">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                        adapterLocale={locale}
                                    >
                                        <DatePicker
                                            label={t('addLactationPeriodModal.startDate')}
                                            value={startDate}
                                            onChange={handleStartDateChange}
                                            minDate={new Date(cow.dateOfBirth)}
                                            maxDate={new Date()}
                                            shouldDisableDate={(date) => isDateInLactationPeriods(date, lactationPeriodList)}
                                            disableFuture
                                            openTo="year"
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
                                            label={t('addLactationPeriodModal.endDate')}
                                            value={endDate}
                                            onChange={handleEndDateChange}
                                            minDate={new Date(cow.dateOfBirth)}
                                            shouldDisableDate={(date) => isDateInLactationPeriods(date, lactationPeriodList)}
                                            openTo="year"
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
                                {t('addLactationPeriodModal.endDateRequirements')}
                            </Typography>

                            <Typography className="edit-cow-data-req">
                                {t('addLactationPeriodModal.requirements')}
                            </Typography>

                            <Box className="edit-cow-data-button-group">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="confirm-edit-cow-data-button"
                                >
                                    <DoneOutlinedIcon className="edit-cow-data-button-icon"/>
                                    {t('addLactationPeriodModal.confirmButton')}
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={cancel}
                                    className="cancel-edit-cow-data-button"
                                >
                                    <CloseOutlinedIcon className="edit-cow-data-button-icon"/>
                                    {t('addLactationPeriodModal.cancelButton')}
                                </Button>
                            </Box>
                        </Box>
                    </Slide>
                </Box>
            </Fade>
        </Modal>
    );
}

export default AddLactationPeriodModal;