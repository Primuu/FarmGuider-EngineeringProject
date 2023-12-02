import '@/pages/BreedingPage/breedingPage.css';
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {useAuth} from "@/contexts/AuthContext/AuthContext.tsx";
import {useEffect, useState} from "react";
import {NOT_FOUND_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import {fetchBreedings} from "@/services/breedingService.ts";
import BreedingResponseDTO from "@/entities/BreedingResponseDTO.ts";
import {useNavigate} from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen.tsx";
import NoBreedingContent from "@/pages/BreedingPage/NoBreedingContent.tsx";
import BreedingContent from "@/pages/BreedingPage/BreedingContent.tsx";
import AddHerdModal from "@/pages/BreedingPage/AddHerdModal.tsx";

const BreedingPage = () => {
    const {t} = useTranslation('breedingPage');
    const {farmId} = useAuth();
    const [breedingResponseDTOList, setBreedingResponseDTOList] = useState<BreedingResponseDTO[] | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [openAddHerdModal, setOpenAddHerdModal] = useState(false);

    useEffect(() => {
        if (farmId) {
            fetchBreedings(farmId)
                .then(data => {
                    setBreedingResponseDTOList(data);

                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    navigate(NOT_FOUND_PAGE_URL, {replace: true});
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [farmId]);

    const handleOpenAddHerdModal = () => setOpenAddHerdModal(true);
    const handleCloseAddHerdModal = () => setOpenAddHerdModal(false);

    if (loading) return <LoadingScreen/>;
    if (!breedingResponseDTOList) return null;

    return (
        <div>
            <Typography className="layout-header">
                {t('header')}
            </Typography>
            {/*<div className="layout-container">*/}
            {/*    {breedingResponseDTOList.length == 0 &&*/}
            {/*        <NoBreedingContent*/}
            {/*            handleOpenAddHerdModal={handleOpenAddHerdModal}*/}
            {/*        />}*/}
            {/*    {breedingResponseDTOList.length > 0 && <BreedingContent />}*/}
            {/*</div>*/}


            <div className="layout-container">
                <NoBreedingContent
                    handleOpenAddHerdModal={handleOpenAddHerdModal}
                />
            </div>

            <AddHerdModal
                open={openAddHerdModal}
                onClose={handleCloseAddHerdModal}
            />
        </div>
    )
}

export default BreedingPage;