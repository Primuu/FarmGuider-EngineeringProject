import '@/pages/ProfilePage/profilePage.css';
import {useAuth} from "@/contexts/AuthContext/AuthContext.tsx";
import {useEffect, useState} from "react";
import {fetchUserData} from "@/services/userService.ts";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen.tsx";
import UserResponseDTO from "@/entities/UserResponseDTO.ts";
import {useNavigate} from "react-router-dom";
import {NOT_FOUND_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import Typography from "@mui/material/Typography";

const ProfilePage = () => {
    const {userId} = useAuth();
    const [userResponseDTO, setUserResponseDTO] = useState<UserResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    if (loading) return <LoadingScreen/>;
    if (!userResponseDTO) return null;

    return (
        <div>
            <Typography className="profile-header">
                Profile
            </Typography>
            <div className="profile-container">
                {/*<div>User ID: {userResponseDTO.userId}</div>*/}
                {/*<div>Name: {userResponseDTO.firstName}</div>*/}
                {/*<div>Email: {userResponseDTO.email}</div>*/}
            </div>
        </div>
    )
}

export default ProfilePage;