package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.cow.InvalidGenderException;
import pl.edu.uwm.farmguider.exceptions.global.EntityNotFoundException;
import pl.edu.uwm.farmguider.models.breeding.Breeding;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.cow.dtos.CowSearchParams;
import pl.edu.uwm.farmguider.models.cow.enums.Gender;
import pl.edu.uwm.farmguider.repositories.CowRepository;

import java.math.BigDecimal;
import java.time.LocalDate;

import static pl.edu.uwm.farmguider.utils.CowSpecification.*;

@Service
@RequiredArgsConstructor
public class CowService {

    private final CowRepository cowRepository;

    public Cow getCowById(Long cowId) {
        return cowRepository.findById(cowId)
                .orElseThrow(() -> new EntityNotFoundException("Cow", "Cow with id: " + cowId + " not found."));
    }

    public Page<Cow> getCowsByBreedingId(Long breedingId, CowSearchParams searchParams) {
        Specification<Cow> spec = Specification.where(hasBreedingId(breedingId));

        if (searchParams.getEarTagNumber() != null) {
            spec = spec.and(hasEarTagNumberLike(searchParams.getEarTagNumber()));
        }
        if (searchParams.getCowName() != null) {
            spec = spec.and(hasCowNameLike(searchParams.getCowName()));
        }
        if (searchParams.getGender() != null) {
            spec = spec.and(hasGender(searchParams.getGender()));
        }
        if (searchParams.getMinDateOfBirth() != null || searchParams.getMaxDateOfBirth() != null) {
            spec = spec.and(hasDateOfBirthBetween(searchParams.getMinDateOfBirth(), searchParams.getMaxDateOfBirth()));
        }
        if (searchParams.getMinWeight() != null || searchParams.getMaxWeight() != null) {
            spec = spec.and(hasWeightBetween(searchParams.getMinWeight(), searchParams.getMaxWeight()));
        }
        if (searchParams.getMinMilkingQuantity() != null || searchParams.getMaxMilkingQuantity() != null) {
            spec = spec.and(hasMilkingQuantityBetween(searchParams.getMinMilkingQuantity(), searchParams.getMaxMilkingQuantity()));
        }

        return cowRepository.findAll(spec, searchParams.toPageable());
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

    public void updateLatestMilkingQuantity(Cow cow, BigDecimal milkQuantity) {
        cow.setLatestMilkingQuantity(milkQuantity);
        cowRepository.saveAndFlush(cow);
    }

    public void updateCurrentWeight(Cow cow, BigDecimal weight) {
        cow.setCurrentWeight(weight);
        cowRepository.saveAndFlush(cow);
    }

}
