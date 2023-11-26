import {Button} from "@mui/material";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import {useTranslation} from "react-i18next";

type ProfileButtonsProps = {
    isEditing: boolean;
    handleCancel: () => void;
    handleEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProfileButtons: React.FC<ProfileButtonsProps> = ({isEditing, handleCancel, handleEdit}) => {
    const {t} = useTranslation('profilePage');

    return (
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
                        variant="contained"
                        onClick={handleEdit}
                    >
                        <EditIcon className="profile-button-icon"/>
                        {t('editButton')}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default ProfileButtons;