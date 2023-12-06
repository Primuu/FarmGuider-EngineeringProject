import CowSearchParams from "@/entities/CowSearchParams.ts";
import React from "react";

type CowBrowserProps = {
    updateSearchParams: (key: keyof CowSearchParams, value: string | number | boolean | Date | undefined) => void;
    handleSearch: () => void;
}

const CowBrowser: React.FC<CowBrowserProps> = ({updateSearchParams, handleSearch}) => {




    // Example
    // updateSearchParams('cowName', 'Molly');
    // updateSearchParams('minWeight', 500);


}

export default CowBrowser;