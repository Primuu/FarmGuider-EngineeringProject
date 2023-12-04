package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.cow.InvalidGenderException;
import pl.edu.uwm.farmguider.exceptions.global.EntityNotFoundException;
import pl.edu.uwm.farmguider.models.breeding.Breeding;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.cow.enums.Gender;
import pl.edu.uwm.farmguider.repositories.CowRepository;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class CowService {

    private final CowRepository cowRepository;

    public Cow getCowById(Long cowId) {
        return cowRepository.findById(cowId)
                .orElseThrow(() -> new EntityNotFoundException("Cow", "Cow with id: " + cowId + " not found."));
    }

    public Page<Cow> getCowsByBreedingId(Long breedingId, Pageable pageable) {
        return cowRepository.findAllByBreedingId(breedingId, pageable);
    }

    public Long getUserIdByCowId(Long cowId) {
        return cowRepository.findUserIdByCowId(cowId);
    }

    public Cow createCow(Breeding breeding, String cowName, String earTagNumber, LocalDate dateOfBirth, String gender) {
        if (!Gender.isValid(gender)) {
            throw new InvalidGenderException("Gender", "Invalid gender: " + gender);
        }
        Gender enumGender = Gender.valueOf(gender);
        Cow cow = new Cow(breeding, cowName, earTagNumber, dateOfBirth, enumGender);
        return cowRepository.saveAndFlush(cow);
    }

    public void deleteCowById(Long cowId) {
        Cow cow = getCowById(cowId);
        cowRepository.delete(cow);
    }

}
