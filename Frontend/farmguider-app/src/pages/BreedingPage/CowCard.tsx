import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import React, {useState} from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import {Button, TableCell, TableRow, Tooltip} from "@mui/material";
import {useTranslation} from "react-i18next";
import {nullReplaceLackOfData} from "@/utils/textUtils.ts";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {GiInjustice} from "react-icons/gi";
import {LuMilk} from "react-icons/lu";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog.tsx";
import {useSnackbar} from "notistack";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import {deleteCow} from "@/services/cowService.ts";

type CowCardProps = {
    cow: CowResponseDTO
    onCowDeleted: () => void;
}

const CowCard: React.FC<CowCardProps> = ({cow, onCowDeleted}) => {
    const {t} = useTranslation('breedingPage');
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const handleOpenConfirmationDialog = () => {
        setOpenConfirmationDialog(true);
    };

    const handleCloseConfirmationDialog = () => {
        setOpenConfirmationDialog(false);
    };

    const handleDeleteCow = () => {
        if (cow.cowId) {
            deleteCow(cow.cowId)
                .then(() => {
                    enqueueSnackbar(t('cowResults.deleteSuccessSnackbar'), SnackbarSuccess);
                    onCowDeleted();
                })
                .catch(() => {
                    enqueueSnackbar(t('cowResults.deleteErrorSnackbar'), SnackbarError);
                });
        }
    };

    return (
        <TableRow key={cow.cowId}>
            <TableCell>
                {cow.gender === "FEMALE" ? (
                    <Tooltip title={t('cowResults.femaleTooltip')}>
                        <FemaleIcon />
                    </Tooltip>
                ) : (
                    <Tooltip title={t('cowResults.maleTooltip')}>
                        <MaleIcon />
                    </Tooltip>
                )}
            </TableCell>
            <TableCell>
                {cow.earTagNumber}
            </TableCell>
            <TableCell>
                <div className="center-cell">
                    {nullReplaceLackOfData(cow.cowName, "-")}
                </div>
            </TableCell>
            <TableCell>
                {nullReplaceLackOfData(cow.dateOfBirth.toString(), "-")}
            </TableCell>
            <TableCell>
                <div className="center-cell">
                    {nullReplaceLackOfData(cow.currentWeight, "-")} {cow.currentWeight && " kg"}
                </div>
            </TableCell>
            <TableCell>
                <div className="center-cell">
                    {nullReplaceLackOfData(cow.latestMilkingQuantity, "-")} {cow.latestMilkingQuantity && " l"}
                </div>
                </TableCell>
            <TableCell>

                <Tooltip title={t('cowResults.milkingButton')}>
                    <Button
                        className="table-button"
                        variant="contained"
                        color="primary"
                        // onClick={}
                    >
                        <LuMilk className="table-icon"/>
                    </Button>
                </Tooltip>
            </TableCell>

            <TableCell>
                <Tooltip title={t('cowResults.weightingButton')}>
                    <Button
                        className="table-button"
                        variant="contained"
                        color="primary"
                        // onClick={}
                    >
                        <GiInjustice className="table-icon"/>
                    </Button>
                </Tooltip>
            </TableCell>

            <TableCell>
                <Tooltip title={t('cowResults.editingButton')}>
                    <Button
                        className="table-button"
                        variant="contained"
                        color="primary"
                        // onClick={}
                    >
                        <EditIcon className="table-icon"/>
                    </Button>
                </Tooltip>
            </TableCell>

            <TableCell>
                <Tooltip title={t('cowResults.deletingButton')}>
                    <Button
                        className="table-button"
                        variant="contained"
                        color="secondary"
                        onClick={handleOpenConfirmationDialog}
                    >
                        <DeleteIcon className="table-icon"/>
                    </Button>
                </Tooltip>
            </TableCell>

            <ConfirmationDialog
                open={openConfirmationDialog}
                onClose={handleCloseConfirmationDialog}
                onConfirm={handleDeleteCow}
                title={t('cowResults.deleteDialogTitle')}
                message={t('cowResults.deleteDialogMessage1') + cow.earTagNumber + t('cowResults.deleteDialogMessage2')}
            />
        </TableRow>
    )
}

export default CowCard;