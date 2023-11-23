import React from "react";
import {TextField, Typography} from "@mui/material";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SignpostIcon from '@mui/icons-material/Signpost';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import {nameRegex} from "@/utils/validateRegister.ts";
import {nullReplaceLackOfData} from "@/utils/textUtils.ts";
import {useTranslation} from "react-i18next";

interface AddressDetailsProps {
    locality: string | null;
    street: string | null;
    zipCode: string | null;
    propertyNumber: string | null;
    isEditing: boolean;
}

const AddressDetails: React.FC<AddressDetailsProps> = ({locality, street, zipCode, propertyNumber, isEditing}) => {
    const {t} = useTranslation('profilePage');

    const handleTODO = (event: React.ChangeEvent<HTMLInputElement>) => {
        // const sanitizedValue = event.target.value.replace(nameRegex, '');
        // setFirstNameState(sanitizedValue);
    };

    return (
        <div className="profile-item">
            <Typography className="item-header">
                {t('address.header')}
            </Typography>

            {isEditing ? (
                <div className="profile-data-container">
                    <LocationCityIcon className="profile-icon" color="primary"/>
                    <TextField className="profile-data-input"
                               label={t('address.locality')}
                               value={locality}
                               onChange={handleTODO}
                    />
                </div>
            ) : (
                <div className="profile-data-container">
                    <Typography className="profile-text">
                        <LocationCityIcon className="profile-icon" color="primary"/>
                        {t('address.locality')}
                    </Typography>
                    <Typography className="profile-data">
                        {nullReplaceLackOfData(locality, t('address.dataNotProvided'))}
                    </Typography>
                </div>
            )}

            {isEditing ? (
                <div className="profile-data-container">
                    <SignpostIcon className="profile-icon" color="primary"/>
                    <TextField className="profile-data-input"
                               label={t('address.street')}
                               value={street}
                               onChange={handleTODO}
                    />
                </div>
            ) : (
                <div className="profile-data-container">
                    <Typography className="profile-text">
                        <SignpostIcon className="profile-icon" color="primary"/>
                        {t('address.street')}
                    </Typography>
                    <Typography className="profile-data">
                        {nullReplaceLackOfData(street, t('address.dataNotProvided'))}
                    </Typography>
                </div>
            )}

            {isEditing ? (
                <div className="profile-data-container">
                    <MarkunreadMailboxIcon className="profile-icon" color="primary"/>
                    <TextField className="profile-data-input"
                               label={t('address.zipCode')}
                               value={zipCode}
                               onChange={handleTODO}
                    />
                </div>
            ) : (
                <div className="profile-data-container">
                    <Typography className="profile-text">
                        <MarkunreadMailboxIcon  className="profile-icon" color="primary"/>
                        {t('address.zipCode')}
                    </Typography>
                    <Typography className="profile-data">
                        {nullReplaceLackOfData(zipCode, t('address.dataNotProvided'))}
                    </Typography>
                </div>
            )}

            {isEditing ? (
                <div className="profile-data-container">
                    <FormatListNumberedIcon className="profile-icon" color="primary"/>
                    <TextField className="profile-data-input"
                               label={t('address.propertyNumber')}
                               value={propertyNumber}
                               onChange={handleTODO}
                    />
                </div>
            ) : (
                <div className="profile-data-container">
                    <Typography className="profile-text">
                        <FormatListNumberedIcon  className="profile-icon" color="primary"/>
                        {t('address.propertyNumber')}
                    </Typography>
                    <Typography className="profile-data">
                        {nullReplaceLackOfData(propertyNumber, t('address.dataNotProvided'))}
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default AddressDetails;
