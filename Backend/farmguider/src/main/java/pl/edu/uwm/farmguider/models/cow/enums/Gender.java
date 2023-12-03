package pl.edu.uwm.farmguider.models.cow.enums;

import java.util.Arrays;

public enum Gender {
    MALE,
    FEMALE;

    public static boolean isValid(String value) {
        return Arrays.stream(Gender.values())
                .anyMatch(gender -> gender.name().equals(value));
    }

}
