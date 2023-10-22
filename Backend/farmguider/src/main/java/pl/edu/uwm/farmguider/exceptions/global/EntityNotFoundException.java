package pl.edu.uwm.farmguider.exceptions.global;

import lombok.Getter;

@Getter
public class EntityNotFoundException extends RuntimeException {

    private final String entityName;

    public EntityNotFoundException(String entityName, String message) {
        super(message);
        this.entityName = entityName;
    }

}
