package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.uwm.farmguider.models.CowSummaryDTO;
import pl.edu.uwm.farmguider.models.breeding.Breeding;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.services.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class FarmFacade {

    private final FarmService farmService;
    private final BreedingService breedingService;
    private final CowService cowService;
    private final LactationPeriodService lactationPeriodService;
    private final MilkingService milkingService;

    public Long getFarmIdByOwnerId(Long ownerId) {
        return farmService.getFarmByOwnerId(ownerId).getId();
    }

    public CowSummaryDTO getCowSummary(Long farmId) {
        List<Breeding> breedings = breedingService.getBreedings(farmId);
        List<Cow> cows = cowService.getFemaleCowsByBreedingCollection(breedings);

        Integer bullsNumber = cowService.getMaleCowsByBreedingCollection(breedings).size();
        Integer cowsNumber = cows.size();
        Integer totalMilkingCowsNumber = lactationPeriodService.getCowsNumberWithLactationPeriodsByCowCollection(cows);
        Integer currentlyMilkingCowsNumber = lactationPeriodService.getCowsNumberCurrentlyInCLactationPeriodByCowCollection(cows);
        BigDecimal yesterdayMilkingSum = milkingService.getMilkingSumByCowCollectionAndDate(cows, LocalDate.now().minusDays(1));
        BigDecimal todayMilkingSum = milkingService.getMilkingSumByCowCollectionAndDate(cows, LocalDate.now());

        return CowSummaryDTO.builder()
                .totalCowsNumber(cowsNumber + bullsNumber)
                .bullsNumber(bullsNumber)
                .cowsNumber(cowsNumber)
                .totalMilkingCowsNumber(totalMilkingCowsNumber)
                .currentlyMilkingCowsNumber(currentlyMilkingCowsNumber)
                .yesterdayMilkingSum(yesterdayMilkingSum == null ? BigDecimal.ZERO : yesterdayMilkingSum.setScale(2, RoundingMode.HALF_UP))
                .todayMilkingSum(todayMilkingSum == null ? BigDecimal.ZERO : todayMilkingSum.setScale(2, RoundingMode.HALF_UP))
                .build();
    }

}
