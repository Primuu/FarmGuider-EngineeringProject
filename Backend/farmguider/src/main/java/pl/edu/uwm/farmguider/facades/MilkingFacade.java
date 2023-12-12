package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.uwm.farmguider.exceptions.global.InvalidDateException;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.milking.Milking;
import pl.edu.uwm.farmguider.models.milking.dtos.MilkingCreateDTO;
import pl.edu.uwm.farmguider.models.milking.dtos.MilkingResponseDTO;
import pl.edu.uwm.farmguider.services.CowService;
import pl.edu.uwm.farmguider.services.MilkingService;

import java.time.LocalDateTime;

import static pl.edu.uwm.farmguider.models.milking.dtos.MilkingMapper.mapToMilkingResponseDTO;
import static pl.edu.uwm.farmguider.utils.GenderUtils.verifyIsFemale;

@Component
@RequiredArgsConstructor
public class MilkingFacade {

    private final MilkingService milkingService;
    private final CowService cowService;

    @Transactional
    public MilkingResponseDTO createMilking(Long cowId, MilkingCreateDTO milkingCreateDTO) {
        Cow cow = cowService.getCowById(cowId);
        verifyIsFemale(cow.getGender());

        if (milkingCreateDTO.dateOfMilking().toLocalDate().isBefore(cow.getDateOfBirth())) {
            throw new InvalidDateException("Milking", "Milking date cannot be before cow's date of birth.");
        }

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

}
