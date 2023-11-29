package pl.edu.uwm.farmguider.facades;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.uwm.farmguider.services.FarmService;

@Component
@RequiredArgsConstructor
public class FarmFacade {

    private final FarmService farmService;

    public Long getFarmIdByOwnerId(Long ownerId) {
        return farmService.getFarmByOwnerId(ownerId).getId();
    }

}
