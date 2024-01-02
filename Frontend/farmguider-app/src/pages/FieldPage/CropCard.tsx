import {Checkbox, TableCell, TableRow} from "@mui/material";
import React from "react";
import CropResponseDTO from "@/entities/CropResponseDTO.ts";

type CropCardProps = {
    crop: CropResponseDTO;
    onSelectCrop: (cropId: number | null) => void;
    selected: boolean;
}

const CropCard: React.FC<CropCardProps> = ({crop, onSelectCrop, selected}) => {
    const handleClick = () => {
        onSelectCrop(crop.cropId);
    }

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
                />
            </TableCell>

            <TableCell>
                {crop.cropType}
            </TableCell>
        </TableRow>
    )
}

export default CropCard;