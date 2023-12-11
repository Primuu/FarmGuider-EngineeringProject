import {useTranslation} from "react-i18next";
import {Box, Button, Fade, Modal, Slide, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {useSnackbar} from "notistack";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import {createBreeding} from "@/services/breedingService.ts";
import {useAuth} from "@/contexts/AuthContext/AuthContext.tsx";
import '@/pages/BreedingPage/modals/herdModal.css';
import BreedingCreateDTO from "@/entities/BreedingCreateDTO.ts";
import {validateBreedingName} from "@/utils/breedingValidators.ts";
import BreedingResponseDTO from "@/entities/BreedingResponseDTO.ts";

type AddHerdModalProps = {
    open: boolean;
    onClose: () => void;
    onBreedingAdded: (newBreeding: BreedingResponseDTO) => void;
}

const AddHerdModal: React.FC<AddHerdModalProps> = ({open, onClose, onBreedingAdded}) => {
    const {t} = useTranslation('breedingPage');
    const {farmId} = useAuth();
    const [breedingName, setBreedingName] = useState<string>('');
    const [error, setError] = useState<string>("");
    const {enqueueSnackbar} = useSnackbar();

    const handleBreedingNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBreedingName(e.target.value);
    };

    const cancel = () => {
        setBreedingName("");
        setError("");
        onClose();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationError = validateBreedingName(breedingName, t);
        if (validationError !== '') {
            setError(validationError);
            return;
        }

        const breedingCreateDTO: BreedingCreateDTO = {
            breedingName: breedingName
        };

        if (farmId) {
            createBreeding(farmId, breedingCreateDTO)
                .then((breedingResponseDTO) => {
                    cancel();
                    enqueueSnackbar(t('addHerdModal.successSnackbar'), SnackbarSuccess);
                    onBreedingAdded(breedingResponseDTO);
                })
                .catch(() => {
                    enqueueSnackbar(t('addHerdModal.errorSnackbar'), SnackbarError);
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
                <Box className="add-herd-modal-box">
                    <Slide
                        direction="right"
                        in={open}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Box component="form" onSubmit={handleSubmit} className="add-herd-form">
                            <Typography className="add-herd-header">
                                {t('addHerdModal.header')}
                            </Typography>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label={t('addHerdModal.breedingName')}
                                type={"text"}
                                value={breedingName}
                                onChange={handleBreedingNameChange}
                                error={!!error}
                                helperText={error}
                            />

                            <Typography className="add-herd-req-text">
                                {t('addHerdModal.nameRequirements')}
                            </Typography>
                            <Typography className="add-herd-text">
                                {t('addHerdModal.text')}
                            </Typography>

                            <Box className="add-herd-button-group">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="confirm-add-herd-button"
                                >
                                    <DoneOutlinedIcon className="add-herd-button-icon"/>
                                    {t('addHerdModal.confirmButton')}
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={cancel}
                                    className="cancel-add-herd-button"
                                >
                                    <CloseOutlinedIcon className="add-herd-button-icon"/>
                                    {t('addHerdModal.cancelButton')}
                                </Button>
                            </Box>
                        </Box>
                    </Slide>
                </Box>
            </Fade>
        </Modal>
    );
}

export default AddHerdModal;