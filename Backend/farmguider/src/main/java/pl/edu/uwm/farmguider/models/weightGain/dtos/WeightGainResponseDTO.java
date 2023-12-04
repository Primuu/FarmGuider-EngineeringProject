package pl.edu.uwm.farmguider.models.weightGain.dtos;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;

public record WeightGainResponseDTO(Long weightGainId,
                                    LocalDate measurementDate,
                                    BigDecimal weight) {

    @Builder
    public WeightGainResponseDTO {}

}
