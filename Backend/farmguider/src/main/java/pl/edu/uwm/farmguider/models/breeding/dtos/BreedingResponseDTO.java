package pl.edu.uwm.farmguider.models.breeding.dtos;

import lombok.Builder;

public record BreedingResponseDTO(Long breedingId,
                                  String breedingName) {

    @Builder
    public BreedingResponseDTO {}

}
