package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.global.EntityNotFoundException;
import pl.edu.uwm.farmguider.models.breeding.Breeding;
import pl.edu.uwm.farmguider.models.farm.Farm;
import pl.edu.uwm.farmguider.repositories.BreedingRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BreedingService {

    private final BreedingRepository breedingRepository;

    public Breeding getBreedingById(Long breedingId) {
        return breedingRepository.findById(breedingId)
                .orElseThrow(() -> new EntityNotFoundException("Breeding", "Breeding with id: " + breedingId + " not found."));
    }

    public Breeding createBreeding(Farm farm, String breedingName) {
        Breeding breeding = new Breeding(farm, breedingName);
        return breedingRepository.saveAndFlush(breeding);
    }

    public List<Breeding> getBreedings(Long farmId) {
        return breedingRepository.findAllByFarmId(farmId);
    }

    public Long getUserIdByBreedingId(Long breedingId) {
        return breedingRepository.findUserIdByBreedingId(breedingId);
    }

    public Breeding updateBreedingById(Long breedingId, String breedingName) {
        Breeding breeding = getBreedingById(breedingId);
        breeding.setBreedingName(breedingName);
        return breedingRepository.saveAndFlush(breeding);
    }

    public void deleteBreedingById(Long breedingId) {
        Breeding breeding = getBreedingById(breedingId);
        breedingRepository.delete(breeding);
    }

}
