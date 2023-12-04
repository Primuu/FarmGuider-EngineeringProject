package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.milking.Milking;
import pl.edu.uwm.farmguider.repositories.MilkingRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MilkingService {

    private final MilkingRepository milkingRepository;

    public Milking createMilking(Cow cow, LocalDateTime dateOfMilking, BigDecimal milkQuantity, Integer milkingDuration) {
        Milking milking = new Milking(cow, dateOfMilking, milkQuantity, milkingDuration);
        return milkingRepository.saveAndFlush(milking);
    }

}
