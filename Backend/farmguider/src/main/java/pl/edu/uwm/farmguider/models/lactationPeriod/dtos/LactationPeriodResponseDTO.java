package pl.edu.uwm.farmguider.models.lactationPeriod.dtos;

import lombok.Builder;

import java.time.LocalDate;

public record LactationPeriodResponseDTO(Long lactationPeriodId,
                                         LocalDate startDate,
                                         LocalDate endDate) {

    @Builder
    public LactationPeriodResponseDTO {}

}
