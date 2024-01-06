import React from "react";
import {useTranslation} from "react-i18next";
import {Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import {MilkingSummaryDTO} from "@/entities/MilkingSummaryDTO.ts";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent.tsx";

type MilkingComponentProps = {
    loading: boolean;
    milkingSummaryDTO: MilkingSummaryDTO | null;
}

interface ChartData {
    name: string;
    value: number;
    fill: string;
}

const MilkingComponent: React.FC<MilkingComponentProps> = ({loading, milkingSummaryDTO}) => {
    const {t} = useTranslation('homePage');

    let chartData: ChartData[] = [];
    if (milkingSummaryDTO) {
        chartData = [
            {
                name: t('milking.cowsMilked'),
                value: milkingSummaryDTO.cowsMilkedNumber,
                fill: '#2CB178'
            },
            {
                name: t('milking.cowsNotMilked'),
                value: milkingSummaryDTO.currentlyMilkingCowsNumber - milkingSummaryDTO.cowsMilkedNumber,
                fill: '#406064'
            }
        ];
    }

    return (
        <div className="row-component">
            <div className="row-component-header">
                {milkingSummaryDTO && milkingSummaryDTO.isMorning ? t('milking.headerMorning') : t('milking.headerEvening')}
            </div>
            {loading ? (
                <LoadingComponent/>
            ) : (
                milkingSummaryDTO && milkingSummaryDTO.currentlyMilkingCowsNumber == 0 ? (
                    <div className="no-cows">
                        {t('milking.noCows')}
                    </div>
                ) : (milkingSummaryDTO &&
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={true}
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                                labelLine={false}
                            />
                            <Tooltip/>
                            <Legend
                                verticalAlign="bottom"
                                iconSize={18}
                                iconType="rect"
                                align="center"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )
            )}
        </div>
    )
}

export default MilkingComponent;