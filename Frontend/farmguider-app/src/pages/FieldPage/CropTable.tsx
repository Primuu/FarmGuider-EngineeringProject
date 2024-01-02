import CropResponseDTO from "@/entities/CropResponseDTO.ts";
import React from "react";
import {useTranslation} from "react-i18next";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import CropCard from "@/pages/FieldPage/CropCard.tsx";

type CropTableProps = {
    cropList: CropResponseDTO[];
    onSelectCrop: (cropId: number | null) => void;
    selectedCropId: number | null;
}

const CropTable: React.FC<CropTableProps> = ({cropList, onSelectCrop, selectedCropId}) => {
    const {t} = useTranslation('fieldPage');

    return (
        <div>
            <TableContainer className="crop-table-container">
                <Table stickyHeader={true}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox"></TableCell>
                            <TableCell className="c-th">{t('cropDetails.crop')}</TableCell>
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
                                    />
                                )))
                            : (
                                <TableRow>
                                    <TableCell colSpan={2} className="crop-no-results-cell">
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