import {useTranslation} from "react-i18next";
import {Box, Button, Fade, Modal, Slide, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import '@/pages/FieldPage/modals/addCropModal.css';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import plLocale from 'date-fns/locale/pl';
import enLocale from 'date-fns/locale/en-US';
import i18n from "i18next";
import {addHarvest} from "@/services/cropService.ts";
import CropResponseDTO from "@/entities/CropResponseDTO.ts";
import {HarvestCreateDTO} from "@/entities/HarvestCreateDTO.ts";

type AddHarvestModalProps = {
    open: boolean;
    onClose: () => void;
    onCropUpdated: (cropResponseDTO: CropResponseDTO) => void;
    crop: CropResponseDTO;
}

const AddHarvestModal: React.FC<AddHarvestModalProps> = ({open, onClose, onCropUpdated, crop}) => {
    const [cropYield, setCropYield] = useState<number | null>(null);
    const [harvestDate, setHarvestDate] = useState<Date | null>(new Date());
    const {t} = useTranslation('fieldPage');
    const {enqueueSnackbar} = useSnackbar();
    const [locale, setLocale] = useState(enLocale);
    const [dateError, setDateError] = useState<string>("");
    const [yieldError, setYieldError] = useState<string>("");

    useEffect(() => {
        if (i18n.language === 'pl') setLocale(plLocale);
        if (i18n.language === 'en') setLocale(enLocale);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    const handleYieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCropYield(parseFloat(event.target.value));
    };

    const handleDateChange = (date: Date | null) => {
        setHarvestDate(date);
    };

    const cancel = () => {
        setCropYield(null);
        setHarvestDate(new Date());
        setDateError("");
        setYieldError("");
        onClose();
    }

    const validateHarvestDate = (harvestDate: Date | null): string => {
        if (!harvestDate) return t('addHarvestModal.validation.harvestDateRequired');
        if (harvestDate > new Date()) return t('addHarvestModal.validation.harvestDatePastOrPresent');
        if (harvestDate < new Date(crop.sowingDate)) return t('addHarvestModal.validation.harvestAfterSowing')
        return '';
    };

    const validateYield = (cropYield: number | null): string => {
        if (!cropYield) return t('addHarvestModal.validation.yieldRequired');
        if (cropYield < 0) return t('addHarvestModal.validation.yieldNonNegative');
        if (cropYield > 999.999) return t('addHarvestModal.validation.yieldRange');
        return '';
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationDateError = validateHarvestDate(harvestDate);
        const validationYieldError = validateYield(cropYield);
        if (validationDateError !== '' || validationYieldError !== '') {
            setDateError(validationDateError);
            setYieldError(validationYieldError);
            return;
        }

        const harvestCreateDTO: HarvestCreateDTO = {
            yield: cropYield!,
            harvestDate: harvestDate!
        };

        if (crop.cropId) {
            addHarvest(crop.cropId, harvestCreateDTO)
                .then(data => {
                    cancel();
                    onCropUpdated(data);
                    enqueueSnackbar(t('addHarvestModal.successSnackbar'), SnackbarSuccess);
                })
                .catch(() => {
                    enqueueSnackbar(t('addHarvestModal.errorSnackbar'), SnackbarError);
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
                <Box className="add-crop-modal-box">
                    <Slide
                        direction="right"
                        in={open}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Box component="form" onSubmit={handleSubmit} className="add-crop-form">
                            <Typography className="add-crop-header">
                                {t('addHarvestModal.header')}
                            </Typography>

                            <Typography className="add-crop-sub-header">
                                {t('addHarvestModal.subHeader')}
                            </Typography>

                            <div className="add-crop-form-container">
                                <div className="crop-calendar">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                        adapterLocale={locale}
                                    >
                                        <DatePicker
                                            label={t('addHarvestModal.calendarLabel')}
                                            value={harvestDate}
                                            onChange={handleDateChange}
                                            maxDate={new Date()}
                                            minDate={new Date(crop.sowingDate)}
                                            disableFuture
                                            openTo="year"
                                            views={['year', 'month', 'day']}
                                            desktopModeMediaQuery="@media (min-width:600px)"
                                            slotProps={{
                                                textField: {
                                                    error: !!dateError,
                                                    helperText: dateError
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>

                                <div className="crop-text-field">
                                    <TextField
                                        required
                                        label={t('addHarvestModal.yield')}
                                        type="number"
                                        inputProps={{
                                            step: "0.001",
                                            min: "0.000",
                                            max: "999.999"
                                        }}
                                        value={cropYield !== null && cropYield !== undefined ? cropYield.toString() : ''}
                                        placeholder={"0,000"}
                                        onChange={handleYieldChange}
                                        error={!!yieldError}
                                        helperText={yieldError}
                                    />
                                </div>
                            </div>

                            <Typography className="add-crop-req">
                                {t('addHarvestModal.requirements')}
                            </Typography>

                            <Box className="add-crop-button-group">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="confirm-add-crop-button"
                                >
                                    <DoneOutlinedIcon className="add-crop-button-icon"/>
                                    {t('addHarvestModal.confirmButton')}
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={cancel}
                                    className="cancel-add-crop-button"
                                >
                                    <CloseOutlinedIcon className="add-crop-button-icon"/>
                                    {t('addHarvestModal.cancelButton')}
                                </Button>
                            </Box>
                        </Box>
                    </Slide>
                </Box>
            </Fade>
        </Modal>
    );
}

export default AddHarvestModal;