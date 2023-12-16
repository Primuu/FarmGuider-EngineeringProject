import LactationPeriodResponseDTO from "@/entities/LactationPeriodResponseDTO.ts";
import React from "react";
import MilkingYieldTools from "@/pages/CowPage/MilkingYieldTools.tsx";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import '@/pages/CowPage/charts.css';

type CowMilkingYieldProps = {
    lactationPeriodList: LactationPeriodResponseDTO[];
    cow: CowResponseDTO;
    locale: Locale;
    onLactationPeriodAdded: () => void;
}
const CowMilkingYield: React.FC<CowMilkingYieldProps> = ({lactationPeriodList, cow, locale, onLactationPeriodAdded}) => {

    return (
        // lactationPeriodList.length > 0 ?
        //         select 1st lactation period
        //     MilkingChart
        //     :  TEXT: To track your cow's performance, add the lactation period
        <MilkingYieldTools
            cow={cow}
            locale={locale}
            onLactationPeriodAdded={onLactationPeriodAdded}
            lactationPeriodList={lactationPeriodList}
        />
    )
}

export default CowMilkingYield;