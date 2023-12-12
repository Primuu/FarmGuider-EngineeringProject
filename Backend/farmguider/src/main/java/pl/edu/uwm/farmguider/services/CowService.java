package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.cow.InvalidGenderException;
import pl.edu.uwm.farmguider.exceptions.global.EntityNotFoundException;
import pl.edu.uwm.farmguider.exceptions.global.InvalidDateException;
import pl.edu.uwm.farmguider.models.breeding.Breeding;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.cow.dtos.CowSearchParams;
import pl.edu.uwm.farmguider.models.cow.enums.Gender;
import pl.edu.uwm.farmguider.models.lactationPeriod.LactationPeriod;
import pl.edu.uwm.farmguider.models.milking.Milking;
import pl.edu.uwm.farmguider.models.weightGain.WeightGain;
import pl.edu.uwm.farmguider.repositories.CowRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static pl.edu.uwm.farmguider.utils.CowSpecification.bySearchParams;

@Service
@RequiredArgsConstructor
public class CowService {

    private final CowRepository cowRepository;

    public Cow getCowById(Long cowId) {
        return cowRepository.findById(cowId)
                .orElseThrow(() -> new EntityNotFoundException("Cow", "Cow with id: " + cowId + " not found."));
    }

    public Page<Cow> getCowsByBreedingId(Long breedingId, CowSearchParams searchParams) {
        Specification<Cow> spec = bySearchParams(breedingId, searchParams);
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

    public void updateLatestMilkingQuantity(Cow cow, BigDecimal milkQuantity, LocalDateTime dateOfMilking) {
        cow.setLatestMilkingQuantity(milkQuantity);
        cow.setLatestMilkingDate(dateOfMilking);
        cowRepository.saveAndFlush(cow);
    }

    public void updateCurrentWeight(Cow cow, BigDecimal weight, LocalDate measurementDate) {
        cow.setCurrentWeight(weight);
        cow.setLatestWeightMeasurementDate(measurementDate);
        cowRepository.saveAndFlush(cow);
    }

    public Cow updateCowById(Long cowId, String cowName, String earTagNumber, LocalDate dateOfBirth, String gender) {
        if (!Gender.isValid(gender)) {
            throw new InvalidGenderException("Gender", "Invalid gender: " + gender);
        }

        Cow cow = getCowById(cowId);
        if (!cow.getGender().name().equals(gender)) {
            validateGenderUpdate(cow);
        }

        if (!cow.getDateOfBirth().equals(dateOfBirth)) {
            validateDateOfBirthUpdate(cow, dateOfBirth);
        }
        Gender enumGender = Gender.valueOf(gender);

        cow.setCowName(cowName);
        cow.setEarTagNumber(earTagNumber);
        cow.setDateOfBirth(dateOfBirth);
        cow.setGender(enumGender);
        return cowRepository.saveAndFlush(cow);
    }

    public void deleteCowById(Long cowId) {
        Cow cow = getCowById(cowId);
        cowRepository.delete(cow);
    }

    private void validateGenderUpdate(Cow cow) {
        if (!cow.getLactationPeriods().isEmpty() || !cow.getMilkings().isEmpty()) {
            throw new InvalidGenderException("Gender", "Gender of this animal cannot be updated " +
                    "as it has associated lactation periods or milking data which are gender-specific.");
        }
    }

    private void validateDateOfBirthUpdate(Cow cow, LocalDate newDateOfBirth) {
        checkLactationPeriodsDates(cow.getLactationPeriods(), newDateOfBirth);
        checkWeightGainDates(cow.getWeightGains(), newDateOfBirth);
        checkMilkingDates(cow.getMilkings(), newDateOfBirth);
    }

    private void checkLactationPeriodsDates(List<LactationPeriod> lactationPeriods, LocalDate newDateOfBirth) {
        boolean invalidDateExists = lactationPeriods.stream()
                .anyMatch(period -> period.getStartDate().isBefore(newDateOfBirth));

        if (invalidDateExists) {
            throw new InvalidDateException("LactationPeriod", "One of the lactation period start dates falls before the cow's new birth date.");
        }
    }

    private static void checkWeightGainDates(List<WeightGain> weightGains, LocalDate newDateOfBirth) {
        boolean invalidDateExists = weightGains.stream()
                .anyMatch(weightGain -> weightGain.getMeasurementDate().isBefore(newDateOfBirth));

        if (invalidDateExists) {
            throw new InvalidDateException("WeightGain", "One of the weight measurement dates falls before the cow's new birth date.");
        }
    }

    private void checkMilkingDates(List<Milking> milkings, LocalDate newDateOfBirth) {
        boolean invalidDateExists = milkings.stream()
                .anyMatch(milking -> milking.getDateOfMilking().toLocalDate().isBefore(newDateOfBirth));

        if (invalidDateExists) {
            throw new InvalidDateException("Milking", "One of the milking dates falls before the cow's new birth date.");
        }
    }

}
