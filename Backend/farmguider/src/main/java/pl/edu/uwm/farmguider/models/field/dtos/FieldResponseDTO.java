package pl.edu.uwm.farmguider.models.field.dtos;

import lombok.Builder;

import java.math.BigDecimal;

public record FieldResponseDTO(Long fieldId,
                               String fieldName,
                               BigDecimal fieldArea,
                               String soilClass) {

    @Builder
    public FieldResponseDTO {}

}
