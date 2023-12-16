import React, {useState} from "react";
import {Button, FormControl, InputLabel, Select, SelectChangeEvent} from "@mui/material";
import {useTranslation} from "react-i18next";
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddLactationPeriodModal from "@/pages/CowPage/modals/AddLactationPeriodModal.tsx";
import LactationPeriodResponseDTO from "@/entities/LactationPeriodResponseDTO.ts";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import MenuItem from "@mui/material/MenuItem";
import {formatDate} from "@/utils/dateUtils.ts";

type MilkingYieldToolsProps = {
    cow: CowResponseDTO;
    locale: Locale;
    onLactationPeriodAdded: () => void;
    lactationPeriodList: LactationPeriodResponseDTO[];
    selectedLactationPeriod: LactationPeriodResponseDTO | null;
    handleChangeLactationPeriod: (lactationPeriodId: number) => void;
}

const MilkingYieldTools: React.FC<MilkingYieldToolsProps> = (
    {cow, locale, onLactationPeriodAdded, lactationPeriodList,
        selectedLactationPeriod, handleChangeLactationPeriod}
) => {
    const {t} = useTranslation('cowPage');
    const [openAddLactationPeriodModal, setOpenAddLactationPeriodModal] = useState(false);

    const handleOpenAddLactationPeriodModal = () => setOpenAddLactationPeriodModal(true);
    const handleCloseAddLactationPeriodModal = () => setOpenAddLactationPeriodModal(false);

    const handleSelectLactationPeriod = (event: SelectChangeEvent) => {
        const lactationPeriodIdNum = Number(event.target.value);
        handleChangeLactationPeriod(lactationPeriodIdNum);
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