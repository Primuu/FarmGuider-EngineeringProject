package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.global.InvalidDateException;
import pl.edu.uwm.farmguider.exceptions.lactationPeriod.LactationPeriodConflictException;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.lactationPeriod.LactationPeriod;
import pl.edu.uwm.farmguider.repositories.LactationPeriodRepository;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LactationPeriodService {

    private final LactationPeriodRepository lactationPeriodRepository;

    public List<LactationPeriod> getLactationPeriodsByCowId(Long cowId) {
        return lactationPeriodRepository.findAllByCowId(cowId);
    }

    public LactationPeriod createLactationPeriod(Cow cow, LocalDate startDate, LocalDate endDate) {
        if (endDate != null && !startDate.isBefore(endDate)) {
            throw new InvalidDateException("LactationPeriod", "Lactation Period start date must be before end date.");
        }
        validateLactationPeriodOverlaps(startDate, endDate, cow.getId());

        LactationPeriod lactationPeriod = new LactationPeriod(cow, startDate, endDate);
        return lactationPeriodRepository.saveAndFlush(lactationPeriod);
    }

    private void validateLactationPeriodOverlaps(LocalDate newLactationStart, LocalDate newLactationEnd, Long cowId) {
        List<LactationPeriod> lactationPeriods = getLactationPeriodsByCowId(cowId);

        boolean overlapExists = lactationPeriods.stream()
                .anyMatch(existingPeriod -> {
                    LocalDate existingStart = existingPeriod.getStartDate();
                    LocalDate existingEnd = existingPeriod.getEndDate() != null ? existingPeriod.getEndDate() : LocalDate.MAX;

                    return !newLactationStart.isAfter(existingEnd) && (newLactationEnd == null || !newLactationEnd.isBefore(existingStart));
                });

        if (overlapExists) {
            throw new LactationPeriodConflictException("LactationPeriod", "This lactation period overlaps with an existing lactation period.");
        }
    }

}
