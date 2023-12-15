import React, {useState} from "react";
import {Button, TableCell, TableRow, Tooltip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog.tsx";
import {formatDate} from "@/utils/dateUtils.ts";
import {useTranslation} from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import {useSnackbar} from "notistack";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import WeightGainResponseDTO from "@/entities/WeightGainResponseDTO.ts";
import {deleteWeightGain} from "@/services/weightGainService.ts";
import EditWeightGainModal from "@/pages/CowPage/modals/EditWeightGainModal.tsx";

type WeightGainCardProps = {
    weightGain: WeightGainResponseDTO;
    onWeightGainDeleted: (weightGainId: number) => void;
    onWeightGainUpdated: (updatedWeightGain: WeightGainResponseDTO) => void;
    locale: Locale;
    cow: CowResponseDTO;
}

const WeightGainCard: React.FC<WeightGainCardProps> = ({weightGain, onWeightGainDeleted, onWeightGainUpdated, locale, cow}) => {
    const {t} = useTranslation('cowPage');
    const [openEditWeightModal, setOpenEditWeightModal] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const handleOpenEditWeightGainModal = () => setOpenEditWeightModal(true);
    const handleCloseEditWeightGainModal = () => setOpenEditWeightModal(false);

    const handleOpenConfirmationDialog = () => setOpenConfirmationDialog(true);
    const handleCloseConfirmationDialog = () => setOpenConfirmationDialog(false);

    const handleDeleteWeightGain = () => {
        if (weightGain.weightGainId) {
            deleteWeightGain(weightGain.weightGainId)
                .then(() => {
                    enqueueSnackbar(t('weightGain.deleteSuccessSnackbar'), SnackbarSuccess);
                    onWeightGainDeleted(weightGain.weightGainId);
                })
                .catch(() => {
                    enqueueSnackbar(t('weightGain.deleteErrorSnackbar'), SnackbarError);
                });
        }
    };

    return (
        <TableRow key={weightGain.weightGainId}>
            <TableCell className="milking-cell">
                {formatDate(weightGain.measurementDate)}
            </TableCell>

            <TableCell className="milking-cell">
                {weightGain.weight.toString() + " kg"}
            </TableCell>

            <TableCell className="milking-cell">
                <Tooltip title={t('weightGain.editButton')}>
                    <Button
                        className="milking-table-button"
                        variant="contained"
                        color="primary"
                        onClick={handleOpenEditWeightGainModal}
                    >
                        <EditIcon className="milking-table-icon"/>
                    </Button>
                </Tooltip>
            </TableCell>

            <TableCell className="milking-cell">
                <Tooltip title={t('weightGain.deleteButton')}>
                    <Button
                        className="milking-table-button"
                        variant="contained"
                        color="secondary"
                        onClick={handleOpenConfirmationDialog}
                    >
                        <DeleteIcon className="milking-table-icon"/>
                    </Button>
                </Tooltip>
            </TableCell>

            <ConfirmationDialog
                open={openConfirmationDialog}
                onClose={handleCloseConfirmationDialog}
                onConfirm={handleDeleteWeightGain}
                title={t('weightGain.deleteDialogTitle')}
                message={t('weightGain.deleteDialogMessage')}
            />

            <EditWeightGainModal
                open={openEditWeightModal}
                onClose={handleCloseEditWeightGainModal}
                weightGain={weightGain}
                onWeightGainUpdated={onWeightGainUpdated}
                locale={locale}
                cow={cow}
            />
        </TableRow>
    )
}

export default WeightGainCard;