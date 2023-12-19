import {useTranslation} from "react-i18next";
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import React from "react";

import '@/pages/FieldBrowserPage/noFieldContent.css';
import scarecrowImage from "@/assets/scarecrow-image.png";

type NoFieldContentProps = {
    handleOpenAddFieldModal: () => void;
}

export const NoFieldContent: React.FC<NoFieldContentProps> = ({handleOpenAddFieldModal}) => {
    const {t} = useTranslation('fieldBrowserPage');

    return (
        <div className="no-field-container">
            <img src={scarecrowImage} alt={t('noFieldContent.imageAlt')} className='scarecrow'/>
            <Typography className="no-field-header">
                {t('noFieldContent.information')}
            </Typography>
            <Button
                className="add-field-button-no-content"
                variant="contained"
                color="primary"
                onClick={handleOpenAddFieldModal}
            >
                <AddIcon className="add-field-button-icon-no-content"/>
                {t('noFieldContent.addButton')}
            </Button>
        </div>
    )
}

export default NoFieldContent;