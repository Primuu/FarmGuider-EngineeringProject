import React from 'react';
import {useTranslation} from "react-i18next";
import {crops} from "@/utils/cropUtils.ts";

interface TooltipPayload {
    cropType: string;
    expectedYield: number;
    yield?: number;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: { payload: TooltipPayload; }[];
    label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({active, payload}) => {
    const {t} = useTranslation('fieldPage');

    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const cropData = crops.find(crop => crop.value === data.cropType);

        return (
            <div className="custom-tooltip">
                <p className="label">{t(cropData!.labelKey)}</p>
                <p className="data">{t('cropChart.expectedYield') + `: ${data.expectedYield} t`}</p>
                <p className="data">{t('cropChart.yield') + `: ${data.yield ? data.yield + " t" : (t('cropChart.yieldNotHarvested'))}`}</p>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
