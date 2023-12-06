import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import React from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import {Button, TableCell, TableRow, Tooltip} from "@mui/material";
import {useTranslation} from "react-i18next";
import {nullReplaceLackOfData} from "@/utils/textUtils.ts";

type CowCardProps = {
    cow: CowResponseDTO
}

const CowCard: React.FC<CowCardProps> = ({cow}) => {
    const {t} = useTranslation('breedingPage');

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
                    {nullReplaceLackOfData(cow.currentWeight, "-")}
                </div>
            </TableCell>
            <TableCell>
                <div className="center-cell">
                    {nullReplaceLackOfData(cow.latestMilkingQuantity, "-")}
                </div>
                </TableCell>
            <TableCell>
                <Button>
                    ADD WEIGHT
                </Button>
            </TableCell>
            <TableCell>
                <Button>
                    ADD MILKING
                </Button>
            </TableCell>
            <TableCell>
                <Button>
                    EDIT
                </Button>
            </TableCell>
            <TableCell>
                <Button>
                    DELETE
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default CowCard;