package pl.edu.uwm.farmguider.models.cow.dtos;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CowResponseDTO(Long cowId,
                             String cowName,
                             String earTagNumber,
                             LocalDate dateOfBirth,
                             String gender,
                             BigDecimal currentWeight,
                             BigDecimal latestMilkingQuantity) {

    @Builder
    public CowResponseDTO {}

}
