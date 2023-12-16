import React, {useState} from "react";
import {Button, FormControl, InputLabel, Select, SelectChangeEvent} from "@mui/material";
import {useTranslation} from "react-i18next";
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddLactationPeriodModal from "@/pages/CowPage/modals/AddLactationPeriodModal.tsx";
import LactationPeriodResponseDTO from "@/entities/LactationPeriodResponseDTO.ts";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import MenuItem from "@mui/material/MenuItem";
import {formatDate} from "@/utils/dateUtils.ts";
import EditLactationPeriodModal from "@/pages/CowPage/modals/EditLactationPeriodModal.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog.tsx";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import {useSnackbar} from "notistack";
import {deleteLactationPeriod} from "@/services/lactationPeriodService.ts";

type MilkingYieldToolsProps = {
    cow: CowResponseDTO;
    locale: Locale;
    onLactationPeriodChanged: () => void;
    lactationPeriodList: LactationPeriodResponseDTO[];
    selectedLactationPeriod: LactationPeriodResponseDTO | null;
    handleChangeLactationPeriod: (lactationPeriodId: number) => void;
}

const MilkingYieldTools: React.FC<MilkingYieldToolsProps> = (
    {
        cow, locale, onLactationPeriodChanged, lactationPeriodList,
        selectedLactationPeriod, handleChangeLactationPeriod
    }
) => {
    const {t} = useTranslation('cowPage');
    const [openAddLactationPeriodModal, setOpenAddLactationPeriodModal] = useState(false);
    const [openEditLactationPeriodModal, setOpenEditLactationPeriodModal] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const handleOpenAddLactationPeriodModal = () => setOpenAddLactationPeriodModal(true);
    const handleCloseAddLactationPeriodModal = () => setOpenAddLactationPeriodModal(false);

    const handleOpenEditLactationPeriodModal = () => setOpenEditLactationPeriodModal(true);
    const handleCloseEditLactationPeriodModal = () => setOpenEditLactationPeriodModal(false);

    const handleOpenConfirmationDialog = () => setOpenConfirmationDialog(true);
    const handleCloseConfirmationDialog = () => setOpenConfirmationDialog(false);

    const handleSelectLactationPeriod = (event: SelectChangeEvent) => {
        const lactationPeriodIdNum = Number(event.target.value);
        handleChangeLactationPeriod(lactationPeriodIdNum);
    };

    const handleDeleteLactationPeriod = () => {
        if (selectedLactationPeriod && selectedLactationPeriod.lactationPeriodId) {
            deleteLactationPeriod(selectedLactationPeriod.lactationPeriodId)
                .then(() => {
                    enqueueSnackbar(t('milkingChart.deleteSuccessSnackbar'), SnackbarSuccess);
                    onLactationPeriodChanged();
                })
                .catch(() => {
                    enqueueSnackbar(t('milkingChart.deleteErrorSnackbar'), SnackbarError);
                });
        }
    };

    return (
        <div>
            <div className="milking-chart-buttons">
                {lactationPeriodList.length > 1 ? (
                    <div className="lactation-period-selector-container">
                        <FormControl
                            size={"small"}
                            className="lactation-period-selector"
                        >
                            <InputLabel>
                                {t('milkingChart.pickerLabel')}
                            </InputLabel>
                            <Select
                                value={selectedLactationPeriod!.lactationPeriodId.toString()}
                                onChange={handleSelectLactationPeriod}
                                label={t('milkingChart.pickerLabel')}
                            >
                                {lactationPeriodList.map((lactationPeriod) => (
                                    <MenuItem
                                        key={lactationPeriod.lactationPeriodId}
                                        value={lactationPeriod.lactationPeriodId}
                                    >
                                        {formatDate(lactationPeriod.startDate)
                                            + " - " + (lactationPeriod.endDate ?
                                                    formatDate(lactationPeriod.endDate)
                                                    : t('milkingChart.onGoing')
                                            )
                                        }
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                ) : (selectedLactationPeriod &&
                    <div className="lactation-period-single">
                        {formatDate(selectedLactationPeriod.startDate)
                            + " - " + (selectedLactationPeriod.endDate ?
                                    formatDate(selectedLactationPeriod.endDate)
                                    : t('milkingChart.onGoing')
                            )
                        }
                    </div>
                )}

                <Button
                    className="add-lactation-button"
                    variant="contained"
                    color="primary"
                    onClick={handleOpenAddLactationPeriodModal}
                >
                    <EventNoteIcon className="add-lactation-icon"/>
                    {t('milkingChart.addLactationButton')}
                </Button>

                {selectedLactationPeriod &&
                    <Button
                        className="add-lactation-button"
                        variant="contained"
                        color="primary"
                        onClick={handleOpenEditLactationPeriodModal}
                    >
                        <EventNoteIcon className="add-lactation-icon"/>
                        {t('milkingChart.editLactationButton')}
                    </Button>
                }

                {selectedLactationPeriod &&
                    <Button
                        className="add-lactation-button"
                        variant="contained"
                        color="secondary"
                        onClick={handleOpenConfirmationDialog}
                    >
                        <DeleteIcon className="add-lactation-icon"/>
                        {t('milkingChart.deleteLactationButton')}
                    </Button>
                }
            </div>

            <AddLactationPeriodModal
                open={openAddLactationPeriodModal}
                onClose={handleCloseAddLactationPeriodModal}
                cow={cow}
                onLactationPeriodChanged={onLactationPeriodChanged}
                locale={locale}
                lactationPeriodList={lactationPeriodList}
            />

            {selectedLactationPeriod &&
                <EditLactationPeriodModal
                    open={openEditLactationPeriodModal}
                    onClose={handleCloseEditLactationPeriodModal}
                    cow={cow}
                    onLactationPeriodChanged={onLactationPeriodChanged}
                    locale={locale}
                    lactationPeriodList={lactationPeriodList}
                    selectedLactationPeriod={selectedLactationPeriod}
                />
            }

            <ConfirmationDialog
                open={openConfirmationDialog}
                onClose={handleCloseConfirmationDialog}
                onConfirm={handleDeleteLactationPeriod}
                title={t('milkingChart.deleteDialogTitle')}
                message={t('milkingChart.deleteDialogMessage')}
            />
        </div>
    )
}

export default MilkingYieldTools;