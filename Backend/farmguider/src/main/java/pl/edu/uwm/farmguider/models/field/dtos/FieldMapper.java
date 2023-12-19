package pl.edu.uwm.farmguider.models.field.dtos;

import pl.edu.uwm.farmguider.models.field.Field;

public class FieldMapper {

    public static FieldResponseDTO mapToFieldResponseDTO(Field field) {
        return FieldResponseDTO.builder()
                .fieldId(field.getId())
                .fieldName(field.getFieldName())
                .fieldArea(field.getFieldArea())
                .soilClass(field.getSoilClass().name())
                .build();
    }

}
