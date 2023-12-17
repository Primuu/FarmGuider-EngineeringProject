package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.uwm.farmguider.exceptions.global.InvalidDateException;
import pl.edu.uwm.farmguider.models.ChartValueDTO;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.lactationPeriod.LactationPeriod;
import pl.edu.uwm.farmguider.models.milking.Milking;
import pl.edu.uwm.farmguider.models.milking.dtos.MilkingCreateDTO;
import pl.edu.uwm.farmguider.models.milking.dtos.MilkingMapper;
import pl.edu.uwm.farmguider.models.milking.dtos.MilkingResponseDTO;
import pl.edu.uwm.farmguider.services.CowService;
import pl.edu.uwm.farmguider.services.LactationPeriodService;
import pl.edu.uwm.farmguider.services.MilkingService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static pl.edu.uwm.farmguider.models.milking.dtos.MilkingMapper.mapToMilkingResponseDTO;
import static pl.edu.uwm.farmguider.utils.GenderUtils.verifyIsFemale;

@Component
@RequiredArgsConstructor
public class MilkingFacade {

    private final static BigDecimal EMPTY_MILKING_QUANTITY = null;
    private final static LocalDateTime EMPTY_MILKING_DATE = null;
    private final MilkingService milkingService;
    private final CowService cowService;
    private final LactationPeriodService lactationPeriodService;

    @Transactional
    public MilkingResponseDTO createMilking(Long cowId, MilkingCreateDTO milkingCreateDTO) {
        Cow cow = cowService.getCowById(cowId);

        verifyIsFemale(cow.getGender());
        verifyMilkingDate(cow.getDateOfBirth(), milkingCreateDTO.dateOfMilking());

        if (isLatestMilking(cow, milkingCreateDTO.dateOfMilking())) {
            cowService.updateLatestMilkingQuantity(cow, milkingCreateDTO.milkQuantity(), milkingCreateDTO.dateOfMilking());
        }

        Milking milking = milkingService.createMilking(
                cow,
                milkingCreateDTO.dateOfMilking(),
                milkingCreateDTO.milkQuantity(),
                milkingCreateDTO.milkingDuration()
        );
        return mapToMilkingResponseDTO(milking);
    }

    private boolean isLatestMilking(Cow cow, LocalDateTime dateOfMilking) {
        return cow.getLatestMilkingDate() == null || !cow.getLatestMilkingDate().isAfter(dateOfMilking);
    }

    private void verifyMilkingDate(LocalDate dateOfBirth, LocalDateTime dateOfMilking) {
        if (dateOfMilking.toLocalDate().isBefore(dateOfBirth)) {
            throw new InvalidDateException("Milking", "Milking date cannot be before cow's date of birth.");
        }
    }

    public List<MilkingResponseDTO> getMilkingsByCowId(Long cowId) {
        List<Milking> milkings = milkingService.getMilkingsByCowId(cowId);
        return milkings
                .stream()
                .map(MilkingMapper::mapToMilkingResponseDTO)
                .sorted(Comparator.comparing(MilkingResponseDTO::dateOfMilking).reversed())
                .toList();
    }

    @Transactional
    public MilkingResponseDTO updateMilkingById(Long milkingId, MilkingCreateDTO milkingCreateDTO) {
        Cow cow = milkingService.getCowByMilkingId(milkingId);
        verifyMilkingDate(cow.getDateOfBirth(), milkingCreateDTO.dateOfMilking());

        Milking milking = milkingService.updateMilking(
                milkingId,
                milkingCreateDTO.dateOfMilking(),
                milkingCreateDTO.milkQuantity(),
                milkingCreateDTO.milkingDuration()
        );
        updateCowLatestMilkingIfNecessary(cow);

        return mapToMilkingResponseDTO(milking);
    }

    private void updateCowLatestMilkingIfNecessary(Cow cow) {
        milkingService.getMilkingsByCowId(cow.getId())
                .stream()
                .max(Comparator.comparing(Milking::getDateOfMilking))
                .ifPresentOrElse(
                        latestMilking -> cowService.updateLatestMilkingQuantity(cow, latestMilking.getMilkQuantity(), latestMilking.getDateOfMilking()),
                        () -> cowService.updateLatestMilkingQuantity(cow, EMPTY_MILKING_QUANTITY, EMPTY_MILKING_DATE)
                );
    }

    @Transactional
    public void deleteMilkingById(Long milkingId) {
        Cow cow = milkingService.getCowByMilkingId(milkingId);

        milkingService.deleteMilkingById(milkingId);

        updateCowLatestMilkingIfNecessary(cow);
    }

    public List<ChartValueDTO> getMilkingChart(Long lactationPeriodId) {
        LactationPeriod lactationPeriod = lactationPeriodService.getLactationPeriodById(lactationPeriodId);
        Cow cow = lactationPeriodService.getCowByLactationPeriodId(lactationPeriodId);

        LocalDate startDate = lactationPeriod.getStartDate();
        LocalDate endDate = lactationPeriod.getEndDate() == null ? LocalDate.now() : lactationPeriod.getEndDate();

        List<Milking> milkings = milkingService.getMilkingsByCowIdAndDatesBetween(cow.getId(), startDate, endDate);

        return getChartValueDTOS(milkings, startDate, endDate);
    }

    private List<ChartValueDTO> getChartValueDTOS(List<Milking> milkings, LocalDate startDate, LocalDate endDate) {
        Map<LocalDate, BigDecimal> dailyMilkSum = aggregateDailyMilkSum(milkings);

        return Stream.iterate(startDate, date -> !date.isAfter(endDate), date -> date.plusDays(1))
                .map(date -> ChartValueDTO.builder()
                        .date(date)
                        .value(dailyMilkSum.getOrDefault(date, null))
                        .build())
                .collect(Collectors.toList());
    }

    private Map<LocalDate, BigDecimal> aggregateDailyMilkSum(List<Milking> milkings) {
        return milkings.stream()
                .collect(Collectors.groupingBy(
                        milking -> milking.getDateOfMilking().toLocalDate(),
                        Collectors.reducing(
                                BigDecimal.ZERO,
                                Milking::getMilkQuantity,
                                BigDecimal::add
                        )
                ));
    }

}
