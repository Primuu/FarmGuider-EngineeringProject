import MilkingResponseDTO from "@/entities/MilkingResponseDTO.ts";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import MilkingCard from "@/pages/CowPage/MilkingCard.tsx";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import AddMilkingModal from "@/components/sharedModals/AddMilkingModal.tsx";
import {LuMilk} from "react-icons/lu";
import '@/pages/CowPage/milkingTable.css';

type MilkingTableProps = {
    cow: CowResponseDTO;
    milkingList: MilkingResponseDTO[]
    setMilkingList: (milkingList: MilkingResponseDTO[]) => void;
    locale: Locale;
    onMilkingAdded: () => void;
    onMilkingChanged: () => void;
}

const MilkingTable: React.FC<MilkingTableProps> = (
    {cow, milkingList, setMilkingList, locale,
        onMilkingAdded, onMilkingChanged}
) => {
    const {t} = useTranslation('cowPage');
    const [openAddMilkingModal, setOpenAddMilkingModal] = useState(false);

    const handleOpenAddMilkingModal = () => setOpenAddMilkingModal(true);
    const handleCloseAddMilkingModal = () => setOpenAddMilkingModal(false);

    const handleMilkingDeleted = (deletedMilkingId: number) => {
        setMilkingList(milkingList.filter(milking => milking.milkingId !== deletedMilkingId));
        onMilkingChanged();
    };

    const onMilkingAddedExtended = () => {
        onMilkingAdded();
        onMilkingChanged();
    }

    const handleMilkingUpdated = (updatedMilking: MilkingResponseDTO) => {
        setMilkingList(milkingList.map(milking =>
            milking.milkingId === updatedMilking.milkingId ? updatedMilking : milking
        ));
        onMilkingChanged();
    };

    return (
        <div>
            <Typography className="milking-details">
                {t('milking.details')}
            </Typography>
            <div>
                <div className="milking-table-container">
                    <div className="milking-table">
                        <TableContainer className="milking-table-body-container">
                            <Table stickyHeader={true}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="m-th">{t('milking.date')}</TableCell>
                                        <TableCell className="m-th">{t('milking.quantity')}</TableCell>
                                        <TableCell className="m-th">{t('milking.duration')}</TableCell>
                                        <TableCell className="m-th">{t('milking.editing')}</TableCell>
                                        <TableCell className="m-th">{t('milking.deleting')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {milkingList.length > 0 ? (
                                            milkingList.map(milking => (
                                                <MilkingCard
                                                    key={milking.milkingId}
                                                    milking={milking}
                                                    onMilkingDeleted={handleMilkingDeleted}
                                                    onMilkingUpdated={handleMilkingUpdated}
                                                    locale={locale}
                                                    cow={cow}
                                                />
                                            )))
                                        : (
                                            <TableRow>
                                                <TableCell colSpan={5}>
                                                    <Typography className="milking-no-results">
                                                        {cow.gender === 'FEMALE' ? t('milking.noResults') : t('milking.noResultsForGender')}
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
                            disabled={cow.gender !== "FEMALE"}
                            onClick={handleOpenAddMilkingModal}
                        >
                            <LuMilk className="add-milking-icon"/>
                            {t('milking.milkingButton')}
                        </Button>
                    </div>
                </div>
            </div>
            <AddMilkingModal
                open={openAddMilkingModal}
                onClose={handleCloseAddMilkingModal}
                cow={cow}
                onMilkingAdded={onMilkingAddedExtended}
            />
        </div>
    )
}

export default MilkingTable;