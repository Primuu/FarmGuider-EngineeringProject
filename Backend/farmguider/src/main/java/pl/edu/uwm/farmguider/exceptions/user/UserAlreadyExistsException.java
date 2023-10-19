package pl.edu.uwm.farmguider.exceptions.user;

import lombok.Getter;

@Getter
public class UserAlreadyExistsException extends RuntimeException {

    private final String fieldName;

    public UserAlreadyExistsException(String fieldName, String message) {
        super(message);
        this.fieldName = fieldName;
    }

}
