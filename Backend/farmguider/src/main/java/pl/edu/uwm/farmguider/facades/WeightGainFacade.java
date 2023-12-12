package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.uwm.farmguider.exceptions.global.InvalidDateException;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.weightGain.WeightGain;
import pl.edu.uwm.farmguider.models.weightGain.dtos.WeightGainCreateDTO;
import pl.edu.uwm.farmguider.models.weightGain.dtos.WeightGainMapper;
import pl.edu.uwm.farmguider.models.weightGain.dtos.WeightGainResponseDTO;
import pl.edu.uwm.farmguider.services.CowService;
import pl.edu.uwm.farmguider.services.WeightGainService;

import java.time.LocalDate;
import java.util.List;

import static pl.edu.uwm.farmguider.models.weightGain.dtos.WeightGainMapper.mapToWeightGainResponseDTO;

@Component
@RequiredArgsConstructor
public class WeightGainFacade {

    private final WeightGainService weightGainService;
    private final CowService cowService;

    @Transactional
    public WeightGainResponseDTO createWeightGain(Long cowId, WeightGainCreateDTO weightGainCreateDTO) {
        Cow cow = cowService.getCowById(cowId);

        if (weightGainCreateDTO.measurementDate().isBefore(cow.getDateOfBirth())) {
            throw new InvalidDateException("WeightGain", "Weight measurement date cannot be before cow's date of birth.");
        }

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

    public List<WeightGainResponseDTO> getWeightGainsByCowId(Long cowId) {
        List<WeightGain> weightGains = weightGainService.getWeightGainsByCowId(cowId);
        return weightGains
                .stream()
                .map(WeightGainMapper::mapToWeightGainResponseDTO)
                .toList();

    }

}
