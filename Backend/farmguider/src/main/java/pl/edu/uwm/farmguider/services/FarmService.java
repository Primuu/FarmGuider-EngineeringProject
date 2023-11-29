package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.models.farm.Farm;
import pl.edu.uwm.farmguider.models.user.User;
import pl.edu.uwm.farmguider.repositories.FarmRepository;

@Service
@RequiredArgsConstructor
public class FarmService {

    private final FarmRepository farmRepository;

    public Farm createFarm(User owner) {
        Farm farm = new Farm(
                owner,
                createFarmName(owner.getId())
        );
        return farmRepository.saveAndFlush(farm);
    }

    private String createFarmName(Long ownerId) {
        return "Farm #" + ownerId.toString();
    }

}
