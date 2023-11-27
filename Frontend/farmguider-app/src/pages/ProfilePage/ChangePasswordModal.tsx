import {useTranslation} from "react-i18next";
import {Box, Button, Fade, IconButton, InputAdornment, Modal, Slide, TextField, Typography} from "@mui/material";
import React, {useState} from "react";

import '@/pages/ProfilePage/modals.css';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

    return (
        <Modal
            open={open}
            onClose={onClose}
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
                        <div>
                            <Typography className="modal-header">
                                Change Password
                            </Typography>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label={"Current Password"}
                                type={showCurrentPassword ? "text" : "password"}
                                value={currentPassword}
                                onChange={handleCurrentPasswordChange}
                                // error={!!errors.password}
                                // helperText={errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={toggleCurrentPasswordVisibility}
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </Slide>
                </Box>
            </Fade>
        </Modal>
    );
}

export default ChangePasswordModal;