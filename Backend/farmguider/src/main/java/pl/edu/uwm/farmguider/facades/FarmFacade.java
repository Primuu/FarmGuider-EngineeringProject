package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.uwm.farmguider.models.farm.dtos.CowSummaryDTO;
import pl.edu.uwm.farmguider.models.farm.dtos.MilkingSummaryDTO;
import pl.edu.uwm.farmguider.models.breeding.Breeding;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.services.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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

    public MilkingSummaryDTO getMilkingSummary(Long farmId) {
        List<Breeding> breedings = breedingService.getBreedings(farmId);
        List<Cow> cows = cowService.getFemaleCowsByBreedingCollection(breedings);
        List<Cow> currentlyMilkingCows = lactationPeriodService.getCowsCurrentlyInLactationPeriodByCowCollection(cows);

        boolean isMorningMilking = isMorning();
        LocalDateTime[] milkingPeriod = calculateStartAndEndOfMilking(isMorningMilking);
        Integer cowsMilkedNumber = milkingService.getCowsMilkedSumInPeriod(currentlyMilkingCows, milkingPeriod[0], milkingPeriod[1]);

        return MilkingSummaryDTO.builder()
                .isMorning(isMorningMilking)
                .currentlyMilkingCowsNumber(currentlyMilkingCows.size())
                .cowsMilkedNumber(cowsMilkedNumber)
                .build();
    }

    private boolean isMorning() {
        LocalTime now = LocalTime.now();
        return now.isAfter(LocalTime.of(3, 0)) && now.isBefore(LocalTime.of(16, 0));
    }

    private LocalDateTime[] calculateStartAndEndOfMilking(boolean isMorningMilking) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfMilking;
        LocalDateTime endOfMilking;

        if (isMorningMilking) {
            startOfMilking = LocalDateTime.of(now.toLocalDate(), LocalTime.of(3, 0));
            endOfMilking = LocalDateTime.of(now.toLocalDate(), LocalTime.of(16, 0));
        } else {
            if (now.toLocalTime().isBefore(LocalTime.of(3, 0))) {
                startOfMilking = LocalDateTime.of(now.toLocalDate().minusDays(1), LocalTime.of(16, 0));
                endOfMilking = LocalDateTime.of(now.toLocalDate(), LocalTime.of(3, 0));
            } else {
                startOfMilking = LocalDateTime.of(now.toLocalDate(), LocalTime.of(16, 0));
                endOfMilking = LocalDateTime.of(now.toLocalDate().plusDays(1), LocalTime.of(3, 0));
            }
        }

        return new LocalDateTime[]{startOfMilking, endOfMilking};
    }

}
