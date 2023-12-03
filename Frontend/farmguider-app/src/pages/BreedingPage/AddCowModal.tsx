import {useTranslation} from "react-i18next";
import {Box, Button, Fade, Modal, Slide, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {useSnackbar} from "notistack";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import '@/pages/BreedingPage/addCowModal.css';
import useValidation from "@/hooks/useValidation.ts";
import {CowValues, validateAddCow} from "@/utils/cowValidators.ts";
import CowCreateDTO from "@/entities/CowCreateDTO.ts";
import {createCow} from "@/services/cowService.ts";

type AddCowModalProps = {
    open: boolean;
    onClose: () => void;
    breedingId: number;
}

const AddCowModal: React.FC<AddCowModalProps> = ({open, onClose, breedingId}) => {
    const [earTagNumber, setEarTagNumber] = useState<string>('');
    // const [gender, setGender] = useState<string | null>(null); // FEMALE INITIALLY
    const [cowName, setCowName] = useState<string>('');
    // const [dateOfBirth, setDateOfBirth] = useState< DATE >( TODAY );
    const {t} = useTranslation('breedingPage');
    const {errors, validate, setErrors} = useValidation<CowValues>(validateAddCow);
    const {enqueueSnackbar} = useSnackbar();

    const handleEarTagNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEarTagNumber(e.target.value.toUpperCase());
    };

    const handleCowNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCowName(e.target.value);
    };

    const cancel = () => {
        setEarTagNumber("");
        // setGender( female );
        setCowName("");
        // setDateOfBirth( TODAY );
        setErrors({});
        onClose();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!validate({earTagNumber, cowName}, t)) return;

        const cowCreateDTO: CowCreateDTO = {
            cowName: cowName === '' ? null : cowName,
            earTagNumber: earTagNumber
        };

        if (breedingId) {
            createCow(breedingId, cowCreateDTO)
                .then(() => {
                    cancel();
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

                            <div className="add-cow-inputs">
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label={t('addCowModal.earTagNumber')}
                                    placeholder={"XX000123456789"}
                                    type={"text"}
                                    value={earTagNumber || ''}
                                    onChange={handleEarTagNumberChange}
                                    error={!!errors.earTagNumber}
                                    helperText={errors.earTagNumber}
                                    inputProps={{
                                        maxLength: 14,
                                        textTransform: 'uppercase'
                                    }}
                                />

                            {/*    SELECT GENDER */}

                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label={t('addCowModal.cowName')}
                                    type={"text"}
                                    value={cowName || ''}
                                    onChange={handleCowNameChange}
                                    error={!!errors.cowName}
                                    helperText={errors.cowName}
                                />
                            </div>
                            <div className="add-cow-calendar">

                            </div>
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