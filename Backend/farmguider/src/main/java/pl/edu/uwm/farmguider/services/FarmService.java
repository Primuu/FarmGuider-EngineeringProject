package pl.edu.uwm.farmguider.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.uwm.farmguider.exceptions.global.EntityNotFoundException;
import pl.edu.uwm.farmguider.models.farm.Farm;
import pl.edu.uwm.farmguider.models.user.User;
import pl.edu.uwm.farmguider.repositories.FarmRepository;

@Service
@RequiredArgsConstructor
public class FarmService {

    private final FarmRepository farmRepository;

    public Farm getFarmById(Long farmId) {
        return farmRepository.findById(farmId)
                .orElseThrow(() -> new EntityNotFoundException("Farm", "Farm with id: " + farmId + " not found."));
    }

    public Farm getFarmByOwnerEmail(String email) {
        return farmRepository.findFarmByOwnerEmail(email)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Farm", "Farm for user with email: " + email + " not found.")
                );
    }

    public Farm getFarmByOwnerId(Long ownerId) {
        return farmRepository.findFarmByOwnerId(ownerId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Farm", "Farm for user with id: " + ownerId + " not found.")
                );
    }

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

    public void deleteFarmByOwnerEmail(String email) {
        Farm farm = getFarmByOwnerEmail(email);
        farmRepository.delete(farm);
    }

}
