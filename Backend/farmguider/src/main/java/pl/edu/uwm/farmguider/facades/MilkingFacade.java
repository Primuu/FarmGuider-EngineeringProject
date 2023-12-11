package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.uwm.farmguider.exceptions.cow.InvalidGenderException;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.cow.enums.Gender;
import pl.edu.uwm.farmguider.models.milking.Milking;
import pl.edu.uwm.farmguider.models.milking.dtos.MilkingCreateDTO;
import pl.edu.uwm.farmguider.models.milking.dtos.MilkingResponseDTO;
import pl.edu.uwm.farmguider.services.CowService;
import pl.edu.uwm.farmguider.services.MilkingService;

import java.time.LocalDateTime;

import static pl.edu.uwm.farmguider.models.milking.dtos.MilkingMapper.mapToMilkingResponseDTO;

@Component
@RequiredArgsConstructor
public class MilkingFacade {

    private final MilkingService milkingService;
    private final CowService cowService;

    @Transactional
    public MilkingResponseDTO createMilking(Long cowId, MilkingCreateDTO milkingCreateDTO) {
        Cow cow = cowService.getCowById(cowId);
        checkGender(cow.getGender());

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

    private void checkGender(Gender gender) {
        if (!gender.equals(Gender.FEMALE)) {
            throw new InvalidGenderException("Gender", "Gender of this animal does not allow this operation to be performed.");
        }
    }

    private boolean isLatestMilking(Cow cow, LocalDateTime dateOfMilking) {
        return cow.getLatestMilkingDate() == null || !cow.getLatestMilkingDate().isAfter(dateOfMilking);
    }

}
