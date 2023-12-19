package pl.edu.uwm.farmguider.models.field.dtos;

import java.math.BigDecimal;

public record FieldSearchParams(String fieldName,
                                BigDecimal fieldAreaFrom,
                                BigDecimal fieldAreaTo,
                                String soilClass) {

}
