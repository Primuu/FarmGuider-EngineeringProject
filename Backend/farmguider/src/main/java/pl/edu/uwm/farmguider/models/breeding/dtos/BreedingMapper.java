package pl.edu.uwm.farmguider.models.breeding.dtos;

import pl.edu.uwm.farmguider.models.breeding.Breeding;

public class BreedingMapper {

    public static BreedingResponseDTO mapToBreedingResponseDTO(Breeding breeding) {
        return BreedingResponseDTO.builder()
                .breedingId(breeding.getId())
                .breedingName(breeding.getBreedingName())
                .build();
    }

}
