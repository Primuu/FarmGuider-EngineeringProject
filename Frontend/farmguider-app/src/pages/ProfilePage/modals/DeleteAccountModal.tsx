import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Box, Button, Fade, IconButton, InputAdornment, Modal, Slide, TextField, Typography} from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {deleteAccount} from "@/services/userService.ts";
import UserPasswordDTO from "@/entities/UserPasswordDTO.ts";
import {useAuth} from "@/contexts/AuthContext/AuthContext.tsx";
import {useSnackbar} from "notistack";

import '@/pages/ProfilePage/modals/deleteAccount.css';

type DeleteAccountModalProps = {
    open: boolean;
    onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({open, onClose}) => {
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const {t} = useTranslation('profilePage');
    const {removeSessionCookie} = useAuth();
    const {enqueueSnackbar} = useSnackbar();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const cancel = () => {
        setPassword("");
        setError(null);
        onClose();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userPasswordDTO: UserPasswordDTO = {
            password: password
        };

        deleteAccount(userPasswordDTO)
            .then(() => {
                removeSessionCookie();
                enqueueSnackbar(t('deleteAccount.snackbar'), SnackbarSuccess);
            })
            .catch(() => {
                 setError(t('deleteAccount.error'));
            })
    };

    return (
        <Modal
            open={open}
            onClose={cancel}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box className="delete-acc-modal-box">
                    <Slide
                        direction="right"
                        in={open}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Box component="form" onSubmit={handleSubmit} className="delete-acc-form">
                            <Typography className="delete-acc-header">
                                <WarningIcon className="delete-acc-icon"/>
                                {t('deleteAccount.header')}
                            </Typography>

                            <Typography className="delete-acc-instruction">
                                {t('deleteAccount.instruction')}
                            </Typography>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                autoComplete="new-password"
                                label={t('deleteAccount.password')}
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                error={!!error}
                                helperText={error}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Typography className="delete-acc-text">
                                {t('deleteAccount.warning')}
                            </Typography>

                            <Box className="delete-acc-button-group">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="confirm-delete-acc-button"
                                    color="secondary"
                                >
                                    <DeleteOutlineIcon className="delete-acc-button-icon"/>
                                    {t('deleteAccount.deleteAccountButton')}
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={cancel}
                                    className="cancel-delete-acc-button"
                                    color="secondary"
                                >
                                    <CloseOutlinedIcon className="delete-acc-button-icon"/>
                                    {t('deleteAccount.cancelButton')}
                                </Button>
                            </Box>
                        </Box>
                    </Slide>
                </Box>
            </Fade>
        </Modal>
    );
}

export default DeleteAccountModal;