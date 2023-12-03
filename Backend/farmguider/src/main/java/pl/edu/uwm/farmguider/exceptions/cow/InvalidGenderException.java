package pl.edu.uwm.farmguider.exceptions.cow;

import lombok.Getter;

@Getter
public class InvalidGenderException extends RuntimeException {

    private final String enumName;

    public InvalidGenderException(String enumName, String message) {
        super(message);
        this.enumName = enumName;
    }

}
