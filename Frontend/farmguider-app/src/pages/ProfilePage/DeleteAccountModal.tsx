import React from "react";
import {useTranslation} from "react-i18next";
import {Box, Fade, Modal, Slide} from "@mui/material";

import '@/pages/ProfilePage/modals.css';

type DeleteAccountModalProps = {
    open: boolean;
    onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({open, onClose}) => {
    const {t} = useTranslation('profilePage');

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box className="profile-modal-box">
                    <Slide
                        direction="right"
                        in={open}
                        mountOnEnter
                        unmountOnExit
                    >
                        <div>
                            DELETE ACCOUNT
                        </div>
                    </Slide>
                </Box>
            </Fade>
        </Modal>
    );
}

export default DeleteAccountModal;