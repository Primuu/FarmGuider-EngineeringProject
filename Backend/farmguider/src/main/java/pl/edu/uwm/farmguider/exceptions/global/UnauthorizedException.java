package pl.edu.uwm.farmguider.exceptions.global;

import lombok.Getter;

@Getter
public class UnauthorizedException extends RuntimeException {

    private final String entityName;

    public UnauthorizedException(String entityName, String message) {
        super(message);
        this.entityName = entityName;
    }

}
