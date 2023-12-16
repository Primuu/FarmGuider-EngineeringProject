import {Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import '@/pages/CowPage/charts.css';
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "@/styles/theme.ts";

const MilkingChart = () => {
    const {t} = useTranslation('cowPage');
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const valueName = t('milkingChart.valueName');
    const NULL_VALUE_MARKER: string = "X";
    const responsiveHeight: number = isDesktop ? 300 : 200;
    const responsiveMinTickGap: number = isDesktop ? 40 : 20;

    const processedData = fakeData.map(item => ({
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

    return (
        <div>
            <Typography className="chart-details">
                {t('milkingChart.details')}
            </Typography>
            <div className="chart-container">
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
                            activeDot={{ stroke: '#406064', strokeWidth: 2, r: 4 }}
                            name={valueName}
                            stroke="#2CB178"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#value)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default MilkingChart;

const fakeData = [{'date': '2023-01-01', 'value': 15.0}, {'date': '2023-01-02', 'value': 15.1}, {'date': '2023-01-03', 'value': 15.1}, {'date': '2023-01-04', 'value': null}, {'date': '2023-01-05', 'value': null}, {'date': '2023-01-06', 'value': null}, {'date': '2023-01-07', 'value': 15.2}, {'date': '2023-01-08', 'value': 15.2}, {'date': '2023-01-09', 'value': 15.3}, {'date': '2023-01-10', 'value': 15.3}, {'date': '2023-01-11', 'value': 15.3}, {'date': '2023-01-12', 'value': 15.4}, {'date': '2023-01-13', 'value': 15.4}, {'date': '2023-01-14', 'value': 15.4}, {'date': '2023-01-15', 'value': 15.5}, {'date': '2023-01-16', 'value': 15.5}, {'date': '2023-01-17', 'value': 15.5}, {'date': '2023-01-18', 'value': 15.6}, {'date': '2023-01-19', 'value': 15.6}, {'date': '2023-01-20', 'value': 15.6}, {'date': '2023-01-21', 'value': 15.7}, {'date': '2023-01-22', 'value': 15.7}, {'date': '2023-01-23', 'value': 15.7}, {'date': '2023-01-24', 'value': 15.8}, {'date': '2023-01-25', 'value': 15.8}, {'date': '2023-01-26', 'value': 15.8}, {'date': '2023-01-27', 'value': 15.8}, {'date': '2023-01-28', 'value': 15.9}, {'date': '2023-01-29', 'value': 15.9}, {'date': '2023-01-30', 'value': 15.9}, {'date': '2023-01-31', 'value': 16.0}, {'date': '2023-02-01', 'value': 16.0}, {'date': '2023-02-02', 'value': 16.0}, {'date': '2023-02-03', 'value': 16.1}, {'date': '2023-02-04', 'value': 16.1}, {'date': '2023-02-05', 'value': 16.1}, {'date': '2023-02-06', 'value': 16.2}, {'date': '2023-02-07', 'value': 16.2}, {'date': '2023-02-08', 'value': 16.2}, {'date': '2023-02-09', 'value': 16.2}, {'date': '2023-02-10', 'value': 16.3}, {'date': '2023-02-11', 'value': 16.3}, {'date': '2023-02-12', 'value': 16.3}, {'date': '2023-02-13', 'value': 16.4}, {'date': '2023-02-14', 'value': 16.4}, {'date': '2023-02-15', 'value': 16.4}, {'date': '2023-02-16', 'value': 16.5}, {'date': '2023-02-17', 'value': 16.5}, {'date': '2023-02-18', 'value': 16.5}, {'date': '2023-02-19', 'value': 16.6}, {'date': '2023-02-20', 'value': 16.6}, {'date': '2023-02-21', 'value': 16.6}, {'date': '2023-02-22', 'value': 16.7}, {'date': '2023-02-23', 'value': 16.7}, {'date': '2023-02-24', 'value': 16.7}, {'date': '2023-02-25', 'value': 16.8}, {'date': '2023-02-26', 'value': 16.8}, {'date': '2023-02-27', 'value': 16.8}, {'date': '2023-02-28', 'value': 16.8}, {'date': '2023-03-01', 'value': 16.9}, {'date': '2023-03-02', 'value': 16.9}, {'date': '2023-03-03', 'value': 16.9}, {'date': '2023-03-04', 'value': 17.0}, {'date': '2023-03-05', 'value': 17.0}, {'date': '2023-03-06', 'value': 17.0}, {'date': '2023-03-07', 'value': 17.1}, {'date': '2023-03-08', 'value': 17.1}, {'date': '2023-03-09', 'value': 17.1}, {'date': '2023-03-10', 'value': 17.2}, {'date': '2023-03-11', 'value': 17.2}, {'date': '2023-03-12', 'value': 17.2}, {'date': '2023-03-13', 'value': 17.2}, {'date': '2023-03-14', 'value': 17.3}, {'date': '2023-03-15', 'value': 17.3}, {'date': '2023-03-16', 'value': 17.3}, {'date': '2023-03-17', 'value': 17.4}, {'date': '2023-03-18', 'value': 17.4}, {'date': '2023-03-19', 'value': 17.4}, {'date': '2023-03-20', 'value': 17.5}, {'date': '2023-03-21', 'value': 17.5}, {'date': '2023-03-22', 'value': 17.5}, {'date': '2023-03-23', 'value': 17.6}, {'date': '2023-03-24', 'value': 17.6}, {'date': '2023-03-25', 'value': 17.6}, {'date': '2023-03-26', 'value': 17.7}, {'date': '2023-03-27', 'value': 17.7}, {'date': '2023-03-28', 'value': 17.7}, {'date': '2023-03-29', 'value': 17.8}, {'date': '2023-03-30', 'value': 17.8}, {'date': '2023-03-31', 'value': 17.8}, {'date': '2023-04-01', 'value': 17.8}, {'date': '2023-04-02', 'value': 17.9}, {'date': '2023-04-03', 'value': 17.9}, {'date': '2023-04-04', 'value': 17.9}, {'date': '2023-04-05', 'value': 18.0}, {'date': '2023-04-06', 'value': 18.0}, {'date': '2023-04-07', 'value': 18.0}, {'date': '2023-04-08', 'value': 18.1}, {'date': '2023-04-09', 'value': 18.1}, {'date': '2023-04-10', 'value': 18.1}, {'date': '2023-04-11', 'value': 18.2}, {'date': '2023-04-12', 'value': 18.2}, {'date': '2023-04-13', 'value': 18.2}, {'date': '2023-04-14', 'value': 18.2}, {'date': '2023-04-15', 'value': 18.3},{'date': '2023-04-16', 'value': 18.3}, {'date': '2023-04-17', 'value': 18.3}, {'date': '2023-04-18', 'value': 18.4}, {'date': '2023-04-19', 'value': 18.4}, {'date': '2023-04-20', 'value': 18.4}, {'date': '2023-04-21', 'value': 18.5}, {'date': '2023-04-22', 'value': 18.5}, {'date': '2023-04-23', 'value': 18.5}, {'date': '2023-04-24', 'value': 18.6}, {'date': '2023-04-25', 'value': 18.6}, {'date': '2023-04-26', 'value': 18.6}, {'date': '2023-04-27', 'value': 18.7}, {'date': '2023-04-28', 'value': 18.7}, {'date': '2023-04-29', 'value': 18.7}, {'date': '2023-04-30', 'value': 18.8}, {'date': '2023-05-01', 'value': 18.8}, {'date': '2023-05-02', 'value': 18.8}, {'date': '2023-05-03', 'value': 18.8}, {'date': '2023-05-04', 'value': 18.9}, {'date': '2023-05-05', 'value': 18.9}, {'date': '2023-05-06', 'value': 18.9}, {'date': '2023-05-07', 'value': 19.0}, {'date': '2023-05-08', 'value': 19.0}, {'date': '2023-05-09', 'value': 19.0}, {'date': '2023-05-10', 'value': 19.1}, {'date': '2023-05-11', 'value': 19.1}, {'date': '2023-05-12', 'value': 19.1}, {'date': '2023-05-13', 'value': 19.2}, {'date': '2023-05-14', 'value': 19.2}, {'date': '2023-05-15', 'value': 19.2}, {'date': '2023-05-16', 'value': 19.2}, {'date': '2023-05-17', 'value': 19.3}, {'date': '2023-05-18', 'value': 19.3}, {'date': '2023-05-19', 'value': 19.3}, {'date': '2023-05-20', 'value': 19.4}, {'date': '2023-05-21', 'value': 19.4}, {'date': '2023-05-22', 'value': 19.4}, {'date': '2023-05-23', 'value': 19.5}, {'date': '2023-05-24', 'value': 19.5}, {'date': '2023-05-25', 'value': 19.5}, {'date': '2023-05-26', 'value': 19.6}, {'date': '2023-05-27', 'value': 19.6}, {'date': '2023-05-28', 'value': 19.6}, {'date': '2023-05-29', 'value': 19.7}, {'date': '2023-05-30', 'value': 19.7}, {'date': '2023-05-31', 'value': 19.7}, {'date': '2023-06-01', 'value': 19.8}, {'date': '2023-06-02', 'value': 19.8}, {'date': '2023-06-03', 'value': 19.8}, {'date': '2023-06-04', 'value': 19.8}, {'date': '2023-06-05', 'value': 19.9}, {'date': '2023-06-06', 'value': 19.9}, {'date': '2023-06-07', 'value': 19.9}, {'date': '2023-06-08', 'value': 20.0}, {'date': '2023-06-09', 'value': 20.0}, {'date': '2023-06-10', 'value': 20.0}, {'date': '2023-06-11', 'value': 19.9}, {'date': '2023-06-12', 'value': 19.8}, {'date': '2023-06-13', 'value': 19.7}, {'date': '2023-06-14', 'value': 19.5}, {'date': '2023-06-15', 'value': 19.4}, {'date': '2023-06-16', 'value': 19.3}, {'date': '2023-06-17', 'value': 19.2}, {'date': '2023-06-18', 'value': 19.0}, {'date': '2023-06-19', 'value': 18.9}, {'date': '2023-06-20', 'value': 18.8}, {'date': '2023-06-21', 'value': 18.7}, {'date': '2023-06-22', 'value': 18.5}, {'date': '2023-06-23', 'value': 18.4}, {'date': '2023-06-24', 'value': 18.3}, {'date': '2023-06-25', 'value': 18.2}, {'date': '2023-06-26', 'value': 18.0}, {'date': '2023-06-27', 'value': 17.9}, {'date': '2023-06-28', 'value': 17.8}, {'date': '2023-06-29', 'value': 17.7}, {'date': '2023-06-30', 'value': 17.5}, {'date': '2023-07-01', 'value': 17.4}, {'date': '2023-07-02', 'value': 17.3}, {'date': '2023-07-03', 'value': 17.2}, {'date': '2023-07-04', 'value': 17.0}, {'date': '2023-07-05', 'value': 16.9}, {'date': '2023-07-06', 'value': 16.8}, {'date': '2023-07-07', 'value': 16.7}, {'date': '2023-07-08', 'value': 16.5}, {'date': '2023-07-09', 'value': 16.4}, {'date': '2023-07-10', 'value': 16.3}, {'date': '2023-07-11', 'value': 16.2}, {'date': '2023-07-12', 'value': 16.0}, {'date': '2023-07-13', 'value': 15.9}, {'date': '2023-07-14', 'value': 15.8}, {'date': '2023-07-15', 'value': 15.7}, {'date': '2023-07-16', 'value': 15.5}, {'date': '2023-07-17', 'value': 15.4}, {'date': '2023-07-18', 'value': 15.3}, {'date': '2023-07-19', 'value': 15.2}]