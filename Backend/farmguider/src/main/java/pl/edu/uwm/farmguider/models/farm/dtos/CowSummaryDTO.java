package pl.edu.uwm.farmguider.models.farm.dtos;

import lombok.Builder;

import java.math.BigDecimal;

public record CowSummaryDTO(Integer totalCowsNumber,
                            Integer bullsNumber,
                            Integer cowsNumber,
                            Integer totalMilkingCowsNumber,
                            Integer currentlyMilkingCowsNumber,
                            BigDecimal yesterdayMilkingSum,
                            BigDecimal todayMilkingSum) {

    @Builder
    public CowSummaryDTO {}

}
