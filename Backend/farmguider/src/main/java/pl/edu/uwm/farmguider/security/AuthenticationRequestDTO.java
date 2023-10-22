package pl.edu.uwm.farmguider.security;

import lombok.Builder;

public record AuthenticationRequestDTO (String email,
                                        String password) {

    @Builder
    public AuthenticationRequestDTO {}

}
