package pl.edu.uwm.farmguider.models.crop.dtos;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CropResponseDTO(Long cropId,
                              String cropType,
                              LocalDate sowingDate,
                              LocalDate harvestDate,
                              LocalDate expectedHarvestStartDate,
                              LocalDate expectedHarvestEndDate,
                              BigDecimal yield,
                              BigDecimal expectedYield) {

    @Builder
    public CropResponseDTO {}

}
