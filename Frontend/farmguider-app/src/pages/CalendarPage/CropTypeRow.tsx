import {CropTypeResponseDTO} from "@/entities/CropTypeResponseDTO.ts";
import React from "react";
import {crops} from "@/utils/cropUtils.ts";
import {useTranslation} from "react-i18next";
import MonthComponent from "@/pages/CalendarPage/MonthComponent.tsx";

type CropRowProps = {
    cropType: CropTypeResponseDTO;
    isEven: boolean;
}

type DateObject = {
    day: number;
    month: number;
};

const CropTypeRow: React.FC<CropRowProps> = ({cropType, isEven}) => {
    const {t} = useTranslation('calendarPage');

    const rowClassName = `crop-row ${isEven ? "even-row" : "odd-row"}`;
    const cropData = crops.find(crop => crop.value === cropType.cropType);
    const monthOrder = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];

    const parseDate = (dateStr: string) => {
        const [month, day] = dateStr.split('-').map(Number);
        return {day, month};
    };

    const plantingStart = parseDate(cropType.optimalPlantingStartDate);
    const plantingEnd = parseDate(cropType.optimalPlantingEndDate);
    const harvestStart = parseDate(cropType.optimalHarvestStartDate);
    const harvestEnd = parseDate(cropType.optimalHarvestEndDate);

    const getMonthBoundaries = (month: number, startData: DateObject, endData: DateObject) => {
        const start = startData.month === month ? startData.day : null;
        const end = endData.month === month ? endData.day : null;
        return {start, end};
    };

    const monthComponents = (isPlanting: boolean) => {
        return monthOrder.map((month) => {
            const {
                start: plantingStartBoundary,
                end: plantingEndBoundary
            } = getMonthBoundaries(month, plantingStart, plantingEnd);

            const {
                start: harvestStartBoundary,
                end: harvestEndBoundary
            } = getMonthBoundaries(month, harvestStart, harvestEnd);

            return (
                <MonthComponent
                    key={month}
                    start={isPlanting ? plantingStartBoundary : harvestStartBoundary}
                    end={isPlanting ? plantingEndBoundary : harvestEndBoundary}
                    isPlanting={isPlanting}
                />
            );
        });
    };

    return (
        <div className={rowClassName}>
            {cropData && (
                <div className="crop-data-container">
                    <div className="crop-icon">
                        <cropData.icon/>
                    </div>
                    <div className="crop-name">
                        {t(cropData.labelKey)}
                    </div>
                </div>
            )}
            <div className="crop-calendar-bars">
                <div className="planting-bar">
                    {monthComponents(true)}
                </div>
                <div className="harvest-bar">
                    {monthComponents(false)}
                </div>
            </div>
        </div>
    );
}

export default CropTypeRow;