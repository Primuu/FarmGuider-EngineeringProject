import {Bar, BarChart, Brush, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import '@/pages/FieldPage/chart.css';
import {useTranslation} from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "@/styles/theme.ts";
import React from "react";
import {Typography} from "@mui/material";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent.tsx";
import CropResponseDTO from "@/entities/CropResponseDTO.ts";
import {formatYear} from "@/utils/dateUtils.ts";
import CustomTooltip from "@/pages/FieldPage/CustomTooltip.tsx";

type CropChartProps = {
    cropList: CropResponseDTO[];
    loading: boolean;
}

const CropChart: React.FC<CropChartProps> = ({cropList, loading}) => {
    const {t} = useTranslation('fieldPage');
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const responsiveMinTickGap: number = isDesktop ? 40 : 20;

    const processedCropList = cropList.map(crop => ({
        ...crop,
        displayHarvestDate: crop.harvestDate ? crop.harvestDate : crop.expectedHarvestEndDate
    })).sort((a, b) => {
        const dateA = new Date(a.displayHarvestDate).getTime();
        const dateB = new Date(b.displayHarvestDate).getTime();

        return dateA - dateB;
    });

    const isEveryYieldNull = (cropList: CropResponseDTO[]) => {
        if (cropList.length === 0) return true;
        return cropList.every(crop => crop.yield === null);
    };

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const renderColorfulLegendText = (value: string, entry: any) => {
        const translatedValue = t(`cropChart.legend.${value}`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        return <span style={{color: entry.color}}>{translatedValue}</span>;
    };

    return (
        <div className="crop-chart-main-container">
            <Typography className="crop-chart-details">
                {t('cropChart.details')}
            </Typography>
            <div className="crop-chart-container">
                {loading ? (
                    <LoadingComponent/>
                ) : (isEveryYieldNull(cropList) ? (
                        <div className="crop-no-results-container">
                            <Typography className="crop-chart-no-results">
                                {t('cropChart.noChartValues')}
                            </Typography>
                        </div>
                    ) : (
                        <ResponsiveContainer
                            width="100%"
                            height={345}
                            className="crop-chart-responsive-container"
                        >
                            <BarChart
                                data={processedCropList}
                                margin={{top: 20, right: 40, left: 20, bottom: 0}}
                            >
                                <CartesianGrid strokeDasharray="3 3" className="chartGrid"/>
                                <XAxis
                                    dataKey="displayHarvestDate"
                                    tickFormatter={formatYear}
                                    stroke="#406064"
                                    fontSize="14"
                                    interval="preserveStartEnd"
                                    tickMargin={5}
                                    minTickGap={responsiveMinTickGap}
                                />
                                <YAxis
                                    label={{
                                        value: t('cropChart.axisY'),
                                        angle: -90,
                                        position: 'insideLeft',
                                        fontSize: 14,
                                        dx: -10
                                    }}
                                    unit={" t"}
                                    fontSize="14"
                                />
                                <Tooltip content={<CustomTooltip/>}/>
                                <Legend
                                    formatter={renderColorfulLegendText}
                                    verticalAlign="top"
                                    iconSize={18}
                                    iconType="rect"
                                    align="right"
                                />
                                <Brush
                                    dataKey="displayHarvestDate"
                                    tickFormatter={formatYear}
                                    height={15}
                                    stroke="#2CB178"
                                />
                                <Bar dataKey="expectedYield" fill="#61828A"/>
                                <Bar dataKey="yield" fill="#2CB178"/>
                            </BarChart>
                        </ResponsiveContainer>
                    )
                )}
            </div>
        </div>
    );
}

export default CropChart;