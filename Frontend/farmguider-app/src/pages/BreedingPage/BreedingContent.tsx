import BreedingResponseDTO from "@/entities/BreedingResponseDTO.ts";
import React, {useEffect, useMemo, useState} from "react";
import {Button, FormControl, InputLabel, Select, SelectChangeEvent} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useTranslation} from "react-i18next";
import BreedingContentTools from "@/pages/BreedingPage/BreedingContentTools.tsx";
import {GiCow} from 'react-icons/gi';
import AddCowModal from "@/pages/BreedingPage/modals/AddCowModal.tsx";
import CowSearchParams from "@/entities/CowSearchParams.ts";
import {DEFAULT_PAGE, emptyPage} from "@/utils/cowBrowserUtils.ts";
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
    breeding: BreedingResponseDTO | null;
    handleChangeHerd: (breedingId: number) => void;
    cowSearchParams: CowSearchParams;
    updateSearchParams: (key: keyof CowSearchParams, value: string | number | boolean | Date | undefined) => void;
}

const BreedingContent: React.FC<BreedingContentProps> = (
    {breedingList, handleOpenAddHerdModal, refreshBreedings, breeding, handleChangeHerd, cowSearchParams, updateSearchParams}
) => {
    const {t} = useTranslation('breedingPage');
    const [openAddCowModal, setOpenAddCowModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [cowsPage, setCowsPage] = useState<Page<CowResponseDTO>>(emptyPage);
    const {enqueueSnackbar} = useSnackbar();

    const relevantSearchParams = useMemo(() => ({
        page: cowSearchParams.page,
        size: cowSearchParams.size,
        sortBy: cowSearchParams.sortBy,
        sortDesc: cowSearchParams.sortDesc,
        earTagNumber: cowSearchParams.earTagNumber,
        gender: cowSearchParams.gender,
        cowName: cowSearchParams.cowName,
        minDateOfBirth: cowSearchParams.minDateOfBirth,
        maxDateOfBirth: cowSearchParams.maxDateOfBirth,
        minWeight: cowSearchParams.minWeight,
        maxWeight: cowSearchParams.maxWeight,
        minMilkingQuantity: cowSearchParams.minMilkingQuantity,
        maxMilkingQuantity: cowSearchParams.maxMilkingQuantity
    }), [
        cowSearchParams.page,
        cowSearchParams.size,
        cowSearchParams.sortBy,
        cowSearchParams.sortDesc,
        cowSearchParams.gender,
        cowSearchParams.earTagNumber,
        cowSearchParams.cowName,
        cowSearchParams.minDateOfBirth,
        cowSearchParams.maxDateOfBirth,
        cowSearchParams.minWeight,
        cowSearchParams.maxWeight,
        cowSearchParams.minMilkingQuantity,
        cowSearchParams.maxMilkingQuantity
    ]);

    useEffect(() => {
        handleSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [relevantSearchParams, breeding]);

    const handleOpenAddCowModal = () => setOpenAddCowModal(true);
    const handleCloseAddCowModal = () => setOpenAddCowModal(false);

    const handleSelectHerd = (event: SelectChangeEvent) => {
        const breedingIdNum = Number(event.target.value);
        handleChangeHerd(breedingIdNum);
    };

    const handleSearch = () => {
        setLoading(true);

        if (breeding && breeding.breedingId) {
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


    if (!breeding) return (<div></div>);

    return (
        <div className="breeding-content-container">
            <div className="breeding-content-header">
                    {breedingList.length > 1 ? (
                            <div className="breeding-content-herd-name">
                            <FormControl
                                size={"small"}
                                className="breeding-content-selector"
                            >
                                <InputLabel>
                                    {t('breedingContent.pickerLabel')}
                                </InputLabel>
                                <Select
                                    value={breeding.breedingId.toString()}
                                    onChange={handleSelectHerd}
                                    label={t('breedingContent.pickerLabel')}
                                >
                                    {breedingList.map((breeding) => (
                                        <MenuItem key={breeding.breedingId} value={breeding.breedingId}>
                                            {breeding.breedingName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        ) : (
                        <div className="breeding-content-herd-name">
                            {breeding.breedingName}
                        </div>
                        )
                    }

                <div className="breeding-content-button-group">
                    <Button
                        className="breeding-content-add-cow-button"
                        variant="contained"
                        color="primary"
                        onClick={handleOpenAddCowModal}
                    >
                        <GiCow className="breeding-content-add-cow-icon"/>
                        {t('breedingContent.addCowButton')}
                    </Button>

                    <BreedingContentTools
                        handleOpenAddHerdModal={handleOpenAddHerdModal}
                        selectedBreeding={breeding}
                        refreshBreedings={refreshBreedings}
                    />
                </div>
            </div>

            <CowBrowser
                updateSearchParams={updateSearchParams}
                cowSearchParams={cowSearchParams}
            />

            <CowResults
                loading={loading}
                cowsPage={cowsPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onCowDeleted={handleSearch}
                setCowsPage={setCowsPage}
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