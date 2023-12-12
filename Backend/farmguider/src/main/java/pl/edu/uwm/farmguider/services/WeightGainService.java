package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.weightGain.WeightGain;
import pl.edu.uwm.farmguider.repositories.WeightGainRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WeightGainService {

    private final WeightGainRepository weightGainRepository;

    public WeightGain createWeightGain(Cow cow, LocalDate measurementDate, BigDecimal weight) {
        WeightGain weightGain = new WeightGain(cow, measurementDate, weight);
        return weightGainRepository.saveAndFlush(weightGain);
    }

    public List<WeightGain> getWeightGainsByCowId(Long cowId) {
        return weightGainRepository.findAllByCowId(cowId);
    }

}
