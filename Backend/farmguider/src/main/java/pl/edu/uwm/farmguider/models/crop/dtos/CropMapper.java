package pl.edu.uwm.farmguider.models.crop.dtos;

import pl.edu.uwm.farmguider.models.crop.Crop;

public class CropMapper {

    public static CropResponseDTO mapToCropResponseDTO(Crop crop) {
        return CropResponseDTO.builder()
                .cropId(crop.getId())
                .cropType(crop.getCropType().name())
                .sowingDate(crop.getSowingDate())
                .harvestDate(crop.getHarvestDate())
                .expectedHarvestStartDate(crop.getExpectedHarvestStartDate())
                .expectedHarvestEndDate(crop.getExpectedHarvestEndDate())
                .yield(crop.getYield())
                .expectedYield(crop.getExpectedYield())
                .build();
    }

}
