package pl.edu.uwm.farmguider.models.field.dtos;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import java.math.BigDecimal;

public record FieldCreateDTO(@NotBlank(message = "Field name must be filled in.")
                             @Length(min = 1, max = 45, message = "Field name can contain a maximum of 45 characters.")
                             String fieldName,
                             @NotNull(message = "Field area field must be filled in.")
                             @DecimalMin(value = "0.00", message = "Field area cannot be negative.")
                             @Digits(integer = 3, fraction = 2, message = "Field area must be within the range of 0.00 to 999.99.")
                             BigDecimal fieldArea,
                             @NotNull(message = "Soil class cannot be empty.")
                             String soilClass) {
}
