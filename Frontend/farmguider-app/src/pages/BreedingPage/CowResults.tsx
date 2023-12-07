import Page from "@/entities/Page.ts";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography} from "@mui/material";
import CowCard from "@/pages/BreedingPage/CowCard.tsx";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent.tsx";
import {useTranslation} from "react-i18next";
import '@/pages/BreedingPage/cowResults.css';
import {LabelDisplayedRowsArgs} from '@mui/material/TablePagination';

type CowResultsProps = {
    loading: boolean;
    cowsPage: Page<CowResponseDTO>
    onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onCowDeleted: () => void;
    setCowsPage: React.Dispatch<React.SetStateAction<Page<CowResponseDTO>>>;
}

const CowResults: React.FC<CowResultsProps> = (
    {loading, cowsPage, onPageChange, onRowsPerPageChange, onCowDeleted, setCowsPage}
) => {
    const {t} = useTranslation('breedingPage');

    const handleCowUpdated = (updatedCow: CowResponseDTO) => {
        const updatedCows = cowsPage.content.map(cow =>
            cow.cowId === updatedCow.cowId ? updatedCow : cow
        );
        setCowsPage({...cowsPage, content: updatedCows});
    };

    const labelDisplayedRows = ({from, to, count}: LabelDisplayedRowsArgs) => {
        return t('cowResults.page', {from, to, count});
    };

    const labelRowsPerPage = t('cowResults.rows');

    return (
        <div className="cows-table-container">
            <div>
                <TableContainer className="table-body-container">
                    <Table stickyHeader={true}>
                        <TableHead>
                            <TableRow>
                                <TableCell className="th-l">{t('cowResults.gender')}</TableCell>
                                <TableCell className="th">{t('cowResults.earTagNumber')}</TableCell>
                                <TableCell className="th">{t('cowResults.cowName')}</TableCell>
                                <TableCell className="th">{t('cowResults.dateOfBirth')}</TableCell>
                                <TableCell className="th">{t('cowResults.currentWeight')}</TableCell>
                                <TableCell className="th">{t('cowResults.latestMilking')}</TableCell>
                                <TableCell className="th">{t('cowResults.milking')}</TableCell>
                                <TableCell className="th">{t('cowResults.weighting')}</TableCell>
                                <TableCell className="th">{t('cowResults.editing')}</TableCell>
                                <TableCell className="th-r">{t('cowResults.deleting')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={10}>
                                        <LoadingComponent/>
                                    </TableCell>
                                </TableRow>
                            ) : cowsPage.content.length > 0 ? (
                                cowsPage.content.map(cow => (
                                        <CowCard
                                            key={cow.cowId}
                                            cow={cow}
                                            onCowDeleted={onCowDeleted}
                                            onCowUpdated={handleCowUpdated}
                                        />
                                    )))
                                : (
                                    <TableRow>
                                        <TableCell colSpan={10}>
                                            <Typography className="no-results">
                                                {t('cowResults.noResults')}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <TablePagination
                className="cows-paginator"
                component="div"
                count={cowsPage.totalElements}
                page={cowsPage.pageable.pageNumber}
                onPageChange={onPageChange}
                rowsPerPage={cowsPage.pageable.pageSize}
                onRowsPerPageChange={onRowsPerPageChange}
                labelDisplayedRows={labelDisplayedRows}
                labelRowsPerPage={labelRowsPerPage}
            />
        </div>
    );
};

export default CowResults;