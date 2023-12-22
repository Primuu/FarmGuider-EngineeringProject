package pl.edu.uwm.farmguider.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.services.*;

@Service
@RequiredArgsConstructor
public class FineGrainedAccessControl {

    private final UserService userService;
    private final FarmService farmService;
    private final BreedingService breedingService;
    private final CowService cowService;
    private final MilkingService milkingService;
    private final WeightGainService weightGainService;
    private final LactationPeriodService lactationPeriodService;
    private final FieldService fieldService;

    private String getEmailFromContext() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public Long getUserIdFromContext() {
        return userService.getUserByEmail(getEmailFromContext()).getId();
    }

    public boolean compareGivenUserIdWithContext(Long userId) {
        return getUserIdFromContext().equals(userId);
    }

    public boolean compareGivenFarmIdWithContext(Long farmId) {
        return farmService.getFarmByOwnerEmail(getEmailFromContext()).getId().equals(farmId);
    }

    public boolean compareGivenBreedingIdWithContext(Long breedingId) {
        return breedingService.getUserIdByBreedingId(breedingId).equals(getUserIdFromContext());
    }

    public boolean compareGivenCowIdWithContext(Long cowId) {
        return cowService.getUserIdByCowId(cowId).equals(getUserIdFromContext());
    }

    public boolean compareGivenMilkingIdWithContext(Long milkingId) {
        return milkingService.getUserIdByMilkingId(milkingId).equals(getUserIdFromContext());
    }

    public boolean compareGivenWeightGainIdWithContext(Long weightGainId) {
        return weightGainService.getUserIdByWeightGainId(weightGainId).equals(getUserIdFromContext());
    }

    public boolean compareGivenLactationPeriodIdWithContext(Long lactationPeriodId) {
        return lactationPeriodService.getUserIdByLactationPeriodId(lactationPeriodId).equals(getUserIdFromContext());
    }

    public boolean compareGivenFieldIdWithContext(Long fieldId) {
        return fieldService.getUserIdByFieldId(fieldId).equals(getUserIdFromContext());
    }

}
