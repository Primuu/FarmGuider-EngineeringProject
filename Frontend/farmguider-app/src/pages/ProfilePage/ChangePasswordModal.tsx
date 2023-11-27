import {useTranslation} from "react-i18next";
import {Box, Button, Fade, IconButton, InputAdornment, Modal, Slide, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useValidation from "@/hooks/useValidation.ts";
import {ChangePasswordValues, validateChangePassword} from "@/utils/profileValidators.ts";
import UserChangePasswordDTO from "@/entities/UserChangePasswordDTO.ts";
import {changePassword} from "@/services/authenticationService.ts";
import {useSnackbar} from "notistack";

import '@/pages/ProfilePage/modals.css';
import {SnackbarSuccess} from "@/utils/snackbarVariants.ts";

type ChangePasswordModalProps = {
    open: boolean;
    onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({open, onClose}) => {
    const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const {t} = useTranslation('profilePage');
    const {errors, validate, setErrors} = useValidation<ChangePasswordValues>(validateChangePassword);
    const {enqueueSnackbar} = useSnackbar();

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const cancel = () => {
        setCurrentPassword("");
        setPassword("");
        setConfirmPassword("");

        onClose();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate({password, confirmPassword}, t)) return;

        const userChangePasswordDTO: UserChangePasswordDTO = {
            currentPassword: currentPassword,
            newPassword: password
        };

        changePassword(userChangePasswordDTO)
            .then(() => {
                cancel();
                enqueueSnackbar(t('changePasswd.successSnackbar'), SnackbarSuccess);
            })
            .catch(() => {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    currentPassword: t('changePasswd.error')
                }));
            })
    };

    return (
        <Modal
            open={open}
            onClose={cancel}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box className="change-passwd-modal-box">
                    <Slide
                        direction="right"
                        in={open}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Box component="form" onSubmit={handleSubmit} className="change-passwd-form">
                            <Typography className="modal-header">
                                {t('changePasswd.header')}
                            </Typography>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                autoComplete="new-password"
                                label={t('changePasswd.currentPasswd')}
                                type={showCurrentPassword ? "text" : "password"}
                                value={currentPassword}
                                onChange={handleCurrentPasswordChange}
                                error={!!errors.currentPassword}
                                helperText={errors.currentPassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={toggleCurrentPasswordVisibility}
                                            >
                                                {showCurrentPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label={t('changePasswd.newPasswd')}
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                error={!!errors.password}
                                helperText={errors.password}
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

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label={t('changePasswd.confirmPasswd')}
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
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

                            <Typography className="change-passwd-password-text">
                                {t('changePasswd.passwordRequirements')}
                            </Typography>
                            <Box className="change-passwd-button-group">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="confirm-change-passwd-button"
                                >
                                    {t('changePasswd.changePasswdButton')}
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={cancel}
                                >
                                    {t('changePasswd.cancelButton')}
                                </Button>
                            </Box>
                        </Box>
                    </Slide>
                </Box>
            </Fade>
        </Modal>
    );
}

export default ChangePasswordModal;