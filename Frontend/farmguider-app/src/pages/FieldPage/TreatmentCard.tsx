import {Button, TableCell, TableRow, Tooltip} from "@mui/material";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog.tsx";
import {useSnackbar} from "notistack";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import EditIcon from "@mui/icons-material/Edit";
import {TreatmentResponseDTO} from "@/entities/TreatmentResponseDTO.ts";
import {deleteTreatment} from "@/services/treatmentService.ts";
import {BsInfoLg} from "react-icons/bs";
import EditTreatmentModal from "@/pages/FieldPage/modals/EditTreatmentModal.tsx";

type TreatmentCardProps = {
    treatment: TreatmentResponseDTO;
    onTreatmentDeleted: (treatmentId: number) => void;
    onTreatmentUpdated: (updatedTreatment: TreatmentResponseDTO) => void;
}

const TreatmentCard: React.FC<TreatmentCardProps> = ({treatment, onTreatmentDeleted, onTreatmentUpdated}) => {
    const {t} = useTranslation('fieldPage');
    const [openEditTreatmentModal, setOpenEditTreatmentModal] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const handleOpenEditTreatmentModal = () => setOpenEditTreatmentModal(true);
    const handleCloseEditTreatmentModal = () => setOpenEditTreatmentModal(false);

    const handleOpenConfirmationDialog = () => setOpenConfirmationDialog(true);
    const handleCloseConfirmationDialog = () => setOpenConfirmationDialog(false);

    const handleDeleteTreatment = () => {
        if (treatment.treatmentId) {
            deleteTreatment(treatment.treatmentId)
                .then(() => {
                    enqueueSnackbar(t('treatmentDetails.deleteSuccessSnackbar'), SnackbarSuccess);
                    onTreatmentDeleted(treatment.treatmentId);
                })
                .catch(() => {
                    enqueueSnackbar(t('treatmentDetails.deleteErrorSnackbar'), SnackbarError);
                });
        }
    };

    return (
        <TableRow key={treatment.treatmentId}>
            <TableCell className="crop-cell-text-container">
                <Tooltip title={treatment.treatmentName}>
                    <div className="crop-cell-text">
                        {treatment.treatmentName}
                    </div>
                </Tooltip>
            </TableCell>

            <TableCell className="crop-cell">
                {treatment.treatmentDate.toString()}
            </TableCell>

            <TableCell className="crop-cell">
                {treatment.quantity.toString() + " kg"}
            </TableCell>

            <TableCell className="crop-cell">
                <Tooltip
                    title={treatment.details
                ? treatment.details
                : t('treatmentDetails.noDetails')}
                >
                    <div>
                        <BsInfoLg className="crop-cell-details-icon"/>
                    </div>
                </Tooltip>
            </TableCell>

            <TableCell className="crop-cell">
                <div className="actions">
                    <Tooltip title={t('treatmentDetails.editButton')}>
                        <Button
                            className="crop-table-button"
                            variant="contained"
                            color="primary"
                            onClick={handleOpenEditTreatmentModal}
                        >
                            <EditIcon className="crop-table-icon"/>
                        </Button>
                    </Tooltip>

                    <Tooltip title={t('treatmentDetails.deleteButton')}>
                        <Button
                            className="crop-table-button"
                            variant="contained"
                            color="secondary"
                            onClick={handleOpenConfirmationDialog}
                        >
                            <DeleteIcon className="crop-table-icon"/>
                        </Button>
                    </Tooltip>
                </div>
            </TableCell>

            <ConfirmationDialog
                open={openConfirmationDialog}
                onClose={handleCloseConfirmationDialog}
                onConfirm={handleDeleteTreatment}
                title={t('treatmentDetails.deleteDialogTitle')}
                message={t('treatmentDetails.deleteDialogMessage')}
            />

            <EditTreatmentModal
                open={openEditTreatmentModal}
                onClose={handleCloseEditTreatmentModal}
                onTreatmentUpdated={onTreatmentUpdated}
                treatment={treatment}
            />
        </TableRow>
    )
}

export default TreatmentCard;