package pl.edu.uwm.farmguider.models.farm.dtos;

import lombok.Builder;

public record MilkingSummaryDTO(Boolean isMorning,
                                Integer currentlyMilkingCowsNumber,
                                Integer cowsMilkedNumber) {

    @Builder
    public MilkingSummaryDTO {}

}
