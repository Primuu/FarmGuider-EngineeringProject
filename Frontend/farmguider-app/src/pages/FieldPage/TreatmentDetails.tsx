import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {Button, Typography} from "@mui/material";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent.tsx";
import {GiFertilizerBag} from "react-icons/gi";
import '@/pages/FieldPage/cropDetails.css';
import {TreatmentResponseDTO} from "@/entities/TreatmentResponseDTO.ts";
import TreatmentTable from "@/pages/FieldPage/TreatmentTable.tsx";
import AddTreatmentModal from "@/pages/FieldPage/modals/AddTreatmentModal.tsx";

type TreatmentDetailsProps = {
    selectedCropId: number | null;
    loading: boolean;
    treatmentList: TreatmentResponseDTO[];
    setTreatmentList: (treatmentList: TreatmentResponseDTO[]) => void;
    onTreatmentAdded: () => void;
}

const TreatmentDetails: React.FC<TreatmentDetailsProps> = (
    {selectedCropId, loading, treatmentList, setTreatmentList, onTreatmentAdded}
) => {
    const {t} = useTranslation('fieldPage');
    const [openAddTreatmentModal, setOpenAddTreatmentModal] = useState(false);

    const handleOpenAddTreatmentModal = () => setOpenAddTreatmentModal(true);
    const handleCloseAddTreatmentModal = () => setOpenAddTreatmentModal(false);

    return (
        <div className="crop-main-container">
            <Typography className="crop-details">
                {t('treatmentDetails.details')}
            </Typography>
            <div className="crop-container">
                {!selectedCropId && (
                    <div className="treatment-not-selected">
                        {t('treatmentDetails.treatmentNotSelected')}
                    </div>
                )}

                {loading && selectedCropId && (
                    <LoadingComponent/>
                )}

                {!loading && selectedCropId && (
                    <TreatmentTable
                        treatmentList={treatmentList}
                        setTreatmentList={setTreatmentList}
                    />
                )}
            </div>

            <div className="crop-button-container">
                <Button
                    className="add-crop-button"
                    variant="contained"
                    onClick={handleOpenAddTreatmentModal}
                    color="primary"
                    disabled={!selectedCropId}
                >
                    <GiFertilizerBag className="add-crop-button-icon"/>
                    {t('treatmentDetails.addTreatment')}
                </Button>
            </div>

            {selectedCropId &&
                <AddTreatmentModal
                    open={openAddTreatmentModal}
                    onClose={handleCloseAddTreatmentModal}
                    cropId={selectedCropId}
                    onTreatmentAdded={onTreatmentAdded}
                />
            }
        </div>
    )
}

export default TreatmentDetails;