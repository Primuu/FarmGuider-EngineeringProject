package pl.edu.uwm.farmguider.models.crop.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

import java.time.LocalDate;

public record CropCreateDTO(@NotNull(message = "Crop type cannot be empty.")
                            String cropType,
                            @NotNull(message = "Sowing date field must be filled in.")
                            @PastOrPresent(message = "Sowing date cannot be a future date.")
                            LocalDate sowingDate) {
}
