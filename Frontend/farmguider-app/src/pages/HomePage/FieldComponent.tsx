import React from "react";
import {useTranslation} from "react-i18next";
import {Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent.tsx";
import {FieldSummaryDTO} from "@/entities/FieldSummaryDTO.ts";
import {crops} from "@/utils/cropUtils";
import {Button} from "@mui/material";
import {GiHighGrass} from "react-icons/gi";
import {FIELD_BROWSER_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import {useNavigate} from "react-router-dom";

type FieldComponentProps = {
    loading: boolean;
    fieldSummaryList: FieldSummaryDTO[];
}

interface ChartData {
    name: string;
    value: number;
    fill: string;
}

const FieldComponent: React.FC<FieldComponentProps> = ({loading, fieldSummaryList}) => {
    const {t} = useTranslation('homePage');
    const navigate = useNavigate();

    const mapFieldDataToChartData = (data: FieldSummaryDTO[]): ChartData[] => {
        return data.map(item => {
            const crop = crops.find(crop => crop.value === item.cropType);

            const fill = crop?.fill || '#FFFFFF';
            const name = crop ? t(crop.labelKey) : item.cropType;

            return {name: name, value: item.area, fill: fill};
        });
    };

    const chartData: ChartData[] = mapFieldDataToChartData(fieldSummaryList);

    const handleClick = () => {
        navigate(FIELD_BROWSER_PAGE_URL);
    };

    return (
        <div className="row-component">
            <div className="row-component-header">
                {t('field.header')}
            </div>
            {loading ? (
                <LoadingComponent/>
            ) : (
                fieldSummaryList.length == 0 ? (
                    <div className="no-cows-container">
                        <div className="no-cows">
                            {t('field.noFields')}
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                        >
                            <GiHighGrass className="cow-icon"/>
                            {t('field.fieldButton')}
                        </Button>
                    </div>
                ) : (
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

export default FieldComponent;