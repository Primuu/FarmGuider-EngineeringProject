import {Button, Tooltip} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import {useTranslation} from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type BreedingContentToolsProps = {
    handleOpenAddHerdModal: () => void;
}

const BreedingContentTools: React.FC<BreedingContentToolsProps> = ({handleOpenAddHerdModal}) => {
    const {t} = useTranslation('breedingPage');

    return (
        <div>
            <Tooltip title={t('breedingContent.addHerdTooltip')} >
                <Button
                    className="breeding-content-tools-button"
                    variant="contained"
                    color="primary"
                    onClick={handleOpenAddHerdModal}
                >
                    <AddIcon className="breeding-content-tools-icon"/>
                </Button>
            </Tooltip>

            <Tooltip title={t('breedingContent.editHerdTooltip')} >
                <Button
                    className="breeding-content-tools-button"
                    variant="contained"
                    color="primary"
                    // onClick={}
                >
                    <EditIcon className="breeding-content-tools-icon"/>
                </Button>
            </Tooltip>

            <Tooltip title={t('breedingContent.deleteHerdTooltip')} >
                <Button
                    className="breeding-content-tools-button"
                    variant="contained"
                    color="secondary"
                    // onClick={}
                >
                    <DeleteIcon className="breeding-content-tools-icon"/>
                </Button>
            </Tooltip>
        </div>
    );
}

export default BreedingContentTools;
