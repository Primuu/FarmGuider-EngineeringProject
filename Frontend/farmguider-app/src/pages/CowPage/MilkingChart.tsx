import {Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import '@/pages/CowPage/charts.css';
import {useTranslation} from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "@/styles/theme.ts";
import {NOT_FOUND_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import React, {useEffect, useState} from "react";
import {getMilkingChart} from "@/services/milkingService.ts";
import {ChartValueDTO} from "@/entities/ChartValueDTO.ts";
import {useNavigate} from "react-router-dom";
import {Typography} from "@mui/material";
import LactationPeriodResponseDTO from "@/entities/LactationPeriodResponseDTO.ts";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent.tsx";

type MilkingChartProps = {
    lactationPeriod: LactationPeriodResponseDTO | null;
}

const MilkingChart: React.FC<MilkingChartProps> = ({lactationPeriod}) => {
    const {t} = useTranslation('cowPage');
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const [milkingChartValues, setMilkingChartValues] = useState<ChartValueDTO[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAndSetMilkingChart()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lactationPeriod]);

    const valueName = t('milkingChart.valueName');
    const NULL_VALUE_MARKER: string = "X";
    const responsiveHeight: number = isDesktop ? 300 : 200;
    const responsiveMinTickGap: number = isDesktop ? 40 : 20;

    const fetchAndSetMilkingChart = () => {
        if (lactationPeriod && lactationPeriod.lactationPeriodId) {
            getMilkingChart(lactationPeriod.lactationPeriodId)
                .then(data => {
                    setLoading(false);
                    setMilkingChartValues(data);
                })
                .catch(() => {
                    setLoading(false);
                    navigate(NOT_FOUND_PAGE_URL, {replace: true});
                })
        }
    }

    const processedData = milkingChartValues.map(item => ({
        ...item,
        value: item.value === null ? NULL_VALUE_MARKER : item.value
    }));

    const tooltipFormatter = (value: number | string, name: string) => {
        const displayValue = value === NULL_VALUE_MARKER
            ? t('milkingChart.tooltipNullValue')
            : `${value} l`;

        const displayName = value === NULL_VALUE_MARKER ? '' : name;

        return [displayValue, displayName];
    };

    const isEveryValueNull = (chartValues: ChartValueDTO[]) => {
        if (chartValues.length === 0) return true;
        return chartValues.every(chartValue => chartValue.value === null);
    };

    if (loading) return <LoadingComponent/>;

    return (
        <div>
            {isEveryValueNull(milkingChartValues) ? (
                <div className="no-results-container">
                    <Typography className="chart-no-results">
                        {t('milkingChart.noChartValues')}
                    </Typography>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={responsiveHeight}>
                    <AreaChart
                        data={processedData}
                        margin={{top: 0, right: 20, left: 0, bottom: 0}}
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
                                value: t('milkingChart.axisY'),
                                angle: -90,
                                position: 'insideLeft',
                                fontSize: 14
                            }}
                            unit={" l"}
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

                        <text
                            x='80%'
                            y='15%'
                            style={{ fontSize: 14, fill: '#406064' }}
                        >
                            {t('milkingChart.numberOfDays')}{milkingChartValues.length}
                        </text>
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default MilkingChart;