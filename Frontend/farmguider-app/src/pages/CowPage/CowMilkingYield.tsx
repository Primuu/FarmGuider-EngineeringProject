import LactationPeriodResponseDTO from "@/entities/LactationPeriodResponseDTO.ts";
import React, {useEffect, useState} from "react";
import MilkingYieldTools from "@/pages/CowPage/MilkingYieldTools.tsx";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import '@/pages/CowPage/charts.css';
import {Typography} from "@mui/material";
import MilkingChart from "@/pages/CowPage/MilkingChart.tsx";
import {useTranslation} from "react-i18next";

type CowMilkingYieldProps = {
    lactationPeriodList: LactationPeriodResponseDTO[];
    cow: CowResponseDTO;
    locale: Locale;
    onLactationPeriodChanged: () => void;
}
const CowMilkingYield: React.FC<CowMilkingYieldProps> = ({lactationPeriodList, cow, locale, onLactationPeriodChanged}) => {
    const {t} = useTranslation('cowPage');
    const [selectedLactationPeriod, setSelectedLactationPeriod] = useState<LactationPeriodResponseDTO | null>(null);

    useEffect(() => {
        if (lactationPeriodList.length > 0) {
            setSelectedLactationPeriod(lactationPeriodList[0]);
        } else {
            setSelectedLactationPeriod(null);
        }
    }, [lactationPeriodList]);

    const handleChangeLactationPeriod = (newLactationPeriodId: number) => {
        const selectedLactationPeriod = lactationPeriodList.find(
            lp => lp.lactationPeriodId === newLactationPeriodId);
        if (selectedLactationPeriod) {
            setSelectedLactationPeriod(selectedLactationPeriod);
        }
    }

    return (
        <div>
            <Typography className="chart-details">
                {t('milkingChart.details')}
            </Typography>
            <div className="chart-container">
                {cow.gender === 'MALE' ? (
                    <div className="no-results-container">
                        <Typography className="chart-no-results">
                            {t('milkingChart.noResultsForGender')}
                        </Typography>
                    </div>
                ) : (
                    lactationPeriodList.length == 0 ? (
                        <div className="no-results-container">
                            <Typography className="chart-no-results">
                                {t('milkingChart.noResults')}
                            </Typography>
                        </div>
                    ) : (
                        <MilkingChart/>
                    )
                )}
            </div>
            {cow.gender === 'FEMALE'
                && <MilkingYieldTools
                    cow={cow}
                    locale={locale}
                    onLactationPeriodChanged={onLactationPeriodChanged}
                    lactationPeriodList={lactationPeriodList}
                    selectedLactationPeriod={selectedLactationPeriod}
                    handleChangeLactationPeriod={handleChangeLactationPeriod}
                />}
        </div>
    )
}

export default CowMilkingYield;