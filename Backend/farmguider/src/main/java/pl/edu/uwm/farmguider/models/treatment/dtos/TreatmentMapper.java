package pl.edu.uwm.farmguider.models.treatment.dtos;

import pl.edu.uwm.farmguider.models.treatment.Treatment;

public class TreatmentMapper {

    public static TreatmentResponseDTO mapToTreatmentResponseDTO(Treatment treatment) {
        return TreatmentResponseDTO.builder()
                .treatmentId(treatment.getId())
                .treatmentName(treatment.getTreatmentName())
                .treatmentDate(treatment.getTreatmentDate())
                .quantity(treatment.getQuantity())
                .details(treatment.getDetails())
                .build();
    }

}
