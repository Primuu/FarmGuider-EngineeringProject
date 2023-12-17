import {Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import '@/pages/CowPage/charts.css';
import {useTranslation} from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "@/styles/theme.ts";
import React from "react";
import {ChartValueDTO} from "@/entities/ChartValueDTO.ts";
import {Typography} from "@mui/material";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent.tsx";

type WeightGainChartProps = {
    weightGainChartValues: ChartValueDTO[];
    weightGainChartLoading: boolean;
}

const WeightGainChart: React.FC<WeightGainChartProps> = ({weightGainChartValues, weightGainChartLoading}) => {
    const {t} = useTranslation('cowPage');
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const valueName = t('weightGainChart.valueName');
    const NULL_VALUE_MARKER: string = "X";
    const responsiveMinTickGap: number = isDesktop ? 40 : 20;

    const processedData = weightGainChartValues.map(item => ({
        ...item,
        value: item.value === null ? NULL_VALUE_MARKER : item.value
    }));

    const tooltipFormatter = (value: number | string, name: string) => {
        const displayValue = value === NULL_VALUE_MARKER
            ? t('weightGainChart.tooltipNullValue')
            : `${value} kg`;

        const displayName = value === NULL_VALUE_MARKER ? '' : name;

        return [displayValue, displayName];
    };

    const isEveryValueNull = (chartValues: ChartValueDTO[]) => {
        return chartValues.every(chartValue => chartValue.value === null);
    };

    if (weightGainChartLoading) return <LoadingComponent/>;

    return (
        <div>
            <Typography className="chart-details">
                {t('weightGainChart.details')}
            </Typography>
            <div className="chart-container">
                {isEveryValueNull(weightGainChartValues) ? (
                    <div className="no-results-container">
                        <Typography className="chart-no-results">
                            {t('weightGainChart.noChartValues')}
                        </Typography>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart
                            data={processedData}
                            margin={{top: 0, right: 20, left: 20, bottom: 0}}
                        >
                            <defs>
                                <linearGradient id="value" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2CB178" stopOpacity={0.9}/>
                                    <stop offset="95%" stopColor="#2CB178" stopOpacity={0.1}/>
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="date"
                                stroke="#406064"
                                fontSize="12"
                                interval="preserveStartEnd"
                                tickMargin={10}
                                minTickGap={responsiveMinTickGap}
                            />
                            <YAxis
                                label={{
                                    value: t('weightGainChart.axisY'),
                                    angle: -90,
                                    position: 'insideLeft',
                                    fontSize: 14,
                                    dx: -16
                                }}
                                unit={" kg"}
                                fontSize="14"
                            />
                            <CartesianGrid strokeDasharray="3 3" className="chartGrid"/>
                            <Tooltip
                                filterNull={false}
                                formatter={tooltipFormatter}
                                separator=" "
                            />
                            <Legend
                                verticalAlign="top"
                                iconSize={16}
                                iconType="plainline"
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                activeDot={{stroke: '#406064', strokeWidth: 2, r: 4}}
                                name={valueName}
                                stroke="#2CB178"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#value)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}

export default WeightGainChart;