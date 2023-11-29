package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.models.breeding.Breeding;
import pl.edu.uwm.farmguider.models.farm.Farm;
import pl.edu.uwm.farmguider.repositories.BreedingRepository;

@Service
@RequiredArgsConstructor
public class BreedingService {

    private final BreedingRepository breedingRepository;

    public Breeding createBreeding(Farm farm, String breedingName) {
        Breeding breeding = new Breeding(farm, breedingName);
        return breedingRepository.saveAndFlush(breeding);
    }

}
