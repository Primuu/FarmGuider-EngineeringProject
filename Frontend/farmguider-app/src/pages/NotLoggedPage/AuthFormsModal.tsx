import LoginForm from "@/pages/NotLoggedPage/LoginForm.tsx";
import RegisterForm from "@/pages/NotLoggedPage/RegisterForm.tsx";
import { Box, Modal, Fade, Button, Slide } from '@mui/material';
import React, {useState} from "react";
import '@/pages/NotLoggedPage/authFormsModal.css';
import {useTranslation} from "react-i18next";

type AuthFormsModalProps = {
    open: boolean;
    onClose: () => void;
}

enum AuthFormType {
    Login = "login",
    Register = "register"
}

const AuthFormsModal: React.FC<AuthFormsModalProps> = ({ open, onClose }) => {
    const [activeForm, setActiveForm] = useState<AuthFormType>(AuthFormType.Login);

    const {t} = useTranslation('authForms');

    const handleLogin = () => setActiveForm(AuthFormType.Login);
    const handleRegister = () => setActiveForm(AuthFormType.Register);

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box className="modal-box">
                    <Slide
                        direction="right"
                        in={activeForm === AuthFormType.Login}
                        mountOnEnter
                        unmountOnExit
                    >
                        <div>
                            {activeForm === AuthFormType.Login && <LoginForm />}
                        </div>
                    </Slide>
                    <Slide
                        direction="left"
                        in={activeForm === AuthFormType.Register}
                        mountOnEnter
                        unmountOnExit
                    >
                        <div>
                            {activeForm === AuthFormType.Register && <RegisterForm />}
                        </div>
                    </Slide>

                    <Box className="modal-footer">
                        <Button
                            variant={activeForm === AuthFormType.Login ? "contained" : "outlined"}
                            fullWidth
                            onClick={handleLogin}
                        >
                            {t('modal.signIn')}
                        </Button>
                        <Button
                            variant={activeForm === AuthFormType.Register ? "contained" : "outlined"}
                            fullWidth
                            onClick={handleRegister}
                        >
                            {t('modal.register')}
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default AuthFormsModal;
