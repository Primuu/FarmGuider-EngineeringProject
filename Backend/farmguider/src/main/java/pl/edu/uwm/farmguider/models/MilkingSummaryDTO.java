package pl.edu.uwm.farmguider.models;

import lombok.Builder;

public record MilkingSummaryDTO(Boolean isMorning,
                                Integer currentlyMilkingCowsNumber,
                                Integer cowsMilkedNumber) {

    @Builder
    public MilkingSummaryDTO {}

}
