package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.uwm.farmguider.models.breeding.Breeding;
import pl.edu.uwm.farmguider.models.breeding.dtos.BreedingCreateDTO;
import pl.edu.uwm.farmguider.models.breeding.dtos.BreedingResponseDTO;
import pl.edu.uwm.farmguider.models.farm.Farm;
import pl.edu.uwm.farmguider.services.BreedingService;
import pl.edu.uwm.farmguider.services.FarmService;

import static pl.edu.uwm.farmguider.models.breeding.dtos.BreedingMapper.mapToBreedingResponseDTO;

@Component
@RequiredArgsConstructor
public class BreedingFacade {

    private final BreedingService breedingService;
    private final FarmService farmService;

    public BreedingResponseDTO createBreeding(Long farmId, BreedingCreateDTO breedingCreateDTO) {
        Farm farm = farmService.getFarmById(farmId);
        Breeding breeding = breedingService.createBreeding(farm, breedingCreateDTO.breedingName());
        return mapToBreedingResponseDTO(breeding);
    }

}
