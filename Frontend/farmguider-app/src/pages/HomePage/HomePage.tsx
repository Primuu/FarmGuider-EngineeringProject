import '@/pages/HomePage/homePage.css';
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import ProfileComponent from "@/pages/HomePage/ProfileComponent.tsx";
import {useAuth} from "@/contexts/AuthContext/AuthContext.tsx";
import {useEffect, useState} from "react";
import UserResponseDTO from "@/entities/UserResponseDTO.ts";
import {useNavigate} from "react-router-dom";
import {getUserData} from "@/services/userService.ts";
import {NOT_FOUND_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent.tsx";

const HomePage = () => {
    const {t} = useTranslation('homePage');
    const {userId} = useAuth();
    const [userResponseDTO, setUserResponseDTO] = useState<UserResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            getUserData(userId)
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

    return (
        <div>
            <Typography className="layout-header">
                {t('header')}
            </Typography>
            <div className="layout-container">
                {loading ? (
                    <LoadingComponent />
                ) : (
                    <div>
                        <ProfileComponent />

                        <div className="greeting-container">
                            <div className="greeting-header">
                                {t('welcome')}, {userResponseDTO?.firstName}
                            </div>

                            <div className="greeting">
                                {t('greeting')}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage;