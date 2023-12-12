package pl.edu.uwm.farmguider.models.lactationPeriod.dtos;

import pl.edu.uwm.farmguider.models.lactationPeriod.LactationPeriod;

public class LactationPeriodMapper {

    public static LactationPeriodResponseDTO mapToLactationPeriodResponseDTO(LactationPeriod lactationPeriod) {
        return LactationPeriodResponseDTO.builder()
                .lactationPeriodId(lactationPeriod.getId())
                .startDate(lactationPeriod.getStartDate())
                .endDate(lactationPeriod.getEndDate())
                .build();
    }

}
