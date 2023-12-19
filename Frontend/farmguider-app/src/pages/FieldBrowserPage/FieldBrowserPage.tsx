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
import FieldsContent from "@/pages/FieldBrowserPage/FieldsContent.tsx";

const FieldBrowserPage = () => {
    const {t} = useTranslation('fieldBrowserPage');
    const {farmId} = useAuth();
    const [loading, setLoading] = useState(true);
    const [fieldList, setFieldList] = useState<FieldResponseDTO[]>([]);
    const [fieldSearchParams, setFieldSearchParams] = useState<FieldSearchParams>({});
    const navigate = useNavigate();
    const [openAddFieldModal, setOpenAddFieldModal] = useState(false);
    const [searchMade, setSearchMade] = useState<boolean>(false);
    const [initialListLength, setInitialListLength] = useState<number>(0);

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
                    if (!searchMade) {
                        setInitialListLength(data.length);
                        setSearchMade(true);
                    }
                })
                .catch(() => {
                    setLoading(false);
                    navigate(NOT_FOUND_PAGE_URL, {replace: true});
                })
        }
    }

    const updateSearchParams = (key: keyof FieldSearchParams, value: string | number | undefined) => {
        setFieldSearchParams(prevState => ({...prevState, [key]: value}));
    };

    const handleOpenAddFieldModal = () => setOpenAddFieldModal(true);
    const handleCloseAddFieldModal = () => setOpenAddFieldModal(false);

    if (loading) return <LoadingScreen/>;

    return (
        <div>
            <Typography className="layout-header">
                {t('header')}
            </Typography>
            <div className="layout-container">
                {initialListLength === 0 ? (
                    <NoFieldsContent
                        handleOpenAddFieldModal={handleOpenAddFieldModal}
                    />
                ) : (
                    <FieldsContent
                        fieldList={fieldList}
                        onOpenAddFieldModal={handleOpenAddFieldModal}
                        fieldSearchParams={fieldSearchParams}
                        updateSearchParams={updateSearchParams}
                        onSearch={fetchAndSetFields}
                    />
                )}
            </div>

            <AddFieldModal
                open={openAddFieldModal}
                onClose={handleCloseAddFieldModal}
                farmId={farmId}
                onFieldAdded={fetchAndSetFields}
                setInitialLength={setInitialListLength}
            />
        </div>
    );
}

export default FieldBrowserPage;