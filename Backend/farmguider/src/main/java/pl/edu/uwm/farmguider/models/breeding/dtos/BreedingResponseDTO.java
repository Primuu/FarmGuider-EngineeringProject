package pl.edu.uwm.farmguider.models.breeding.dtos;

import lombok.Builder;

public record BreedingResponseDTO(String breedingName) {

    @Builder
    public BreedingResponseDTO {}

}
