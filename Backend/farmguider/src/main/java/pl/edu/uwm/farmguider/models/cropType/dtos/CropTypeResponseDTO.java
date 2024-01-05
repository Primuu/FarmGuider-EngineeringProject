package pl.edu.uwm.farmguider.models.cropType.dtos;

import lombok.Builder;
import pl.edu.uwm.farmguider.models.cropType.enums.CropTypeEnum;

import java.math.BigDecimal;

public record CropTypeResponseDTO(String cropType,
                                  String optimalPlantingStartDate,
                                  String optimalPlantingEndDate,
                                  String optimalHarvestStartDate,
                                  String optimalHarvestEndDate,
                                  BigDecimal averageYield) {

    @Builder
    public CropTypeResponseDTO {}

}
