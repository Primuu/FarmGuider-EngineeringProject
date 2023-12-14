import MilkingResponseDTO from "@/entities/MilkingResponseDTO.ts";
import React, {useState} from "react";
import {Button, TableCell, TableRow, Tooltip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog.tsx";
import {formatDateTime, formatTimeInSeconds} from "@/utils/dateUtils.ts";
import {useTranslation} from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import {deleteMilking} from "@/services/milkingService.ts";
import {useSnackbar} from "notistack";
import EditMilkingModal from "@/pages/CowPage/modals/EditMilkingModal.tsx";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";

type MilkingCardProps = {
    milking: MilkingResponseDTO;
    onMilkingDeleted: (milkingId: number) => void;
    onMilkingUpdated: (updatedMilking: MilkingResponseDTO) => void;
    locale: Locale;
    cow: CowResponseDTO;
}

const MilkingCard: React.FC<MilkingCardProps> = ({milking, onMilkingDeleted, onMilkingUpdated, locale, cow}) => {
    const {t} = useTranslation('cowPage');
    const [openEditMilkingModal, setOpenEditMilkingModal] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const handleOpenEditMilkingModal = () => setOpenEditMilkingModal(true);
    const handleCloseEditMilkingModal = () => setOpenEditMilkingModal(false);

    const handleOpenConfirmationDialog = () => setOpenConfirmationDialog(true);
    const handleCloseConfirmationDialog = () => setOpenConfirmationDialog(false);

    const handleDeleteMilking = () => {
        if (milking.milkingId) {
            deleteMilking(milking.milkingId)
                .then(() => {
                    enqueueSnackbar(t('milking.deleteSuccessSnackbar'), SnackbarSuccess);
                    onMilkingDeleted(milking.milkingId);
                })
                .catch(() => {
                    enqueueSnackbar(t('milking.deleteErrorSnackbar'), SnackbarError);
                });
        }
    };

    return (
        <TableRow key={milking.milkingId}>
            <TableCell>
                {formatDateTime(milking.dateOfMilking)}
            </TableCell>

            <TableCell>
                <div className="milking-center-cell">
                    {milking.milkQuantity.toString() + " l"}
                </div>
            </TableCell>

            <TableCell>
                <div className="milking-center-cell">
                    {formatTimeInSeconds(milking.milkingDuration)}
                </div>
            </TableCell>

            <TableCell>
                <Tooltip title={t('milking.editButton')}>
                    <Button
                        className="milking-table-button"
                        variant="contained"
                        color="primary"
                        onClick={handleOpenEditMilkingModal}
                    >
                        <EditIcon className="milking-table-icon"/>
                    </Button>
                </Tooltip>
            </TableCell>

            <TableCell>
                <Tooltip title={t('milking.deleteButton')}>
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
                onConfirm={handleDeleteMilking}
                title={t('milking.deleteDialogTitle')}
                message={t('milking.deleteDialogMessage')}
            />

            <EditMilkingModal
                open={openEditMilkingModal}
                onClose={handleCloseEditMilkingModal}
                milking={milking}
                onMilkingUpdated={onMilkingUpdated}
                locale={locale}
                cow={cow}
            />
        </TableRow>
    )
}

export default MilkingCard;