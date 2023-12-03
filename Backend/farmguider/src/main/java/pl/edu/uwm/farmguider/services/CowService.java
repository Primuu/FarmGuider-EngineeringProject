package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.cow.InvalidGenderException;
import pl.edu.uwm.farmguider.models.breeding.Breeding;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.cow.enums.Gender;
import pl.edu.uwm.farmguider.repositories.CowRepository;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class CowService {

    private final CowRepository cowRepository;

    public Cow createCow(Breeding breeding, String cowName, String earTagNumber, LocalDate dateOfBirth, String gender) {
        if (!Gender.isValid(gender)) {
            throw new InvalidGenderException("Gender", "Invalid gender: " + gender);
        }
        Gender enumGender = Gender.valueOf(gender);
        Cow cow = new Cow(breeding, cowName, earTagNumber, dateOfBirth, enumGender);
        return cowRepository.saveAndFlush(cow);
    }

}
