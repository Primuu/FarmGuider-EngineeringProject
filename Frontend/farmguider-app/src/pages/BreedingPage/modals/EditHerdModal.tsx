import {useTranslation} from "react-i18next";
import {Box, Button, Fade, Modal, Slide, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import {updateBreeding} from "@/services/breedingService.ts";
import '@/pages/BreedingPage/modals/herdModal.css';
import BreedingCreateDTO from "@/entities/BreedingCreateDTO.ts";
import BreedingResponseDTO from "@/entities/BreedingResponseDTO.ts";
import {validateBreedingName} from "@/utils/breedingValidators.ts";

type EditHerdModalProps = {
    open: boolean;
    onClose: () => void;
    refreshBreedings: () => void;
    selectedBreeding: BreedingResponseDTO;
}

const EditHerdModal: React.FC<EditHerdModalProps> = (
    {open, onClose, refreshBreedings, selectedBreeding}
) => {
    const {t} = useTranslation('breedingPage');
    const [breedingName, setBreedingName] = useState<string>(selectedBreeding.breedingName);
    const [error, setError] = useState<string>("");
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        setBreedingName(selectedBreeding.breedingName);
    }, [selectedBreeding]);

    const handleBreedingNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBreedingName(e.target.value);
    };

    const cancel = () => {
        setBreedingName(selectedBreeding.breedingName);
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

        if (selectedBreeding.breedingId) {
            updateBreeding(selectedBreeding.breedingId, breedingCreateDTO)
                .then(() => {
                    setBreedingName(breedingName);
                    setError("");
                    onClose();
                    enqueueSnackbar(t('editHerdModal.successSnackbar'), SnackbarSuccess);
                    refreshBreedings();
                })
                .catch(() => {
                    enqueueSnackbar(t('editHerdModal.errorSnackbar'), SnackbarError);
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
                                {t('editHerdModal.header')}
                            </Typography>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label={t('editHerdModal.breedingName')}
                                type={"text"}
                                value={breedingName}
                                onChange={handleBreedingNameChange}
                                error={!!error}
                                helperText={error}
                            />

                            <Typography className="add-herd-req-text">
                                {t('editHerdModal.nameRequirements')}
                            </Typography>

                            <Box className="add-herd-button-group">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="confirm-add-herd-button"
                                >
                                    <DoneOutlinedIcon className="add-herd-button-icon"/>
                                    {t('editHerdModal.confirmButton')}
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={cancel}
                                    className="cancel-add-herd-button"
                                >
                                    <CloseOutlinedIcon className="add-herd-button-icon"/>
                                    {t('editHerdModal.cancelButton')}
                                </Button>
                            </Box>
                        </Box>
                    </Slide>
                </Box>
            </Fade>
        </Modal>
    );
}

export default EditHerdModal;