package pl.edu.uwm.farmguider.utils;

import pl.edu.uwm.farmguider.exceptions.global.InvalidEnumException;
import pl.edu.uwm.farmguider.models.cow.enums.Gender;

public class GenderUtils {

    public static void verifyIsFemale(Gender gender) {
        if (!gender.equals(Gender.FEMALE)) {
            throw new InvalidEnumException("Gender", "Gender of this animal does not allow this operation to be performed.");
        }
    }

}
