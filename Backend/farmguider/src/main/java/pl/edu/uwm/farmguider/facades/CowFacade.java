package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import pl.edu.uwm.farmguider.models.breeding.Breeding;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.cow.dtos.*;
import pl.edu.uwm.farmguider.services.BreedingService;
import pl.edu.uwm.farmguider.services.CowService;
import pl.edu.uwm.farmguider.services.MilkingService;
import pl.edu.uwm.farmguider.services.WeightGainService;

import java.math.BigDecimal;

import static pl.edu.uwm.farmguider.models.cow.dtos.CowMapper.mapToCowResponseDTO;

@Component
@RequiredArgsConstructor
public class CowFacade {

    private final CowService cowService;
    private final BreedingService breedingService;
    private final MilkingService milkingService;
    private final WeightGainService weightGainService;

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

    public Page<CowPageResponseDTO> getCowsByBreedingId(Long breedingId, CowSearchParams cowSearchParams) {
        Page<Cow> cows = cowService.getCowsByBreedingId(breedingId, cowSearchParams.toPageable());
        return cows.map(cow -> {
            BigDecimal currentWeight = weightGainService.getCurrentWeightByCowId(cow.getId());
            BigDecimal latestMilkingQuantity = milkingService.getLatestMilkingQuantityByCowId(cow.getId());
            return CowMapper.mapToCowPageResponseDTO(cow, currentWeight, latestMilkingQuantity);
        });
    }

    public void deleteCowById(Long cowId) {
        cowService.deleteCowById(cowId);
    }

}
