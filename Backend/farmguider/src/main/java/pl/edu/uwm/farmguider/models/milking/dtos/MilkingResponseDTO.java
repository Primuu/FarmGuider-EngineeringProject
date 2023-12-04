package pl.edu.uwm.farmguider.models.milking.dtos;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record MilkingResponseDTO(Long milkingId,
                                 LocalDateTime dateOfMilking,
                                 BigDecimal milkQuantity,
                                 Integer milkingDuration) {

    @Builder
    public MilkingResponseDTO {}

}
