package pl.edu.uwm.farmguider.models.weightGain.dtos;

import pl.edu.uwm.farmguider.models.weightGain.WeightGain;

public class WeightGainMapper {

    public static WeightGainResponseDTO mapToWeightGainResponseDTO(WeightGain weightGain) {
        return WeightGainResponseDTO.builder()
                .weightGainId(weightGain.getId())
                .measurementDate(weightGain.getMeasurementDate())
                .weight(weightGain.getWeight())
                .build();
    }

}
