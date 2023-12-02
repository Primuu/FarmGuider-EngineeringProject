import BreedingResponseDTO from "@/entities/BreedingResponseDTO.ts";
import React from "react";

type BreedingContentProps = {
    breeding: BreedingResponseDTO;
}

const BreedingContent: React.FC<BreedingContentProps> = ({breeding}) => {


    return (
        <div>
            {breeding.breedingName}
        </div>
    )
}

export default BreedingContent;