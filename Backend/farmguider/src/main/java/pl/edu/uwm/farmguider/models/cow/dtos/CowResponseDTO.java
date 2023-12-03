package pl.edu.uwm.farmguider.models.cow.dtos;

import lombok.Builder;

import java.time.LocalDate;

public record CowResponseDTO(Long cowId,
                             String cowName,
                             String earTagNumber,
                             LocalDate dateOfBirth,
                             String gender) {

    @Builder
    public CowResponseDTO {}

}
