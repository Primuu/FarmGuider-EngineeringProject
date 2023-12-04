package pl.edu.uwm.farmguider.models.weightGain.dtos;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

import java.math.BigDecimal;
import java.time.LocalDate;

public record WeightGainCreateDTO(@NotNull(message = "Measurement date field must be filled in.")
                                  @PastOrPresent(message = "Measurement date cannot be a future date.")
                                  LocalDate measurementDate,
                                  @NotNull(message = "Weight field must be filled in.")
                                  @DecimalMin(value = "0.000", message = "Weight cannot be negative.")
                                  @Digits(integer = 4, fraction = 3, message = "Weight must be within the range of 0.000 to 9999.999.")
                                  BigDecimal weight) {
}
