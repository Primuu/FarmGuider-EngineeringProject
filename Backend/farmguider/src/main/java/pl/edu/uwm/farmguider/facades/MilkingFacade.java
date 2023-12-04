package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.milking.Milking;
import pl.edu.uwm.farmguider.models.milking.dtos.MilkingCreateDTO;
import pl.edu.uwm.farmguider.models.milking.dtos.MilkingResponseDTO;
import pl.edu.uwm.farmguider.services.CowService;
import pl.edu.uwm.farmguider.services.MilkingService;

import static pl.edu.uwm.farmguider.models.milking.dtos.MilkingMapper.mapToMilkingResponseDTO;

@Component
@RequiredArgsConstructor
public class MilkingFacade {

    private final MilkingService milkingService;
    private final CowService cowService;

    @Transactional
    public MilkingResponseDTO createMilking(Long cowId, MilkingCreateDTO milkingCreateDTO) {
        Cow cow = cowService.getCowById(cowId);
        cowService.updateLatestMilkingQuantity(cow, milkingCreateDTO.milkQuantity());

        Milking milking = milkingService.createMilking(
                cow,
                milkingCreateDTO.dateOfMilking(),
                milkingCreateDTO.milkQuantity(),
                milkingCreateDTO.milkingDuration()
        );
        return mapToMilkingResponseDTO(milking);
    }

}
