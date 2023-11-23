import React, {useState} from "react";
import {TextField, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import {nameRegex} from "@/utils/validateRegister.ts";

interface PersonalDetailsProps {
    email: string;
    firstName: string;
    lastName: string;
    isEditing: boolean;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({email, firstName, lastName, isEditing}) => {
    const [firstNameState, setFirstNameState] = useState(firstName);
    const [lastNameState, setLastNameState] = useState(lastName);

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = event.target.value.replace(nameRegex, '');
        setFirstNameState(sanitizedValue);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = event.target.value.replace(nameRegex, '');
        setLastNameState(sanitizedValue);
    };

    return (
        <div className="profile-item">
            <Typography className="item-header">
                Personal Details
            </Typography>

            <div className="profile-data-container">
                <Typography className="profile-text">
                    <EmailIcon className="profile-icon" color="primary"/>
                    Email Address
                </Typography>
                <Typography className="profile-data">
                    {email}
                </Typography>
            </div>

            {isEditing ? (
                <div className="profile-data-container">
                    <PersonIcon className="profile-icon" color="primary"/>
                    <TextField className="profile-data-input"
                               label="First Name"
                               value={firstNameState}
                               onChange={handleFirstNameChange}
                    />
                </div>
            ) : (
                <div className="profile-data-container">
                    <Typography className="profile-text">
                        <PersonIcon className="profile-icon" color="primary"/>
                        First Name
                    </Typography>
                    <Typography className="profile-data">
                        {firstName}
                    </Typography>
                </div>
            )}

            {isEditing ? (
                <div className="profile-data-container">
                    <Person2OutlinedIcon className="profile-icon" color="primary"/>
                    <TextField className="profile-data-input"
                               label="Last Name"
                               value={lastNameState}
                               onChange={handleLastNameChange}
                    />
                </div>
            ) : (
                <div className="profile-data-container">
                    <Typography className="profile-text">
                        <Person2OutlinedIcon className="profile-icon" color="primary"/>
                        Last Name
                    </Typography>
                    <Typography className="profile-data">
                        {lastName}
                    </Typography>
                </div>
            )}


            Change password button placeholder
        </div>
    );
};

export default PersonalDetails;
