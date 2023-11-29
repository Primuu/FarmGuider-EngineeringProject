package pl.edu.uwm.farmguider.models.user.dtos;

import lombok.Builder;

public record UserAuthDTO(Long userId,
                          Long farmId,
                          String userRole) {

    @Builder
    public UserAuthDTO {}

}
