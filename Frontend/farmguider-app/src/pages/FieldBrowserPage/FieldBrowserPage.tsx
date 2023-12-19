import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {NOT_FOUND_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import {useAuth} from "@/contexts/AuthContext/AuthContext.tsx";
import {getFields} from "@/services/fieldService.ts";
import FieldResponseDTO from "@/entities/FieldResponseDTO.ts";
import FieldSearchParams from "@/entities/FieldSearchParams.ts";
import {useNavigate} from "react-router-dom";
import NoFieldsContent from "@/pages/FieldBrowserPage/NoFieldsContent.tsx";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen.tsx";
import AddFieldModal from "@/pages/FieldBrowserPage/modals/AddFieldModal.tsx";

const FieldBrowserPage = () => {
    const {t} = useTranslation('fieldBrowserPage');
    const {farmId} = useAuth();
    const [loading, setLoading] = useState(true);
    const [fieldList, setFieldList] = useState<FieldResponseDTO[]>([]);
    const [fieldSearchParams, setFieldSearchParams] = useState<FieldSearchParams>({});
    const navigate = useNavigate();
    const [openAddFieldModal, setOpenAddFieldModal] = useState(false);

    useEffect(() => {
        fetchAndSetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [farmId]);

    const fetchAndSetFields = () => {
        if (farmId) {
            getFields(farmId, fieldSearchParams)
                .then(data => {
                    setFieldList(data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    navigate(NOT_FOUND_PAGE_URL, {replace: true});
                })
        }
    }

    const handleOpenAddFieldModal = () => setOpenAddFieldModal(true);
    const handleCloseAddFieldModal = () => setOpenAddFieldModal(false);

    if (loading) return <LoadingScreen/>;

    return (
        <div>
            <Typography className="layout-header">
                {t('header')}
            </Typography>
            <div className="layout-container">
                {fieldList.length == 0 &&
                    <NoFieldsContent
                        handleOpenAddFieldModal={handleOpenAddFieldModal}
                    />}
                {/*{breedingList.length > 0 &&*/}
                {/*    <BreedingContent*/}
                {/*        breedingList={breedingList}*/}
                {/*        handleOpenAddHerdModal={handleOpenAddHerdModal}*/}
                {/*        refreshBreedings={fetchAndSetBreedings}*/}
                {/*        breeding={breeding}*/}
                {/*        handleChangeHerd={handleChangeHerd}*/}
                {/*        cowSearchParams={fieldSearchParams}*/}
                {/*        updateSearchParams={updateSearchParams}*/}
                {/*    />}*/}
            </div>

            <AddFieldModal
                open={openAddFieldModal}
                onClose={handleCloseAddFieldModal}
                farmId={farmId}
                onFieldAdded={fetchAndSetFields}
            />
        </div>
    );
}

export default FieldBrowserPage;