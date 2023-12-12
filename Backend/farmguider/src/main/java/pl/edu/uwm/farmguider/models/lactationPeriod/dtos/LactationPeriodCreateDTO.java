package pl.edu.uwm.farmguider.models.lactationPeriod.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

import java.time.LocalDate;

public record LactationPeriodCreateDTO(@NotNull(message = "Lactation period start date field must be filled in.")
                                       @PastOrPresent(message = "Lactation period start date cannot be a future date.")
                                       LocalDate startDate,
                                       LocalDate endDate) {
}
