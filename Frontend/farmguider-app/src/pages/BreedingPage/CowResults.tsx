import Page from "@/entities/Page.ts";
import CowResponseDTO from "@/entities/CowResponseDTO.ts";
import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
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
}

const CowResults: React.FC<CowResultsProps> = (
    {loading, cowsPage, onPageChange, onRowsPerPageChange, onCowDeleted}
) => {
    const {t} = useTranslation('breedingPage');

    const labelDisplayedRows = ({from, to, count}: LabelDisplayedRowsArgs) => {
        return t('cowResults.page', {from, to, count});
    };

    const labelRowsPerPage = t('cowResults.rows');

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('cowResults.gender')}</TableCell>
                            <TableCell>{t('cowResults.earTagNumber')}</TableCell>
                            <TableCell>{t('cowResults.cowName')}</TableCell>
                            <TableCell>{t('cowResults.dateOfBirth')}</TableCell>
                            <TableCell>{t('cowResults.currentWeight')}</TableCell>
                            <TableCell>{t('cowResults.latestMilking')}</TableCell>
                            <TableCell>{t('cowResults.milking')}</TableCell>
                            <TableCell>{t('cowResults.weighting')}</TableCell>
                            <TableCell>{t('cowResults.editing')}</TableCell>
                            <TableCell>{t('cowResults.deleting')}</TableCell>
                        </TableRow>
                    </TableHead>
                    {loading ? (
                        <LoadingComponent/>
                    ) : (
                        <TableBody>
                            {cowsPage.content.map(cow => (
                                <CowCard
                                    key={cow.cowId}
                                    cow={cow}
                                    onCowDeleted={onCowDeleted}
                                />
                            ))}
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            <TablePagination
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