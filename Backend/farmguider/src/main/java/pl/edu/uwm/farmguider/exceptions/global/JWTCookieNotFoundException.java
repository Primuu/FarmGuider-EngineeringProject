package pl.edu.uwm.farmguider.exceptions.global;

import lombok.Getter;

@Getter
public class JWTCookieNotFoundException extends RuntimeException {

    private final String cookieName = "JWT";

    public JWTCookieNotFoundException(String message) {
        super(message);
    }

}
