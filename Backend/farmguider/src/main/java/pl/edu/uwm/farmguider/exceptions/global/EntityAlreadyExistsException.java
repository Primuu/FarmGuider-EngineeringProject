package pl.edu.uwm.farmguider.exceptions.global;

import lombok.Getter;

@Getter
public class EntityAlreadyExistsException extends RuntimeException {

    private final String entityName;

    public EntityAlreadyExistsException(String entityName, String message) {
        super(message);
        this.entityName = entityName;
    }

}
