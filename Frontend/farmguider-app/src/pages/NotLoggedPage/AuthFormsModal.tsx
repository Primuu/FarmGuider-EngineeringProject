import LoginForm from "@/pages/NotLoggedPage/LoginForm.tsx";
import RegisterForm from "@/pages/NotLoggedPage/RegisterForm.tsx";
import {Box, Modal, Fade, Button} from '@mui/material';
import React, {useState} from "react";
import '@/pages/NotLoggedPage/authFormsModal.css';

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
                    {activeForm === AuthFormType.Login ? <LoginForm/> : <RegisterForm/>}

                    <Box className="modal-footer">
                        <Button
                            variant={activeForm === AuthFormType.Login ? "contained" : "outlined"}
                            fullWidth
                            onClick={handleLogin}
                        >
                            Sign in
                        </Button>
                        <Button
                            variant={activeForm === AuthFormType.Register ? "contained" : "outlined"}
                            fullWidth
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default AuthFormsModal;
