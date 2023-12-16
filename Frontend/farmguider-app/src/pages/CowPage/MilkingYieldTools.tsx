import React, {useState} from "react";
import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddLactationPeriodModal from "@/pages/CowPage/modals/AddLactationPeriodModal.tsx";
import LactationPeriodResponseDTO from "@/entities/LactationPeriodResponseDTO.ts";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";

type MilkingYieldToolsProps = {
    cow: CowResponseDTO;
    locale: Locale;
    onLactationPeriodAdded: () => void;
    lactationPeriodList: LactationPeriodResponseDTO[];
}

const MilkingYieldTools: React.FC<MilkingYieldToolsProps> = ({cow, locale, onLactationPeriodAdded, lactationPeriodList}) => {
    const {t} = useTranslation('cowPage');
    const [openAddLactationPeriodModal, setOpenAddLactationPeriodModal] = useState(false);

    const handleOpenAddLactationPeriodModal = () => setOpenAddLactationPeriodModal(true);
    const handleCloseAddLactationPeriodModal = () => setOpenAddLactationPeriodModal(false);

    return (
        <div>
            <div className="milking-chart-buttons">
                <Button
                    className="add-lactation-button"
                    variant="contained"
                    color="primary"
                    onClick={handleOpenAddLactationPeriodModal}
                >
                    <EventNoteIcon className="add-lactation-icon"/>
                    {t('milkingChart.addLactationButton')}
                </Button>
            </div>
            <AddLactationPeriodModal
                open={openAddLactationPeriodModal}
                onClose={handleCloseAddLactationPeriodModal}
                cow={cow}
                onLactationPeriodAdded={onLactationPeriodAdded}
                locale={locale}
                lactationPeriodList={lactationPeriodList}
            />
        </div>
    )
}

export default MilkingYieldTools;