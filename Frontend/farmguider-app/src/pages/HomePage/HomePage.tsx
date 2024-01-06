import '@/pages/HomePage/homePage.css';
import '@/pages/HomePage/rowComponent.css';
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
import AnimalsComponent from "@/pages/HomePage/AnimalsComponent.tsx";
import {getCowSummary} from "@/services/farmService.ts";
import {CowSummaryDTO} from "@/entities/CowSummaryDTO.ts";

const HomePage = () => {
    const {t} = useTranslation('homePage');
    const {userId, farmId} = useAuth();
    const [userResponseDTO, setUserResponseDTO] = useState<UserResponseDTO | null>(null);
    const [cowSummaryDTO, setCowSummaryDTO] = useState<CowSummaryDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [cowSummaryLoading, setCowSummaryLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAndSetUserData();
        fetchAndSetCowSummary();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, farmId]);

    const fetchAndSetUserData = () => {
        setLoading(true);
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
    }

    const fetchAndSetCowSummary = () => {
        setCowSummaryLoading(true);
        if (farmId) {
            getCowSummary(farmId)
                .then(data => {
                    setCowSummaryDTO(data);
                    setCowSummaryLoading(false);
                })
                .catch(() => {
                    setCowSummaryLoading(false);
                    navigate(NOT_FOUND_PAGE_URL, {replace: true});
                })
        }
    }

    return (
        <div>
            <Typography className="layout-header">
                {t('header')}
            </Typography>
            <div className="layout-container home-page-container">
                {loading ? (
                    <LoadingComponent/>
                ) : (
                    <div>
                        <ProfileComponent/>

                        <div className="greeting-container">
                            <div className="greeting-header">
                                {t('welcome')}, {userResponseDTO?.firstName}
                            </div>

                            <div className="greeting">
                                {t('greeting')}
                            </div>
                        </div>

                        <div className="row-charts">
                            <AnimalsComponent
                                loading={cowSummaryLoading}
                                cowSummaryDTO={cowSummaryDTO}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage;