import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {Button, Typography} from "@mui/material";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent.tsx";
import '@/pages/FieldPage/cropDetails.css';
import CropResponseDTO from "@/entities/CropResponseDTO.ts";
import {FaSeedling} from "react-icons/fa";
import CropTable from "@/pages/FieldPage/CropTable.tsx";
import AddCropModal from "@/pages/FieldPage/modals/AddCropModal.tsx";

type CropDetailsProps = {
    loading: boolean;
    cropList: CropResponseDTO[];
    fieldId: string | undefined;
    onSelectCrop: (cropId: number | null) => void;
    selectedCropId: number | null;
    onCropAdded: () => void;
}

const CropDetails: React.FC<CropDetailsProps> = (
    {loading, cropList, fieldId, onSelectCrop, selectedCropId, onCropAdded}
) => {
    const {t} = useTranslation('fieldPage');
    const [openAddCropModal, setOpenAddCropModal] = useState(false);

    const handleOpenAddCropModal = () => setOpenAddCropModal(true);
    const handleCloseAddCropModal = () => setOpenAddCropModal(false);

    return (
        <div>
            <Typography className="crop-details">
                {t('cropDetails.details')}
            </Typography>
            <div className="crop-container">
                {loading ? (
                    <LoadingComponent/>
                ) : (
                    <CropTable
                        cropList={cropList}
                        onSelectCrop={onSelectCrop}
                        selectedCropId={selectedCropId}
                    />)
                }
            </div>

            {fieldId &&
                <div className="crop-button-container">
                    <Button
                        className="add-crop-button"
                        variant="contained"
                        onClick={handleOpenAddCropModal}
                        color="primary"
                    >
                        <FaSeedling className="add-crop-button-icon"/>
                        {t('cropDetails.addCrop')}
                    </Button>
                </div>
            }

            {fieldId &&
                <AddCropModal
                    open={openAddCropModal}
                    onClose={handleCloseAddCropModal}
                    fieldId={parseInt(fieldId)}
                    onCropAdded={onCropAdded}
                />
            }
        </div>
    )
}

export default CropDetails;