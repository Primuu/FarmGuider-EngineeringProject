import LoginForm from "@/pages/NotLoggedPage/LoginForm.tsx";
import RegisterForm from "@/pages/NotLoggedPage/RegisterForm.tsx";
import {Box, Modal, Fade} from '@mui/material';
import React from "react";
import '@/pages/NotLoggedPage/authFormsModal.css';

type AuthFormsModalProps = {
    open: boolean;
    onClose: () => void;
}

const AuthFormsModal: React.FC<AuthFormsModalProps> = ({ open, onClose }) => {

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box className="modal-box">
                    <LoginForm/>
                    <RegisterForm/>
                </Box>
            </Fade>
        </Modal>
    );
}

export default AuthFormsModal;
