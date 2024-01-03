package pl.edu.uwm.farmguider.models.crop.dtos;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

import java.math.BigDecimal;
import java.time.LocalDate;

public record HarvestCreateDTO(@NotNull(message = "Harvest date field must be filled in.")
                               @PastOrPresent(message = "Harvest date cannot be a future date.")
                               LocalDate harvestDate,
                               @NotNull(message = "Yield field must be filled in.")
                               @DecimalMin(value = "0.000", message = "Yield cannot be negative.")
                               @Digits(integer = 3, fraction = 3, message = "Yield must be within the range of 0.000 to 999.999.")
                               BigDecimal yield) {
}
