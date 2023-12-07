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
import AddHerdModal from "@/pages/BreedingPage/modals/AddHerdModal.tsx";
import {SELECTED_BREEDING_ITEM} from "@/constants/CONFIG_CONSTS.ts";
import {defaultSearchParams} from "@/utils/cowBrowserUtils.ts";
import CowSearchParams from "@/entities/CowSearchParams.ts";

const BreedingPage = () => {
    const {t} = useTranslation('breedingPage');
    const {farmId} = useAuth();
    const [breedingList, setBreedingList] = useState<BreedingResponseDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [openAddHerdModal, setOpenAddHerdModal] = useState(false);
    const [breeding, setBreeding] = useState<BreedingResponseDTO | null>(null);
    const [cowSearchParams, setCowSearchParams] = useState<CowSearchParams>(defaultSearchParams);

    useEffect(() => {
        if (breedingList.length > 0) {
            const savedBreedingId = localStorage.getItem(SELECTED_BREEDING_ITEM);
            const defaultBreeding = savedBreedingId
                ? breedingList.find(b => b.breedingId === Number(savedBreedingId)) || breedingList[0]
                : breedingList[0];
            setBreeding(defaultBreeding);
        }
    }, [breedingList]);

    useEffect(() => {
        fetchAndSetBreedings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [farmId]);

    const fetchAndSetBreedings = () => {
        if (farmId) {
            fetchBreedings(farmId)
                .then(data => {
                    setBreedingList(data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    navigate(NOT_FOUND_PAGE_URL, {replace: true});
                })
        }
    }

    const handleOpenAddHerdModal = () => setOpenAddHerdModal(true);
    const handleCloseAddHerdModal = () => setOpenAddHerdModal(false);

    const handleChangeHerd = (newBreedingId: number) => {
        const selectedBreeding = breedingList.find(
            b => b.breedingId === newBreedingId);
        if (selectedBreeding) {
            setCowSearchParams(defaultSearchParams);
            setBreeding(selectedBreeding);
            localStorage.setItem(SELECTED_BREEDING_ITEM, newBreedingId.toString());
        }
    };

    const handleBreedingAdded = (breedingResponseDTO: BreedingResponseDTO) => {
        fetchAndSetBreedings();
        setCowSearchParams(defaultSearchParams);
        localStorage.setItem(SELECTED_BREEDING_ITEM, breedingResponseDTO.breedingId.toString());
    }

    const updateSearchParams = (key: keyof CowSearchParams, value: string | number | boolean | Date | undefined) => {
        setCowSearchParams(prevState => ({...prevState, [key]: value}));
    };

    if (loading) return <LoadingScreen/>;
    if (!breedingList) return null;

    return (
        <div>
            <Typography className="layout-header">
                {t('header')}
            </Typography>
            <div className="layout-container">
                {breedingList.length == 0 &&
                    <NoBreedingContent
                        handleOpenAddHerdModal={handleOpenAddHerdModal}
                    />}
                {breedingList.length > 0 &&
                    <BreedingContent
                        breedingList={breedingList}
                        handleOpenAddHerdModal={handleOpenAddHerdModal}
                        refreshBreedings={fetchAndSetBreedings}
                        breeding={breeding}
                        handleChangeHerd={handleChangeHerd}
                        cowSearchParams={cowSearchParams}
                        updateSearchParams={updateSearchParams}
                    />}
            </div>

            <AddHerdModal
                open={openAddHerdModal}
                onClose={handleCloseAddHerdModal}
                onBreedingAdded={handleBreedingAdded}
            />
        </div>
    )
}

export default BreedingPage;