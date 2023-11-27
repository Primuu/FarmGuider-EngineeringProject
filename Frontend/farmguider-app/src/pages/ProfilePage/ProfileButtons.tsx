import {Button} from "@mui/material";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import {useTranslation} from "react-i18next";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import LockResetIcon from "@mui/icons-material/LockReset";

type ProfileButtonsProps = {
    isEditing: boolean;
    handleCancel: () => void;
    handleEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProfileButtons: React.FC<ProfileButtonsProps> = ({isEditing, handleCancel, handleEdit}) => {
    const {t} = useTranslation('profilePage');

    return (
        <div className="profile-buttons">
            <div>
                <Button
                    className="delete-acc-button"
                    variant="contained"
                    // onClick={}
                    color="secondary"
                >
                    <PersonOffIcon className="profile-button-icon"/>
                    {t('deleteAccountButton')}
                </Button>

                <Button
                    className="change-pswd-button"
                    variant="contained"
                    // onClick={}
                    color="primary"
                >
                    <LockResetIcon className="profile-button-icon"/>
                    {t('changePasswordButton')}
                </Button>
            </div>
            <div>
                {isEditing ? (
                    <div>
                        <Button
                            className="profile-button"
                            variant="contained"
                            type="submit"
                            color="primary"
                        >
                            <DoneOutlinedIcon className="profile-button-icon"/>
                            {t('saveButton')}
                        </Button>
                        <Button
                            className="profile-button"
                            variant="outlined"
                            onClick={handleCancel}
                            color="primary"
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
                            color="primary"
                        >
                            <EditIcon className="profile-button-icon"/>
                            {t('editButton')}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileButtons;