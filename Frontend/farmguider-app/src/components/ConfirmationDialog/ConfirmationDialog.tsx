import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import React from "react";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {useTranslation} from "react-i18next";
import '@/components/ConfirmationDialog/confirmationDialog.css';

interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (
    {open, onClose, onConfirm, title, message}
) => {
    const {t} = useTranslation('confirmationDialog');

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={'sm'}
        >
            <DialogTitle>
                {title}
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    className="confirmation-dialog-button"
                    onClick={handleConfirm}
                    color="primary"
                    variant="contained"
                >
                    <DoneIcon className="confirmation-dialog-icon"/>
                    {t("confirm")}
                </Button>

                <Button
                    className="confirmation-dialog-button"
                    onClick={onClose}
                    color="primary"
                    variant="outlined"
                >
                    <CloseIcon className="confirmation-dialog-icon"/>
                    {t("cancel")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;
