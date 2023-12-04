package pl.edu.uwm.farmguider.models.cow.dtos;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CowPageResponseDTO(Long cowId,
                                 String cowName,
                                 String earTagNumber,
                                 LocalDate dateOfBirth,
                                 String gender,
                                 BigDecimal currentWeight,
                                 BigDecimal latestMilkingQuantity) {

    @Builder
    public CowPageResponseDTO {
    }

}
