import CropResponseDTO from "@/entities/CropResponseDTO.ts";
import React from "react";
import {useTranslation} from "react-i18next";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import CropCard from "@/pages/FieldPage/CropCard.tsx";

type CropTableProps = {
    cropList: CropResponseDTO[];
    onSelectCrop: (cropId: number | null) => void;
    selectedCropId: number | null;
    setCropList: (cropList: CropResponseDTO[]) => void;
    onCropChanged: () => void;
}

const CropTable: React.FC<CropTableProps> = ({cropList, onSelectCrop, selectedCropId, setCropList, onCropChanged}) => {
    const {t} = useTranslation('fieldPage');

    const handleCropDeleted = (deletedCropId: number) => {
        setCropList(cropList.filter(crop => crop.cropId !== deletedCropId));
        onSelectCrop(null);
        onCropChanged();
    };

    const handleCropUpdated = (updatedCrop: CropResponseDTO) => {
        setCropList(cropList.map(crop =>
            crop.cropId === updatedCrop.cropId ? updatedCrop : crop
        ));
        onCropChanged();
    };

    return (
        <div>
            <TableContainer className="crop-table-container">
                <Table stickyHeader={true}>
                    <TableHead>
                        <TableRow>
                            <TableCell className="c-th" padding="checkbox"></TableCell>
                            <TableCell className="c-th">{t('cropDetails.crop')}</TableCell>
                            <TableCell className="c-th">{t('cropDetails.sowingDate')}</TableCell>
                            <TableCell className="c-th">{t('cropDetails.harvestDate')}</TableCell>
                            <TableCell className="c-th">{t('cropDetails.yield')}</TableCell>
                            <TableCell className="c-th">{t('cropDetails.expectedYield')}</TableCell>
                            <TableCell className="c-th">{t('cropDetails.actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cropList.length > 0 ? (
                                cropList.map(crop => (
                                    <CropCard
                                        key={crop.cropId}
                                        crop={crop}
                                        onSelectCrop={onSelectCrop}
                                        selected={crop.cropId === selectedCropId}
                                        onCropDeleted={handleCropDeleted}
                                        onCropUpdated={handleCropUpdated}
                                    />
                                )))
                            : (
                                <TableRow>
                                    <TableCell colSpan={7} className="crop-no-results-cell">
                                        <Typography className="crop-no-results">
                                            {t('cropDetails.noResults')}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default CropTable;