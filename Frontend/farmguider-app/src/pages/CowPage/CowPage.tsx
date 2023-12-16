import '@/pages/CowPage/cowPage.css';
import {useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {BREEDING_PAGE_URL, NOT_FOUND_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import {deleteCow, getCow} from "@/services/cowService.ts";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen.tsx";
import CowDetails from "@/pages/CowPage/CowDetails.tsx";
import enLocale from "date-fns/locale/en-US";
import i18n from "i18next";
import plLocale from "date-fns/locale/pl";
import MilkingTable from "@/pages/CowPage/MilkingTable.tsx";
import MilkingResponseDTO from "@/entities/MilkingResponseDTO.ts";
import {getMilkings} from "@/services/milkingService.ts";
import WeightGainTable from "@/pages/CowPage/WeightGainTable.tsx";
import WeightGainResponseDTO from "@/entities/WeightGainResponseDTO.ts";
import {getWeightGains} from "@/services/weightGainService.ts";
import MilkingChart from "@/pages/CowPage/MilkingChart.tsx";
import {Button} from "@mui/material";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import {SnackbarError, SnackbarSuccess} from "@/utils/snackbarVariants.ts";
import {useSnackbar} from "notistack";

const CowPage = () => {
    const {cowId} = useParams();
    const {t} = useTranslation('cowPage');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [locale, setLocale] = useState(enLocale);
    const [cow, setCow] = useState<CowResponseDTO>();
    const [milkingList, setMilkingList] = useState<MilkingResponseDTO[]>([]);
    const [weightGainList, setWeightGainList] = useState<WeightGainResponseDTO[]>([]);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        fetchAndSetCow();
        fetchAndSetMilkingList();
        fetchAndSetWeightGainList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cowId]);

    useEffect(() => {
        if (i18n.language === 'pl') setLocale(plLocale);
        if (i18n.language === 'en') setLocale(enLocale);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    const fetchAndSetCow = () => {
        if (cowId) {
            getCow(parseInt(cowId))
                .then(data => {
                    setCow(data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    navigate(NOT_FOUND_PAGE_URL, {replace: true});
                })
        }
    }

    const fetchAndSetMilkingList = () => {
        if (cowId) {
            getMilkings(parseInt(cowId))
                .then(data => {
                    setMilkingList(data);
                })
                .catch(() => {
                    setLoading(false);
                    navigate(NOT_FOUND_PAGE_URL, {replace: true});
                })
        }
    }

    const fetchAndSetWeightGainList = () => {
        if (cowId) {
            getWeightGains(parseInt(cowId))
                .then(data => {
                    setWeightGainList(data);
                })
                .catch(() => {
                    setLoading(false);
                    navigate(NOT_FOUND_PAGE_URL, {replace: true});
                })
        }
    }

    const handleDeleteCow = () => {
        if (cowId) {
            deleteCow(parseInt(cowId))
                .then(() => {
                    enqueueSnackbar(t('deleteCowSuccessSnackbar'), SnackbarSuccess);
                    navigate(BREEDING_PAGE_URL, {replace: true});
                })
                .catch(() => {
                    enqueueSnackbar(t('deleteCowErrorSnackbar'), SnackbarError);
                });
        }
    };

    const handleOpenConfirmationDialog = () => setOpenConfirmationDialog(true);

    const handleCloseConfirmationDialog = () => setOpenConfirmationDialog(false);

    if (loading) return <LoadingScreen/>;
    if (!cow) return null;

    return (
        <div>
            <Typography className="layout-header">
                {t('header')}
            </Typography>
            <div className="layout-container">
                <div className="cows-data-container">
                    <CowDetails
                        cow={cow}
                        setCow={setCow}
                        locale={locale}
                    />

                    <MilkingTable
                        cow={cow}
                        milkingList={milkingList}
                        setMilkingList={setMilkingList}
                        locale={locale}
                        onMilkingAdded={fetchAndSetMilkingList}
                    />

                    <WeightGainTable
                        cow={cow}
                        weightGainList={weightGainList}
                        setWeightGainList={setWeightGainList}
                        locale={locale}
                        onWeightGainAdded={fetchAndSetWeightGainList}
                    />

                    <div className="cow-button-container">
                        <Button
                            className="delete-cow-button"
                            variant="contained"
                            onClick={handleOpenConfirmationDialog}
                            color="secondary"
                        >
                            <DeleteIcon className="delete-cow-button-icon"/>
                            {t('deleteCowButton')}
                        </Button>
                    </div>
                </div>
                <div className="cows-charts-data-container">
                    <MilkingChart/>
                </div>
            </div>

            <ConfirmationDialog
                open={openConfirmationDialog}
                onClose={handleCloseConfirmationDialog}
                onConfirm={handleDeleteCow}
                title={t('deleteCowDialogTitle')}
                message={t('deleteCowDialogMessage1') + cow.earTagNumber + t('deleteCowDialogMessage2')}
            />
        </div>
    )
}

export default CowPage;