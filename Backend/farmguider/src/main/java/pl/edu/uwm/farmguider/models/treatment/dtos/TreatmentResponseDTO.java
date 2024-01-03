package pl.edu.uwm.farmguider.models.treatment.dtos;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TreatmentResponseDTO(Long treatmentId,
                                   String treatmentName,
                                   LocalDate treatmentDate,
                                   BigDecimal quantity,
                                   String details) {

    @Builder
    public TreatmentResponseDTO {}

}
