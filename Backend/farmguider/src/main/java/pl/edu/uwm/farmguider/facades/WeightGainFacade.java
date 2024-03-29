package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.uwm.farmguider.exceptions.global.InvalidDateException;
import pl.edu.uwm.farmguider.models.ChartValueDTO;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.weightGain.WeightGain;
import pl.edu.uwm.farmguider.models.weightGain.dtos.WeightGainCreateDTO;
import pl.edu.uwm.farmguider.models.weightGain.dtos.WeightGainMapper;
import pl.edu.uwm.farmguider.models.weightGain.dtos.WeightGainResponseDTO;
import pl.edu.uwm.farmguider.services.CowService;
import pl.edu.uwm.farmguider.services.WeightGainService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static pl.edu.uwm.farmguider.models.weightGain.dtos.WeightGainMapper.mapToWeightGainResponseDTO;

@Component
@RequiredArgsConstructor
public class WeightGainFacade {

    private final static BigDecimal EMPTY_WEIGHT = null;
    private final static LocalDate EMPTY_MEASUREMENT_DATE = null;
    private final WeightGainService weightGainService;
    private final CowService cowService;

    @Transactional
    public WeightGainResponseDTO createWeightGain(Long cowId, WeightGainCreateDTO weightGainCreateDTO) {
        Cow cow = cowService.getCowById(cowId);
        verifyWeightGainDate(cow.getDateOfBirth(), weightGainCreateDTO.measurementDate());

        if (isLatestWeightGain(cow, weightGainCreateDTO.measurementDate())) {
            cowService.updateCurrentWeight(cow, weightGainCreateDTO.weight(), weightGainCreateDTO.measurementDate());
        }

        WeightGain weightGain = weightGainService.createWeightGain(
                cow,
                weightGainCreateDTO.measurementDate(),
                weightGainCreateDTO.weight()
        );
        return mapToWeightGainResponseDTO(weightGain);
    }

    private boolean isLatestWeightGain(Cow cow, LocalDate measurementDate) {
        return cow.getLatestWeightMeasurementDate() == null || !cow.getLatestWeightMeasurementDate().isAfter(measurementDate);
    }

    private void verifyWeightGainDate(LocalDate dateOfBirth, LocalDate measurementDate) {
        if (measurementDate.isBefore(dateOfBirth)) {
            throw new InvalidDateException("WeightGain", "Weight measurement date cannot be before cow's date of birth.");
        }
    }

    public List<WeightGainResponseDTO> getWeightGainsByCowId(Long cowId) {
        List<WeightGain> weightGains = weightGainService.getWeightGainsByCowId(cowId);
        return weightGains
                .stream()
                .map(WeightGainMapper::mapToWeightGainResponseDTO)
                .sorted(Comparator.comparing(WeightGainResponseDTO::measurementDate).reversed())
                .toList();

    }

    @Transactional
    public WeightGainResponseDTO updateWeightGainById(Long weightGainId, WeightGainCreateDTO weightGainCreateDTO) {
        Cow cow = weightGainService.getCowByWeightGainId(weightGainId);
        verifyWeightGainDate(cow.getDateOfBirth(), weightGainCreateDTO.measurementDate());

        WeightGain weightGain = weightGainService.updateWeightGain(
                weightGainId,
                weightGainCreateDTO.measurementDate(),
                weightGainCreateDTO.weight()
        );
        updateCowCurrentWeightIfNecessary(cow);

        return mapToWeightGainResponseDTO(weightGain);
    }

    private void updateCowCurrentWeightIfNecessary(Cow cow) {
        weightGainService.getWeightGainsByCowId(cow.getId())
                .stream()
                .max(Comparator.comparing(WeightGain::getMeasurementDate))
                .ifPresentOrElse(
                        currentWeight -> cowService.updateCurrentWeight(cow, currentWeight.getWeight(), currentWeight.getMeasurementDate()),
                        () -> cowService.updateCurrentWeight(cow, EMPTY_WEIGHT, EMPTY_MEASUREMENT_DATE)
                );
    }

    @Transactional
    public void deleteWeightGainById(Long weightGainId) {
        Cow cow = weightGainService.getCowByWeightGainId(weightGainId);

        weightGainService.deleteWeightGainById(weightGainId);

        updateCowCurrentWeightIfNecessary(cow);
    }

    public List<ChartValueDTO> getWeightGainChart(Long cowId) {
        Cow cow = cowService.getCowById(cowId);

        LocalDate startDate = cow.getDateOfBirth();
        LocalDate endDate = LocalDate.now();

        List<WeightGain> weightGains = weightGainService.getWeightGainsByCowId(cowId);

        return getChartValueDTOS(weightGains, startDate, endDate);
    }

    private List<ChartValueDTO> getChartValueDTOS(List<WeightGain> weightGains, LocalDate startDate, LocalDate endDate) {
        Map<LocalDate, BigDecimal> dailyWeightGain = aggregateDailyWeightGain(weightGains);

        return Stream.iterate(startDate, date -> !date.isAfter(endDate), date -> date.plusDays(1))
                .filter(date -> date.isEqual(startDate) ||
                        date.isEqual(endDate) ||
                        date.getDayOfMonth() == 1 && date.getMonthValue() % 3 == 0 ||
                        dailyWeightGain.containsKey(date))
                .map(date -> ChartValueDTO.builder()
                        .date(date)
                        .value(dailyWeightGain.getOrDefault(date, null))
                        .build())
                .collect(Collectors.toList());
    }

    private Map<LocalDate, BigDecimal> aggregateDailyWeightGain(List<WeightGain> weightGains) {
        return weightGains.stream()
                .collect(Collectors.toMap(
                        WeightGain::getMeasurementDate,
                        Function.identity(),
                        (wg1, wg2) -> wg1.getId().compareTo(wg2.getId()) > 0 ? wg1 : wg2
                ))
                .entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue().getWeight()
                ));
    }

}
