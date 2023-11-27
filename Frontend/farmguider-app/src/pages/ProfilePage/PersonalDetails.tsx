import React from "react";
import {TextField, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import {nameRegex} from "@/utils/profileValidators.ts";
import {useTranslation} from "react-i18next";
import {ProfileErrors} from "@/utils/profileValidators.ts";

type PersonalDetailsProps = {
    email: string;
    firstName: string;
    firstNameState: string;
    setFirstNameState: (value: string) => void;
    lastName: string;
    lastNameState: string;
    setLastNameState: (value: string) => void;
    isEditing: boolean;
    errors: ProfileErrors;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = (
    {
        email, firstName, firstNameState, setFirstNameState, lastName, lastNameState,
        setLastNameState, isEditing, errors
    }
) => {
    const {t} = useTranslation('profilePage');

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
                {t('personals.header')}
            </Typography>

            <div className="profile-data-container">
                <Typography className="profile-text">
                    <EmailIcon className="profile-icon" color="primary"/>
                    {t('personals.email')}
                </Typography>
                <Typography className="profile-data">
                    {email}
                </Typography>
            </div>

            {isEditing ? (
                <div className="profile-data-container">
                    <PersonIcon className="profile-icon" color="primary"/>
                    <TextField className="profile-data-input"
                               label={t('personals.firstName')}
                               value={firstNameState}
                               onChange={handleFirstNameChange}
                               required
                               error={!!errors.firstName}
                               helperText={errors.firstName}
                    />
                </div>
            ) : (
                <div className="profile-data-container">
                    <Typography className="profile-text">
                        <PersonIcon className="profile-icon" color="primary"/>
                        {t('personals.firstName')}
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
                               label={t('personals.lastName')}
                               value={lastNameState}
                               onChange={handleLastNameChange}
                               required
                               error={!!errors.lastName}
                               helperText={errors.lastName}
                    />
                </div>
            ) : (
                <div className="profile-data-container">
                    <Typography className="profile-text">
                        <Person2OutlinedIcon className="profile-icon" color="primary"/>
                        {t('personals.lastName')}
                    </Typography>
                    <Typography className="profile-data">
                        {lastName}
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default PersonalDetails;
