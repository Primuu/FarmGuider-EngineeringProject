import Page from "@/entities/Page.ts";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import React from "react";

type CowResultsProps = {
    loading: boolean;
    cowsPage: Page<CowResponseDTO>
}

const CowResults: React.FC<CowResultsProps> = ({loading, cowsPage}) => {
    return (
        <div>
            {cowsPage.content.length}
        </div>
    )
}

export default CowResults;