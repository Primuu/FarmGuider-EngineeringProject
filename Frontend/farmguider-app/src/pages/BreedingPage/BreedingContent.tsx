import BreedingResponseDTO from "@/entities/BreedingResponseDTO.ts";
import React, {useEffect, useMemo, useState} from "react";
import {Button, Select, SelectChangeEvent} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useTranslation} from "react-i18next";
import BreedingContentTools from "@/pages/BreedingPage/BreedingContentTools.tsx";
import {GiCow} from 'react-icons/gi';
import AddCowModal from "@/pages/BreedingPage/modals/AddCowModal.tsx";
import CowSearchParams from "@/entities/CowSearchParams.ts";
import {DEFAULT_PAGE, defaultSearchParams, emptyPage} from "@/utils/cowBrowserUtils.ts";
import {getCows} from "@/services/cowService.ts";
import CowBrowser from "@/pages/BreedingPage/CowBrowser.tsx";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import Page from "@/entities/Page.ts";
import {useSnackbar} from "notistack";
import {SnackbarError} from "@/utils/snackbarVariants.ts";
import CowResults from "@/pages/BreedingPage/CowResults.tsx";

type BreedingContentProps = {
    breedingList: BreedingResponseDTO[];
    handleOpenAddHerdModal: () => void;
    refreshBreedings: () => void;
}

const BreedingContent: React.FC<BreedingContentProps> = (
    {breedingList, handleOpenAddHerdModal, refreshBreedings}
) => {
    const {t} = useTranslation('breedingPage');
    const [breeding, setBreeding] = useState<BreedingResponseDTO>(breedingList[0]);
    const [openAddCowModal, setOpenAddCowModal] = useState(false);
    const [cowSearchParams, setCowSearchParams] = useState<CowSearchParams>(defaultSearchParams);
    const [loading, setLoading] = useState<boolean>(false);
    const [cowsPage, setCowsPage] = useState<Page<CowResponseDTO>>(emptyPage);
    const {enqueueSnackbar} = useSnackbar();

    const relevantSearchParams = useMemo(() => ({
        page: cowSearchParams.page,
        size: cowSearchParams.size,
        sortBy: cowSearchParams.sortBy,
        sortDesc: cowSearchParams.sortDesc,
        gender: cowSearchParams.gender
    }), [cowSearchParams.page, cowSearchParams.size, cowSearchParams.sortBy, cowSearchParams.sortDesc, cowSearchParams.gender]);

    useEffect(() => {
        setBreeding(breedingList[0]);
    }, [breedingList]);

    useEffect(() => {
        handleSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [relevantSearchParams]);

    const handleOpenAddCowModal = () => setOpenAddCowModal(true);
    const handleCloseAddCowModal = () => setOpenAddCowModal(false);

    const handleChangeHerd = (event: SelectChangeEvent) => {
        const breedingIdNum = Number(event.target.value);
        const selectedBreeding = breedingList.find(
            b => b.breedingId === breedingIdNum
        );
        if (selectedBreeding) {
            setBreeding(selectedBreeding);
        }
    };

    const handleSearch = () => {
        setLoading(true);

        if (breeding.breedingId) {
            getCows(breeding.breedingId, cowSearchParams)
                .then(data => {
                    setCowsPage(data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    enqueueSnackbar(t('breedingContent.getCowsErrorSnackbar'), SnackbarError);
                })
        }
    }

    const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        updateSearchParams('page', newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        updateSearchParams('size', parseInt(event.target.value, 10));
        updateSearchParams('page', DEFAULT_PAGE);
    };

    const updateSearchParams = (key: keyof CowSearchParams, value: string | number | boolean | Date | undefined) => {
        setCowSearchParams(prevState => ({...prevState, [key]: value}));
    };

    return (
        <div className="breeding-content-container">
            <div className="breeding-content-header">
                <div className="breeding-content-herd-name">
                    {breeding.breedingName}
                </div>

                {breedingList.length > 1 &&
                    <Select
                        value={breeding.breedingId.toString()}
                        label={t('breedingContent.pickerLabel')}
                        onChange={handleChangeHerd}
                    >
                        {breedingList.map((breeding) => (
                            <MenuItem key={breeding.breedingId} value={breeding.breedingId}>
                                {breeding.breedingName}
                            </MenuItem>
                        ))}
                    </Select>
                }

                <BreedingContentTools
                    handleOpenAddHerdModal={handleOpenAddHerdModal}
                    selectedBreeding={breeding}
                    refreshBreedings={refreshBreedings}
                />

                <Button
                    className="breeding-content-add-cow-button"
                    variant="contained"
                    color="primary"
                    onClick={handleOpenAddCowModal}
                >
                    <GiCow className="breeding-content-add-cow-icon"/>
                    {t('breedingContent.addCowButton')}
                </Button>
            </div>

            <CowBrowser
                updateSearchParams={updateSearchParams}
                handleSearch={handleSearch}
            />

            <CowResults
                loading={loading}
                cowsPage={cowsPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onCowDeleted={handleSearch}
            />

            <AddCowModal
                open={openAddCowModal}
                onClose={handleCloseAddCowModal}
                breedingId={breeding.breedingId}
                onCowAdded={handleSearch}
            />
        </div>
    )
}

export default BreedingContent;