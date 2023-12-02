package pl.edu.uwm.farmguider.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.services.FarmService;
import pl.edu.uwm.farmguider.services.UserService;

@Service
@RequiredArgsConstructor
public class FineGrainedAccessControl {

    private final UserService userService;
    private final FarmService farmService;

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

}
