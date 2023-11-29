import React from "react";
import {TextField, Typography} from "@mui/material";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SignpostIcon from '@mui/icons-material/Signpost';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import {nullReplaceLackOfData} from "@/utils/textUtils.ts";
import {useTranslation} from "react-i18next";
import {ProfileErrors} from "@/utils/profileValidators.ts";

interface AddressDetailsProps {
    locality: string | null;
    localityState: string | null;
    setLocalityState: (value: string) => void;
    street: string | null;
    streetState: string | null;
    setStreetState: (value: string) => void;
    zipCode: string | null;
    zipCodeState: string | null;
    setZipCodeState: (value: string) => void;
    propertyNumber: string | null;
    propertyNumberState: string | null;
    setPropertyNumberState: (value: string) => void;
    isEditing: boolean;
    errors: ProfileErrors;
}

const AddressDetails: React.FC<AddressDetailsProps> = (
    {
        locality, localityState, setLocalityState, street, streetState, setStreetState,
        zipCode, zipCodeState, setZipCodeState, propertyNumber, propertyNumberState,
        setPropertyNumberState, isEditing, errors
    }
) => {
    const {t} = useTranslation('profilePage');

    const handleLocalityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalityState(event.target.value);
    };

    const handleStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStreetState(event.target.value);
    };

    const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZipCodeState(event.target.value);
    };

    const handlePropertyNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPropertyNumberState(event.target.value);
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
                               value={localityState || ''}
                               onChange={handleLocalityChange}
                               error={!!errors.locality}
                               helperText={errors.locality}
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
                               value={streetState || ''}
                               onChange={handleStreetChange}
                               error={!!errors.street}
                               helperText={errors.street}
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
                               value={zipCodeState || ''}
                               onChange={handleZipCodeChange}
                               error={!!errors.zipCode}
                               helperText={errors.zipCode}
                    />
                </div>
            ) : (
                <div className="profile-data-container">
                    <Typography className="profile-text">
                        <MarkunreadMailboxIcon className="profile-icon" color="primary"/>
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
                               value={propertyNumberState || ''}
                               onChange={handlePropertyNumberChange}
                               error={!!errors.propertyNumber}
                               helperText={errors.propertyNumber}
                    />
                </div>
            ) : (
                <div className="profile-data-container">
                    <Typography className="profile-text">
                        <FormatListNumberedIcon className="profile-icon" color="primary"/>
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
