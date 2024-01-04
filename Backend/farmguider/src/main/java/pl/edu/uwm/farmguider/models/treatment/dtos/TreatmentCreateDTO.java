package pl.edu.uwm.farmguider.models.treatment.dtos;

import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.Length;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TreatmentCreateDTO(@NotBlank(message = "Treatment name must be filled in.")
                                 @Length(min = 3, max = 45, message = "Treatment name must be between 3 and 45 characters.")
                                 String treatmentName,
                                 @NotNull(message = "Treatment date field must be filled in.")
                                 @PastOrPresent(message = "Treatment date cannot be a future date.")
                                 LocalDate treatmentDate,
                                 @NotNull(message = "Quantity field must be filled in.")
                                 @DecimalMin(value = "0.00", message = "Quantity cannot be negative.")
                                 @Digits(integer = 8, fraction = 2, message = "Quantity must be within the range of 0.00 to 99999999.99.")
                                 BigDecimal quantity,
                                 @Length(max = 255, message = "Details can contain a maximum of 255 characters.")
                                 String details) {
}
