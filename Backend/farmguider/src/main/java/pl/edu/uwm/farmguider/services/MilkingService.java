package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.global.EntityNotFoundException;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.milking.Milking;
import pl.edu.uwm.farmguider.repositories.MilkingRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MilkingService {

    private final MilkingRepository milkingRepository;

    public Milking getMilkingById(Long milkingId) {
        return milkingRepository.findById(milkingId)
                .orElseThrow(() -> new EntityNotFoundException("Milking", "Milking with id: " + milkingId + " not found."));
    }

    public List<Milking> getMilkingsByCowIdAndDatesBetween(Long cowId, LocalDate startDate, LocalDate endDate) {
        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);

        return milkingRepository.findAllByDateOfMilkingBetweenAndCowId(startDateTime, endDateTime, cowId);
    }

    public Long getUserIdByMilkingId(Long milkingId) {
        return milkingRepository.findUserIdByMilkingId(milkingId);
    }

    public Cow getCowByMilkingId(Long milkingId) {
        return milkingRepository.findCowByMilkingId(milkingId);
    }

    public Milking createMilking(Cow cow, LocalDateTime dateOfMilking, BigDecimal milkQuantity, Integer milkingDuration) {
        Milking milking = new Milking(cow, dateOfMilking, milkQuantity, milkingDuration);
        return milkingRepository.saveAndFlush(milking);
    }

    public List<Milking> getMilkingsByCowId(Long cowId) {
        return milkingRepository.findAllByCowId(cowId);
    }

    public Milking updateMilking(Long milkingId, LocalDateTime dateOfMilking, BigDecimal milkQuantity, Integer milkingDuration) {
        Milking milking = getMilkingById(milkingId);
        milking.setDateOfMilking(dateOfMilking);
        milking.setMilkQuantity(milkQuantity);
        milking.setMilkingDuration(milkingDuration);
        return milkingRepository.saveAndFlush(milking);
    }

    public void deleteMilkingById(Long milkingId) {
        Milking milking = getMilkingById(milkingId);
        milkingRepository.delete(milking);
    }

}
