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
import AddMilkingModal from "@/pages/BreedingPage/modals/AddMilkingModal.tsx";
import MilkingCreateDTO from "@/entities/MilkingCreateDTO.ts";

type CowCardProps = {
    cow: CowResponseDTO
    onCowDeleted: () => void;
    onCowUpdated: (updatedCow: CowResponseDTO) => void;
}

const CowCard: React.FC<CowCardProps> = ({cow, onCowDeleted, onCowUpdated}) => {
    const {t} = useTranslation('breedingPage');
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [openAddMilkingModal, setOpenAddMilkingModal] = useState(false);

    const handleOpenAddMilkingModal = () => setOpenAddMilkingModal(true);
    const handleCloseAddMilkingModal = () => setOpenAddMilkingModal(false);

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

    const onMilkingAdded = (milkingCreateDTO: MilkingCreateDTO) => {
        const shouldUpdate: boolean = cow.latestMilkingDate === null || new Date(cow.latestMilkingDate) < new Date(milkingCreateDTO.dateOfMilking);

        if (shouldUpdate) {
            const updatedCow: CowResponseDTO = {
                ...cow,
                latestMilkingQuantity: milkingCreateDTO.milkQuantity,
                latestMilkingDate: milkingCreateDTO.dateOfMilking
            };
            onCowUpdated(updatedCow);
        }
    };


    return (
        <TableRow key={cow.cowId}>
            <TableCell>
                {cow.gender === "FEMALE" ? (
                    <Tooltip title={t('cowResults.femaleTooltip')}>
                        <FemaleIcon/>
                    </Tooltip>
                ) : (
                    <Tooltip title={t('cowResults.maleTooltip')}>
                        <MaleIcon/>
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
                <Tooltip
                    title={cow.gender === "FEMALE"
                        ? t('cowResults.milkingButton')
                        : t('cowResults.milkingButtonDisabled')}
                >
                    <span>
                        <Button
                            className="table-button"
                            variant="contained"
                            color="primary"
                            disabled={cow.gender !== "FEMALE"}
                            onClick={handleOpenAddMilkingModal}
                        >
                            <LuMilk className="table-icon"/>
                        </Button>
                    </span>
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

            <AddMilkingModal
                open={openAddMilkingModal}
                onClose={handleCloseAddMilkingModal}
                cowId={cow.cowId}
                onMilkingAdded={onMilkingAdded}
            />
        </TableRow>
    )
}

export default CowCard;