import '@/pages/ProfilePage/profilePage.css';
import {useAuth} from "@/contexts/AuthContext/AuthContext.tsx";
import {useEffect, useState} from "react";
import {fetchUserData} from "@/services/userService.ts";
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

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const {userId} = useAuth();
    const [userResponseDTO, setUserResponseDTO] = useState<UserResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {t} = useTranslation('profilePage');

    useEffect(() => {
        if (userId) {
            fetchUserData(userId)
                .then(data => {
                    setUserResponseDTO(data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    navigate(NOT_FOUND_PAGE_URL, {replace: true});
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (loading) return <LoadingScreen/>;
    if (!userResponseDTO) return null;

    return (
        <div>
            <Typography className="profile-header">
                {t('header')}
            </Typography>
            <div className="profile-container">
                <div className="profile-details">
                    <PersonalDetails
                        email={userResponseDTO.email}
                        firstName={userResponseDTO.firstName}
                        lastName={userResponseDTO.lastName}
                        isEditing={isEditing}
                    />
                    <AddressDetails
                        locality={userResponseDTO.locality}
                        street={userResponseDTO.street}
                        zipCode={userResponseDTO.zipCode}
                        propertyNumber={userResponseDTO.propertyNumber}
                        isEditing={isEditing}
                    />
                </div>

                <div className="profile-buttons">
                    {isEditing ? (
                        <div>
                            <Button
                                className="profile-button"
                                variant="contained"
                                onClick={handleSave}
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
        </div>
    )
}

export default ProfilePage;