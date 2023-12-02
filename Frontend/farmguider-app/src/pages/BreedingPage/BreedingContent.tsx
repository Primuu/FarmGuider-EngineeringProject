import BreedingResponseDTO from "@/entities/BreedingResponseDTO.ts";
import React, {useState} from "react";
import {Select, SelectChangeEvent} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useTranslation} from "react-i18next";
import BreedingContentTools from "@/pages/BreedingPage/BreedingContentTools.tsx";

type BreedingContentProps = {
    breedingList: BreedingResponseDTO[];
    handleOpenAddHerdModal: () => void;
}

const BreedingContent: React.FC<BreedingContentProps> = ({breedingList, handleOpenAddHerdModal}) => {
    const {t} = useTranslation('breedingPage');
    const [breeding, setBreeding] = useState<BreedingResponseDTO>(breedingList[0]);

    const handleChange = (event: SelectChangeEvent) => {
        const breedingIdNum = Number(event.target.value);
        const selectedBreeding = breedingList.find(
            b => b.breedingId === breedingIdNum
        );
        if (selectedBreeding) {
            setBreeding(selectedBreeding);
        }
    };

    return (
        <div>
            <div className="breeding-content-header">
                <div className="breeding-content-herd-name">
                    {breeding.breedingName}
                </div>

                {breedingList.length > 1 &&
                    <Select
                        value={breeding.breedingId.toString()}
                        label={t('breedingContent.pickerLabel')}
                        onChange={handleChange}
                    >
                        {breedingList.map((breeding) => (
                            <MenuItem key={breeding.breedingId} value={breeding.breedingId}>
                                {breeding.breedingName}
                            </MenuItem>
                        ))}
                    </Select>
                }

                <BreedingContentTools
                    handleOpenAddHerdModal={handleOpenAddHerdModal}
                />
            </div>
        </div>
    )
}

export default BreedingContent;