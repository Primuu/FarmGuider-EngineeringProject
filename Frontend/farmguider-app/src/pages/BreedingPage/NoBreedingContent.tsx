import {useTranslation} from "react-i18next";
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import React from "react";

import '@/pages/BreedingPage/noBreedingContent.css';
import cowImage from "@/assets/cow-image.png";

type NoBreedingContentProps = {
    handleOpenAddHerdModal: () => void;
}

export const NoBreedingContent: React.FC<NoBreedingContentProps> = ({handleOpenAddHerdModal}) => {
    const {t} = useTranslation('breedingPage');

    return (
        <div className="no-breeding-container">
            <img src={cowImage} alt={t('noBreedingContent.imageAlt')} className='cow'/>
            <Typography className="no-breeding-header">
                {t('noBreedingContent.information')}
            </Typography>
            <Button
                className="add-herd-button-no-content"
                variant="contained"
                color="primary"
                onClick={handleOpenAddHerdModal}
            >
                <AddIcon className="add-herd-button-icon-no-content"/>
                {t('noBreedingContent.addButton')}
            </Button>
        </div>
    )
}

export default NoBreedingContent;