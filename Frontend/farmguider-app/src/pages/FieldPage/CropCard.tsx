import {Button, Checkbox, TableCell, TableRow, Tooltip} from "@mui/material";
import React, {useState} from "react";
import CropResponseDTO from "@/entities/CropResponseDTO.ts";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {crops, getCropIcon} from "@/utils/cropUtils.ts";
import {useTranslation} from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import {GiSickle} from "react-icons/gi";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog.tsx";
import {useSnackbar} from "notistack";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import {deleteCrop} from "@/services/cropService.ts";
import AddHarvestModal from "@/pages/FieldPage/modals/AddHarvestModal.tsx";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

type CropCardProps = {
    crop: CropResponseDTO;
    onSelectCrop: (cropId: number | null) => void;
    selected: boolean;
    onCropDeleted: (cropId: number) => void;
    onCropUpdated: (updatedCrop: CropResponseDTO) => void;
}

const CropCard: React.FC<CropCardProps> = ({crop, onSelectCrop, selected, onCropDeleted, onCropUpdated}) => {
    const {t} = useTranslation('fieldPage');
    const [openAddHarvestModal, setOpenAddHarvestModal] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const Icon = getCropIcon(crop.cropType);
    const labelKey = crops.find(c => c.value === crop.cropType)!.labelKey;

    const handleOpenAddHarvestModal = () => setOpenAddHarvestModal(true);
    const handleCloseAddHarvestModal = () => setOpenAddHarvestModal(false);

    const handleOpenConfirmationDialog = () => setOpenConfirmationDialog(true);
    const handleCloseConfirmationDialog = () => setOpenConfirmationDialog(false);

    const handleDeleteCrop = () => {
        if (crop.cropId) {
            deleteCrop(crop.cropId)
                .then(() => {
                    enqueueSnackbar(t('cropDetails.deleteSuccessSnackbar'), SnackbarSuccess);
                    onCropDeleted(crop.cropId);
                })
                .catch(() => {
                    enqueueSnackbar(t('cropDetails.deleteErrorSnackbar'), SnackbarError);
                });
        }
    };

    const handleClick = () => {
        onSelectCrop(crop.cropId);
    }

    const getYieldColor = (yieldValue: number, expectedYield: number) => {
        if (yieldValue < expectedYield * 0.85) return 'red';
        if (yieldValue > expectedYield * 1.15) return 'green';
        return;
    };

    return (
        <TableRow
            key={crop.cropId}
            onClick={handleClick}
            style={{cursor: 'pointer'}}
            selected={selected}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    checked={selected}
                    color="primary"
                    icon={<RadioButtonUncheckedIcon/>}
                    checkedIcon={<RadioButtonCheckedIcon/>}
                    size="small"
                />
            </TableCell>

            <TableCell className="crop-cell">
                <Icon className="crop-cell-icon"/>
                {t(labelKey)}
            </TableCell>

            <TableCell className="crop-cell">
                {crop.sowingDate.toString()}
            </TableCell>

            <TableCell className="crop-cell">
                {crop.harvestDate ? (
                    crop.harvestDate.toString()
                ) : (
                    <Tooltip title={t('cropDetails.expectedHarvestTime')}>
                        <div className="harvest-time">
                            {crop.expectedHarvestStartDate.toString()} -<br/>
                            {crop.expectedHarvestEndDate.toString()}
                        </div>
                    </Tooltip>
                )}
            </TableCell>

            <TableCell className="crop-cell">
                {crop.yield ? (
                    <div>
                        <span className={getYieldColor(crop.yield, crop.expectedYield)}>
                            {`${crop.yield} t`}
                        </span>
                        {crop.yield < crop.expectedYield * 0.85 && (
                            <TrendingDownIcon className="trending-down-icon"/>
                        )}
                        {crop.yield > crop.expectedYield * 1.15 && (
                            <TrendingUpIcon className="trending-up-icon"/>
                        )}
                    </div>
                ) : (
                    '-'
                )}
            </TableCell>

            <TableCell className="crop-cell">
                {`${crop.expectedYield} t`}
            </TableCell>

            <TableCell className="crop-cell">
                <div className="actions">
                    <Tooltip
                        title={crop.harvestDate
                            ? t('cropDetails.harvestButtonDisabled')
                            : t('cropDetails.harvestButton')}
                    >
                        <span>
                            <Button
                                className="crop-table-button"
                                variant="contained"
                                color="primary"
                                onClick={handleOpenAddHarvestModal}
                                disabled={!!crop.harvestDate}
                            >
                                <GiSickle className="crop-table-icon"/>
                            </Button>
                        </span>
                    </Tooltip>

                    <Tooltip title={t('cropDetails.deleteButton')}>
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
                onConfirm={handleDeleteCrop}
                title={t('cropDetails.deleteDialogTitle')}
                message={t('cropDetails.deleteDialogMessage')}
            />

            <AddHarvestModal
                open={openAddHarvestModal}
                onClose={handleCloseAddHarvestModal}
                onCropUpdated={onCropUpdated}
                crop={crop}
            />
        </TableRow>
    )
}

export default CropCard;