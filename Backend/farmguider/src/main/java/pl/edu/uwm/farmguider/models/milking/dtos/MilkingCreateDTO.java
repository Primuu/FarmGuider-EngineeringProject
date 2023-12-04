package pl.edu.uwm.farmguider.models.milking.dtos;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record MilkingCreateDTO(@NotNull(message = "Date of milking field must be filled in.")
                               @PastOrPresent(message = "Date of milking cannot be a future date.")
                               LocalDateTime dateOfMilking,
                               @NotNull(message = "Milk quantity field must be filled in.")
                               @DecimalMin(value = "0.000", message = "Milk quantity cannot be negative.")
                               @Digits(integer = 3, fraction = 3, message = "Milk quantity must be within the range of 0.000 to 999.999.")
                               BigDecimal milkQuantity,
                               @Min(value = 0, message = "Milking duration cannot be negative.")
                               Integer milkingDuration) {
}
