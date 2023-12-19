package pl.edu.uwm.farmguider.exceptions.global;

import lombok.Getter;

@Getter
public class InvalidEnumException extends RuntimeException {

    private final String enumName;

    public InvalidEnumException(String enumName, String message) {
        super(message);
        this.enumName = enumName;
    }

}
