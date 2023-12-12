package pl.edu.uwm.farmguider.exceptions.global;

import lombok.Getter;

@Getter
public class InvalidDateException extends RuntimeException {

    private final String entityName;

    public InvalidDateException(String entityName, String message) {
        super(message);
        this.entityName = entityName;
    }

}
