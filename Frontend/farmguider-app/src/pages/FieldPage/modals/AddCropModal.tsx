import {useTranslation} from "react-i18next";
import {Box, Button, Fade, FormControl, InputLabel, Modal, Select, SelectChangeEvent, Slide, Typography} from "@mui/material";
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
import {CropCreateDTO} from "@/entities/CropCreateDTO.ts";
import {createCrop} from "@/services/cropService.ts";
import MenuItem from "@mui/material/MenuItem";
import {FaWheatAwn} from "react-icons/fa6";
import {LuWheat} from "react-icons/lu";
import {GiFruitTree} from "react-icons/gi";
import {GiPlantWatering} from "react-icons/gi";
import {GiCorn} from "react-icons/gi";
import {GiPotato} from "react-icons/gi";
import {GiBeet} from "react-icons/gi";

type AddCropModalProps = {
    open: boolean;
    onClose: () => void;
    fieldId: number;
    onCropAdded: () => void;
}

const AddCropModal: React.FC<AddCropModalProps> = ({open, onClose, fieldId, onCropAdded}) => {
    const [cropType, setCropType] = useState<string>("");
    const [sowingDate, setSowingDate] = useState<Date | null>(new Date());
    const {t} = useTranslation('fieldPage');
    const {enqueueSnackbar} = useSnackbar();
    const [locale, setLocale] = useState(enLocale);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (i18n.language === 'pl') setLocale(plLocale);
        if (i18n.language === 'en') setLocale(enLocale);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    const handleCropTypeChange = (event: SelectChangeEvent) => {
        setCropType(event.target.value);
    };

    const handleDateChange = (date: Date | null) => {
        setSowingDate(date);
    };

    const cancel = () => {
        setCropType("");
        setSowingDate(new Date());
        setError("");
        onClose();
    }

    const validateSowingDate = (sowingDate: Date | null): string => {
        if (!sowingDate) return t('addCropModal.validation.sowingDateRequired');
        if (sowingDate > new Date()) return t('addCropModal.validation.sowingDatePastOrPresent');
        return '';
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationError = validateSowingDate(sowingDate);
        if (validationError !== '') {
            setError(validationError);
            return;
        }

        const cropCreateDTO: CropCreateDTO = {
            cropType: cropType,
            sowingDate: sowingDate!
        };

        if (fieldId) {
            createCrop(fieldId, cropCreateDTO)
                .then(() => {
                    cancel();
                    onCropAdded();
                    enqueueSnackbar(t('addCropModal.successSnackbar'), SnackbarSuccess);
                })
                .catch(() => {
                    enqueueSnackbar(t('addCropModal.errorSnackbar'), SnackbarError);
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
                                {t('addCropModal.header')}
                            </Typography>

                            <Typography className="add-crop-sub-header">
                                {t('addCropModal.subHeader')}
                            </Typography>

                            <div className="add-crop-form-container">
                                <div className="crop-calendar">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                        adapterLocale={locale}
                                    >
                                        <DatePicker
                                            label={t('addCropModal.calendarLabel')}
                                            value={sowingDate}
                                            onChange={handleDateChange}
                                            maxDate={new Date()}
                                            disableFuture
                                            openTo="year"
                                            views={['year', 'month', 'day']}
                                            desktopModeMediaQuery="@media (min-width:600px)"
                                            slotProps={{
                                                textField: {
                                                    error: !!error,
                                                    helperText: error
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>

                                <div className="crop-selector">
                                    <FormControl fullWidth>
                                        <InputLabel>
                                            {t('addCropModal.cropType')}
                                        </InputLabel>
                                        <Select
                                            value={cropType}
                                            required
                                            displayEmpty
                                            label={t('addCropModal.cropType')}
                                            onChange={handleCropTypeChange}
                                        >
                                            <MenuItem value="" disabled>
                                            </MenuItem>

                                            <MenuItem value="WHEAT">
                                                <LuWheat className="crop-icon"/>
                                                {t('addCropModal.wheat')}
                                            </MenuItem>

                                            <MenuItem value="TRITICALE">
                                                <FaWheatAwn className="crop-icon"/>
                                                {t('addCropModal.triticale')}
                                            </MenuItem>

                                            <MenuItem value="BARLEY">
                                                <FaWheatAwn className="crop-icon"/>
                                                {t('addCropModal.barley')}
                                            </MenuItem>

                                            <MenuItem value="RAPESEED">
                                                <GiFruitTree className="crop-icon"/>
                                                {t('addCropModal.rapeseed')}
                                            </MenuItem>

                                            <MenuItem value="RYE">
                                                <FaWheatAwn className="crop-icon"/>
                                                {t('addCropModal.rye')}
                                            </MenuItem>

                                            <MenuItem value="OATS">
                                                <GiPlantWatering className="crop-icon"/>
                                                {t('addCropModal.oats')}
                                            </MenuItem>

                                            <MenuItem value="CORN">
                                                <GiCorn className="crop-icon"/>
                                                {t('addCropModal.corn')}
                                            </MenuItem>

                                            <MenuItem value="POTATO">
                                                <GiPotato className="crop-icon"/>
                                                {t('addCropModal.potato')}
                                            </MenuItem>

                                            <MenuItem value="SUGAR_BEET">
                                                <GiBeet className="crop-icon"/>
                                                {t('addCropModal.sugarBeet')}
                                            </MenuItem>

                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            <Typography className="add-crop-req">
                                {t('addCropModal.requirements')}
                            </Typography>

                            <Box className="add-crop-button-group">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="confirm-add-crop-button"
                                >
                                    <DoneOutlinedIcon className="add-crop-button-icon"/>
                                    {t('addCropModal.confirmButton')}
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={cancel}
                                    className="cancel-add-crop-button"
                                >
                                    <CloseOutlinedIcon className="add-crop-button-icon"/>
                                    {t('addCropModal.cancelButton')}
                                </Button>
                            </Box>
                        </Box>
                    </Slide>
                </Box>
            </Fade>
        </Modal>
    );
}

export default AddCropModal;