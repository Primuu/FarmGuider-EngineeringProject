import {useTranslation} from "react-i18next";
import {
    Box,
    Button,
    Fade,
    FormControl,
    InputLabel,
    Modal,
    Select,
    SelectChangeEvent,
    Slide,
    TextField,
    Typography
} from "@mui/material";
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
import MenuItem from "@mui/material/MenuItem";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

type AddCowModalProps = {
    open: boolean;
    onClose: () => void;
    breedingId: number;
}

const AddCowModal: React.FC<AddCowModalProps> = ({open, onClose, breedingId}) => {
    const [earTagNumber, setEarTagNumber] = useState<string>('');
    const [gender, setGender] = useState<string>('FEMALE');
    const [cowName, setCowName] = useState<string>('');
    // const [dateOfBirth, setDateOfBirth] = useState< DATE >( TODAY );
    const {t} = useTranslation('breedingPage');
    const {errors, validate, setErrors} = useValidation<CowValues>(validateAddCow);
    const {enqueueSnackbar} = useSnackbar();

    const handleEarTagNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEarTagNumber(e.target.value.toUpperCase());
    };

    const handleGenderChange = (event: SelectChangeEvent) => {
        setGender(event.target.value);
    };

    const handleCowNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCowName(e.target.value);
    };

    const cancel = () => {
        setEarTagNumber("");
        setGender('FEMALE');
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
            earTagNumber: earTagNumber,
            // dateOfBirth: ,
            gender: gender
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