package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.global.EntityNotFoundException;
import pl.edu.uwm.farmguider.exceptions.global.InvalidDateException;
import pl.edu.uwm.farmguider.exceptions.lactationPeriod.LactationPeriodConflictException;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.lactationPeriod.LactationPeriod;
import pl.edu.uwm.farmguider.repositories.LactationPeriodRepository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LactationPeriodService {

    private static final Long NOT_EXCLUDE_ANY_LACTATION_PERIOD = null;
    private final LactationPeriodRepository lactationPeriodRepository;

    public LactationPeriod getLactationPeriodById(Long lactationPeriodId) {
        return lactationPeriodRepository.findById(lactationPeriodId)
                .orElseThrow(() -> new EntityNotFoundException("LactationPeriod",
                        "Lactation Period with id: " + lactationPeriodId + " not found.")
                );
    }

    public List<LactationPeriod> getLactationPeriodsByCowId(Long cowId) {
        return lactationPeriodRepository.findAllByCowId(cowId);
    }

    public Long getUserIdByLactationPeriodId(Long lactationPeriodId) {
        return lactationPeriodRepository.findUserIdByLactationPeriodId(lactationPeriodId);
    }

    public Cow getCowByLactationPeriodId(Long lactationPeriodId) {
        return lactationPeriodRepository.findCowByLactationPeriodId(lactationPeriodId);
    }

    public Integer getCowsNumberWithLactationPeriodsByCowCollection(Collection<Cow> cows) {
        return lactationPeriodRepository.countCowsWithLactationPeriodsByCowIn(cows);
    }

    public Integer getCowsNumberCurrentlyInCLactationPeriodByCowCollection(Collection<Cow> cows) {
        return lactationPeriodRepository.countCowsCurrentlyInCLactationPeriodByCowIn(cows);
    }

    public LactationPeriod createLactationPeriod(Cow cow, LocalDate startDate, LocalDate endDate) {
        verifyLactationPeriodDates(startDate, endDate);
        validateLactationPeriodOverlaps(startDate, endDate, cow.getId(), NOT_EXCLUDE_ANY_LACTATION_PERIOD);

        LactationPeriod lactationPeriod = new LactationPeriod(cow, startDate, endDate);
        return lactationPeriodRepository.saveAndFlush(lactationPeriod);
    }

    private void verifyLactationPeriodDates(LocalDate startDate, LocalDate endDate) {
        if (endDate != null && !startDate.isBefore(endDate)) {
            throw new InvalidDateException("LactationPeriod", "Lactation Period start date must be before end date.");
        }
    }

    private void validateLactationPeriodOverlaps(LocalDate newLactationStart, LocalDate newLactationEnd, Long cowId, Long excludeLactationPeriodId) {
        List<LactationPeriod> lactationPeriods = getLactationPeriodsByCowId(cowId);

        boolean overlapExists = lactationPeriods.stream()
                .filter(existingPeriod -> !existingPeriod.getId().equals(excludeLactationPeriodId))
                .anyMatch(existingPeriod -> {
                    LocalDate existingStart = existingPeriod.getStartDate();
                    LocalDate existingEnd = existingPeriod.getEndDate() != null ? existingPeriod.getEndDate() : LocalDate.MAX;

                    return !newLactationStart.isAfter(existingEnd) && (newLactationEnd == null || !newLactationEnd.isBefore(existingStart));
                });

        if (overlapExists) {
            throw new LactationPeriodConflictException("LactationPeriod", "This lactation period overlaps with an existing lactation period.");
        }
    }

    public LactationPeriod updateLactationPeriod(Long cowId, Long lactationPeriodId, LocalDate startDate, LocalDate endDate) {
        verifyLactationPeriodDates(startDate, endDate);
        validateLactationPeriodOverlaps(startDate, endDate, cowId, lactationPeriodId);

        LactationPeriod lactationPeriod = getLactationPeriodById(lactationPeriodId);
        lactationPeriod.setStartDate(startDate);
        lactationPeriod.setEndDate(endDate);
        return lactationPeriodRepository.saveAndFlush(lactationPeriod);
    }

    public void deleteLactationPeriodById(Long lactationPeriodId) {
        LactationPeriod lactationPeriod = getLactationPeriodById(lactationPeriodId);
        lactationPeriodRepository.delete(lactationPeriod);
    }

}
