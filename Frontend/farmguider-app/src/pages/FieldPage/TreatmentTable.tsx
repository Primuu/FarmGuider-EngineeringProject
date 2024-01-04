import React from "react";
import {useTranslation} from "react-i18next";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {TreatmentResponseDTO} from "@/entities/TreatmentResponseDTO.ts";
import TreatmentCard from "@/pages/FieldPage/TreatmentCard.tsx";

type TreatmentTableProps = {
    treatmentList: TreatmentResponseDTO[];
    setTreatmentList: (treatmentList: TreatmentResponseDTO[]) => void;
}

const TreatmentTable: React.FC<TreatmentTableProps> = ({treatmentList, setTreatmentList}) => {
    const {t} = useTranslation('fieldPage');

    const handleTreatmentDeleted = (deletedTreatmentId: number) => {
        setTreatmentList(treatmentList.filter(treatment => treatment.treatmentId !== deletedTreatmentId));
    };

    const handleTreatmentUpdated = (updatedTreatment: TreatmentResponseDTO) => {
        setTreatmentList(treatmentList.map(treatment =>
            treatment.treatmentId === updatedTreatment.treatmentId ? updatedTreatment : treatment
        ));
    };

    return (
        <div>
            <TableContainer className="crop-table-container">
                <Table stickyHeader={true}>
                    <TableHead>
                        <TableRow>
                            <TableCell className="c-th">{t('treatmentDetails.treatmentName')}</TableCell>
                            <TableCell className="c-th">{t('treatmentDetails.treatmentDate')}</TableCell>
                            <TableCell className="c-th">{t('treatmentDetails.quantity')}</TableCell>
                            <TableCell className="c-th">{t('treatmentDetails.treatmentDetails')}</TableCell>
                            <TableCell className="c-th">{t('treatmentDetails.actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {treatmentList.length > 0 ? (
                                treatmentList.map(treatment => (
                                    <TreatmentCard
                                        key={treatment.treatmentId}
                                        treatment={treatment}
                                        onTreatmentDeleted={handleTreatmentDeleted}
                                        onTreatmentUpdated={handleTreatmentUpdated}
                                    />
                                )))
                            : (
                                <TableRow>
                                    <TableCell colSpan={5} className="crop-no-results-cell">
                                        <Typography className="crop-no-results">
                                            {t('treatmentDetails.noResults')}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TreatmentTable;