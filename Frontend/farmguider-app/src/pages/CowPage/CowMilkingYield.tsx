import LactationPeriodResponseDTO from "@/entities/LactationPeriodResponseDTO.ts";
import React from "react";
import MilkingYieldTools from "@/pages/CowPage/MilkingYieldTools.tsx";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import '@/pages/CowPage/charts.css';
import {Typography} from "@mui/material";
import MilkingChart from "@/pages/CowPage/MilkingChart.tsx";
import {useTranslation} from "react-i18next";
import {ChartValueDTO} from "@/entities/ChartValueDTO.ts";

type CowMilkingYieldProps = {
    lactationPeriodList: LactationPeriodResponseDTO[];
    cow: CowResponseDTO;
    locale: Locale;
    onLactationPeriodChanged: () => void;
    selectedLactationPeriod: LactationPeriodResponseDTO | null;
    handleChangeLactationPeriod: (lactationPeriodId: number) => void;
    milkingChartValues: ChartValueDTO[];
    milkingChartLoading: boolean;
}
const CowMilkingYield: React.FC<CowMilkingYieldProps> = (
    {lactationPeriodList, cow, locale, onLactationPeriodChanged,
        selectedLactationPeriod, handleChangeLactationPeriod, milkingChartValues, milkingChartLoading}
) => {
    const {t} = useTranslation('cowPage');

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
                        <MilkingChart
                            milkingChartValues={milkingChartValues}
                            milkingChartLoading={milkingChartLoading}
                        />
                    )
                )}
            </div>
            {cow.gender === 'FEMALE' &&
                <MilkingYieldTools
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