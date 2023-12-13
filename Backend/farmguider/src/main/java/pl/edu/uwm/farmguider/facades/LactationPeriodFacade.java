package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.uwm.farmguider.exceptions.global.InvalidDateException;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.lactationPeriod.LactationPeriod;
import pl.edu.uwm.farmguider.models.lactationPeriod.dtos.LactationPeriodCreateDTO;
import pl.edu.uwm.farmguider.models.lactationPeriod.dtos.LactationPeriodMapper;
import pl.edu.uwm.farmguider.models.lactationPeriod.dtos.LactationPeriodResponseDTO;
import pl.edu.uwm.farmguider.services.CowService;
import pl.edu.uwm.farmguider.services.LactationPeriodService;

import java.util.List;

import static pl.edu.uwm.farmguider.models.lactationPeriod.dtos.LactationPeriodMapper.mapToLactationPeriodResponseDTO;
import static pl.edu.uwm.farmguider.utils.GenderUtils.verifyIsFemale;

@Component
@RequiredArgsConstructor
public class LactationPeriodFacade {

    private final LactationPeriodService lactationPeriodService;
    private final CowService cowService;

    public LactationPeriodResponseDTO createLactationPeriod(Long cowId, LactationPeriodCreateDTO lactationPeriodCreateDTO) {
        Cow cow = cowService.getCowById(cowId);
        verifyIsFemale(cow.getGender());

        if (lactationPeriodCreateDTO.startDate().isBefore(cow.getDateOfBirth())) {
            throw new InvalidDateException("LactationPeriod", "Lactation Period start date cannot be before cow's date of birth.");
        }

        LactationPeriod lactationPeriod = lactationPeriodService.createLactationPeriod(
                cow,
                lactationPeriodCreateDTO.startDate(),
                lactationPeriodCreateDTO.endDate()
        );
        return mapToLactationPeriodResponseDTO(lactationPeriod);
    }

    public List<LactationPeriodResponseDTO> getLactationPeriodsByCowId(Long cowId) {
        List<LactationPeriod> lactationPeriods = lactationPeriodService.getLactationPeriodsByCowId(cowId);
        return lactationPeriods
                .stream()
                .map(LactationPeriodMapper::mapToLactationPeriodResponseDTO)
                .toList();
    }

}
