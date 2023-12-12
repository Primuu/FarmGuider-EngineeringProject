package pl.edu.uwm.farmguider.exceptions.lactationPeriod;

import lombok.Getter;

@Getter
public class LactationPeriodConflictException extends RuntimeException {

    private final String entityName;

    public LactationPeriodConflictException(String entityName, String message) {
        super(message);
        this.entityName = entityName;
    }

}
