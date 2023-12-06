import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import React from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import {Button, TableCell, TableRow, Tooltip} from "@mui/material";
import {useTranslation} from "react-i18next";
import {nullReplaceLackOfData} from "@/utils/textUtils.ts";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {GiInjustice} from "react-icons/gi";
import {LuMilk} from "react-icons/lu";

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
                        // onClick={}
                    >
                        <DeleteIcon className="table-icon"/>
                    </Button>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}

export default CowCard;