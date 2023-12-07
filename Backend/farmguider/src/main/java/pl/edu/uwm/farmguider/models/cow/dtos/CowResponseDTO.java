package pl.edu.uwm.farmguider.models.cow.dtos;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record CowResponseDTO(Long cowId,
                             String cowName,
                             String earTagNumber,
                             LocalDate dateOfBirth,
                             String gender,
                             BigDecimal currentWeight,
                             BigDecimal latestMilkingQuantity,
                             LocalDateTime latestMilkingDate,
                             LocalDate latestWeightMeasurementDate) {

    @Builder
    public CowResponseDTO {}

}
