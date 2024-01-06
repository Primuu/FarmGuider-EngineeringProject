package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.uwm.farmguider.models.breeding.Breeding;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.crop.Crop;
import pl.edu.uwm.farmguider.models.farm.dtos.CowSummaryDTO;
import pl.edu.uwm.farmguider.models.farm.dtos.FieldSummaryDTO;
import pl.edu.uwm.farmguider.models.farm.dtos.MilkingSummaryDTO;
import pl.edu.uwm.farmguider.models.field.Field;
import pl.edu.uwm.farmguider.services.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class FarmFacade {

    private static final Integer MORNING_HOUR = 3;
    private static final Integer EVENING_HOUR = 16;
    private static final Integer ZERO_MINUTES = 0;
    private static final String NOT_PLANTED = "NOT_PLANTED";
    private final FarmService farmService;
    private final BreedingService breedingService;
    private final CowService cowService;
    private final LactationPeriodService lactationPeriodService;
    private final MilkingService milkingService;
    private final FieldService fieldService;
    private final CropService cropService;

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

    public List<FieldSummaryDTO> getFieldSummary(Long farmId) {
        List<Field> fields = fieldService.getAllFieldsByFarmId(farmId);
        LocalDate lastYear = LocalDate.now().minusYears(1).withDayOfYear(1);
        List<Crop> cropsSinceLastYear = cropService.getCropsSownAfterDate(farmId, lastYear);

        Map<String, BigDecimal> cropTypeToArea = new HashMap<>();
        for (Field field : fields) {
            List<Crop> fieldCrops = cropsSinceLastYear.stream()
                    .filter(crop -> crop.getField().equals(field))
                    .toList();

            boolean hasOngoingCrops = false;
            for (Crop crop : fieldCrops) {
                if (crop.getHarvestDate() == null) {
                    hasOngoingCrops = true;
                    cropTypeToArea.merge(crop.getCropType().name(), field.getFieldArea(), BigDecimal::add);
                }
            }

            if (!hasOngoingCrops) {
                cropTypeToArea.merge(NOT_PLANTED, field.getFieldArea(), BigDecimal::add);
            }
        }

        return cropTypeToArea.entrySet().stream()
                .map(entry -> FieldSummaryDTO.builder()
                        .cropType(entry.getKey())
                        .area(entry.getValue())
                        .build())
                .collect(Collectors.toList());
    }

    private boolean isMorning() {
        LocalTime now = LocalTime.now();
        return now.isAfter(LocalTime.of(MORNING_HOUR, ZERO_MINUTES)) && now.isBefore(LocalTime.of(EVENING_HOUR, ZERO_MINUTES));
    }

    private LocalDateTime[] calculateStartAndEndOfMilking(boolean isMorningMilking) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfMilking;
        LocalDateTime endOfMilking;

        if (isMorningMilking) {
            startOfMilking = LocalDateTime.of(now.toLocalDate(), LocalTime.of(MORNING_HOUR, ZERO_MINUTES));
            endOfMilking = LocalDateTime.of(now.toLocalDate(), LocalTime.of(EVENING_HOUR, ZERO_MINUTES));
        } else {
            if (now.toLocalTime().isBefore(LocalTime.of(MORNING_HOUR, ZERO_MINUTES))) {
                startOfMilking = LocalDateTime.of(now.toLocalDate().minusDays(1), LocalTime.of(EVENING_HOUR, ZERO_MINUTES));
                endOfMilking = LocalDateTime.of(now.toLocalDate(), LocalTime.of(MORNING_HOUR, ZERO_MINUTES));
            } else {
                startOfMilking = LocalDateTime.of(now.toLocalDate(), LocalTime.of(EVENING_HOUR, ZERO_MINUTES));
                endOfMilking = LocalDateTime.of(now.toLocalDate().plusDays(1), LocalTime.of(MORNING_HOUR, ZERO_MINUTES));
            }
        }

        return new LocalDateTime[]{startOfMilking, endOfMilking};
    }

}
