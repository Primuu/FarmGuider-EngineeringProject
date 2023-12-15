import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import '@/pages/CowPage/milkingTable.css';
import WeightGainResponseDTO from "@/entities/WeightGainResponseDTO.ts";
import {GiInjustice} from "react-icons/gi";
import AddWeightGainModal from "@/components/sharedModals/AddWeightGainModal.tsx";
import WeightGainCard from "@/pages/CowPage/WeightGainCard.tsx";

type WeightGainTableProps = {
    cow: CowResponseDTO;
    weightGainList: WeightGainResponseDTO[]
    setWeightGainList: (weightGainList: WeightGainResponseDTO[]) => void;
    locale: Locale;
    onWeightGainAdded: () => void;
}

const WeightGainTable: React.FC<WeightGainTableProps> = ({cow, weightGainList, setWeightGainList, locale, onWeightGainAdded}) => {
    const {t} = useTranslation('cowPage');
    const [openAddWeightGainModal, setOpenAddWeightGainModal] = useState(false);

    const handleOpenAddWeightGainModal = () => setOpenAddWeightGainModal(true);
    const handleCloseAddWeightGainModal = () => setOpenAddWeightGainModal(false);

    const handleWeightGainDeleted = (deletedWeightGainId: number) => {
        setWeightGainList(weightGainList.filter(weightGain => weightGain.weightGainId !== deletedWeightGainId));
    };

    const handleWeightGainUpdated = (updatedWeightGain: WeightGainResponseDTO) => {
        setWeightGainList(weightGainList.map(weightGain =>
            weightGain.weightGainId === updatedWeightGain.weightGainId ? updatedWeightGain : weightGain
        ));
    };

    return (
        <div>
            <Typography className="milking-details">
                {t('weightGain.details')}
            </Typography>
            <div>
                <div className="milking-table-container">
                    <div className="milking-table">
                        <TableContainer className="milking-table-body-container">
                            <Table stickyHeader={true}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="m-th">{t('weightGain.date')}</TableCell>
                                        <TableCell className="m-th">{t('weightGain.weight')}</TableCell>
                                        <TableCell className="m-th">{t('weightGain.editing')}</TableCell>
                                        <TableCell className="m-th">{t('weightGain.deleting')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {weightGainList.length > 0 ? (
                                            weightGainList.map(weightGain => (
                                                <WeightGainCard
                                                    key={weightGain.weightGainId}
                                                    weightGain={weightGain}
                                                    onWeightGainDeleted={handleWeightGainDeleted}
                                                    onWeightGainUpdated={handleWeightGainUpdated}
                                                    locale={locale}
                                                    cow={cow}
                                                />
                                            )))
                                        : (
                                            <TableRow>
                                                <TableCell colSpan={4}>
                                                    <Typography className="milking-no-results">
                                                        {t('weightGain.noResults')}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="milking-table-button-container">
                        <Button
                            className="add-milking-button"
                            variant="contained"
                            color="primary"
                            onClick={handleOpenAddWeightGainModal}
                        >
                            <GiInjustice className="add-milking-icon"/>
                            {t('weightGain.weightGainButton')}
                        </Button>
                    </div>
                </div>
            </div>
            <AddWeightGainModal
                open={openAddWeightGainModal}
                onClose={handleCloseAddWeightGainModal}
                cow={cow}
                onWeightGainAdded={onWeightGainAdded}
            />
        </div>
    )
}

export default WeightGainTable;