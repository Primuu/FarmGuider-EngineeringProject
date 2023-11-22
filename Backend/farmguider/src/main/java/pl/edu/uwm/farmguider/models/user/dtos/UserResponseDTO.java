package pl.edu.uwm.farmguider.models.user.dtos;

import lombok.Builder;

public record UserResponseDTO (Long userId,
                               String email,
                               String firstName,
                               String lastName,
                               String locality,
                               String street,
                               String zipCode,
                               String propertyNumber) {

    @Builder
    public UserResponseDTO {}

}
