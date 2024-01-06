package pl.edu.uwm.farmguider.models.farm.dtos;

import lombok.Builder;

import java.math.BigDecimal;

public record FieldSummaryDTO(String cropType,
                              BigDecimal area) {

    @Builder
    public FieldSummaryDTO {}

}
