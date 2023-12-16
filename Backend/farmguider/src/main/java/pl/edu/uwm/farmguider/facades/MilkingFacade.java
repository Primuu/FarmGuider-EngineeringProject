package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.uwm.farmguider.exceptions.global.InvalidDateException;
import pl.edu.uwm.farmguider.models.cow.Cow;
import pl.edu.uwm.farmguider.models.milking.Milking;
import pl.edu.uwm.farmguider.models.milking.dtos.MilkingCreateDTO;
import pl.edu.uwm.farmguider.models.milking.dtos.MilkingMapper;
import pl.edu.uwm.farmguider.models.milking.dtos.MilkingResponseDTO;
import pl.edu.uwm.farmguider.services.CowService;
import pl.edu.uwm.farmguider.services.MilkingService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

import static pl.edu.uwm.farmguider.models.milking.dtos.MilkingMapper.mapToMilkingResponseDTO;
import static pl.edu.uwm.farmguider.utils.GenderUtils.verifyIsFemale;

@Component
@RequiredArgsConstructor
public class MilkingFacade {

    private final static BigDecimal EMPTY_MILKING_QUANTITY = null;
    private final static LocalDateTime EMPTY_MILKING_DATE = null;
    private final MilkingService milkingService;
    private final CowService cowService;

    @Transactional
    public MilkingResponseDTO createMilking(Long cowId, MilkingCreateDTO milkingCreateDTO) {
        Cow cow = cowService.getCowById(cowId);

        verifyIsFemale(cow.getGender());
        verifyMilkingDate(cow.getDateOfBirth(), milkingCreateDTO.dateOfMilking());

        if (isLatestMilking(cow, milkingCreateDTO.dateOfMilking())) {
            cowService.updateLatestMilkingQuantity(cow, milkingCreateDTO.milkQuantity(), milkingCreateDTO.dateOfMilking());
        }

        Milking milking = milkingService.createMilking(
                cow,
                milkingCreateDTO.dateOfMilking(),
                milkingCreateDTO.milkQuantity(),
                milkingCreateDTO.milkingDuration()
        );
        return mapToMilkingResponseDTO(milking);
    }

    private boolean isLatestMilking(Cow cow, LocalDateTime dateOfMilking) {
        return cow.getLatestMilkingDate() == null || !cow.getLatestMilkingDate().isAfter(dateOfMilking);
    }

    private void verifyMilkingDate(LocalDate dateOfBirth, LocalDateTime dateOfMilking) {
        if (dateOfMilking.toLocalDate().isBefore(dateOfBirth)) {
            throw new InvalidDateException("Milking", "Milking date cannot be before cow's date of birth.");
        }
    }

    public List<MilkingResponseDTO> getMilkingsByCowId(Long cowId) {
        List<Milking> milkings = milkingService.getMilkingsByCowId(cowId);
        return milkings
                .stream()
                .map(MilkingMapper::mapToMilkingResponseDTO)
                .sorted(Comparator.comparing(MilkingResponseDTO::dateOfMilking).reversed())
                .toList();
    }

    @Transactional
    public MilkingResponseDTO updateMilkingById(Long milkingId, MilkingCreateDTO milkingCreateDTO) {
        Cow cow = milkingService.getCowByMilkingId(milkingId);
        verifyMilkingDate(cow.getDateOfBirth(), milkingCreateDTO.dateOfMilking());

        Milking milking = milkingService.updateMilking(
                milkingId,
                milkingCreateDTO.dateOfMilking(),
                milkingCreateDTO.milkQuantity(),
                milkingCreateDTO.milkingDuration()
        );
        updateCowLatestMilkingIfNecessary(cow);

        return mapToMilkingResponseDTO(milking);
    }

    private void updateCowLatestMilkingIfNecessary(Cow cow) {
        milkingService.getMilkingsByCowId(cow.getId())
                .stream()
                .max(Comparator.comparing(Milking::getDateOfMilking))
                .ifPresentOrElse(
                        latestMilking -> cowService.updateLatestMilkingQuantity(cow, latestMilking.getMilkQuantity(), latestMilking.getDateOfMilking()),
                        () -> cowService.updateLatestMilkingQuantity(cow, EMPTY_MILKING_QUANTITY, EMPTY_MILKING_DATE)
                );
    }

    @Transactional
    public void deleteMilkingById(Long milkingId) {
        Cow cow = milkingService.getCowByMilkingId(milkingId);

        milkingService.deleteMilkingById(milkingId);

        updateCowLatestMilkingIfNecessary(cow);
    }

}
