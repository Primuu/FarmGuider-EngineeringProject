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

import java.time.LocalDate;
import java.util.Comparator;
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
        verifyLactationPeriodDate(lactationPeriodCreateDTO.startDate(), cow.getDateOfBirth());

        LactationPeriod lactationPeriod = lactationPeriodService.createLactationPeriod(
                cow,
                lactationPeriodCreateDTO.startDate(),
                lactationPeriodCreateDTO.endDate()
        );
        return mapToLactationPeriodResponseDTO(lactationPeriod);
    }

    private void verifyLactationPeriodDate(LocalDate lactationPeriodStartDate, LocalDate dateOfBirt) {
        if (lactationPeriodStartDate.isBefore(dateOfBirt)) {
            throw new InvalidDateException("Cow", "Lactation Period start date cannot be before cow's date of birth.");
        }
    }

    public List<LactationPeriodResponseDTO> getLactationPeriodsByCowId(Long cowId) {
        List<LactationPeriod> lactationPeriods = lactationPeriodService.getLactationPeriodsByCowId(cowId);
        return lactationPeriods
                .stream()
                .map(LactationPeriodMapper::mapToLactationPeriodResponseDTO)
                .sorted(Comparator.comparing(LactationPeriodResponseDTO::startDate).reversed())
                .toList();
    }

    public LactationPeriodResponseDTO updateLactationPeriodById(Long lactationPeriodId, LactationPeriodCreateDTO lactationPeriodCreateDTO) {
        Cow cow = lactationPeriodService.getCowByLactationPeriodId(lactationPeriodId);
        verifyLactationPeriodDate(lactationPeriodCreateDTO.startDate(), cow.getDateOfBirth());

        LactationPeriod lactationPeriod = lactationPeriodService.updateLactationPeriod(
                cow.getId(),
                lactationPeriodId,
                lactationPeriodCreateDTO.startDate(),
                lactationPeriodCreateDTO.endDate()
        );
        return mapToLactationPeriodResponseDTO(lactationPeriod);
    }

    public void deleteLactationPeriodById(Long lactationPeriodId) {
        lactationPeriodService.deleteLactationPeriodById(lactationPeriodId);
    }

}
