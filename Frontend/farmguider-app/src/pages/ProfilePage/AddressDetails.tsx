import React from "react";
import {TextField, Typography} from "@mui/material";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SignpostIcon from '@mui/icons-material/Signpost';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import {nameRegex} from "@/utils/validateRegister.ts";
import {nullReplaceLackOfData} from "@/utils/textUtils.ts";

interface AddressDetailsProps {
    locality: string | null;
    street: string | null;
    zipCode: string | null;
    propertyNumber: string | null;
    isEditing: boolean;
}

const AddressDetails: React.FC<AddressDetailsProps> = ({locality, street, zipCode, propertyNumber, isEditing}) => {
    const handleTODO = (event: React.ChangeEvent<HTMLInputElement>) => {
        // const sanitizedValue = event.target.value.replace(nameRegex, '');
        // setFirstNameState(sanitizedValue);
    };

    return (
        <div className="profile-item">
            <Typography className="item-header">
                Address Details
            </Typography>

            {isEditing ? (
                <div className="profile-data-container">
                    <LocationCityIcon className="profile-icon" color="primary"/>
                    <TextField className="profile-data-input"
                               label="Locality"
                               value={locality}
                               onChange={handleTODO}
                    />
                </div>
            ) : (
                <div className="profile-data-container">
                    <Typography className="profile-text">
                        <LocationCityIcon className="profile-icon" color="primary"/>
                        Locality
                    </Typography>
                    <Typography className="profile-data">
                        {nullReplaceLackOfData(locality, "Data not provided")}
                    </Typography>
                </div>
            )}

            {isEditing ? (
                <div className="profile-data-container">
                    <SignpostIcon className="profile-icon" color="primary"/>
                    <TextField className="profile-data-input"
                               label="Street"
                               value={street}
                               onChange={handleTODO}
                    />
                </div>
            ) : (
                <div className="profile-data-container">
                    <Typography className="profile-text">
                        <SignpostIcon className="profile-icon" color="primary"/>
                        Street
                    </Typography>
                    <Typography className="profile-data">
                        {nullReplaceLackOfData(locality, "Data not provided")}
                    </Typography>
                </div>
            )}

            {isEditing ? (
                <div className="profile-data-container">
                    <MarkunreadMailboxIcon className="profile-icon" color="primary"/>
                    <TextField className="profile-data-input"
                               label="Zip Code"
                               value={zipCode}
                               onChange={handleTODO}
                    />
                </div>
            ) : (
                <div className="profile-data-container">
                    <Typography className="profile-text">
                        <MarkunreadMailboxIcon  className="profile-icon" color="primary"/>
                        Zip Code
                    </Typography>
                    <Typography className="profile-data">
                        {nullReplaceLackOfData(locality, "Data not provided")}
                    </Typography>
                </div>
            )}

            {isEditing ? (
                <div className="profile-data-container">
                    <FormatListNumberedIcon className="profile-icon" color="primary"/>
                    <TextField className="profile-data-input"
                               label="Property Number"
                               value={propertyNumber}
                               onChange={handleTODO}
                    />
                </div>
            ) : (
                <div className="profile-data-container">
                    <Typography className="profile-text">
                        <FormatListNumberedIcon  className="profile-icon" color="primary"/>
                        Property Number
                    </Typography>
                    <Typography className="profile-data">
                        {nullReplaceLackOfData(locality, "Data not provided")}
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default AddressDetails;
