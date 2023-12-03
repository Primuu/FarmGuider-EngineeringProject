import {Button, Tooltip} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog.tsx";
import BreedingResponseDTO from "@/entities/BreedingResponseDTO.ts";
import {deleteBreeding} from "@/services/breedingService.ts";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import {useSnackbar} from "notistack";

type BreedingContentToolsProps = {
    handleOpenAddHerdModal: () => void;
    selectedBreeding: BreedingResponseDTO;
    refreshBreedings: () => void;
}

const BreedingContentTools: React.FC<BreedingContentToolsProps> = (
    {handleOpenAddHerdModal, selectedBreeding, refreshBreedings}
) => {
    const {t} = useTranslation('breedingPage');
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const handleOpenConfirmationDialog = () => {
        setOpenConfirmationDialog(true);
    };

    const handleCloseConfirmationDialog = () => {
        setOpenConfirmationDialog(false);
    };

    const handleDeleteBreeding = () => {
        if (selectedBreeding.breedingId) {
            deleteBreeding(selectedBreeding.breedingId)
                .then(() => {
                    enqueueSnackbar(t('breedingContent.deleteSuccessSnackbar'), SnackbarSuccess);
                    refreshBreedings();
                })
                .catch(() => {
                    enqueueSnackbar(t('breedingContent.deleteErrorSnackbar'), SnackbarError);
                });
        }
    };

    return (
        <div>
            <Tooltip title={t('breedingContent.addHerdTooltip')} >
                <Button
                    className="breeding-content-tools-button"
                    variant="contained"
                    color="primary"
                    onClick={handleOpenAddHerdModal}
                >
                    <AddIcon className="breeding-content-tools-icon"/>
                </Button>
            </Tooltip>

            <Tooltip title={t('breedingContent.editHerdTooltip')} >
                <Button
                    className="breeding-content-tools-button"
                    variant="contained"
                    color="primary"
                    // onClick={}
                >
                    <EditIcon className="breeding-content-tools-icon"/>
                </Button>
            </Tooltip>

            <Tooltip title={t('breedingContent.deleteHerdTooltip')} >
                <Button
                    className="breeding-content-tools-button"
                    variant="contained"
                    color="secondary"
                    onClick={handleOpenConfirmationDialog}
                >
                    <DeleteIcon className="breeding-content-tools-icon"/>
                </Button>
            </Tooltip>

            <ConfirmationDialog
                open={openConfirmationDialog}
                onClose={handleCloseConfirmationDialog}
                onConfirm={handleDeleteBreeding}
                title={t('breedingContent.deleteDialogTitle')}
                message={t('breedingContent.deleteDialogMessage') + selectedBreeding.breedingName + "?"}
            />
        </div>
    );
}

export default BreedingContentTools;
