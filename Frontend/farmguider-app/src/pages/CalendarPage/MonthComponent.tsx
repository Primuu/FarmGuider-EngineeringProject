import React from "react";

type MonthComponentProps = {
    start: number | null;
    end: number | null;
    isPlanting: boolean;
}

const MonthComponent: React.FC<MonthComponentProps> = ({start, end, isPlanting}) => {
    const totalDaysInMonth = 31;
    const startDay = start ? start - 1 : null;
    const backgroundColor = isPlanting ? "#2CB178" : "#ECC731";

    const calculatePercentage = (day: number | null) => {
        return day ? (day / totalDaysInMonth) * 100 : 0;
    };

    const startPercentage = calculatePercentage(startDay);
    const endPercentage = end ? calculatePercentage(end) : 100;

    const backgroundStyle = {
        background: start || end ? backgroundColor : 'none',
        marginLeft: `${startPercentage}%`,
        width: `${endPercentage - startPercentage}%`,
        height: "100%"
    };

    return (
        <div className="month-component">
            <div className="month-background" style={backgroundStyle}></div>
        </div>
    )
}

export default MonthComponent;