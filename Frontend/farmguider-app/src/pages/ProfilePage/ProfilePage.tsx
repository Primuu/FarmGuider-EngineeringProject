import '@/pages/ProfilePage/profilePage.css';
import {useAuth} from "@/contexts/AuthContext/AuthContext.tsx";
import React, {useEffect, useState} from "react";
import {fetchUserData, updateUser} from "@/services/userService.ts";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen.tsx";
import UserResponseDTO from "@/entities/UserResponseDTO.ts";
import {useNavigate} from "react-router-dom";
import {NOT_FOUND_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import Typography from "@mui/material/Typography";
import PersonalDetails from "@/pages/ProfilePage/PersonalDetails.tsx";
import AddressDetails from "@/pages/ProfilePage/AddressDetails.tsx";
import {Button} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {useTranslation} from "react-i18next";
import useValidation from "@/hooks/useValidation.ts";
import {ProfileValues, validateProfile} from "@/utils/validateProfile.ts";
import UserUpdateDTO from "@/entities/UserUpdateDTO.ts";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import {useSnackbar} from "notistack";

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const {userId} = useAuth();
    const [userResponseDTO, setUserResponseDTO] = useState<UserResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {t} = useTranslation('profilePage');
    const {errors, validate, setErrors} = useValidation<ProfileValues>(validateProfile);
    const {enqueueSnackbar} = useSnackbar();
    // PersonalDetails States
    const [firstNameState, setFirstNameState] = useState<string>("");
    const [lastNameState, setLastNameState] = useState<string>("");
    // AddressDetails States
    const [localityState, setLocalityState] = useState<string | null>("");
    const [streetState, setStreetState] = useState<string | null>("");
    const [zipCodeState, setZipCodeState] = useState<string | null>("");
    const [propertyNumberState, setPropertyNumberState] = useState<string | null>("");

    useEffect(() => {
        if (userId) {
            fetchUserData(userId)
                .then(data => {
                    setUserResponseDTO(data);

                    setFirstNameState(data.firstName);
                    setLastNameState(data.lastName);
                    setLocalityState(data.locality);
                    setStreetState(data.street);
                    setZipCodeState(data.zipCode);
                    setPropertyNumberState(data.propertyNumber);

                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    navigate(NOT_FOUND_PAGE_URL, {replace: true});
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsEditing(true);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const profileData: ProfileValues = {
            firstName: firstNameState,
            lastName: lastNameState,
            locality: localityState,
            street: streetState,
            zipCode: zipCodeState,
            propertyNumber: propertyNumberState
        };
        if (!validate(profileData, t)) return;

        const userUpdateDTO: UserUpdateDTO = {
            firstName: firstNameState,
            lastName: lastNameState,
            locality: localityState,
            street: streetState,
            zipCode: zipCodeState,
            propertyNumber: propertyNumberState
        }

        setLoading(true);

        updateUser(userId!, userUpdateDTO)
            .then(data => {
                setUserResponseDTO(data);
                setLoading(false);
                setIsEditing(false);
                enqueueSnackbar(t('snackbars.updateSuccess'), SnackbarSuccess);
            })
            .catch(() => {
                setLoading(false);
                enqueueSnackbar(t('snackbars.updateError'), SnackbarError);
            })
    };

    const handleCancel = () => {
        setIsEditing(false);
        setErrors({});

        setFirstNameState(userResponseDTO!.firstName);
        setLastNameState(userResponseDTO!.lastName);
        setLocalityState(userResponseDTO!.locality);
        setStreetState(userResponseDTO!.street);
        setZipCodeState(userResponseDTO!.zipCode);
        setPropertyNumberState(userResponseDTO!.propertyNumber);
    };

    if (loading) return <LoadingScreen/>;
    if (!userResponseDTO) return null;

    return (
        <form onSubmit={handleSubmit}>
            <Typography className="profile-header">
                {t('header')}
            </Typography>
            <div className="profile-container">
                <div className="profile-details">
                    <PersonalDetails
                        email={userResponseDTO.email}
                        firstName={userResponseDTO.firstName}
                        firstNameState={firstNameState}
                        setFirstNameState={setFirstNameState}
                        lastName={userResponseDTO.lastName}
                        lastNameState={lastNameState}
                        setLastNameState={setLastNameState}
                        isEditing={isEditing}
                        errors={errors}
                    />
                    <AddressDetails
                        locality={userResponseDTO.locality}
                        localityState={localityState}
                        setLocalityState={setLocalityState}
                        street={userResponseDTO.street}
                        streetState={streetState}
                        setStreetState={setStreetState}
                        zipCode={userResponseDTO.zipCode}
                        zipCodeState={zipCodeState}
                        setZipCodeState={setZipCodeState}
                        propertyNumber={userResponseDTO.propertyNumber}
                        propertyNumberState={propertyNumberState}
                        setPropertyNumberState={setPropertyNumberState}
                        isEditing={isEditing}
                        errors={errors}
                    />
                </div>

                <div className="profile-buttons">
                    {isEditing ? (
                        <div>
                            <Button
                                className="profile-button"
                                variant="contained"
                                type="submit"
                            >
                                <DoneOutlinedIcon className="profile-button-icon"/>
                                {t('saveButton')}
                            </Button>
                            <Button
                                className="profile-button"
                                variant="outlined"
                                onClick={handleCancel}
                            >
                                <CloseOutlinedIcon className="profile-button-icon"/>
                                {t('cancelButton')}
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Button
                                className="profile-button"
                                // type="button"
                                variant="contained"
                                onClick={handleEdit}
                            >
                                <EditIcon className="profile-button-icon"/>
                                {t('editButton')}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </form>
    )
}

export default ProfilePage;