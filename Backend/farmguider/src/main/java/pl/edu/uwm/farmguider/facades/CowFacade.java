package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.uwm.farmguider.models.breeding.Breeding;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.cow.dtos.CowCreateDTO;
import pl.edu.uwm.farmguider.models.cow.dtos.CowResponseDTO;
import pl.edu.uwm.farmguider.services.BreedingService;
import pl.edu.uwm.farmguider.services.CowService;

import static pl.edu.uwm.farmguider.models.cow.dtos.CowMapper.mapToCowResponseDTO;

@Component
@RequiredArgsConstructor
public class CowFacade {

    private final CowService cowService;
    private final BreedingService breedingService;

    public CowResponseDTO createCow(Long breedingId, CowCreateDTO cowCreateDTO) {
        Breeding breeding = breedingService.getBreedingById(breedingId);
        Cow cow = cowService.createCow(
                breeding,
                cowCreateDTO.cowName(),
                cowCreateDTO.earTagNumber(),
                cowCreateDTO.dateOfBirth(),
                cowCreateDTO.gender()
        );
        return mapToCowResponseDTO(cow);
    }

}
