package pl.edu.uwm.farmguider.models.cropType.dtos;

import pl.edu.uwm.farmguider.models.cropType.CropType;

public class CropTypeMapper {

    public static CropTypeResponseDTO mapToCropTypeResponseDTO(CropType cropType) {
        return CropTypeResponseDTO.builder()
                .cropType(cropType.getCropType().name())
                .optimalPlantingStartDate(cropType.getOptimalPlantingStartDate())
                .optimalPlantingEndDate(cropType.getOptimalPlantingEndDate())
                .optimalHarvestStartDate(cropType.getOptimalHarvestStartDate())
                .optimalHarvestEndDate(cropType.getOptimalHarvestEndDate())
                .averageYield(cropType.getAverageYield())
                .build();
    }

}
